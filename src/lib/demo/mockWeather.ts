export interface WeatherTelemetry {
  tempCelsius: number;
  humidityPercentage: number;
  windSpeedKmh: number;
  windDirection: string;
  solarRadiationWm2: number;
  stadiumDomeStatus: "open" | "closed" | "closing";
  coolingSystemLoadPercentage: number;
  sustainabilityRating: string;
}

export const mockWeather: WeatherTelemetry = {
  tempCelsius: 28.5,
  humidityPercentage: 62,
  windSpeedKmh: 14,
  windDirection: "NW",
  solarRadiationWm2: 840,
  stadiumDomeStatus: "open",
  coolingSystemLoadPercentage: 45,
  sustainabilityRating: "94% Solar Offset",
};
