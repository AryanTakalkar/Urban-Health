export interface AQIData {
  location: string;
  coordinates: [number, number];
  aqi: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  status: 'Good' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';
}