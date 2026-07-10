import { create } from "zustand";
import { UserRole } from "@/domain/user.entity";

interface UiState {
  currentRole: UserRole;
  activeTab: "home" | "map" | "bridge" | "sos";
  selectedLanguage: string;
  sidebarOpen: boolean;
  offlineMode: boolean;
  fontSize: "normal" | "large" | "x-large";
  highContrastMode: boolean;
  voiceNavigation: boolean;
  wheelchairRerouting: boolean;
  
  // Actions
  setRole: (role: UserRole) => void;
  setActiveTab: (tab: "home" | "map" | "bridge" | "sos") => void;
  setLanguage: (lang: string) => void;
  toggleSidebar: () => void;
  setOfflineMode: (offline: boolean) => void;
  setFontSize: (size: "normal" | "large" | "x-large") => void;
  setHighContrast: (active: boolean) => void;
  setVoiceNavigation: (active: boolean) => void;
  setWheelchairRerouting: (active: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  currentRole: "fan",
  activeTab: "home",
  selectedLanguage: "en",
  sidebarOpen: false,
  offlineMode: false,
  fontSize: "normal",
  highContrastMode: false,
  voiceNavigation: false,
  wheelchairRerouting: false,

  setRole: (role) => set({ currentRole: role }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLanguage: (lang) => set({ selectedLanguage: lang }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setOfflineMode: (offline) => set({ offlineMode: offline }),
  setFontSize: (size) => set({ fontSize: size }),
  setHighContrast: (active) => set({ highContrastMode: active }),
  setVoiceNavigation: (active) => set({ voiceNavigation: active }),
  setWheelchairRerouting: (active) => set({ wheelchairRerouting: active }),
}));
