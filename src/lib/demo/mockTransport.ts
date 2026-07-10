export interface TransportOption {
  id: string;
  name: string;
  type: "metro" | "shuttle" | "train" | "rideshare";
  status: "on-time" | "delayed" | "heavy-traffic" | "suspended";
  waitTimeMinutes: number;
  description: string;
  destination: string;
}

export const mockTransportOptions: TransportOption[] = [
  {
    id: "t1",
    name: "Meadowlands Rail Link",
    type: "train",
    status: "on-time",
    waitTimeMinutes: 10,
    description: "Trains departing every 10 minutes to Secaucus Junction.",
    destination: "Secaucus / NYC Penn Station",
  },
  {
    id: "t2",
    name: "FIFA Fan Express Bus",
    type: "shuttle",
    status: "delayed",
    waitTimeMinutes: 24,
    description: "Delays due to highway exit congestion. Dynamic routing active.",
    destination: "Midtown Manhattan Shuttle Hub",
  },
  {
    id: "t3",
    name: "Uber/Lyft Rideshare Zone 1",
    type: "rideshare",
    status: "heavy-traffic",
    waitTimeMinutes: 35,
    description: "Extremely high surge demand. Suggest walking to Zone 2 or rail link.",
    destination: "All directions (Zone 1 Parking)",
  },
  {
    id: "t4",
    name: "Metro Transit Shuttle",
    type: "metro",
    status: "on-time",
    waitTimeMinutes: 5,
    description: "Continuous rapid shuttle loops directly to local subway lines.",
    destination: "Subway Station Connectors",
  },
];
