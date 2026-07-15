export interface ConcessionState {
  id: string;
  name: string;
  category: "food" | "beverage" | "merchandise";
  waitTimeMinutes: number;
  crowdLevel: "low" | "medium" | "high";
  location: string;
  greenCertified: boolean;
}

export interface GateState {
  id: string;
  name: string;
  flowRatePerMin: number;
  currentQueueCount: number;
  waitTimeMinutes: number;
  status: "open" | "congested" | "closed";
}

export const mockConcessions: ConcessionState[] = [
  {
    id: "c1",
    name: "El Tri Tacos",
    category: "food",
    waitTimeMinutes: 4,
    crowdLevel: "low",
    location: "Sector 102",
    greenCertified: true,
  },
  {
    id: "c2",
    name: "Maple Syrup & Bites",
    category: "food",
    waitTimeMinutes: 14,
    crowdLevel: "high",
    location: "Sector 115",
    greenCertified: false,
  },
  {
    id: "c3",
    name: "Cyber Brews",
    category: "beverage",
    waitTimeMinutes: 8,
    crowdLevel: "medium",
    location: "Sector 108",
    greenCertified: true,
  },
  {
    id: "c4",
    name: "FIFA Official Merch",
    category: "merchandise",
    waitTimeMinutes: 18,
    crowdLevel: "high",
    location: "Sector 120",
    greenCertified: true,
  },
  {
    id: "c5",
    name: "Eco Green Snacks",
    category: "food",
    waitTimeMinutes: 2,
    crowdLevel: "low",
    location: "Sector 131",
    greenCertified: true,
  },
];

export const mockGates: GateState[] = [
  {
    id: "gA",
    name: "Gate A (Main North)",
    flowRatePerMin: 120,
    currentQueueCount: 450,
    waitTimeMinutes: 8,
    status: "open",
  },
  {
    id: "gB",
    name: "Gate B (East Link)",
    flowRatePerMin: 45,
    currentQueueCount: 980,
    waitTimeMinutes: 28,
    status: "congested",
  },
  {
    id: "gC",
    name: "Gate C (VIP & Media)",
    flowRatePerMin: 15,
    currentQueueCount: 12,
    waitTimeMinutes: 1,
    status: "open",
  },
  {
    id: "gD",
    name: "Gate D (South Transit)",
    flowRatePerMin: 0,
    currentQueueCount: 0,
    waitTimeMinutes: 0,
    status: "closed",
  },
];
