// src/types/weather.ts

export interface WeatherCondition {
  code: number;
  icon: string;
  text: string;
}

export interface WeatherCurrent {
  cloud: number;
  condition: WeatherCondition;
  dewpoint_c: number;
  dewpoint_f: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number; // 1 for day, 0 for night
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
}

export interface WeatherLocation {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

export interface WeatherForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: WeatherCondition;
  };
  astro: Astro
}
export interface Astro{
  sunrise:String
}
export interface WeatherForecast {
  forecastday: WeatherForecastDay[];
}

export interface WeatherData {
  current: WeatherCurrent;
  location: WeatherLocation;
  forecast: WeatherForecast;
}