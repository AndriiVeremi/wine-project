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

const AddWinery = () => {
  const { addWinery, loading } = useWineriesStore();
  const { regions, fetchRegions } = useLocationStore();

  const [form, setForm] = useState({
    name: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    websiteUrl: '',
    videoUrl: '',
    history: '',
    country: '',
    region: '',
  });

  const [countries, setCountries] = useState<{ _id: string; name: string }[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

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

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name || e.target.id]: value }));

    if (name === 'country' || e.target.id === 'country') {
      const item = countries.find((c) => c._id === value);
      if (item) {
        fetchRegions(item.name);
      }
    }
  };

  const onGallery = (files: File[]) => {
    setGallery(files);
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const onLoc = (lat: number, lng: number) => {
    setCoords({ lat, lng });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coords) {
      toast.error('Select location on map');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append('coordinates', JSON.stringify(coords));

    if (logo) {
      data.append('logo', logo);
    }

    gallery.forEach((f) => {
      data.append('images', f);
    });

    try {
      await addWinery(data);
      toast.success('Done!');
      setForm({
        name: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        websiteUrl: '',
        videoUrl: '',
        history: '',
        country: '',
        region: '',
      });
      setLogo(null);
      setLogoPreview(null);
      setGallery([]);
      setGalleryPreviews([]);
      setCoords(null);
    } catch (err) {
      console.log(err);
      toast.error('Error adding winery');
    }
  };

  return (
    <StyledAddWineryForm onSubmit={save}>
      <TopSection>
        <PhotoSide>
          <GalleryUpload
            mainPreview={logoPreview}
            galleryPreviews={galleryPreviews}
            onMainFileChange={(f) => {
              setLogo(f);
              setLogoPreview(URL.createObjectURL(f));
            }}
            onGalleryFilesChange={onGallery}
          />
        </PhotoSide>

        <InfoSide>
          <WineryLogoUpload
            preview={logoPreview}
            onFileChange={(f) => {
              setLogo(f);
              setLogoPreview(URL.createObjectURL(f));
            }}
          />

          <FormField
            label="Winery Name"
            id="name"
            name="name"
            value={form.name}
            onChange={onInput}
            required
            placeholder="Enter winery name"
          />
          <FormField
            label="Contact Email"
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={onInput}
            required
            placeholder="example@winery.com"
          />
          <FormField
            label="Contact Phone"
            id="contactPhone"
            name="contactPhone"
            value={form.contactPhone}
            onChange={onInput}
            required
            placeholder="+995 5xx xxx xxx"
          />
          <FormField
            label="Website URL"
            id="websiteUrl"
            name="websiteUrl"
            value={form.websiteUrl}
            onChange={onInput}
            placeholder="https://www.yourwinery.com"
          />
          <FormField
            label="YouTube Video URL"
            id="videoUrl"
            name="videoUrl"
            value={form.videoUrl}
            onChange={onInput}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </InfoSide>
      </TopSection>

      <FieldsGrid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={onInput}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              outline: 'none',
            }}
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
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Region</label>
          <select
            name="region"
            value={form.region}
            onChange={onInput}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              outline: 'none',
            }}
            disabled={!form.country}
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
            label="Full Address"
            id="address"
            name="address"
            value={form.address}
            onChange={onInput}
            required
            placeholder="Street, City, Region, Country"
          />
        </FullWidthWrapper>
      </FieldsGrid>

      <FormField
        label="Our History"
        id="history"
        name="history"
        value={form.history}
        onChange={onInput}
        isTextarea
        placeholder="Tell the world about your winery..."
      />

      <div>
        <MapInstruction>
          Click on the map to mark your <span>exact location</span>:
        </MapInstruction>
        <MapFieldWrapper>
          <WineryMap isEditable={true} onLocationSelect={onLoc} />
        </MapFieldWrapper>
        {coords && (
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Selected: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </p>
        )}
      </div>

      <ButtonWrapper>
        <MainButton
          type="button"
          onClick={() => {
            setForm({
              name: '',
              contactEmail: '',
              contactPhone: '',
              address: '',
              websiteUrl: '',
              videoUrl: '',
              history: '',
              country: '',
              region: '',
            });
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
      </ButtonWrapper>
    </StyledAddWineryForm>
  );
};

export default AddWinery;
