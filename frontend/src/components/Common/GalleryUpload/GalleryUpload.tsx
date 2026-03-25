import React, { useRef } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
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
  onGalleryFileChange: (file: File, index: number) => void;
  onRemoveGalleryFile?: (index: number) => void;
  maxGalleryCount?: number;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
  mainPreview,
  galleryPreviews,
  onMainFileChange,
  onGalleryFileChange,
  onRemoveGalleryFile,
  maxGalleryCount = 5, // 1 main + 4 gallery
}) => {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const activeIndexRef = useRef<number | null>(null);

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

  const handleGalleryClick = (index: number) => {
    activeIndexRef.current = index;
    galleryInputRef.current?.click();
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeIndexRef.current !== null) {
      if (file.size > 5000000) {
        toast.error('File too big (max 5MB)');
        return;
      }
      onGalleryFileChange(file, activeIndexRef.current);
      e.target.value = ''; // Reset input
    }
  };

  const gallerySlotsCount = maxGalleryCount - 1;
  const slots = Array.from({ length: gallerySlotsCount });

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
        {slots.map((_, index) => {
          const preview = galleryPreviews[index];
          return (
            <GalleryItem key={index} $hasImage={!!preview}>
              {preview ? (
                <>
                  <img src={preview} alt={`Gallery ${index}`} />
                  {onRemoveGalleryFile && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveGalleryFile(index);
                      }}
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </>
              ) : (
                <div className="empty-slot" onClick={() => handleGalleryClick(index)}>
                  <FiPlus size={20} />
                </div>
              )}
            </GalleryItem>
          );
        })}
      </GalleryRow>

      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        onChange={handleGalleryChange}
        style={{ display: 'none' }}
      />
    </UploadGroupWrapper>
  );
};

export default GalleryUpload;
