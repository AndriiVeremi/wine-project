import React, { useState, useEffect } from 'react';
import { getWineries } from '@/api/wineries';
import { getGrapes } from '@/api/grapes';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import FormField from '@/components/common/FormField/FormField';
import ImageUpload from '@/components/common/ImageUpload/ImageUpload';
import type { Wine, WineColor, WineSweetness } from '@/types/wine';
import {
  AddWineWrapper,
  Title,
  ButtonWrapper,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  CheckboxWrapper,
} from './AddWinesForm.styled';
import { FormContainer } from '@/components/forms/AuthForm/Form.styled';
import { useWinesStore } from '@/store/wine/winesStore';

const init = {
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

interface Winery {
  _id: string;
  name: string;
  country?: { name: string };
  region?: { name: string };
}

interface Grape {
  _id: string;
  name: string;
}

interface Props {
  wineryId?: string;
  wineData?: Wine | null;
  onSuccess?: () => void;
}

const AddWine: React.FC<Props> = ({ wineryId, wineData, onSuccess }) => {
  const [form, setForm] = useState(init);
  const [wineries, setWineries] = useState<Winery[]>([]);
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { add, update } = useWinesStore();

  useEffect(() => {
    if (wineData) {
      setForm({
        ...init,
        ...wineData,
        winery: typeof wineData.winery === 'object' ? wineData.winery._id : wineData.winery,
        grape: typeof wineData.grape === 'object' ? wineData.grape._id : wineData.grape,
        tastingNotes: Array.isArray(wineData.tastingNotes)
          ? wineData.tastingNotes.join(', ')
          : wineData.tastingNotes || '',
        foodPairing: Array.isArray(wineData.foodPairing)
          ? wineData.foodPairing.join(', ')
          : wineData.foodPairing || '',
        imageUrl: wineData.imageUrl || '',
      });
      if (wineData.imageUrl) setPreview(wineData.imageUrl);
    }
  }, [wineData]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (wineries.length > 0 && grapes.length > 0) return;
      try {
        const [wRes, gRes] = await Promise.all([getWineries({ limit: 100 }), getGrapes({})]);
        if (active) {
          setWineries(wRes.data.wineries);
          setGrapes(gRes.data.grapes || []);
        }
      } catch (err) {
        console.log(err);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [wineries.length, grapes.length]);

  useEffect(() => {
    if (wineryId && !wineData) {
      setForm((prev) => {
        if (prev.winery === wineryId) return prev;
        return { ...prev, winery: wineryId };
      });
    }

    if (wineryId && wineries.length > 0 && !wineData) {
      const item = wineries.find((w: Winery) => w._id === wineryId);
      if (item) {
        setForm((prev) => ({
          ...prev,
          country: item.country?.name || prev.country,
          region: item.region?.name || prev.region,
          manufacturer: item.name || prev.manufacturer,
        }));
      }
    }
  }, [wineryId, wineries, wineData]);

  const onFile = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const onInput = (
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

    const nextForm = { ...form, [id]: val };

    if (id === 'winery') {
      const item = wineries.find((w) => w._id === value);
      if (item) {
        nextForm.country = item.country?.name || '';
        nextForm.region = item.region?.name || '';
        nextForm.manufacturer = item.name || '';
      }
    }

    setForm(nextForm);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.winery || !form.grape) {
      return toast.error('Fill required fields');
    }

    setLoading(true);
    const tid = toast.loading('Saving...');

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, val]) => {
        if (val === null || val === undefined || val === '') {
          // Skip empty optional fields, but winery and grape must have values
          if (['winery', 'grape', 'name', 'color', 'sweetness'].includes(key)) {
            data.append(key, String(val));
          }
          return;
        }

        if (key === 'tastingNotes' || key === 'foodPairing') {
          const arr = String(val)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          data.append(key, JSON.stringify(arr));
        } else {
          data.append(key, String(val));
        }
      });

      if (file) data.append('image', file);

      if (wineData?._id) {
        await update(wineData._id, data);
        toast.success('Wine updated!', { id: tid });
      } else {
        await add(data);
        toast.success('Wine added!', { id: tid });
      }

      setForm(init);
      setFile(null);
      setPreview(null);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.log(err);
      const message = err instanceof Error ? err.message : 'Save failed';
      toast.error(message, { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddWineWrapper>
      <Title>{wineData?._id ? 'Edit Wine' : 'Add Wine'}</Title>
      <FormContainer onSubmit={save}>
        <TopSection>
          <PhotoSide>
            <ImageUpload previews={preview ? [preview] : []} onFilesChange={onFile} maxFiles={1} />
          </PhotoSide>

          <InfoSide style={{ flex: 1 }}>
            <FormField
              label="Wine Name"
              id="name"
              value={form.name}
              onChange={onInput}
              placeholder="Enter wine name"
              required
            />

            <CheckboxWrapper>
              <input id="inStock" type="checkbox" checked={form.inStock} onChange={onInput} />
              In stock
            </CheckboxWrapper>

            <FormField
              label="Price (USD)"
              id="price"
              type="number"
              value={form.price}
              onChange={onInput}
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
            onChange={onInput}
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
            onChange={onInput}
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
            onChange={onInput}
            required
            options={wineries.map((w) => ({ value: w._id, label: w.name }))}
          />

          <FormField
            label="Literature (Suffix)"
            id="suffix"
            value={form.suffix}
            onChange={onInput}
            placeholder="Additional info"
          />

          <FormField
            label="In a box of (Quantity)"
            id="boxQuantity"
            type="number"
            value={form.boxQuantity}
            onChange={onInput}
          />

          <FormField
            label="Packaging?"
            id="hasPackaging"
            isSelect
            value={String(form.hasPackaging)}
            onChange={onInput}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />

          <FormField
            label="Alcohol Content"
            id="alcohol"
            value={form.alcohol}
            onChange={onInput}
            placeholder="e.g. 13.5%"
          />

          <FormField
            label="Country (Auto-filled)"
            id="country"
            value={form.country}
            onChange={onInput}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Region (Auto-filled)"
            id="region"
            value={form.region}
            onChange={onInput}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Manufacturer (Auto-filled)"
            id="manufacturer"
            value={form.manufacturer}
            onChange={onInput}
            disabled
            placeholder="Select brand first"
          />

          <FormField
            label="Serve at temperatures"
            id="servingTemperature"
            value={form.servingTemperature}
            onChange={onInput}
            placeholder="e.g. 16-18°C"
          />

          <FormField
            label="Gastronomic combination"
            id="foodPairing"
            value={form.foodPairing}
            onChange={onInput}
            placeholder="Meat, Cheese..."
          />

          <FormField
            label="Grape Variety"
            id="grape"
            isSelect
            value={form.grape}
            onChange={onInput}
            required
            options={grapes.map((g) => ({ value: g._id, label: g.name }))}
          />

          <FormField
            label="Vintage (Year)"
            id="vintage"
            type="number"
            value={form.vintage}
            onChange={onInput}
            required
          />

          <FormField
            label="Is decanting required?"
            id="decanting"
            isSelect
            value={String(form.decanting)}
            onChange={onInput}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />

          <FormField
            label="Bottle diameter"
            id="bottleDiameter"
            value={form.bottleDiameter}
            onChange={onInput}
            placeholder="e.g. 75mm"
          />

          <FormField label="Supplier" id="supplier" value={form.supplier} onChange={onInput} />

          <FormField
            label="Volume (ml)"
            id="volume"
            type="number"
            value={form.volume}
            onChange={onInput}
          />

          <FullWidthWrapper>
            <FormField
              label="Link to Buy"
              id="buyLink"
              type="url"
              value={form.buyLink}
              onChange={onInput}
              placeholder="https://example.com/buy-this-wine"
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Detailed Description"
              id="description"
              isTextarea
              value={form.description}
              onChange={onInput}
              placeholder="Tell the story of this wine..."
            />
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="button" onClick={() => setForm(init)}>
            RESET
          </MainButton>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'WAIT...' : wineData?._id ? 'UPDATE' : 'SAVE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddWineWrapper>
  );
};

export default AddWine;
