import React, { useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiCamera } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import {
  UploadGroupWrapper,
  MainPhotoContainer,
  GalleryRow,
  GalleryItem,
  AddMoreBtn,
} from './GalleryUpload.styled';

interface GalleryUploadProps {
  mainPreview: string | null;
  galleryPreviews: string[];
  onMainFileChange: (file: File) => void;
  onGalleryFilesChange: (files: File[]) => void;
  maxGalleryCount?: number;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
  mainPreview,
  galleryPreviews,
  onMainFileChange,
  onGalleryFilesChange,
  maxGalleryCount = 5,
}) => {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error('File too big (max 5MB)');
        return;
      }
      onMainFileChange(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, maxGalleryCount);
      onGalleryFilesChange(filesArray);
    }
  };

  const gallerySlots = Array(maxGalleryCount).fill(null);

  return (
    <UploadGroupWrapper>
      <MainPhotoContainer onClick={() => mainInputRef.current?.click()}>
        {mainPreview ? (
          <img src={mainPreview} alt="Main" />
        ) : (
          <>
            <HiCamera size={40} color="#aaa" />
            <span>Main image</span>
          </>
        )}
      </MainPhotoContainer>
      <input
        type="file"
        ref={mainInputRef}
        accept="image/*"
        onChange={handleMainChange}
        style={{ display: 'none' }}
      />

      <GalleryRow>
        {gallerySlots.map((_, index) => {
          const preview = galleryPreviews[index];
          if (preview) {
            return (
              <GalleryItem key={index}>
                <img src={preview} alt={`Gallery ${index}`} />
              </GalleryItem>
            );
          }
          if (index === galleryPreviews.length) {
            return (
              <AddMoreBtn key={index} onClick={() => galleryInputRef.current?.click()}>
                <FiPlus size={20} />
              </AddMoreBtn>
            );
          }
          return <GalleryItem key={index} style={{ opacity: 0.5, borderStyle: 'dotted' }} />;
        })}
      </GalleryRow>
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        multiple
        onChange={handleGalleryChange}
        style={{ display: 'none' }}
      />
    </UploadGroupWrapper>
  );
};

export default GalleryUpload;
