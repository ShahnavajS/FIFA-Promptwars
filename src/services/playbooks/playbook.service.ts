export interface Playbook {
  title: string;
  actions: string[];
  teams: string[];
  broadcastingMessage: string;
  recoverySteps: string[];
}

export class PlaybookService {
  /**
   * Resolves the operational response playbook for active incidents.
   */
  public static getPlaybook(emergencyType: string): Playbook | null {
    const type = emergencyType.toUpperCase();

    if (type.includes("LOST CHILD")) {
      return {
        title: "Lost Minor Search Playbook",
        teams: ["Security Dispatchers", "Volunteer Core Sector 110", "CCTV Room Operators"],
        actions: [
          "Check CCTV cameras covering Sector 110 concessions.",
          "Instruct volunteer guides to freeze exits and monitor gates.",
          "Establish search grid Sector 110 to 112.",
        ],
        broadcastingMessage:
          "LOST CHILD DISPATCH: Stadium security is searching for a separated minor. Please cooperate with local stewards.",
        recoverySteps: [
          "Confirm parent/minor identification documents.",
          "Reunite family at Security Hub North.",
          "Log BQ Incident Analytics report.",
        ],
      };
    }

    if (type.includes("MEDICAL")) {
      return {
        title: "First Aid Trauma Response Playbook",
        teams: ["Medical Squad 2", "Section 112 Stewards", "Ambulance Logistics Desk"],
        actions: [
          "Dispatch Sector 112 medical response team immediately.",
          "Clear the emergency vehicle lane in Sector 112.",
          "Coordinate ambulance entry at Gate A North.",
        ],
        broadcastingMessage:
          "MEDICAL ALERT: Operations team dispatching assistance to Sector 112. Please clear lanes.",
        recoverySteps: [
          "Evaluate patient status at onsite first aid hub.",
          "Transport patient to hospital if necessary.",
          "Clear and restore concourse flows.",
        ],
      };
    }

    if (type.includes("ELEVATOR")) {
      return {
        title: "Elevator Core West Fault Playbook",
        teams: ["Operations Engineering", "Core West Technicians", "Accessibility Support Team"],
        actions: [
          "Lock West elevator gate at Level 2.",
          "Alert elevator technicians for urgent dispatch.",
          "Drape accessibility warning banners and route signs.",
        ],
        broadcastingMessage:
          "LIFT UPDATE: West elevator core is offline for maintenance. Please proceed to East core lift loop.",
        recoverySteps: [
          "Complete safety checks on Elevator Core West.",
          "Re-open lift access to Level 2.",
          "Log mechanical telemetry incident report.",
        ],
      };
    }

    if (type.includes("RAIL") || type.includes("STRIKE")) {
      return {
        title: "Transit Express Rail Suspension Playbook",
        teams: [
          "Shuttle Logistics Desk",
          "Platform 3 Rail Handlers",
          "Rideshare Slot Coordinators",
        ],
        actions: [
          "Postpone all rail departures on Platforms 3 & 4.",
          "Request 15 extra express buses from Secaucus loops.",
          "Update rideshare zone 1 slots on companion apps.",
        ],
        broadcastingMessage:
          "TRANSIT ALERT: Meadowlands Rail Express suspended. Reroute directly to platform 5 shuttle express bus queues.",
        recoverySteps: [
          "Monitor railway network repair updates.",
          "Resume phased departures on Platform 3.",
          "Standardize bus slots to default rates.",
        ],
      };
    }

    if (type.includes("GATE")) {
      return {
        title: "Gate Ingress Turnstiles Closure Playbook",
        teams: ["Gate B Security Crew", "Walkway Volunteers", "Rerouting Screen Engineers"],
        actions: [
          "Lock Gate B ingress turnstile barriers.",
          "Redirect incoming fan streams to Gate A North.",
          "Deploy volunteer guides along the connecting walkways.",
        ],
        broadcastingMessage:
          "GATE B CLOSED: Turnstiles offline. Follow walkway markers to Gate A North for immediate 3m entry.",
        recoverySteps: [
          "Restore Gate B turnstile reader software connection.",
          "Resume phased re-opening of Gate B lanes.",
          "Reset walkway guides.",
        ],
      };
    }

    return null;
  }
}
