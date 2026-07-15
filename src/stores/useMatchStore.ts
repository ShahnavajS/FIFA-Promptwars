import { create } from "zustand";

export type MatchPhase =
  | "pre-match"
  | "arrival"
  | "security"
  | "gate-entry"
  | "find-seat"
  | "pre-kickoff"
  | "kickoff"
  | "halftime"
  | "second-half"
  | "full-time"
  | "exit"
  | "post-match";

export interface MatchState {
  currentPhase: MatchPhase;
  matchName: string;
  timeRemaining: string;
  attendance: number;
  crowdMood: "calm" | "excited" | "tense" | "celebrating";
  aiConfidence: number;
  opsStatus: "normal" | "warning" | "critical";
  domeStatus: "open" | "closed" | "closing";
  activeEmergency: string | null;
  crowdDensityMultiplier: number;

  // Actions
  setPhase: (phase: MatchPhase) => void;
  triggerEmergency: (type: string | null) => void;
  setDomeStatus: (status: "open" | "closed" | "closing") => void;
  setDensityMultiplier: (multiplier: number) => void;
  advancePhase: () => void;
}

const PHASE_ORDER: MatchPhase[] = [
  "pre-match",
  "arrival",
  "security",
  "gate-entry",
  "find-seat",
  "pre-kickoff",
  "kickoff",
  "halftime",
  "second-half",
  "full-time",
  "exit",
  "post-match",
];

const PHASE_METRICS: Record<
  MatchPhase,
  {
    timeRemaining: string;
    attendance: number;
    crowdMood: MatchState["crowdMood"];
    aiConfidence: number;
  }
> = {
  "pre-match": {
    timeRemaining: "120 min to Kickoff",
    attendance: 0,
    crowdMood: "calm",
    aiConfidence: 99,
  },
  arrival: {
    timeRemaining: "90 min to Kickoff",
    attendance: 12000,
    crowdMood: "excited",
    aiConfidence: 96,
  },
  security: {
    timeRemaining: "60 min to Kickoff",
    attendance: 34000,
    crowdMood: "tense",
    aiConfidence: 91,
  },
  "gate-entry": {
    timeRemaining: "30 min to Kickoff",
    attendance: 58000,
    crowdMood: "excited",
    aiConfidence: 94,
  },
  "find-seat": {
    timeRemaining: "15 min to Kickoff",
    attendance: 76000,
    crowdMood: "excited",
    aiConfidence: 97,
  },
  "pre-kickoff": {
    timeRemaining: "5 min to Kickoff",
    attendance: 80200,
    crowdMood: "excited",
    aiConfidence: 99,
  },
  kickoff: {
    timeRemaining: "00:00 (1st Half)",
    attendance: 82000,
    crowdMood: "excited",
    aiConfidence: 98,
  },
  halftime: { timeRemaining: "Halftime", attendance: 82000, crowdMood: "calm", aiConfidence: 95 },
  "second-half": {
    timeRemaining: "45:00 (2nd Half)",
    attendance: 82000,
    crowdMood: "excited",
    aiConfidence: 97,
  },
  "full-time": {
    timeRemaining: "Full Time (ARG 2 - 1 GER)",
    attendance: 82000,
    crowdMood: "celebrating",
    aiConfidence: 99,
  },
  exit: {
    timeRemaining: "Exit Flow Active",
    attendance: 58000,
    crowdMood: "calm",
    aiConfidence: 92,
  },
  "post-match": {
    timeRemaining: "Ops Suspended",
    attendance: 150,
    crowdMood: "calm",
    aiConfidence: 99,
  },
};

export const useMatchStore = create<MatchState>((set, get) => ({
  currentPhase: "pre-match",
  matchName: "Argentina vs. Germany",
  timeRemaining: "120 min to Kickoff",
  attendance: 0,
  crowdMood: "calm",
  aiConfidence: 99,
  opsStatus: "normal",
  domeStatus: "open",
  activeEmergency: null,
  crowdDensityMultiplier: 1.0,

  setPhase: (phase) => {
    const metrics = PHASE_METRICS[phase];
    set({
      currentPhase: phase,
      timeRemaining: metrics.timeRemaining,
      attendance: metrics.attendance,
      crowdMood: metrics.crowdMood,
      aiConfidence: metrics.aiConfidence,
    });
  },

  triggerEmergency: (type) => {
    set({
      activeEmergency: type,
      opsStatus: type ? "critical" : "normal",
    });
  },

  setDomeStatus: (status) => set({ domeStatus: status }),

  setDensityMultiplier: (multiplier) => set({ crowdDensityMultiplier: multiplier }),

  advancePhase: () => {
    const { currentPhase } = get();
    const currentIndex = PHASE_ORDER.indexOf(currentPhase);
    const nextIndex = (currentIndex + 1) % PHASE_ORDER.length;
    const nextPhase = PHASE_ORDER[nextIndex];
    get().setPhase(nextPhase);
  },
}));
