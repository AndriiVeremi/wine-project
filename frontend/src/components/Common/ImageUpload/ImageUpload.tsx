import React, { useRef } from 'react';
import { HiCamera } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { PhotoUploadContainer, PhotoGrid, MiniPhotoPreview } from './ImageUpload.styled';

interface Props {
  previews: string[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
}

const ImageUpload: React.FC<Props> = ({
  previews,
  onFilesChange,
  maxFiles = 1,
  label = 'Main image',
}) => {
  const input = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const ok = files.filter((f) => f.size <= 5000000);

    if (ok.length < files.length) {
      toast.error('Too big (max 5MB)');
    }

    if (maxFiles === 1) {
      if (ok.length > 0) {
        onFilesChange([ok[0]]);
      }
    } else {
      onFilesChange(ok.slice(0, maxFiles));
    }
  };

  return (
    <>
      <PhotoUploadContainer onClick={() => input.current?.click()}>
        {previews.length > 0 ? (
          <img src={previews[0]} alt="Preview" />
        ) : (
          <>
            <HiCamera />
            <span>{label}</span>
          </>
        )}
      </PhotoUploadContainer>
      <input
        type="file"
        ref={input}
        onChange={onFile}
        accept="image/*"
        multiple={maxFiles > 1}
        style={{ display: 'none' }}
      />
      {maxFiles > 1 && previews.length > 0 && (
        <PhotoGrid>
          {previews.map((src, idx) => (
            <MiniPhotoPreview key={idx}>
              <img src={src} alt="preview" />
            </MiniPhotoPreview>
          ))}
        </PhotoGrid>
      )}
    </>
  );
};

export default ImageUpload;
