import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { env } from "@/config/env";

if (typeof window !== "undefined") {
  setOptions({
    key: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
}

export class GoogleMapsService {
  /**
   * Helper to load the Google Maps core library
   */
  static async loadMaps(): Promise<google.maps.MapsLibrary> {
    return importLibrary("maps") as Promise<google.maps.MapsLibrary>;
  }

  /**
   * Helper to calculate route directions
   */
  static async calculateRoute(
    origin: string | google.maps.LatLng | google.maps.LatLngLiteral,
    destination: string | google.maps.LatLng | google.maps.LatLngLiteral,
    travelMode: google.maps.TravelMode = "WALKING" as google.maps.TravelMode
  ): Promise<google.maps.DirectionsResult> {
    await importLibrary("routes");
    const directionsService = new google.maps.DirectionsService();

    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin,
          destination,
          travelMode,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            resolve(result);
          } else {
            reject(new Error(`Directions request failed with status: ${status}`));
          }
        }
      );
    });
  }

  /**
   * Helper to get Distance Matrix details between multiple locations
   */
  static async getDistanceMatrix(
    origins: string[] | google.maps.LatLng[] | google.maps.LatLngLiteral[],
    destinations: string[] | google.maps.LatLng[] | google.maps.LatLngLiteral[],
    travelMode: google.maps.TravelMode = "WALKING" as google.maps.TravelMode
  ): Promise<google.maps.DistanceMatrixResponse> {
    await importLibrary("routes");
    const service = new google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode,
        },
        (result, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && result) {
            resolve(result);
          } else {
            reject(new Error(`Distance Matrix request failed with status: ${status}`));
          }
        }
      );
    });
  }
}
