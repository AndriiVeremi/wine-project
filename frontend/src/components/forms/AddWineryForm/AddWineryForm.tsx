import { useState } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import FormField from '@/components/common/FormField/FormField';
import WineryMap from '@/components/Location/WineryMap';
import { toast } from 'react-hot-toast';
import {
  StyledAddWineryForm,
  FormTitle,
  FieldsGrid,
  MapFieldWrapper,
  MapInstruction,
  SubmitButton,
} from './AddWineryForm.styled';

const AddWineryForm = () => {
  const { addWinery, loading } = useWineriesStore();

  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    websiteUrl: '',
    history: '',
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coordinates) {
      toast.error('Please select winery location on the map');
      return;
    }

    try {
      await addWinery({
        ...formData,
        coordinates,
      });
      toast.success('Winery registered successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error adding winery';
      toast.error(message);
    }
  };

  return (
    <StyledAddWineryForm onSubmit={handleSubmit}>
      <FormTitle>Register Your Winery</FormTitle>

      <FieldsGrid>
        <FormField
          label="Winery Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter winery name"
        />
        <FormField
          label="Contact Email"
          id="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
          placeholder="example@winery.com"
        />
        <FormField
          label="Contact Phone"
          id="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
          placeholder="+995 5xx xxx xxx"
        />
        <FormField
          label="Website URL"
          id="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleChange}
          placeholder="https://www.yourwinery.com"
        />
      </FieldsGrid>

      <FormField
        label="Full Address"
        id="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder="Street, City, Region, Country"
      />

      <FormField
        label="Our History"
        id="history"
        value={formData.history}
        onChange={handleChange}
        isTextarea
        placeholder="Tell the world about your winery..."
      />

      <div>
        <MapInstruction>
          Click on the map to mark your <span>exact location</span>:
        </MapInstruction>
        <MapFieldWrapper>
          <WineryMap isEditable={true} onLocationSelect={handleLocationSelect} />
        </MapFieldWrapper>
        {coordinates && (
          <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Selected: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
          </p>
        )}
      </div>

      <SubmitButton type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register Winery'}
      </SubmitButton>
    </StyledAddWineryForm>
  );
};

export default AddWineryForm;
