import { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mumbaiAQIData } from './data';

const getColor = (aqi: number) => {
  if (aqi <= 50) return '#00e400';
  if (aqi <= 100) return '#ffff00';
  if (aqi <= 150) return '#ff7e00';
  if (aqi <= 200) return '#ff0000';
  if (aqi <= 300) return '#99004c';
  return '#7e0023';
};

export default function AQIMap() {
  useEffect(() => {
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={11}
      style={{ height: '70vh', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {mumbaiAQIData.map((station) => (
        <Circle
          key={station.location}
          center={station.coordinates}
          radius={station.aqi * 10}
          color={getColor(station.aqi)}
          fillColor={getColor(station.aqi)}
          fillOpacity={0.7}
        >
          <Popup>
            <div>
              <h3>{station.location}</h3>
              <p>AQI: {station.aqi}</p>
              <p>Status: {station.status}</p>
              <p>PM2.5: {station.pm25} µg/m³</p>
              <p>PM10: {station.pm10} µg/m³</p>
              <p>Temperature: {station.temperature}°C</p>
              <p>Humidity: {station.humidity}%</p>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
