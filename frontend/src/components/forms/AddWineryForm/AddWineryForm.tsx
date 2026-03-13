import { useState, useEffect } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { useLocationStore } from '@/store/location/locationStore';
import { getCountries } from '@/api/regions';
import FormField from '@/components/common/FormField/FormField';
import WineryMap from '@/components/Location/WineryMap';
import GalleryUpload from '@/components/common/GalleryUpload/GalleryUpload';
import WineryLogoUpload from '@/components/common/WineryLogoUpload/WineryLogoUpload';
import MainButton from '@/components/buttons/MainButton';
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

const init = {
  name: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  websiteUrl: '',
  videoUrl: '',
  history: '',
  country: '',
  region: '',
};

interface Props {
  wineryData?: Winery | null;
  onSuccess?: () => void;
}

const AddWinery = ({ wineryData, onSuccess }: Props) => {
  const { add, update, loading } = useWineriesStore();
  const { fetchRegions, regions } = useLocationStore();

  const [form, setForm] = useState(init);
  const [countries, setCountries] = useState<{ _id: string; name: string }[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (wineryData) {
      setForm({
        name: wineryData.name || '',
        contactEmail: wineryData.contactEmail || '',
        contactPhone: wineryData.contactPhone || '',
        address: wineryData.address || '',
        websiteUrl: wineryData.websiteUrl || '',
        videoUrl: wineryData.videoUrl || '',
        history: wineryData.history || '',
        country: typeof wineryData.country === 'object' ? (wineryData.country as unknown as { _id: string })._id : wineryData.country || '',
        region: typeof wineryData.region === 'object' ? (wineryData.region as unknown as { _id: string })._id : wineryData.region || '',
      });
      if (wineryData.logoUrl) setLogoPreview(wineryData.logoUrl);
      if (wineryData.galleryUrl) setGalleryPreviews(wineryData.galleryUrl);
      if (wineryData.coordinates) setCoords(wineryData.coordinates);
    }
  }, [wineryData]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCountries();
        setCountries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (form.country && countries.length > 0) {
      const item = countries.find((c) => c._id === form.country);
      if (item) fetchRegions(item.name);
    }
  }, [form.country, countries, fetchRegions]);

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, id } = e.target;
    setForm((prev) => ({ ...prev, [name || id]: value }));
  };

  const onLoc = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords) return toast.error('Select location on map');
    if (form.history && form.history.length < 10) return toast.error('History: min 10 chars');
    if (form.address.length < 5) return toast.error('Address: min 5 chars');

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if ((key === 'websiteUrl' || key === 'videoUrl') && !val) return;

      let sendVal = String(val);
      if (key === 'contactPhone') {
        sendVal = sendVal.replace(/\s+/g, ''); // прибираємо пробіли
      }
      data.append(key, sendVal);
    });

    data.append('coordinates', JSON.stringify(coords));
    if (logo) data.append('logo', logo);
    gallery.forEach((f) => data.append('images', f));

    try {
      if (wineryData?._id) {
        await update(wineryData._id, data);
        toast.success('Updated!');
      } else {
        await add(data);
        toast.success('Registered!');
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err);
      toast.error('Save failed');
    }
  };

  return (
    <StyledAddWineryForm onSubmit={save}>
      <TopSection>
        <PhotoSide>
          <GalleryUpload
            mainPreview={galleryPreviews[0] || null}
            galleryPreviews={galleryPreviews.slice(1)}
            onMainFileChange={(f) => {
              const next = [f, ...gallery.slice(1)];
              setGallery(next);
              setGalleryPreviews(next.map((file) => URL.createObjectURL(file)));
            }}
            onGalleryFilesChange={(files) => {
              const next = [gallery[0], ...files].filter(Boolean).slice(0, 5);
              setGallery(next);
              setGalleryPreviews(next.map((f) => URL.createObjectURL(f)));
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
            id="name"
            name="name"
            value={form.name}
            onChange={onInput}
            required
          />

          <FormField
            label="Email"
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={onInput}
            required
            placeholder="email@example.com"
          />
          <FormField
            label="Phone"
            id="contactPhone"
            name="contactPhone"
            value={form.contactPhone}
            onChange={onInput}
            required
            placeholder="+1234567890 (start with +)"
          />
          <FormField
            label="Website"
            id="websiteUrl"
            name="websiteUrl"
            value={form.websiteUrl}
            onChange={onInput}
            placeholder="https://..."
          />
          <FormField
            label="Video"
            id="videoUrl"
            name="videoUrl"
            value={form.videoUrl}
            onChange={onInput}
            placeholder="https://..."
          />
        </InfoSide>
      </TopSection>

      <FieldsGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={onInput}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Region</label>
          <select
            name="region"
            value={form.region}
            onChange={onInput}
            required
            disabled={!form.country}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <FullWidthWrapper>
          <FormField
            label="Address"
            id="address"
            name="address"
            value={form.address}
            onChange={onInput}
            required
          />
        </FullWidthWrapper>
      </FieldsGrid>

      <FormField
        label="History"
        id="history"
        name="history"
        value={form.history}
        onChange={onInput}
        isTextarea
        placeholder="Min 10 characters..."
        required
      />

      <div>
        <MapInstruction>Mark location:</MapInstruction>
        <MapFieldWrapper>
          <WineryMap
            isEditable={true}
            onLocationSelect={onLoc}
            lat={coords?.lat}
            lng={coords?.lng}
          />
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
            <MainButton
              type="button"
              onClick={() => {
                setForm(init);
                setLogo(null);
                setLogoPreview(null);
                setGallery([]);
                setGalleryPreviews([]);
                setCoords(null);
              }}
            >
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
