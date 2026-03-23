import React, { useState, useEffect, Suspense, lazy } from 'react';
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
  FullWidthWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  CheckboxWrapper,
} from './AddWinesForm.styled';
import { FormContainer } from '@/components/Forms/AuthForm/Form.styled';
import { useWinesStore } from '@/store/wine/winesStore';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const initData = {
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

interface Props {
  wineryId?: string;
  wineData?: Wine | null;
  onSuccess?: () => void;
}

const AddWine = ({ wineryId, wineData, onSuccess }: Props) => {
  const [vals, setVals] = useState(initData);
  const [img, setImg] = useState<File | null>(null);
  const [view, setView] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [wineryList, setWineryList] = useState<{ _id: string; name: string }[]>([]);
  const [grapeList, setGrapeList] = useState<{ _id: string; name: string }[]>([]);

  const { add, update } = useWinesStore();

  useEffect(() => {
    if (wineData) {
      setVals({
        ...initData,
        ...wineData,
        winery:
          typeof wineData.winery === 'object'
            ? (wineData.winery as { _id: string })._id
            : wineData.winery,
        grape:
          typeof wineData.grape === 'object'
            ? (wineData.grape as { _id: string })._id
            : wineData.grape,
        tastingNotes: Array.isArray(wineData.tastingNotes)
          ? wineData.tastingNotes.join(', ')
          : wineData.tastingNotes || '',
        foodPairing: Array.isArray(wineData.foodPairing)
          ? wineData.foodPairing.join(', ')
          : wineData.foodPairing || '',
      });
      if (wineData.imageUrl) setView(wineData.imageUrl);
    } else if (wineryId) {
      setVals((p) => ({ ...p, winery: wineryId }));
    }
  }, [wineData, wineryId]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [w, g] = await Promise.all([getWineries({ limit: 100 }), getGrapes({ limit: 1000 })]);
        const wList = w.data.wineries || w.data;
        setWineryList(wList);
        setGrapeList(g.data.grapes || g.data);

        if (wineryId && !wineData) {
          const item = wList.find((x: { _id: string }) => x._id === wineryId);
          if (item) {
            setVals((p) => ({
              ...p,
              country: item.country?.name || p.country,
              region: item.region?.name || p.region,
              manufacturer: item.name || p.manufacturer,
            }));
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [wineryId, wineData]);

  const onFile = (files: File[]) => {
    if (files.length > 0) {
      setImg(files[0]);
      setView(URL.createObjectURL(files[0]));
    }
  };

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    let final: string | number | boolean = value;
    if (type === 'checkbox') {
      final = (e.target as HTMLInputElement).checked;
    }
    if (['price', 'vintage', 'volume', 'boxQuantity'].includes(id)) {
      final = value === '' ? 0 : Number(value);
    }
    setVals((p) => ({ ...p, [id]: final }));
  };

  const saveWine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const id = toast.loading('Saving wine...');
    try {
      const fd = new FormData();
      Object.entries(vals).forEach(([k, v]) => {
        if (!v && !['winery', 'grape', 'name', 'color', 'sweetness'].includes(k)) return;
        if (k === 'tastingNotes' || k === 'foodPairing') {
          const arr = String(v)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          fd.append(k, JSON.stringify(arr));
        } else {
          fd.append(k, String(v));
        }
      });
      if (img) fd.append('image', img);

      if (wineData?._id) await update(wineData._id, fd);
      else await add(fd);

      toast.success('Saved successfully!', { id });
      if (onSuccess) onSuccess();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Something went wrong', { id });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AddWineWrapper>
      <FormContainer onSubmit={saveWine}>
        <TopSection>
          <PhotoSide>
            <ImageUpload previews={view ? [view] : []} onFilesChange={onFile} maxFiles={1} />
          </PhotoSide>
          <InfoSide>
            <FormGrid>
              <FormField
                label="Wine Name"
                id="name"
                value={vals.name}
                onChange={onInput}
                required
              />
              <FormField
                label="Winery"
                id="winery"
                isSelect
                value={vals.winery}
                onChange={onInput}
                required
                options={wineryList.map((w) => ({ value: w._id, label: w.name }))}
              />
              <FormField
                label="Vintage Year"
                id="vintage"
                type="number"
                value={vals.vintage}
                onChange={onInput}
                required
              />
              <FormField
                label="Grape Variety"
                id="grape"
                isSelect
                value={vals.grape}
                onChange={onInput}
                required
                options={grapeList.map((g) => ({ value: g._id, label: g.name }))}
              />
              <FormField
                label="Price per Bottle ($)"
                id="price"
                type="number"
                value={vals.price}
                onChange={onInput}
                required
              />
              <FormField
                label="Wine Color"
                id="color"
                isSelect
                value={vals.color}
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
                label="Sweetness"
                id="sweetness"
                isSelect
                value={vals.sweetness}
                onChange={onInput}
                required
                options={[
                  { value: 'dry', label: 'Dry' },
                  { value: 'semi-dry', label: 'Semi-dry' },
                  { value: 'semi-sweet', label: 'Semi-sweet' },
                  { value: 'sweet', label: 'Sweet' },
                ]}
              />
              <FormField
                label="Alcohol content (%)"
                id="alcohol"
                value={vals.alcohol}
                onChange={onInput}
              />
            </FormGrid>
          </InfoSide>
        </TopSection>

        <FormGrid>
          <FormField
            label="Volume (ml)"
            id="volume"
            type="number"
            value={vals.volume}
            onChange={onInput}
          />
          <FormField
            label="Items per Box"
            id="boxQuantity"
            type="number"
            value={vals.boxQuantity}
            onChange={onInput}
          />
          <FormField
            label="Bottle Diameter"
            id="bottleDiameter"
            value={vals.bottleDiameter}
            onChange={onInput}
          />
          <FormField
            label="Serving Temperature"
            id="servingTemperature"
            value={vals.servingTemperature}
            onChange={onInput}
          />
          <FormField
            label="Gift Packaging"
            id="hasPackaging"
            isSelect
            value={String(vals.hasPackaging)}
            onChange={onInput}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
          <FormField
            label="Decanting Status"
            id="decanting"
            isSelect
            value={String(vals.decanting)}
            onChange={onInput}
            options={[
              { value: 'true', label: 'Required' },
              { value: 'false', label: 'Not needed' },
            ]}
          />
        </FormGrid>

        <FormGrid>
          <FormField label="Wine Supplier" id="supplier" value={vals.supplier} onChange={onInput} />
          <FormField label="Name Suffix" id="suffix" value={vals.suffix} onChange={onInput} />
          <FormField
            label="Online Shop Link"
            id="buyLink"
            value={vals.buyLink}
            onChange={onInput}
          />
          <CheckboxWrapper>
            <input type="checkbox" id="inStock" checked={vals.inStock} onChange={onInput} />
            <span style={{ marginLeft: '8px', fontWeight: 600 }}>Available in Stock</span>
          </CheckboxWrapper>
        </FormGrid>

        <FullWidthWrapper>
          <FormField
            label="Tasting Notes (comma separated)"
            id="tastingNotes"
            value={vals.tastingNotes}
            onChange={onInput}
            isTextarea
          />
          <FormField
            label="Ideal Food Pairings"
            id="foodPairing"
            value={vals.foodPairing}
            onChange={onInput}
            isTextarea
          />
          <Suspense
            fallback={
              <div>
                <Skeleton height="40px" $margin="0 0 12px 0" />
                <Skeleton height="200px" $borderRadius="8px" />
              </div>
            }
          >
            <TextEditor
              label="Detailed Description"
              value={vals.description}
              onChange={(v: string) => setVals((p) => ({ ...p, description: v }))}
            />
          </Suspense>
        </FullWidthWrapper>

        <ButtonWrapper>
          <MainButton type="submit" disabled={busy} style={{ minWidth: '200px' }}>
            {busy ? 'PROCESSING...' : 'CONFIRM & SAVE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddWineWrapper>
  );
};

export default AddWine;
