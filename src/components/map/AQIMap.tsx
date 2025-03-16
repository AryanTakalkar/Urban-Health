import { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
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
    // Fix for Leaflet icon issues in production
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);
  const position = [19.076, 72.8777];

  return (
    <MapContainer
      center={position}
      zoom={11}
      style={{ height: '70vh', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {mumbaiAQIData.map((station) => (
        <Circle
          key={station.location}
          center={station.coordinates}
          pathOptions={{
            radius: 1000,
            color: getColor(station.aqi),
            fillColor: getColor(station.aqi),
            fillOpacity: 0.7,
          }}
        >
          <Popup>
            <div className='p-2'>
              <h3 className='font-bold text-lg'>{station.location}</h3>
              <p className='text-sm'>AQI: {station.aqi}</p>
              <p className='text-sm'>Status: {station.status}</p>
              <p className='text-sm'>PM2.5: {station.pm25} µg/m³</p>
              <p className='text-sm'>PM10: {station.pm10} µg/m³</p>
              <p className='text-sm'>Temperature: {station.temperature}°C</p>
              <p className='text-sm'>Humidity: {station.humidity}%</p>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
