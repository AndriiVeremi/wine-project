import React, { useState, useEffect } from 'react';
import { getWineries } from '@/api/wineries';
import { getGrapes } from '@/api/grapes';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import FormField from '@/components/Common/FormField/FormField';
import ImageUpload from '@/components/Common/ImageUpload/ImageUpload';
import type { Wine, WineColor, WineSweetness } from '@/types/wine';
import {
  AddWineWrapper,
  ButtonWrapper,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  CheckboxWrapper,
} from './AddWinesForm.styled';
import { FormContainer } from '@/components/Forms/AuthForm/Form.styled';
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

interface GrapeInfo {
  _id: string;
  name: string;
}

interface Props {
  wineryId?: string;
  wineData?: Wine | null;
  onSuccess?: () => void;
}

interface ApiError {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AddWine: React.FC<Props> = ({ wineryId, wineData, onSuccess }) => {
  const [form, setForm] = useState(init);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wineries, setWineries] = useState<Winery[]>([]);
  const [grapes, setGrapes] = useState<GrapeInfo[]>([]);

  const { add, update } = useWinesStore();

  useEffect(() => {
    if (wineData) {
      setForm({
        ...init,
        ...wineData,
        winery:
          typeof wineData.winery === 'object'
            ? (wineData.winery as unknown as { _id: string })._id
            : wineData.winery,
        grape:
          typeof wineData.grape === 'object'
            ? (wineData.grape as unknown as { _id: string })._id
            : wineData.grape,
        tastingNotes: Array.isArray(wineData.tastingNotes)
          ? wineData.tastingNotes.join(', ')
          : wineData.tastingNotes || '',

        foodPairing: Array.isArray(wineData.foodPairing)
          ? wineData.foodPairing.join(', ')
          : wineData.foodPairing || '',
      });
      if (wineData.imageUrl) setPreview(wineData.imageUrl);
    } else if (wineryId) {
      setForm((prev) => ({ ...prev, winery: wineryId }));
    }
  }, [wineData, wineryId]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [wRes, gRes] = await Promise.all([
          getWineries({ limit: 100 }),
          getGrapes({ limit: 1000 }),
        ]);
        if (active) {
          const list = wRes.data.wineries || wRes.data;
          setWineries(list);
          setGrapes(gRes.data.grapes || gRes.data);

          if (wineryId && !wineData) {
            const item = list.find((w: Winery) => w._id === wineryId);
            if (item) {
              setForm((prev) => ({
                ...prev,
                country: item.country?.name || prev.country,
                region: item.region?.name || prev.region,
                manufacturer: item.name || prev.manufacturer,
              }));
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [wineryId, wineData]);

  const onFile = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;
    let val: unknown = value;
    if (type === 'checkbox') val = (e.target as HTMLInputElement).checked;
    else if (['price', 'vintage', 'volume', 'boxQuantity'].includes(id))
      val = value === '' ? 0 : Number(value);
    setForm((prev) => ({ ...prev, [id]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const tid = toast.loading('Saving...');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (!v && !['winery', 'grape', 'name', 'color', 'sweetness'].includes(k)) return;
        if (k === 'tastingNotes' || k === 'foodPairing') {
          const arr = String(v)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          data.append(k, JSON.stringify(arr));
        } else data.append(k, String(v));
      });
      if (file) data.append('image', file);
      if (wineData?._id) await update(wineData._id, data);
      else await add(data);
      toast.success('Done', { id: tid });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.response?.data?.message || error.message || 'Error', { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddWineWrapper>
      <FormContainer onSubmit={handleSave}>
        <TopSection>
          <PhotoSide>
            <ImageUpload previews={preview ? [preview] : []} onFilesChange={onFile} maxFiles={1} />
          </PhotoSide>
          <InfoSide>
            <FormGrid>
              <FormField
                label="Wine Name"
                id="name"
                value={form.name}
                onChange={handleInput}
                required
              />
              <FormField
                label="Winery"
                id="winery"
                isSelect
                value={form.winery}
                onChange={handleInput}
                required
                options={wineries.map((w) => ({ value: w._id, label: w.name }))}
              />
              <FormField
                label="Vintage"
                id="vintage"
                type="number"
                value={form.vintage}
                onChange={handleInput}
                required
              />
              <FormField
                label="Grape"
                id="grape"
                isSelect
                value={form.grape}
                onChange={handleInput}
                required
                options={grapes.map((g) => ({ value: g._id, label: g.name }))}
              />
              <FormField
                label="Price ($)"
                id="price"
                type="number"
                value={form.price}
                onChange={handleInput}
                required
              />
              <FormField
                label="Color"
                id="color"
                isSelect
                value={form.color}
                onChange={handleInput}
                required
                options={[
                  { value: 'red', label: 'Red' },
                  { value: 'white', label: 'White' },
                  { value: 'rose', label: 'Rose' },
                  { value: 'orange', label: 'Orange' },
                ]}
              />
              <FormField
                label="Sweetness"
                id="sweetness"
                isSelect
                value={form.sweetness}
                onChange={handleInput}
                required
                options={[
                  { value: 'dry', label: 'Dry' },
                  { value: 'semi-dry', label: 'Semi-dry' },
                  { value: 'semi-sweet', label: 'Semi-sweet' },
                  { value: 'sweet', label: 'Sweet' },
                ]}
              />
              <FormField
                label="Alcohol (%)"
                id="alcohol"
                value={form.alcohol}
                onChange={handleInput}
              />
            </FormGrid>
          </InfoSide>
        </TopSection>
        <SectionTitle>Technical Details</SectionTitle>
        <FormGrid>
          <FormField
            label="Volume (ml)"
            id="volume"
            type="number"
            value={form.volume}
            onChange={handleInput}
          />
          <FormField
            label="Box Quantity"
            id="boxQuantity"
            type="number"
            value={form.boxQuantity}
            onChange={handleInput}
          />
          <FormField
            label="Bottle Diameter"
            id="bottleDiameter"
            value={form.bottleDiameter}
            onChange={handleInput}
          />
          <FormField
            label="Serving Temp"
            id="servingTemperature"
            value={form.servingTemperature}
            onChange={handleInput}
          />
          <FormField
            label="Has Packaging"
            id="hasPackaging"
            isSelect
            value={String(form.hasPackaging)}
            onChange={handleInput}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
          <FormField
            label="Decanting"
            id="decanting"
            isSelect
            value={String(form.decanting)}
            onChange={handleInput}
            options={[
              { value: 'true', label: 'Required' },
              { value: 'false', label: 'Not required' },
            ]}
          />
        </FormGrid>
        <SectionTitle>Marketing & Sales</SectionTitle>
        <FormGrid>
          <FormField label="Supplier" id="supplier" value={form.supplier} onChange={handleInput} />
          <FormField label="Suffix" id="suffix" value={form.suffix} onChange={handleInput} />
          <FormField label="Buy Link" id="buyLink" value={form.buyLink} onChange={handleInput} />
          <CheckboxWrapper>
            <input type="checkbox" id="inStock" checked={form.inStock} onChange={handleInput} /> In
            Stock
          </CheckboxWrapper>
        </FormGrid>
        <SectionTitle>Descriptions</SectionTitle>
        <FullWidthWrapper>
          <FormField
            label="Tasting Notes"
            id="tastingNotes"
            value={form.tastingNotes}
            onChange={handleInput}
            isTextarea
          />
          <FormField
            label="Food Pairing"
            id="foodPairing"
            value={form.foodPairing}
            onChange={handleInput}
            isTextarea
          />
          <FormField
            label="General Description"
            id="description"
            value={form.description}
            onChange={handleInput}
            isTextarea
          />
        </FullWidthWrapper>
        <ButtonWrapper>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'WAIT...' : 'SAVE WINE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddWineWrapper>
  );
};

export default AddWine;
