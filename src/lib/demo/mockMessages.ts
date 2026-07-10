import { ChatMessage } from "@/services/ai.service";

export const mockSuggestedPrompts = [
  "Route me to Seat 112 (Step-Free)",
  "What is the queue time at El Tri Tacos?",
  "Translate 'Where is the first aid station?' to Spanish",
  "Show post-match bus schedules to Manhattan",
  "Is the stadium roof closed right now?",
];

export const mockChatSessions: Record<string, ChatMessage[]> = {
  fan: [
    { role: "system", text: "You are the StadiumPulse AI assistant guiding a Fan." },
    { role: "user", text: "Hi, I am at Gate A. Where is the nearest wheelchair-accessible toilet?" },
    {
      role: "model",
      text: "Hello! The closest wheelchair-accessible restroom is in Sector 103. From Gate A, head straight into the North Concourse lobby, turn right at the main visual displays, and the lift core will be on your left. Restroom Sec 103 is located immediately adjacent to Lift Core Level 1.",
    },
  ],
  organizer: [
    { role: "system", text: "You are the StadiumPulse AI assistant guiding a Venue Organizer." },
    { role: "user", text: "Give me an operational summary of crowd flow right now." },
    {
      role: "model",
      text: "OPERATIONAL ALERT: Gate B is currently experiencing heavy congestion with wait times exceeding 28 minutes (980 fans in queue). Security flow rate is constrained. Recommend dispatching 4 additional mobile coordinators from Gate C, and triggering transit warnings on exit terminals.",
    },
  ],
  volunteer: [
    { role: "system", text: "You are the StadiumPulse AI assistant guiding a Volunteer." },
    { role: "user", text: "How do I translate 'Please show me your ticket' to Japanese?" },
    {
      role: "model",
      text: "TRANSLATION BRIDGE: Japanese Translation is:\n「チケットを見せてください」 (Chiketto o misete kudasai).",
    },
  ],
};
