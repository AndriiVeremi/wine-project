import { useState, useEffect, Suspense, lazy } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWineryMutations } from '@/hooks/queries/useWineries';
import { useLocationStore } from '@/store/location/locationStore';
import { getCountries } from '@/api/regions';
import FormField from '@/components/Common/FormField/FormField';
import GalleryUpload from '@/components/Common/GalleryUpload/GalleryUpload';
import WineryLogoUpload from '@/components/Common/WineryLogoUpload/WineryLogoUpload';
import MainButton from '@/components/Buttons/MainButton';
import { toast } from 'react-hot-toast';
import type { Winery } from '@/types/wineries';

import {
  StyledAddWineryForm,
  FieldsGrid,
  FullWidthWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  MapFieldWrapper,
  MapInstruction,
} from './AddWineryForm.styled';
import { ButtonWrapper } from '../AddWinesForm/AddWinesForm.styled';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));
const WineryMap = lazy(() => import('@/components/Common/Location/WineryMap'));

const winerySchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(7, 'Phone number is too short'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  websiteUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  videoUrl: z.string().url('Invalid URL format').optional().or(z.literal('')),
  history: z
    .string()
    .min(10, 'History must be at least 10 characters')
    .optional()
    .or(z.literal('')),
  country: z.string().min(1, 'Please select a country'),
  region: z.string().min(1, 'Please select a region'),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable(),
});

type WineryFormValues = z.infer<typeof winerySchema>;

const defaultValues: WineryFormValues = {
  name: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  websiteUrl: '',
  videoUrl: '',
  history: '',
  country: '',
  region: '',
  coordinates: null,
};

interface Props {
  wineryData?: Winery | null;
  onSuccess?: () => void;
}

const AddWinery = ({ wineryData, onSuccess }: Props) => {
  const { addWinery, updateWinery, isAdding, isUpdating } = useWineryMutations();
  const loading = isAdding || isUpdating;
  const { fetchRegions, regions } = useLocationStore();

  const [countries, setCountries] = useState<{ _id: string; name: string }[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
      galleryPreviews.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [logoPreview, galleryPreviews]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WineryFormValues>({
    resolver: zodResolver(winerySchema),
    defaultValues,
  });

  const selectedCountryId = watch('country');
  const coords = watch('coordinates');

  useEffect(() => {
    if (wineryData) {
      reset({
        name: wineryData.name || '',
        contactEmail: wineryData.contactEmail || '',
        contactPhone: wineryData.contactPhone || '',
        address: wineryData.address || '',
        websiteUrl: wineryData.websiteUrl || '',
        videoUrl: wineryData.videoUrl || '',
        history: wineryData.history || '',
        country:
          typeof wineryData.country === 'object'
            ? (wineryData.country as { _id: string })._id
            : wineryData.country,
        region:
          typeof wineryData.region === 'object'
            ? (wineryData.region as { _id: string })._id
            : wineryData.region,
        coordinates: wineryData.coordinates || null,
      });
      if (wineryData.logoUrl) setLogoPreview(wineryData.logoUrl);
      if (wineryData.galleryUrl) setGalleryPreviews(wineryData.galleryUrl);
    }
  }, [wineryData, reset]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getCountries();
        setCountries(res.data);
      } catch (err) {
        console.error('Failed to load countries', err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCountryId && countries.length > 0) {
      const country = countries.find((c) => c._id === selectedCountryId);
      if (country) fetchRegions(country.name);
    }
  }, [selectedCountryId, countries, fetchRegions]);

  const onSubmit: SubmitHandler<WineryFormValues> = async (vals) => {
    if (!vals.coordinates) return toast.error('Select location on map');

    const tid = toast.loading('Saving winery...');
    const fd = new FormData();

    Object.entries(vals).forEach(([key, val]) => {
      if (!val && (key === 'websiteUrl' || key === 'videoUrl')) return;
      if (key === 'coordinates') {
        fd.append(key, JSON.stringify(val));
      } else if (key === 'contactPhone') {
        fd.append(key, String(val).replace(/\s+/g, ''));
      } else {
        fd.append(key, String(val));
      }
    });

    if (logo) fd.append('logo', logo);
    gallery.forEach((f) => fd.append('images', f));

    try {
      if (wineryData?._id) {
        await updateWinery({ id: wineryData._id, data: fd });
      } else {
        await addWinery(fd);
      }
      toast.dismiss(tid);
      if (onSuccess) onSuccess();
    } catch {
      toast.dismiss(tid);
    }
  };

  const handleReset = () => {
    reset(defaultValues);
    setLogo(null);
    setLogoPreview(null);
    setGallery([]);
    setGalleryPreviews([]);
  };

  return (
    <StyledAddWineryForm onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<FieldValues>)}>
      <TopSection>
        <PhotoSide>
          <GalleryUpload
            mainPreview={galleryPreviews[0] || null}
            galleryPreviews={galleryPreviews.slice(1)}
            onMainFileChange={(f) => {
              const newGallery = [...gallery];
              newGallery[0] = f;
              setGallery(newGallery);
              setGalleryPreviews((prev) => [URL.createObjectURL(f), ...prev.slice(1)]);
            }}
            onGalleryFileChange={(file, index) => {
              const galleryIndex = index + 1;
              const newGallery = [...gallery];
              newGallery[galleryIndex] = file;
              setGallery(newGallery);
              const newPreviews = [...galleryPreviews];
              newPreviews[galleryIndex] = URL.createObjectURL(file);
              setGalleryPreviews(newPreviews);
            }}
            onRemoveGalleryFile={(index) => {
              const galleryIndex = index + 1;
              const newGallery = [...gallery];
              newGallery.splice(galleryIndex, 1);
              setGallery(newGallery);
              const newPreviews = [...galleryPreviews];
              newPreviews.splice(galleryIndex, 1);
              setGalleryPreviews(newPreviews);
            }}
          />
          <div style={{ marginTop: '20px' }}>
            <WineryLogoUpload
              preview={logoPreview}
              onFileChange={(f) => {
                setLogo(f);
                setLogoPreview(URL.createObjectURL(f));
              }}
            />
          </div>
        </PhotoSide>

        <InfoSide>
          <FormField
            label="Winery Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <FormField
            label="Email"
            type="email"
            {...register('contactEmail')}
            error={errors.contactEmail?.message}
            required
          />
          <FormField
            label="Phone"
            {...register('contactPhone')}
            error={errors.contactPhone?.message}
            required
          />
          <FormField
            label="Website"
            {...register('websiteUrl')}
            error={errors.websiteUrl?.message}
          />
          <FormField label="Video" {...register('videoUrl')} error={errors.videoUrl?.message} />
        </InfoSide>
      </TopSection>

      <FieldsGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Country</label>
          <select
            {...register('country')}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.country.message}</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Region</label>
          <select
            {...register('region')}
            disabled={!selectedCountryId}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
          {errors.region && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.region.message}</span>
          )}
        </div>
        <FullWidthWrapper>
          <FormField
            label="Address"
            {...register('address')}
            error={errors.address?.message}
            required
          />
        </FullWidthWrapper>
      </FieldsGrid>

      <Suspense fallback={<Skeleton height="240px" />}>
        <Controller
          name="history"
          control={control}
          render={({ field }) => (
            <TextEditor label="History" value={field.value || ''} onChange={field.onChange} />
          )}
        />
      </Suspense>

      <div>
        <MapInstruction>Coordinates:</MapInstruction>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <FormField
              label="Latitude"
              type="number"
              step="any"
              value={coords?.lat || ''}
              onChange={(e) =>
                setValue('coordinates', { lng: coords?.lng || 0, lat: parseFloat(e.target.value) })
              }
            />
          </div>
          <div style={{ flex: 1 }}>
            <FormField
              label="Longitude"
              type="number"
              step="any"
              value={coords?.lng || ''}
              onChange={(e) =>
                setValue('coordinates', { lat: coords?.lat || 0, lng: parseFloat(e.target.value) })
              }
            />
          </div>
        </div>
        <MapFieldWrapper>
          <Suspense fallback={<Skeleton height="300px" />}>
            <WineryMap
              isEditable={true}
              onLocationSelect={(lat, lng) => setValue('coordinates', { lat, lng })}
              lat={coords?.lat}
              lng={coords?.lng}
            />
          </Suspense>
        </MapFieldWrapper>
      </div>

      <ButtonWrapper>
        {wineryData ? (
          <>
            <MainButton
              type="button"
              onClick={() => window.open(`/wineries/${wineryData._id}`, '_blank')}
            >
              VIEW PUBLIC PAGE
            </MainButton>
            <MainButton type="submit" disabled={loading}>
              {loading ? 'WAIT...' : 'UPDATE WINERY'}
            </MainButton>
          </>
        ) : (
          <>
            <MainButton type="button" onClick={handleReset}>
              RESET
            </MainButton>
            <MainButton type="submit" disabled={loading}>
              {loading ? 'WAIT...' : 'REGISTER'}
            </MainButton>
          </>
        )}
      </ButtonWrapper>
    </StyledAddWineryForm>
  );
};

export default AddWinery;
