import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import FormField from '@/components/common/FormField/FormField';
import ImageUpload from '@/components/common/ImageUpload/ImageUpload';
import MainButton from '@/components/buttons/MainButton';
import {
  AddGrapeWrapper,
  Title,
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

const grapeTypes = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

const init: {
  name: string;
  type: 'red' | 'white' | 'rose';
  description: string;
  acidity: string;
  body: string;
  tannins: string;
  agingPotential: string;
  characteristics: string;
  foodPairing: string;
} = {
  name: '',
  type: 'red',
  description: '',
  acidity: 'Medium',
  body: 'Medium',
  tannins: 'Medium',
  agingPotential: '',
  characteristics: '',
  foodPairing: '',
};

const AddGrape = () => {
  const [form, setForm] = useState(init);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const add = useGrapesStore((s) => s.addGrape);

  const onFile = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]]);
      setPreviews([URL.createObjectURL(newFiles[0])]);
    }
  };

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return toast.error('Name is required');

    setLoading(true);

    try {
      const data = {
        ...form,
        characteristics: form.characteristics
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        foodPairing: form.foodPairing
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };

      await add(data, files);

      toast.success('Done!');
      setForm(init);
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.log(err);
      toast.error('Fail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddGrapeWrapper>
      <Title>Add Grape</Title>
      <FormContainer onSubmit={save}>
        <TopSection>
          <PhotoSide>
            <ImageUpload previews={previews} onFilesChange={onFile} maxFiles={1} />
          </PhotoSide>

          <InfoSide>
            <FormField
              label="Grape Name"
              id="name"
              value={form.name}
              onChange={onInput}
              placeholder="Enter grape name"
              required
            />

            <FormField
              label="Type"
              id="type"
              isSelect
              value={form.type}
              onChange={onInput}
              required
              options={grapeTypes}
            />
          </InfoSide>
        </TopSection>

        <SectionTitle>Characteristics</SectionTitle>

        <FormGrid>
          <FormField
            label="Acidity"
            id="acidity"
            isSelect
            value={form.acidity}
            onChange={onInput}
            required
            options={acidityOpts}
          />

          <FormField
            label="Body"
            id="body"
            isSelect
            value={form.body}
            onChange={onInput}
            required
            options={bodyOpts}
          />

          <FormField
            label="Tannins"
            id="tannins"
            isSelect
            value={form.tannins}
            onChange={onInput}
            options={tanninOpts}
          />

          <FormField
            label="Aging Potential"
            id="agingPotential"
            value={form.agingPotential}
            onChange={onInput}
            placeholder="e.g. 10-30 years"
          />

          <FullWidthWrapper>
            <FormField
              label="Characteristics (comma separated)"
              id="characteristics"
              value={form.characteristics}
              onChange={onInput}
              placeholder="Full-bodied, Spicy, Oak..."
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Food Pairing (comma separated)"
              id="foodPairing"
              value={form.foodPairing}
              onChange={onInput}
              placeholder="Red meat, Aged cheese..."
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Detailed Description"
              id="description"
              isTextarea
              value={form.description}
              onChange={onInput}
              placeholder="Describe the grape variety..."
            />
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton
            type="button"
            onClick={() => {
              setForm(init);
              setFiles([]);
              setPreviews([]);
            }}
          >
            RESET
          </MainButton>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'WAIT...' : 'SAVE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrape;
