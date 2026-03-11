import React, { useState, useEffect, useRef } from 'react';
import { getWineries } from '@/api/wineries';
import { getGrapes } from '@/api/grapes';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import FormField from '@/components/common/FormField/FormField';
import { FiPlus } from 'react-icons/fi';
import { getErrorMsg } from '@/api/helpers';
import type { Wine, WineColor, WineSweetness } from '@/types/wine';
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
} from './AddWinesForm.styled';
import { FormContainer } from '@/components/forms/AuthForm/Form.styled';

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
  buyLink: '',
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

import { useWinesStore } from '@/store/wine/winesStore';

const AddWines = () => {
  const [form, setForm] = useState(initialValues);
  const [wineries, setWineries] = useState<WineryOption[]>([]);
  const [grapes, setGrapes] = useState<GrapeOption[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const addWineToStore = useWinesStore((s) => s.addWine);
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [wRes, gRes] = await Promise.all([getWineries({ limit: 100 }), getGrapes({})]);
        setWineries(wRes.data.wineries);

        setGrapes(gRes.data.grapes || []);
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
      } as unknown as Partial<Wine> & { winery?: string; grape?: string };

      await addWineToStore(data, file);

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
            <FormField
              label="Wine Name"
              id="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter wine name"
              required
            />

            <CheckboxWrapper>
              <input id="inStock" type="checkbox" checked={form.inStock} onChange={onChange} />
              In stock
            </CheckboxWrapper>

            <FormField
              label="Price (USD)"
              id="price"
              type="number"
              value={form.price}
              onChange={onChange}
              required
            />
          </InfoSide>
        </TopSection>

        <SectionTitle>Characteristics</SectionTitle>

        <FormGrid>
          <FormField
            label="Color"
            id="color"
            isSelect
            value={form.color}
            onChange={onChange}
            required
            options={[
              { value: 'red', label: 'Red' },
              { value: 'white', label: 'White' },
              { value: 'rose', label: 'Rose' },
              { value: 'orange', label: 'Orange' },
            ]}
          />

          <FormField
            label="Type (Sweetness)"
            id="sweetness"
            isSelect
            value={form.sweetness}
            onChange={onChange}
            required
            options={[
              { value: 'dry', label: 'Dry' },
              { value: 'semi-dry', label: 'Semi-Dry' },
              { value: 'semi-sweet', label: 'Semi-Sweet' },
              { value: 'sweet', label: 'Sweet' },
            ]}
          />

          <FormField
            label="Brand (Winery)"
            id="winery"
            isSelect
            value={form.winery}
            onChange={onChange}
            required
            options={wineries.map((w) => ({ value: w._id, label: w.name }))}
          />

          <FormField
            label="Literature (Suffix)"
            id="suffix"
            value={form.suffix}
            onChange={onChange}
            placeholder="Additional info"
          />

          <FormField
            label="In a box of (Quantity)"
            id="boxQuantity"
            type="number"
            value={form.boxQuantity}
            onChange={onChange}
          />

          <FormField
            label="Packaging?"
            id="hasPackaging"
            isSelect
            value={String(form.hasPackaging)}
            onChange={onChange}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />

          <FormField
            label="Alcohol Content"
            id="alcohol"
            value={form.alcohol}
            onChange={onChange}
            placeholder="e.g. 13.5%"
          />

          <FormField
            label="Country (Auto-filled)"
            id="country"
            value={form.country}
            onChange={onChange}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Region (Auto-filled)"
            id="region"
            value={form.region}
            onChange={onChange}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Manufacturer (Auto-filled)"
            id="manufacturer"
            value={form.manufacturer}
            onChange={onChange}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Serve at temperatures"
            id="servingTemperature"
            value={form.servingTemperature}
            onChange={onChange}
            placeholder="e.g. 16-18°C"
          />

          <FormField
            label="Gastronomic combination"
            id="foodPairing"
            value={form.foodPairing}
            onChange={onChange}
            placeholder="Meat, Cheese..."
          />

          <FormField
            label="Grape Variety"
            id="grape"
            isSelect
            value={form.grape}
            onChange={onChange}
            required
            options={grapes.map((g) => ({ value: g._id, label: g.name }))}
          />

          <FormField
            label="Vintage (Year)"
            id="vintage"
            type="number"
            value={form.vintage}
            onChange={onChange}
            required
          />

          <FormField
            label="Is decanting required?"
            id="decanting"
            isSelect
            value={String(form.decanting)}
            onChange={onChange}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />

          <FormField
            label="Bottle diameter"
            id="bottleDiameter"
            value={form.bottleDiameter}
            onChange={onChange}
            placeholder="e.g. 75mm"
          />

          <FormField label="Supplier" id="supplier" value={form.supplier} onChange={onChange} />

          <FormField
            label="Volume (ml)"
            id="volume"
            type="number"
            value={form.volume}
            onChange={onChange}
          />

          <FullWidthWrapper>
            <FormField
              label="Link to Buy"
              id="buyLink"
              type="url"
              value={form.buyLink}
              onChange={onChange}
              placeholder="https://example.com/buy-this-wine"
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Detailed Description"
              id="description"
              isTextarea
              value={form.description}
              onChange={onChange}
              placeholder="Tell the story of this wine..."
            />
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
