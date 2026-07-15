export interface NavigationNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "gate" | "seat" | "elevator" | "restroom" | "concession" | "firstaid" | "sensory";
  isStepFree: boolean;
}

export const mockNavigationNodes: NavigationNode[] = [
  {
    id: "node-1",
    name: "Main Entrance Gate A",
    lat: 40.8135,
    lng: -74.0743,
    type: "gate",
    isStepFree: true,
  },
  {
    id: "node-2",
    name: "Ramp South East A",
    lat: 40.8128,
    lng: -74.0735,
    type: "gate",
    isStepFree: false,
  },
  {
    id: "node-3",
    name: "West Lift Core Level 1",
    lat: 40.8131,
    lng: -74.0751,
    type: "elevator",
    isStepFree: true,
  },
  {
    id: "node-4",
    name: "Accessible Restroom Sec 103",
    lat: 40.8138,
    lng: -74.0739,
    type: "restroom",
    isStepFree: true,
  },
  {
    id: "node-5",
    name: "First Aid Station Block B",
    lat: 40.8122,
    lng: -74.0748,
    type: "firstaid",
    isStepFree: true,
  },
  {
    id: "node-6",
    name: "Sensory Room Level 2 Suite",
    lat: 40.8133,
    lng: -74.0741,
    type: "sensory",
    isStepFree: true,
  },
  {
    id: "node-7",
    name: "Standard Restroom Sec 112",
    lat: 40.8125,
    lng: -74.0732,
    type: "restroom",
    isStepFree: false,
  },
];
