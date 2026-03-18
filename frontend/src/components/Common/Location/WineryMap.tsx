import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WineryMapProps {
  lat?: number;
  lng?: number;
  wineryName?: string;
  isEditable?: boolean;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const MapCenter = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1 });
    }
  }, [position, map]);

  return null;
};

const LocationMarker = ({
  position,
  onSelect,
}: {
  position: [number, number] | null;
  onSelect?: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      if (onSelect) {
        onSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Winery location</Popup>
    </Marker>
  );
};

const WineryMap = ({
  lat,
  lng,
  wineryName = 'Winery',
  isEditable = false,
  onLocationSelect,
}: WineryMapProps) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    lat && lng && !isNaN(lat) && !isNaN(lng) ? [lat, lng] : null,
  );

  useEffect(() => {
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      setMarkerPosition([lat, lng]);
    }
  }, [lat, lng]);

  const handleSelect = (newLat: number, newLng: number) => {
    if (isEditable) {
      setMarkerPosition([newLat, newLng]);
      if (onLocationSelect) {
        onLocationSelect(newLat, newLng);
      }
    }
  };

  const defaultCenter: [number, number] = [41.7151, 44.8271];
  const center = markerPosition || defaultCenter;

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && <MapCenter position={markerPosition} />}
        {isEditable ? (
          <LocationMarker position={markerPosition} onSelect={handleSelect} />
        ) : (
          markerPosition && (
            <Marker position={markerPosition}>
              <Popup>{wineryName}</Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
};

export default WineryMap;
