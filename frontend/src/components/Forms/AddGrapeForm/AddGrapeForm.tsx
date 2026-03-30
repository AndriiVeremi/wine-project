import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import FormField from '@/components/Common/FormField/FormField';
import GalleryUpload from '@/components/Common/GalleryUpload/GalleryUpload';
import MainButton from '@/components/Buttons/MainButton';
import type { Grape } from '@/types/grape';
import type { ApiError } from '@/types/api';

import {
  AddGrapeWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  InfoGrid,
  FormGrid,
  FullWidthWrapper,
  ButtonWrapper,
  TagItem,
  TagBox,
  TagInput,
  TagsList,
} from './AddGrapeForm.styled';
import { FormContainer } from '@/components/Forms/AuthForm/Form.styled';
import { useGrapeMutations } from '@/hooks/queries/useGrapes';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const acidOpts = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Very High', label: 'Very High' },
];

const bodyOpts = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Full-bodied', label: 'Full-bodied' },
];

const tanninOpts = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'None', label: 'None' },
];

const typeOpts = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

const grapeSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  type: z.enum(['red', 'white', 'rose']),
  description: z.string().optional().or(z.literal('')),
  acidity: z.string().min(1, 'Select acidity'),
  body: z.string().min(1, 'Select body'),
  tannins: z.string().optional().or(z.literal('')),
  agingPotential: z.string().optional().or(z.literal('')),
  characteristics: z.array(z.string()),
  foodPairing: z.array(z.string()),
});

type GrapeFormValues = z.infer<typeof grapeSchema>;

const defaultValues: GrapeFormValues = {
  name: '',
  type: 'red',
  description: '',
  acidity: 'Medium',
  body: 'Medium',
  tannins: 'Medium',
  agingPotential: '',
  characteristics: [],
  foodPairing: [],
};

const DynamicTags = ({
  label,
  tags,
  onUpdate,
}: {
  label: string;
  tags: string[];
  onUpdate: (t: string[]) => void;
}) => {
  const [val, setVal] = useState('');

  const add = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && val.trim()) {
      e.preventDefault();
      if (!tags.includes(val.trim())) onUpdate([...tags, val.trim()]);
      setVal('');
    }
  };

  const kill = (t: string) => onUpdate(tags.filter((x) => x !== t));

  return (
    <TagBox>
      <h4>{label}</h4>
      <TagsList>
        {tags.map((t) => (
          <TagItem key={t} $selected onClick={() => kill(t)} style={{ cursor: 'pointer' }}>
            {t} ✕
          </TagItem>
        ))}
      </TagsList>
      <TagInput
        placeholder="Add item..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={add}
      />
    </TagBox>
  );
};

interface Props {
  wineryId?: string;
  grapeData?: Grape | null;
  onSuccess?: () => void;
}

const AddGrape = ({ wineryId, grapeData, onSuccess }: Props) => {
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [extraImgs, setExtraImgs] = useState<File[]>([]);
  const [mainPre, setMainPre] = useState<string | null>(null);
  const [extraPres, setExtraPre] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (mainPre && mainPre.startsWith('blob:')) {
        URL.revokeObjectURL(mainPre);
      }
      extraPres.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [mainPre, extraPres]);

  const { addGrape, updateGrape, isAdding, isUpdating } = useGrapeMutations();
  const busy = isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GrapeFormValues>({
    resolver: zodResolver(grapeSchema),
    defaultValues,
  });

  useEffect(() => {
    if (grapeData) {
      reset({
        name: grapeData.name,
        type: grapeData.type,
        description: grapeData.description || '',
        acidity: grapeData.acidity || 'Medium',
        body: grapeData.body || 'Medium',
        tannins: grapeData.tannins || 'Medium',
        agingPotential: grapeData.agingPotential || '',
        characteristics: grapeData.characteristics || [],
        foodPairing: grapeData.foodPairing || [],
      });
      if (grapeData.imageUrls?.length) {
        setMainPre(grapeData.imageUrls[0]);
        setExtraPre(grapeData.imageUrls.slice(1));
      }
    }
  }, [grapeData, reset]);

  const onSubmit: SubmitHandler<GrapeFormValues> = async (vals) => {
    const tid = toast.loading('Saving varietal...');
    try {
      const winId =
        typeof grapeData?.winery === 'object'
          ? (grapeData.winery as { _id?: string })?._id
          : grapeData?.winery;

      const fd = new FormData();
      Object.entries({ ...vals, winery: wineryId || winId }).forEach(([k, v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else if (v !== undefined && v !== null) fd.append(k, String(v));
      });

      if (mainImg) fd.append('images', mainImg);
      extraImgs.forEach((f) => fd.append('images', f));

      if (grapeData?._id) {
        await updateGrape({ id: grapeData._id, data: fd });
      } else {
        await addGrape(fd);
      }

      toast.success('Varietal saved successfully!', { id: tid });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.response?.data?.message || error.message || 'Error saving varietal', {
        id: tid,
      });
    }
  };

  return (
    <AddGrapeWrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<FieldValues>)}>
        <TopSection>
          <PhotoSide>
            <GalleryUpload
              mainPreview={mainPre}
              galleryPreviews={extraPres}
              onMainFileChange={(f) => {
                setMainImg(f);
                setMainPre(URL.createObjectURL(f));
              }}
              onGalleryFileChange={(file, index) => {
                const nextFiles = [...extraImgs];
                nextFiles[index] = file;
                setExtraImgs(nextFiles);
                const nextPreviews = [...extraPres];
                nextPreviews[index] = URL.createObjectURL(file);
                setExtraPre(nextPreviews);
              }}
              onRemoveGalleryFile={(index) => {
                const nextFiles = [...extraImgs];
                nextFiles.splice(index, 1);
                setExtraImgs(nextFiles);
                const nextPreviews = [...extraPres];
                nextPreviews.splice(index, 1);
                setExtraPre(nextPreviews);
              }}
              maxGalleryCount={5}
            />
          </PhotoSide>
          <InfoSide>
            <InfoGrid>
              <FormField
                label="Varietal Name"
                {...register('name')}
                error={errors.name?.message}
                required
              />
              <FormField
                label="Wine Style Type"
                isSelect
                {...register('type')}
                error={errors.type?.message}
                required
                options={typeOpts}
              />
            </InfoGrid>
          </InfoSide>
        </TopSection>

        <FormGrid>
          <FormField
            label="Acidity Level"
            isSelect
            {...register('acidity')}
            error={errors.acidity?.message}
            required
            options={acidOpts}
          />
          <FormField
            label="Body Weight"
            isSelect
            {...register('body')}
            error={errors.body?.message}
            required
            options={bodyOpts}
          />
          <FormField
            label="Tannin Structure"
            isSelect
            {...register('tannins')}
            options={tanninOpts}
          />
          <FormField
            label="Aging Potential"
            {...register('agingPotential')}
            placeholder="e.g. 5-10 years"
          />

          <FullWidthWrapper>
            <Controller
              name="characteristics"
              control={control}
              render={({ field }) => (
                <DynamicTags
                  label="Flavors & Aromas"
                  tags={field.value}
                  onUpdate={field.onChange}
                />
              )}
            />
            <Controller
              name="foodPairing"
              control={control}
              render={({ field }) => (
                <DynamicTags
                  label="Perfect Food Pairings"
                  tags={field.value}
                  onUpdate={field.onChange}
                />
              )}
            />
            <Suspense fallback={<Skeleton height="240px" />}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    label="Full Variety History"
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </Suspense>
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="submit" disabled={busy}>
            {busy ? 'SAVING...' : 'SAVE VARIETAL'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrape;
