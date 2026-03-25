import { useState, useEffect, Suspense, lazy } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
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
        country:
          typeof wineryData.country === 'object'
            ? (wineryData.country as unknown as { _id: string })._id
            : wineryData.country || '',
        region:
          typeof wineryData.region === 'object'
            ? (wineryData.region as unknown as { _id: string })._id
            : wineryData.region || '',
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
        const loadedCountries = res.data;
        setCountries(loadedCountries);

        if (form.country) {
          const item = loadedCountries.find(
            (c: { _id: string; name: string }) => c._id === form.country,
          );
          if (item) fetchRegions(item.name);
        }
      } catch (err) {
        console.error('Failed to load countries', err);
      }
    };
    load();
  }, [fetchRegions, form.country]);

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, id } = e.target;
    setForm((prev) => ({ ...prev, [name || id]: value }));
  };

  const onLoc = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const handleEditorChange = (value: string) => {
    setForm((prev) => ({ ...prev, history: value }));
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
        sendVal = sendVal.replace(/\s+/g, '');
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
      console.error('Failed to save winery', err);
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
              const newGallery = [...gallery];
              newGallery[0] = f;
              setGallery(newGallery);

              const newPreviews = [...galleryPreviews];
              newPreviews[0] = URL.createObjectURL(f);
              setGalleryPreviews(newPreviews);
            }}
            onGalleryFileChange={(file, index) => {
              // index is 0..3 for the 4 small slots, but in our gallery array index 0 is main
              // so we use index + 1
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

      <Suspense
        fallback={
          <div>
            <Skeleton height="40px" $margin="0 0 12px 0" />
            <Skeleton height="200px" $borderRadius="8px" />
          </div>
        }
      >
        <TextEditor label="History" value={form.history} onChange={handleEditorChange} />
      </Suspense>

      <div>
        <MapInstruction>Coordinates:</MapInstruction>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <FormField
              label="Latitude"
              id="lat"
              name="lat"
              type="number"
              step="any"
              value={coords?.lat || ''}
              onChange={(e) => {
                const val = e.target.value;
                setCoords((prev) => ({
                  lng: prev?.lng || 0,
                  lat: val ? parseFloat(val) : NaN,
                }));
              }}
              placeholder="e.g. 50.4501"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FormField
              label="Longitude"
              id="lng"
              name="lng"
              type="number"
              step="any"
              value={coords?.lng || ''}
              onChange={(e) => {
                const val = e.target.value;
                setCoords((prev) => ({
                  lat: prev?.lat || 0,
                  lng: val ? parseFloat(val) : NaN,
                }));
              }}
              placeholder="e.g. 30.5234"
            />
          </div>
          <MainButton
            type="button"
            onClick={() => {
              if (coords?.lat && coords?.lng) {
                setCoords({ lat: coords.lat, lng: coords.lng });
              }
            }}
            style={{ marginBottom: '0', height: '42px' }}
          >
            CENTER MAP
          </MainButton>
        </div>
        <MapFieldWrapper>
          <Suspense fallback={<Skeleton height="300px" $borderRadius="12px" />}>
            <WineryMap
              isEditable={true}
              onLocationSelect={onLoc}
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
