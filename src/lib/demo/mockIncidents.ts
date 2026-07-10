export interface Incident {
  id: string;
  category: "security" | "medical" | "operations" | "hazard";
  title: string;
  description: string;
  location: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "reported" | "dispatched" | "resolved";
  timestamp: string;
}

export const mockIncidents: Incident[] = [
  {
    id: "inc-101",
    category: "medical",
    title: "Heat Exhaustion",
    description: "Fan collapsed near Sector 112. Requires immediate assistance.",
    location: "Sector 112, Row F",
    severity: "high",
    status: "dispatched",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "inc-102",
    category: "security",
    title: "Unauthorized Entry Attempt",
    description: "Group trying to bypass credentials check at VIP entrance.",
    location: "Gate C VIP Lobby",
    severity: "medium",
    status: "reported",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "inc-103",
    category: "hazard",
    title: "Liquid Spill",
    description: "Soda spill causing slipping hazard on primary concrete ramp.",
    location: "Ramp 4B North Lobby",
    severity: "low",
    status: "reported",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: "inc-104",
    category: "operations",
    title: "Elevator Fault",
    description: "Elevator #3 accessibility cabin suspended on Level 2.",
    location: "Elevator Core West",
    severity: "high",
    status: "resolved",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];
