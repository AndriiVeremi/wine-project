import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import FormField from '@/components/Common/FormField/FormField';
import GalleryUpload from '@/components/Common/GalleryUpload/GalleryUpload';

import type { Tour } from '@/types/tours';
import type { ApiError } from '@/types/api';
import {
  AddTourWrapper,
  ButtonWrapper,
  FormGrid,
  FullWidthWrapper,
  SectionTitle,
  TopSection,
  PhotoSide,
  InfoSide,
  GroupSizeWrapper,
} from './AddTourForm.styled';
import { FormContainer } from '@/components/Forms/AuthForm/Form.styled';
import { useTourMutations } from '@/hooks/queries/useTours';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const tourSchema = z
  .object({
    name: z.string().min(2, 'Name is too short'),
    description: z.string().optional().or(z.literal('')),
    duration: z.number().min(1, 'Duration must be positive'),
    price: z.number().min(0, 'Price cannot be negative'),
    minGroupSize: z.number().min(1, 'Minimum group size is 1'),
    maxGroupSize: z.number().min(1, 'Maximum group size is 1'),
  })
  .refine((data) => data.minGroupSize <= data.maxGroupSize, {
    message: "Min size can't be greater than max size",
    path: ['minGroupSize'],
  });

type TourFormValues = z.infer<typeof tourSchema>;

const defaultValues: TourFormValues = {
  name: '',
  description: '',
  duration: 60,
  price: 0,
  minGroupSize: 1,
  maxGroupSize: 10,
};

interface Props {
  wineryId?: string;
  tourData?: Tour | null;
  onSuccess?: () => void;
}

const AddTour: React.FC<Props> = ({ wineryId, tourData, onSuccess }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { addTour, updateTour, isAdding, isUpdating } = useTourMutations();
  const loading = isAdding || isUpdating;

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues,
  });

  useEffect(() => {
    if (tourData) {
      reset({
        name: tourData.name,
        description: tourData.description || '',
        duration: tourData.duration || 60,
        price: tourData.price || 0,
        minGroupSize: tourData.groupSize?.min || 1,
        maxGroupSize: tourData.groupSize?.max || 10,
      });
      if (tourData.images) setPreviews(tourData.images);
    }
  }, [tourData, reset]);

  const onSubmit: SubmitHandler<TourFormValues> = async (vals) => {
    const tourWinery = tourData?.winery as { _id: string } | undefined;
    const targetWineryId =
      wineryId || tourWinery?._id || (typeof tourData?.winery === 'string' ? tourData.winery : '');

    if (!targetWineryId) {
      return toast.error('No winery ID found');
    }

    const tid = toast.loading('Saving tour...');

    try {
      const data = new FormData();
      data.append('name', vals.name);
      data.append('description', vals.description || '');
      data.append('duration', String(vals.duration));
      data.append('price', String(vals.price));
      data.append('winery', targetWineryId);

      const groupSize = {
        min: vals.minGroupSize,
        max: vals.maxGroupSize,
      };
      data.append('groupSize', JSON.stringify(groupSize));

      files.forEach((f) => data.append('images', f));

      if (tourData?._id) {
        await updateTour({ id: tourData._id, data });
      } else {
        await addTour(data);
      }

      toast.success('Tour saved successfully!', { id: tid });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.response?.data?.message || error.message || 'Error saving tour', {
        id: tid,
      });
    }
  };

  return (
    <AddTourWrapper>
      <FormContainer onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<FieldValues>)}>
        <TopSection>
          <PhotoSide>
            <GalleryUpload
              mainPreview={previews[0] || null}
              galleryPreviews={previews.slice(1)}
              onMainFileChange={(f) => {
                const nextFiles = [...files];
                nextFiles[0] = f;
                setFiles(nextFiles);
                setPreviews((prev) => [URL.createObjectURL(f), ...prev.slice(1)]);
              }}
              onGalleryFileChange={(file, index) => {
                const galleryIndex = index + 1;
                const nextFiles = [...files];
                nextFiles[galleryIndex] = file;
                setFiles(nextFiles);
                const nextPreviews = [...previews];
                nextPreviews[galleryIndex] = URL.createObjectURL(file);
                setPreviews(nextPreviews);
              }}
              onRemoveGalleryFile={(index) => {
                const galleryIndex = index + 1;
                const nextFiles = [...files];
                nextFiles.splice(galleryIndex, 1);
                setFiles(nextFiles);
                const nextPreviews = [...previews];
                nextPreviews.splice(galleryIndex, 1);
                setPreviews(nextPreviews);
              }}
            />
          </PhotoSide>

          <InfoSide>
            <FormField
              label="Tour Name"
              {...register('name')}
              error={errors.name?.message}
              required
            />

            <FormGrid>
              <FormField
                label="Price (₾)"
                type="number"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
                required
              />
              <FormField
                label="Duration (min)"
                type="number"
                {...register('duration', { valueAsNumber: true })}
                error={errors.duration?.message}
                required
              />
            </FormGrid>

            <SectionTitle>Group Size</SectionTitle>
            <GroupSizeWrapper>
              <FormField
                label="Min"
                type="number"
                {...register('minGroupSize', { valueAsNumber: true })}
                error={errors.minGroupSize?.message}
                required
              />
              <FormField
                label="Max"
                type="number"
                {...register('maxGroupSize', { valueAsNumber: true })}
                error={errors.maxGroupSize?.message}
                required
              />
            </GroupSizeWrapper>
          </InfoSide>
        </TopSection>

        <FullWidthWrapper>
          <Suspense fallback={<Skeleton height="200px" />}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextEditor
                  label="Description"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
          </Suspense>
        </FullWidthWrapper>

        <ButtonWrapper>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'WAIT...' : 'SAVE TOUR'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddTourWrapper>
  );
};

export default AddTour;
