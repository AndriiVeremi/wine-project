import React, { useState, useRef } from 'react';
import { notifySuccess, notifyError } from '@/utils/toast';
import FormField from '@/components/common/FormField/FormField';
import { FiPlus } from 'react-icons/fi';
import MainButton from '@/components/buttons/MainButton';
import {
  AddGrapeWrapper,
  Title,
  TopSection,
  PhotoSide,
  PhotoUploadContainer,
  PhotoGrid,
  MiniPhotoPreview,
  InfoSide,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  ButtonWrapper,
} from './AddGrapeForm.styled';
import { FormContainer } from '@/components/forms/AuthForm/Form.styled';

const ACITIDY_OPTIONS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Very High', label: 'Very High' },
];

const BODY_OPTIONS = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Full-bodied', label: 'Full-bodied' },
];

const TANNIN_OPTIONS = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'None', label: 'None' },
];

const GRAPE_TYPES = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

const initialValues: {
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

import { useGrapesStore } from '@/store/grape/grapesStore';

const AddGrapeForm = () => {
  const [form, setForm] = useState(initialValues);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const addGrapeToStore = useGrapesStore((s) => s.addGrape);
  const fileInput = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((f) => f.size <= 5000000);

    if (validFiles.length < selectedFiles.length) {
      notifyError('Some files are too big (max 5MB)');
    }

    const newFiles = [...files, ...validFiles].slice(0, 5);
    setFiles(newFiles);
    setPreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return notifyError('Name is required!');

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

      await addGrapeToStore(data, files);

      notifySuccess('Grape variety added successfully!');
      setForm(initialValues);
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      notifyError('Failed to add grape variety');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddGrapeWrapper>
      <Title>Add New Grape Variety</Title>
      <FormContainer onSubmit={onSave}>
        <TopSection>
          <PhotoSide>
            <PhotoUploadContainer onClick={() => fileInput.current?.click()}>
              <FiPlus />
              <span>Add up to 5 photos</span>
            </PhotoUploadContainer>
            <input
              type="file"
              ref={fileInput}
              onChange={onFileChange}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            <PhotoGrid>
              {previews.map((src, idx) => (
                <MiniPhotoPreview key={idx}>
                  <img src={src} alt={`Preview ${idx}`} />
                </MiniPhotoPreview>
              ))}
            </PhotoGrid>
          </PhotoSide>

          <InfoSide>
            <FormField
              label="Grape Name"
              id="name"
              value={form.name}
              onChange={onChange}
              placeholder="Enter grape name"
              required
            />

            <FormField
              label="Type"
              id="type"
              isSelect
              value={form.type}
              onChange={onChange}
              required
              options={GRAPE_TYPES}
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
            onChange={onChange}
            required
            options={ACITIDY_OPTIONS}
          />

          <FormField
            label="Body"
            id="body"
            isSelect
            value={form.body}
            onChange={onChange}
            required
            options={BODY_OPTIONS}
          />

          <FormField
            label="Tannins"
            id="tannins"
            isSelect
            value={form.tannins}
            onChange={onChange}
            options={TANNIN_OPTIONS}
          />

          <FormField
            label="Aging Potential"
            id="agingPotential"
            value={form.agingPotential}
            onChange={onChange}
            placeholder="e.g. 10-30 years"
          />

          <FullWidthWrapper>
            <FormField
              label="Characteristics (comma separated)"
              id="characteristics"
              value={form.characteristics}
              onChange={onChange}
              placeholder="Full-bodied, Spicy, Oak..."
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Food Pairing (comma separated)"
              id="foodPairing"
              value={form.foodPairing}
              onChange={onChange}
              placeholder="Red meat, Aged cheese..."
            />
          </FullWidthWrapper>

          <FullWidthWrapper>
            <FormField
              label="Detailed Description"
              id="description"
              isTextarea
              value={form.description}
              onChange={onChange}
              placeholder="Describe the grape variety..."
            />
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton
            type="button"
            onClick={() => {
              setForm(initialValues);
              setFiles([]);
              setPreviews([]);
            }}
          >
            RESET
          </MainButton>
          <MainButton type="submit" disabled={loading}>
            {loading ? 'SAVING...' : 'SAVE GRAPE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrapeForm;
