export function getWeatherContext(temp: number, wind: string, domeStatus: string): string {
  return `[WEATHER & CLIMATE]: Local temperature: ${temp}°C. Wind conditions: ${wind}. Roof status: ${domeStatus.toUpperCase()} dome environment.`;
}
