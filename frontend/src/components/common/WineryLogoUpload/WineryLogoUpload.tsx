import React, { useRef } from 'react';
import { HiCamera } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import {
  LogoUploadWrapper,
  UploadTrigger,
  AvatarCircle,
  UploadText,
  HiddenInput,
} from './WineryLogoUpload.styled';

interface Props {
  preview: string | null;
  onFileChange: (file: File) => void;
  label?: string;
}

const WineryLogoUpload: React.FC<Props> = ({ preview, onFileChange, label = 'Winery Logo' }) => {
  const input = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) {
        toast.error('Too big (max 2MB)');
        return;
      }
      onFileChange(file);
    }
  };

  return (
    <LogoUploadWrapper>
      <UploadTrigger onClick={() => input.current?.click()}>
        <AvatarCircle>
          {preview ? <img src={preview} alt="Logo" /> : <HiCamera size={24} color="#aaa" />}
        </AvatarCircle>
        <UploadText>{preview ? 'Change Logo' : `Add ${label}`}</UploadText>
      </UploadTrigger>
      <HiddenInput type="file" ref={input} onChange={onFile} accept="image/*" />
    </LogoUploadWrapper>
  );
};

export default WineryLogoUpload;
