import React, { useState, useEffect, Suspense, lazy } from 'react';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import FormField from '@/components/Common/FormField/FormField';
import GalleryUpload from '@/components/Common/GalleryUpload/GalleryUpload';

import type { Tour } from '@/types/tours';
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
import { useToursStore } from '@/store/tours/toursStore';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const init = {
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
  const [form, setForm] = useState(init);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { add, update } = useToursStore();

  useEffect(() => {
    if (tourData) {
      setForm({
        name: tourData.name,
        description: tourData.description || '',
        duration: tourData.duration || 60,
        price: tourData.price || 0,
        minGroupSize: tourData.groupSize?.min || 1,
        maxGroupSize: tourData.groupSize?.max || 10,
      });
      if (tourData.images) setPreviews(tourData.images);
    }
  }, [tourData]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    let val: string | number = value;

    if (['price', 'duration', 'minGroupSize', 'maxGroupSize'].includes(id)) {
      val = value === '' ? 0 : Number(value);
    }

    setForm((prev) => ({ ...prev, [id]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wineryId && !tourData?.winery) {
      return toast.error('No winery ID');
    }

    if (form.minGroupSize > form.maxGroupSize) {
      return toast.error('Invalid group size');
    }

    setLoading(true);
    const tid = toast.loading('Saving...');

    try {
      const data = new FormData();

      data.append('name', form.name);
      data.append('description', form.description);
      data.append('duration', String(form.duration));
      data.append('price', String(form.price));
      data.append(
        'winery',
        wineryId ||
          (typeof tourData?.winery === 'object'
            ? (tourData.winery as unknown as { _id: string })._id
            : tourData?.winery) ||
          '',
      );

      const groupSize = {
        min: form.minGroupSize,
        max: form.maxGroupSize,
      };
      data.append('groupSize', JSON.stringify(groupSize));

      files.forEach((f) => data.append('images', f));

      if (tourData?._id) {
        await update(tourData._id, data);
        toast.success('Updated', { id: tid });
      } else {
        await add(data);
        toast.success('Added', { id: tid });
      }

      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      toast.error(msg, { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddTourWrapper>
      <FormContainer onSubmit={handleSave}>
        <TopSection>
          <PhotoSide>
            <GalleryUpload
              mainPreview={previews[0] || null}
              galleryPreviews={previews.slice(1)}
              onMainFileChange={(f) => {
                const nextFiles = [...files];
                nextFiles[0] = f;
                setFiles(nextFiles);

                const nextPreviews = [...previews];
                nextPreviews[0] = URL.createObjectURL(f);
                setPreviews(nextPreviews);
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
              id="name"
              value={form.name}
              onChange={handleInput}
              required
            />

            <FormGrid>
              <FormField
                label="Price (₾)"
                id="price"
                type="number"
                value={form.price}
                onChange={handleInput}
                required
              />
              <FormField
                label="Duration (min)"
                id="duration"
                type="number"
                value={form.duration}
                onChange={handleInput}
                required
              />
            </FormGrid>

            <SectionTitle>Group Size</SectionTitle>
            <GroupSizeWrapper>
              <FormField
                label="Min"
                id="minGroupSize"
                type="number"
                value={form.minGroupSize}
                onChange={handleInput}
                required
              />
              <FormField
                label="Max"
                id="maxGroupSize"
                type="number"
                value={form.maxGroupSize}
                onChange={handleInput}
                required
              />
            </GroupSizeWrapper>
          </InfoSide>
        </TopSection>

        <FullWidthWrapper>
          <Suspense
            fallback={
              <div>
                <Skeleton height="40px" $margin="0 0 12px 0" />
                <Skeleton height="200px" $borderRadius="8px" />
              </div>
            }
          >
            <TextEditor
              label="Description"
              value={form.description}
              onChange={(v: string) => setForm((prev) => ({ ...prev, description: v }))}
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
