import React, { useState, useEffect, useRef } from 'react';
import { getWineries } from '@/api/wineries';
import { getGrapes } from '@/api/grapes';
import apiClient from '@/api/axios';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import { FormContainer, FieldWrapper, Label, Input, Select } from '@/components/forms/Form.styled';
import { FiPlus } from 'react-icons/fi';
import { getErrorMsg } from '@/api/helpers';
import type { WineColor, WineSweetness, Wine } from '@/types/wine';
import {
  AddWineWrapper,
  Title,
  ButtonWrapper,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  PhotoUploadContainer,
  TopSection,
  PhotoSide,
  InfoSide,
  CheckboxWrapper,
} from './AddWineWrapper.styled';

const initialValues = {
  name: '',
  winery: '',
  vintage: new Date().getFullYear(),
  grape: '',
  color: 'red' as WineColor,
  sweetness: 'dry' as WineSweetness,
  price: 0,
  description: '',
  tastingNotes: '',
  alcohol: '',
  volume: 750,
  boxQuantity: 6,
  hasPackaging: false,
  decanting: false,
  bottleDiameter: '',
  servingTemperature: '',
  foodPairing: '',
  supplier: '',
  suffix: '',
  inStock: true,
  region: '',
  country: '',
  manufacturer: '',
};

interface WineryOption {
  _id: string;
  name: string;
  country?: { name: string };
  region?: { name: string };
}

interface GrapeOption {
  _id: string;
  name: string;
}

const AddWines = () => {
  const [form, setForm] = useState(initialValues);
  const [wineries, setWineries] = useState<WineryOption[]>([]);
  const [grapes, setGrapes] = useState<GrapeOption[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [wRes, gRes] = await Promise.all([getWineries({ limit: 100 }), getGrapes()]);
        setWineries(wRes.data.wineries);
        setGrapes(gRes.data);
      } catch {
        toast.error('Could not load options');
      }
    };
    loadOptions();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.size > 5000000) {
        toast.error('File too big (max 5MB)');
        return;
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;
    let val: string | number | boolean = value;

    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    } else if (['price', 'vintage', 'volume', 'boxQuantity'].includes(id)) {
      val = value === '' ? 0 : Number(value);
    } else if (['decanting', 'hasPackaging'].includes(id)) {
      val = value === 'true';
    }

    const updatedForm = { ...form, [id]: val };

    if (id === 'winery') {
      const selectedWinery = wineries.find((w) => w._id === value);
      if (selectedWinery) {
        updatedForm.country = selectedWinery.country?.name || '';
        updatedForm.region = selectedWinery.region?.name || '';
        updatedForm.manufacturer = selectedWinery.name || '';
      }
    }

    setForm(updatedForm);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.winery || !form.grape) {
      return toast.error('Name, Brand and Grape are required!');
    }

    setLoading(true);
    const tid = toast.loading('Saving wine...');

    try {
      const data = {
        ...form,
        tastingNotes: form.tastingNotes
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        foodPairing: form.foodPairing
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await apiClient.post<Wine>('/wines', data);

      if (file) {
        const body = new FormData();
        body.append('image', file);
        await apiClient.patch(`/wines/${res.data._id}/image`, body);
      }

      toast.success('Wine added successfully!', { id: tid });
      setForm(initialValues);
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error(getErrorMsg(err), { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddWineWrapper>
      <Title>Add New Wine</Title>
      <FormContainer onSubmit={onSave}>
        {/* TOP SECTION: Photo + Basic Info */}
        <TopSection>
          <PhotoSide>
            <PhotoUploadContainer onClick={() => fileInput.current?.click()}>
              {preview ? (
                <img
                  src={preview}
                  alt="Wine preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <>
                  <FiPlus />
                  <span>Add photo</span>
                </>
              )}
            </PhotoUploadContainer>
            <input
              type="file"
              ref={fileInput}
              onChange={onFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </PhotoSide>

          <InfoSide>
            <FieldWrapper>
              <Label>Wine Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={onChange}
                placeholder="Enter wine name"
                required
              />
            </FieldWrapper>

            <CheckboxWrapper>
              <input id="inStock" type="checkbox" checked={form.inStock} onChange={onChange} />
              In stock
            </CheckboxWrapper>

            <FieldWrapper>
              <Label>Price (USD) *</Label>
              <Input id="price" type="number" value={form.price} onChange={onChange} required />
            </FieldWrapper>
          </InfoSide>
        </TopSection>

        <SectionTitle>Characteristics</SectionTitle>

        {/* GRID SECTION: 2 Columns */}
        <FormGrid>
          {/* Row 1 */}
          <FieldWrapper>
            <Label>Color *</Label>
            <Select id="color" value={form.color} onChange={onChange} required>
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="rose">Rose</option>
              <option value="orange">Orange</option>
            </Select>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Type (Sweetness) *</Label>
            <Select id="sweetness" value={form.sweetness} onChange={onChange} required>
              <option value="dry">Dry</option>
              <option value="semi-dry">Semi-Dry</option>
              <option value="semi-sweet">Semi-Sweet</option>
              <option value="sweet">Sweet</option>
            </Select>
          </FieldWrapper>

          {/* Row 2 */}
          <FieldWrapper>
            <Label>Brand (Winery) *</Label>
            <Select id="winery" value={form.winery} onChange={onChange} required>
              <option value="">Select brand...</option>
              {wineries.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </Select>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Literature (Suffix)</Label>
            <Input
              id="suffix"
              value={form.suffix}
              onChange={onChange}
              placeholder="Additional info"
            />
          </FieldWrapper>

          {/* Row 3 */}
          <FieldWrapper>
            <Label>In a box of (Quantity)</Label>
            <Input id="boxQuantity" type="number" value={form.boxQuantity} onChange={onChange} />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Packaging?</Label>
            <Select id="hasPackaging" value={String(form.hasPackaging)} onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FieldWrapper>

          {/* Row 4 */}
          <FieldWrapper>
            <Label>Alcohol Content</Label>
            <Input id="alcohol" value={form.alcohol} onChange={onChange} placeholder="e.g. 13.5%" />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Country (Auto-filled)</Label>
            <Input
              id="country"
              value={form.country}
              onChange={onChange}
              disabled
              placeholder="Select brand first"
            />
          </FieldWrapper>

          {/* Row 5 */}
          <FieldWrapper>
            <Label>Region (Auto-filled)</Label>
            <Input
              id="region"
              value={form.region}
              onChange={onChange}
              disabled
              placeholder="Select brand first"
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Manufacturer (Auto-filled)</Label>
            <Input
              id="manufacturer"
              value={form.manufacturer}
              onChange={onChange}
              disabled
              placeholder="Select brand first"
            />
          </FieldWrapper>

          {/* Row 6 */}
          <FieldWrapper>
            <Label>Serve at temperatures</Label>
            <Input
              id="servingTemperature"
              value={form.servingTemperature}
              onChange={onChange}
              placeholder="e.g. 16-18°C"
            />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Gastronomic combination</Label>
            <Input
              id="foodPairing"
              value={form.foodPairing}
              onChange={onChange}
              placeholder="Meat, Cheese..."
            />
          </FieldWrapper>

          {/* Row 7 */}
          <FieldWrapper>
            <Label>Grape Variety *</Label>
            <Select id="grape" value={form.grape} onChange={onChange} required>
              <option value="">Select grape...</option>
              {grapes.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </Select>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Vintage (Year) *</Label>
            <Input id="vintage" type="number" value={form.vintage} onChange={onChange} required />
          </FieldWrapper>

          {/* Row 8 */}
          <FieldWrapper>
            <Label>Is decanting required?</Label>
            <Select id="decanting" value={String(form.decanting)} onChange={onChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FieldWrapper>

          <FieldWrapper>
            <Label>Bottle diameter</Label>
            <Input
              id="bottleDiameter"
              value={form.bottleDiameter}
              onChange={onChange}
              placeholder="e.g. 75mm"
            />
          </FieldWrapper>

          {/* Row 9 */}
          <FieldWrapper>
            <Label>Supplier</Label>
            <Input id="supplier" value={form.supplier} onChange={onChange} />
          </FieldWrapper>

          <FieldWrapper>
            <Label>Volume (ml)</Label>
            <Input id="volume" type="number" value={form.volume} onChange={onChange} />
          </FieldWrapper>

          {/* BOTTOM SECTION: Full Width */}
          <FullWidthWrapper>
            <FieldWrapper>
              <Label>Detailed Description</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={onChange}
                placeholder="Tell the story of this wine..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px 20px',
                  border: '1px solid var(--secondary-gray)',
                  borderRadius: 'var(--border-radius-in)',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </FieldWrapper>
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="button" onClick={() => setForm(initialValues)}>
            RESET
          </MainButton>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE WINE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddWineWrapper>
  );
};

export default AddWines;
