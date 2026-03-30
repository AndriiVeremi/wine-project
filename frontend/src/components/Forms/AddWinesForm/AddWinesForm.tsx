import React, { useEffect, Suspense, lazy, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import FormField from '@/components/Common/FormField/FormField';
import ImageUpload from '@/components/Common/ImageUpload/ImageUpload';
import type { Wine } from '@/types/wine';
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
import { useWineMutations } from '@/hooks/queries/useWines';
import { useWineries } from '@/hooks/queries/useWineries';
import { useGrapes } from '@/hooks/queries/useGrapes';
import Skeleton from '@/components/Common/Skeleton/Skeleton';
import type { ApiError } from '@/types/api';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const wineSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  winery: z.string().min(1, 'Please select a winery'),
  vintage: z
    .number()
    .min(1800)
    .max(new Date().getFullYear() + 1),
  grape: z.string().min(1, 'Please select a grape variety'),
  color: z.enum(['red', 'white', 'rose', 'orange']),
  sweetness: z.enum(['dry', 'semi-dry', 'semi-sweet', 'sweet']),
  price: z.number().min(0),
  description: z.string().optional(),
  tastingNotes: z.string().optional(),
  alcohol: z.string().optional(),
  volume: z.number().optional(),
  boxQuantity: z.number().optional(),
  hasPackaging: z.boolean().optional(),
  decanting: z.boolean().optional(),
  bottleDiameter: z.string().optional(),
  servingTemperature: z.string().optional(),
  foodPairing: z.string().optional(),
  supplier: z.string().optional(),
  suffix: z.string().optional(),
  inStock: z.boolean().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  manufacturer: z.string().optional(),
  buyLink: z.string().optional(),
});

type WineFormValues = z.infer<typeof wineSchema>;

const defaultValues: WineFormValues = {
  name: '',
  winery: '',
  vintage: new Date().getFullYear(),
  grape: '',
  color: 'red',
  sweetness: 'dry',
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
  const { addWine, updateWine, isAdding, isUpdating } = useWineMutations();
  const busy = isAdding || isUpdating;

  const { data: wineriesData } = useWineries({ limit: 100 });
  const { data: grapesData } = useGrapes({ limit: 1000 });

  const wineryList = useMemo(() => wineriesData?.data?.wineries || [], [wineriesData]);
  const grapeList = useMemo(() => grapesData?.data?.grapes || [], [grapesData]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WineFormValues>({
    resolver: zodResolver(wineSchema),
    defaultValues,
  });

  const selectedWineryId = watch('winery');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (wineData) {
      const initialValues: WineFormValues = {
        name: wineData.name,
        winery: typeof wineData.winery === 'object' ? wineData.winery._id : wineData.winery,
        vintage: wineData.vintage,
        grape: typeof wineData.grape === 'object' ? wineData.grape._id : wineData.grape,
        color: wineData.color,
        sweetness: wineData.sweetness,
        price: wineData.price,
        description: wineData.description,
        tastingNotes: Array.isArray(wineData.tastingNotes) ? wineData.tastingNotes.join(', ') : '',
        alcohol: wineData.alcohol,
        volume: wineData.volume,
        boxQuantity: wineData.boxQuantity,
        hasPackaging: wineData.hasPackaging,
        decanting: wineData.decanting,
        bottleDiameter: wineData.bottleDiameter,
        servingTemperature: wineData.servingTemperature,
        foodPairing: Array.isArray(wineData.foodPairing) ? wineData.foodPairing.join(', ') : '',
        supplier: wineData.supplier,
        suffix: wineData.suffix,
        inStock: wineData.inStock,
        buyLink: wineData.buyLink,
      };
      reset(initialValues);
      if (wineData.imageUrl) setImagePreview(wineData.imageUrl);
    } else if (wineryId) {
      setValue('winery', wineryId);
    }
  }, [wineData, wineryId, reset, setValue]);

  useEffect(() => {
    if (selectedWineryId && !wineData && wineryList.length > 0) {
      const winery = wineryList.find(
        (w: {
          _id: string;
          country?: { name: string } | string;
          region?: { name: string } | string;
          name: string;
        }) => w._id === selectedWineryId,
      );
      if (winery) {
        const cName = typeof winery.country === 'object' ? winery.country.name : '';
        const rName = typeof winery.region === 'object' ? winery.region.name : '';
        setValue('country', cName);
        setValue('region', rName);
        setValue('manufacturer', winery.name || '');
      }
    }
  }, [selectedWineryId, wineData, wineryList, setValue]);

  const onSubmit: SubmitHandler<WineFormValues> = async (vals) => {
    const tid = toast.loading('Saving wine...');
    try {
      const fd = new FormData();

      Object.entries(vals).forEach(([k, v]) => {
        if (v === undefined || v === null) return;

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

      if (imageFile) fd.append('image', imageFile);

      if (wineData?._id) {
        await updateWine({ id: wineData._id, data: fd });
      } else {
        await addWine(fd);
      }

      toast.dismiss(tid);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      toast.dismiss(tid);
    }
  };

  const onFile = (files: File[]) => {
    if (files.length > 0) {
      setImageFile(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <AddWineWrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<FieldValues>)}>
        <TopSection>
          <PhotoSide>
            <ImageUpload
              previews={imagePreview ? [imagePreview] : []}
              onFilesChange={onFile}
              maxFiles={1}
            />
          </PhotoSide>
          <InfoSide>
            <FormGrid>
              <FormField label="Wine Name" {...register('name')} error={errors.name?.message} />
              <FormField
                label="Winery"
                isSelect
                {...register('winery')}
                error={errors.winery?.message}
                options={wineryList.map((w: { _id: string; name: string }) => ({
                  value: w._id,
                  label: w.name,
                }))}
              />
              <FormField
                label="Vintage Year"
                type="number"
                {...register('vintage', { valueAsNumber: true })}
                error={errors.vintage?.message}
              />
              <FormField
                label="Grape Variety"
                isSelect
                {...register('grape')}
                error={errors.grape?.message}
                options={grapeList.map((g: { _id: string; name: string }) => ({
                  value: g._id,
                  label: g.name,
                }))}
              />
              <FormField
                label="Price per Bottle (₾)"
                type="number"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
              />
              <FormField
                label="Wine Color"
                isSelect
                {...register('color')}
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
                isSelect
                {...register('sweetness')}
                required
                options={[
                  { value: 'dry', label: 'Dry' },
                  { value: 'semi-dry', label: 'Semi-dry' },
                  { value: 'semi-sweet', label: 'Semi-sweet' },
                  { value: 'sweet', label: 'Sweet' },
                ]}
              />
              <FormField label="Alcohol content (%)" {...register('alcohol')} />
            </FormGrid>
          </InfoSide>
        </TopSection>

        <FormGrid>
          <FormField
            label="Volume (ml)"
            type="number"
            {...register('volume', { valueAsNumber: true })}
          />
          <FormField
            label="Items per Box"
            type="number"
            {...register('boxQuantity', { valueAsNumber: true })}
          />
          <FormField label="Bottle Diameter" {...register('bottleDiameter')} />
          <FormField label="Serving Temperature" {...register('servingTemperature')} />
          <Controller
            name="hasPackaging"
            control={control}
            render={({ field }) => (
              <FormField
                label="Gift Packaging"
                isSelect
                value={String(field.value)}
                onChange={(e) => field.onChange(e.target.value === 'true')}
                options={[
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' },
                ]}
              />
            )}
          />
          <Controller
            name="decanting"
            control={control}
            render={({ field }) => (
              <FormField
                label="Decanting Status"
                isSelect
                value={String(field.value)}
                onChange={(e) => field.onChange(e.target.value === 'true')}
                options={[
                  { value: 'true', label: 'Required' },
                  { value: 'false', label: 'Not needed' },
                ]}
              />
            )}
          />
        </FormGrid>

        <FormGrid>
          <FormField label="Wine Supplier" {...register('supplier')} />
          <FormField label="Name Suffix" {...register('suffix')} />
          <FormField label="Online Shop Link" {...register('buyLink')} />
          <CheckboxWrapper>
            <input type="checkbox" {...register('inStock')} />
            <span style={{ marginLeft: '8px', fontWeight: 600 }}>Available in Stock</span>
          </CheckboxWrapper>
        </FormGrid>

        <FullWidthWrapper>
          <FormField
            label="Tasting Notes (comma separated)"
            isTextarea
            {...register('tastingNotes')}
          />
          <FormField label="Ideal Food Pairings" isTextarea {...register('foodPairing')} />
          <Suspense
            fallback={
              <div>
                <Skeleton height="40px" $margin="0 0 12px 0" />
                <Skeleton height="200px" $borderRadius="8px" />
              </div>
            }
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextEditor
                  label="Detailed Description"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
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
