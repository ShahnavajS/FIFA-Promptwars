export interface NavStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
  stepFree: boolean;
}

export interface DirectionsResult {
  routeMode: "fastest" | "uncrowded" | "wheelchair" | "family" | "emergency";
  totalDistanceMeters: number;
  totalDurationMinutes: number;
  steps: NavStep[];
  congestionFactor: "low" | "medium" | "high";
}

export class GoogleMapsWrapperService {
  /**
   * Mock Directions API wrapper calculating routes based on user accessibility and crowd parameters.
   */
  public static async getDirections(
    _origin: string,
    _destination: string,
    mode: DirectionsResult["routeMode"]
  ): Promise<DirectionsResult> {
    // Generate distinct directions steps depending on routing mode parameters
    switch (mode) {
      case "wheelchair":
        return {
          routeMode: "wheelchair",
          totalDistanceMeters: 450,
          totalDurationMinutes: 8,
          congestionFactor: "low",
          steps: [
            {
              instruction: "Depart gate turnstiles and follow accessibility blue markers.",
              distanceMeters: 50,
              durationSeconds: 60,
              stepFree: true,
            },
            {
              instruction: "Enter Elevator Core West on Level 1; ascend to Level 2.",
              distanceMeters: 100,
              durationSeconds: 120,
              stepFree: true,
            },
            {
              instruction:
                "Proceed along the level 2 concourse step-free ramp towards Section 112.",
              distanceMeters: 200,
              durationSeconds: 240,
              stepFree: true,
            },
            {
              instruction: "Arrive at Seat 12, Row F accessible bay area.",
              distanceMeters: 100,
              durationSeconds: 60,
              stepFree: true,
            },
          ],
        };
      case "uncrowded":
        return {
          routeMode: "uncrowded",
          totalDistanceMeters: 600,
          totalDurationMinutes: 10,
          congestionFactor: "low",
          steps: [
            {
              instruction:
                "Depart Gate B towards the outer North security perimeter to bypass turnstile logs.",
              distanceMeters: 150,
              durationSeconds: 150,
              stepFree: true,
            },
            {
              instruction: "Ingress via Gate A North Entrance (3 min queue wait).",
              distanceMeters: 150,
              durationSeconds: 150,
              stepFree: true,
            },
            {
              instruction: "Walk along the lower concourse section towards the Sector 112 passage.",
              distanceMeters: 300,
              durationSeconds: 300,
              stepFree: true,
            },
          ],
        };
      case "emergency":
        return {
          routeMode: "emergency",
          totalDistanceMeters: 300,
          totalDurationMinutes: 4,
          congestionFactor: "high",
          steps: [
            {
              instruction:
                "CRITICAL: Immediately head towards the nearest illuminated red Exit Gate A.",
              distanceMeters: 100,
              durationSeconds: 60,
              stepFree: true,
            },
            {
              instruction: "Avoid central elevators; proceed down the wide outdoor concrete ramps.",
              distanceMeters: 200,
              durationSeconds: 180,
              stepFree: true,
            },
          ],
        };
      default:
        return {
          routeMode: "fastest",
          totalDistanceMeters: 350,
          totalDurationMinutes: 5,
          congestionFactor: "medium",
          steps: [
            {
              instruction: "Enter stadium main gates; pass security checks.",
              distanceMeters: 50,
              durationSeconds: 60,
              stepFree: true,
            },
            {
              instruction: "Ascend Sector 110 concrete steps to the level 1 seating bowl entry.",
              distanceMeters: 200,
              durationSeconds: 180,
              stepFree: false,
            },
            {
              instruction: "Walk down stairs in Sector 112 to Row F, Seat 12.",
              distanceMeters: 100,
              durationSeconds: 60,
              stepFree: false,
            },
          ],
        };
    }
  }

  /**
   * Mock Places API searching for restrooms, medical centers, concessions.
   */
  public static async searchPlaces(
    query: string
  ): Promise<Array<{ name: string; lat: number; lng: number; details: string }>> {
    if (query.toLowerCase().includes("restroom") || query.toLowerCase().includes("toilet")) {
      return [
        {
          name: "Restroom Sector 103 (Accessible)",
          lat: 40.8125,
          lng: -74.0748,
          details: "Step-free lock, baby changing tables. Wait: 2m",
        },
        {
          name: "Restroom Sector 112",
          lat: 40.813,
          lng: -74.0735,
          details: "Standard facilities. Wait: 6m",
        },
      ];
    }
    if (query.toLowerCase().includes("medical") || query.toLowerCase().includes("first aid")) {
      return [
        {
          name: "First Aid Station West",
          lat: 40.812,
          lng: -74.075,
          details: "Full trauma care, paramedics stationed. Near West Core.",
        },
        {
          name: "First Aid Station East",
          lat: 40.8128,
          lng: -74.0728,
          details: "Minor injury care, defibrillator unit.",
        },
      ];
    }
    return [
      {
        name: "El Tri Tacos (Sector 102)",
        lat: 40.8122,
        lng: -74.0745,
        details: "Wait: 4m. Vegan tacos available.",
      },
    ];
  }

  /**
   * Mock Distance Matrix calculating walking times to gates/exits.
   */
  public static async getDistanceMatrix(
    origins: string[],
    destinations: string[]
  ): Promise<Array<{ origin: string; destination: string; walkingMinutes: number }>> {
    return origins.flatMap((o) =>
      destinations.map((d) => ({
        origin: o,
        destination: d,
        walkingMinutes: o.includes("Seat") && d.includes("Gate B") ? 9 : 4,
      }))
    );
  }
}
