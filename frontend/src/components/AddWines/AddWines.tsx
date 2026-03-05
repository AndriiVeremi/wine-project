import React, { useState, useEffect, useRef } from 'react';
import { useWinesStore } from '@/store/wine/winesStore';
import { getWineries } from '@/api/wineries';
import { getGrapes } from '@/api/grapes';
import apiClient from '@/api/axios';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import { FormContainer, FieldWrapper, Label, Input, Select } from '@/components/forms/Form.styled';
import { FiPlus } from 'react-icons/fi';
import type { WineColor, WineSweetness, Wine } from '@/types/wine';
import {
  AddWineWrapper,
  Title,
  ButtonWrapper,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  PhotoUploadWrapper,
  PhotoUploadContainer,
} from './AddWineWrapper.styled';

interface Winery {
  _id: string;
  name: string;
}

interface Grape {
  _id: string;
  name: string;
}

interface FormData {
  name: string;
  winery: string;
  vintage: number;
  grape: string;
  color: WineColor;
  sweetness: WineSweetness;
  price: number;
  description: string;
  tastingNotes: string;
  imageUrl: string;
  alcohol: string;
  volume: number;
  boxQuantity: number;
  hasPackaging: boolean;
  decanting: boolean;
  bottleDiameter: string;
  servingTemperature: string;
  foodPairing: string;
  suffix: string;
  supplier: string;
}

const AddWines = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    winery: '',
    vintage: new Date().getFullYear(),
    grape: '',
    color: 'red',
    sweetness: 'dry',
    price: 0,
    description: '',
    tastingNotes: '',
    imageUrl: '',
    alcohol: '',
    volume: 750,
    boxQuantity: 6,
    hasPackaging: false,
    decanting: false,
    bottleDiameter: '',
    servingTemperature: '',
    foodPairing: '',
    suffix: '',
    supplier: '',
  });

  const [wineries, setWineries] = useState<Winery[]>([]);
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // We keep the store hook if needed for other purposes, but remove unused variables
  useWinesStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wineriesRes, grapesRes] = await Promise.all([getWineries(), getGrapes()]);
        setWineries(wineriesRes.data.wineries);
        setGrapes(grapesRes.data);
      } catch {
        toast.error('Failed to load wineries or grapes data');
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    let finalValue: string | number | boolean = value;
    if (id === 'decanting' || id === 'hasPackaging') {
      finalValue = value === 'true';
    } else if (id === 'price' || id === 'vintage' || id === 'volume' || id === 'boxQuantity') {
      finalValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: finalValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.winery || !formData.grape) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Saving wine details...');

    const submissionData = {
      ...formData,
      tastingNotes: formData.tastingNotes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      foodPairing: formData.foodPairing
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      // 1. Create the wine entry
      const response = await apiClient.post<Wine>('/wines', submissionData);
      const newWine = response.data;

      // 2. If a file is selected, upload it
      if (selectedFile) {
        toast.loading('Uploading wine photo...', { id: loadingToast });
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);

        await apiClient.patch(`/wines/${newWine._id}/image`, imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast.success('Wine added successfully!', { id: loadingToast });
      
      // Reset form
      setFormData({
        name: '',
        winery: '',
        vintage: new Date().getFullYear(),
        grape: '',
        color: 'red',
        sweetness: 'dry',
        price: 0,
        description: '',
        tastingNotes: '',
        imageUrl: '',
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
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch {
      toast.error('Failed to add wine', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AddWineWrapper>
      <Title>Add New Wine</Title>
      <FormContainer onSubmit={handleSubmit}>
        <FormGrid>
          <PhotoUploadWrapper onClick={handleImageClick}>
            <PhotoUploadContainer>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <>
                  <FiPlus />
                  <span>Add photo</span>
                </>
              )}
            </PhotoUploadContainer>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </PhotoUploadWrapper>
          <SectionTitle>Characteristics</SectionTitle>
          <FieldWrapper>
            <Label htmlFor="name">Wine Name: *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="winery">Winery: *</Label>
            <Select id="winery" value={formData.winery} onChange={handleChange} required>
              <option value="" disabled>
                Select winery
              </option>
              {wineries.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="vintage">Vintage (Year): *</Label>
            <Input
              id="vintage"
              type="number"
              value={formData.vintage}
              onChange={handleChange}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="grape">Grape Variety: *</Label>
            <Select id="grape" value={formData.grape} onChange={handleChange} required>
              <option value="" disabled>
                Select grape
              </option>
              {grapes.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="price">Price (USD): *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="alcohol">Alcohol Content (%):</Label>
            <Input
              id="alcohol"
              type="text"
              placeholder="e.g. 13.5%"
              value={formData.alcohol}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="color">Color: *</Label>
            <Select id="color" value={formData.color} onChange={handleChange} required>
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="rose">Rose</option>
              <option value="orange">Orange</option>
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="sweetness">Sweetness: *</Label>
            <Select id="sweetness" value={formData.sweetness} onChange={handleChange} required>
              <option value="dry">Dry</option>
              <option value="semi-dry">Semi-Dry</option>
              <option value="semi-sweet">Semi-Sweet</option>
              <option value="sweet">Sweet</option>
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="volume">Volume (ml):</Label>
            <Input id="volume" type="number" value={formData.volume} onChange={handleChange} />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="bottleDiameter">Bottle Diameter:</Label>
            <Input
              id="bottleDiameter"
              type="text"
              placeholder="e.g. 75mm"
              value={formData.bottleDiameter}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="servingTemperature">Serving Temperature:</Label>
            <Input
              id="servingTemperature"
              type="text"
              placeholder="e.g. 16-18°C"
              value={formData.servingTemperature}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="supplier">Supplier:</Label>
            <Input id="supplier" type="text" value={formData.supplier} onChange={handleChange} />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="boxQuantity">Box Quantity:</Label>
            <Input
              id="boxQuantity"
              type="number"
              value={formData.boxQuantity}
              onChange={handleChange}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="decanting">Requires Decanting: *</Label>
            <Select
              id="decanting"
              value={String(formData.decanting)}
              onChange={handleChange}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="hasPackaging">Has Packaging: *</Label>
            <Select
              id="hasPackaging"
              value={String(formData.hasPackaging)}
              onChange={handleChange}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FieldWrapper>
          <div />
          <FullWidthWrapper>
            <FieldWrapper>
              <Label htmlFor="tastingNotes">Tasting Notes (comma separated):</Label>
              <Input
                id="tastingNotes"
                type="text"
                placeholder="Cherry, Oak, Vanilla"
                value={formData.tastingNotes}
                onChange={handleChange}
              />
            </FieldWrapper>
          </FullWidthWrapper>
          <FullWidthWrapper>
            <FieldWrapper>
              <Label htmlFor="foodPairing">Food Pairing (comma separated):</Label>
              <Input
                id="foodPairing"
                type="text"
                placeholder="Steak, Cheese"
                value={formData.foodPairing}
                onChange={handleChange}
              />
            </FieldWrapper>
          </FullWidthWrapper>
          <FullWidthWrapper>
            <FieldWrapper>
              <Label htmlFor="description">Detailed Description:</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell the story of this wine..."
                style={{
                  width: '100%',
                  minHeight: '150px',
                  padding: '12px 20px',
                  border: '1px solid var(--secondary-gray)',
                  borderRadius: 'var(--border-radius-in)',
                  fontFamily: 'var(--font-main)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </FieldWrapper>
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="button" size="large" onClick={() => window.location.reload()}>
            CANCEL
          </MainButton>
          <MainButton type="submit" size="large">
            {isSubmitting ? 'SAVING...' : 'SAVE WINE'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddWineWrapper>
  );
};

export default AddWines;
