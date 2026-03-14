import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import FormField from '@/components/common/FormField/FormField';
import ImageUpload from '@/components/common/ImageUpload/ImageUpload';
import MainButton from '@/components/buttons/MainButton';
import type { Grape } from '@/types/grape';
import {
  AddGrapeWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  ButtonWrapper,
} from './AddGrapeForm.styled';
import { FormContainer } from '@/components/forms/AuthForm/Form.styled';
import { useGrapesStore } from '@/store/grape/grapesStore';

const acidityOpts = [
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

const types = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

const init = {
  name: '',
  type: 'red' as 'red' | 'white' | 'rose',
  description: '',
  acidity: 'Medium',
  body: 'Medium',
  tannins: 'Medium',
  agingPotential: '',
  characteristics: '',
  foodPairing: '',
};

interface Props {
  wineryId?: string;
  grapeData?: Grape | null;
  onSuccess?: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const AddGrape = ({ wineryId, grapeData, onSuccess }: Props) => {
  const [form, setForm] = useState(init);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { add, update } = useGrapesStore();

  useEffect(() => {
    if (grapeData) {
      setForm({
        name: grapeData.name,
        type: grapeData.type,
        description: grapeData.description || '',
        acidity: grapeData.acidity || 'Medium',
        body: grapeData.body || 'Medium',
        tannins: grapeData.tannins || 'Medium',
        agingPotential: grapeData.agingPotential || '',
        characteristics: grapeData.characteristics?.join(', ') || '',
        foodPairing: grapeData.foodPairing?.join(', ') || '',
      });
      if (grapeData.imageUrls?.[0]) setPreviews([grapeData.imageUrls[0]]);
    }
  }, [grapeData]);

  const onFile = (f: File[]) => {
    if (f.length > 0) {
      setFiles([f[0]]);
      setPreviews([URL.createObjectURL(f[0])]);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const tid = toast.loading('Saving...');

    try {
      const gWinery =
        typeof grapeData?.winery === 'object'
          ? (grapeData.winery as unknown as { _id: string })?._id
          : grapeData?.winery;
      const payload = {
        ...form,
        winery: wineryId || gWinery,
        characteristics: form.characteristics
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        foodPairing: form.foodPairing
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (grapeData?._id) {
        await update(grapeData._id, payload, files);
        toast.success('Updated', { id: tid });
      } else {
        await add(payload, files);
        toast.success('Added', { id: tid });
      }

      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const e = err as ApiError;
      toast.error(e.response?.data?.message || 'Error', { id: tid });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddGrapeWrapper>
      <FormContainer onSubmit={onSave}>
        <TopSection>
          <PhotoSide>
            <ImageUpload previews={previews} onFilesChange={onFile} maxFiles={1} />
          </PhotoSide>
          <InfoSide>
            <FormField label="Name" id="name" value={form.name} onChange={handleInput} required />
            <FormField
              label="Type"
              id="type"
              isSelect
              value={form.type}
              onChange={handleInput}
              required
              options={types}
            />
          </InfoSide>
        </TopSection>

        <SectionTitle>Details</SectionTitle>
        <FormGrid>
          <FormField
            label="Acidity"
            id="acidity"
            isSelect
            value={form.acidity}
            onChange={handleInput}
            required
            options={acidityOpts}
          />
          <FormField
            label="Body"
            id="body"
            isSelect
            value={form.body}
            onChange={handleInput}
            required
            options={bodyOpts}
          />
          <FormField
            label="Tannins"
            id="tannins"
            isSelect
            value={form.tannins}
            onChange={handleInput}
            options={tanninOpts}
          />
          <FormField
            label="Aging"
            id="agingPotential"
            value={form.agingPotential}
            onChange={handleInput}
          />
          <FullWidthWrapper>
            <FormField
              label="Characteristics"
              id="characteristics"
              value={form.characteristics}
              onChange={handleInput}
            />
            <FormField
              label="Food Pairing"
              id="foodPairing"
              value={form.foodPairing}
              onChange={handleInput}
            />
            <FormField
              label="Description"
              id="description"
              isTextarea
              value={form.description}
              onChange={handleInput}
            />
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'WAIT...' : 'SAVE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrape;
