export type TelemetryEventType =
  | "CROWD_LEVEL_CHANGED"
  | "INCIDENT_REPORTED"
  | "GATE_STATE_CHANGED"
  | "NAV_ROUTE_CALCULATED"
  | "AI_PROMPT_SUBMITTED"
  | "ROLE_PORTAL_SWITCHED"
  | "MAP_LAYER_TOGGLED"
  | "EMERGENCY_ALARM_TRIGGERED"
  | "OPS_DECISION_REVIEWED"
  | "OPS_DECISION_APPROVED"
  | "OPS_DECISION_HELD";

export interface TelemetryEvent<T = unknown> {
  type: TelemetryEventType;
  payload: T;
  timestamp: string;
}

export type TelemetryEventHandler<T = unknown> = (event: TelemetryEvent<T>) => void;
