export interface HumanContextData {
  language: string;
  mobility: "standard" | "wheelchair" | "limited";
  companions: string;
  favoriteTeam: string;
  stressLevel: "calm" | "moderate" | "high";
  journeyStage: "transit" | "ingress" | "seated" | "concessions" | "egress";
  preferences: string[];
}

export function getHumanContext(data: HumanContextData): string {
  const prefText = data.preferences.length > 0 ? data.preferences.join(", ") : "None";

  return `[HUMAN CONTEXT]:
- Selected Language: ${data.language.toUpperCase()}
- Mobility Constraints: ${data.mobility.toUpperCase()}
- Companions: ${data.companions}
- Fan Group Supporter of: ${data.favoriteTeam}
- Stress Level Indicator: ${data.stressLevel.toUpperCase()}
- Matchday Journey Phase: ${data.journeyStage.toUpperCase()}
- User Preferences: ${prefText}`;
}
