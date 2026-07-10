import { MatchPhase } from "@/stores/useMatchStore";

export class RecommendationEngine {
  /**
   * Generates highly contextual operational and fan recommendations based on match lifecycle state.
   */
  public static getRecommendations(
    phase: MatchPhase,
    activeEmergency: string | null,
    domeStatus: string
  ): string[] {
    const list: string[] = [];

    // Prepend weather advisory if dome roof is closed/closing
    if (domeStatus === "closed") {
      list.push("WEATHER ADVISORY: Sudden storm active. MetLife Dome roof is closed. HVAC eco mode engaged.");
    }

    // Prepend critical alert if emergency is triggered
    if (activeEmergency) {
      list.push(`CRITICAL DIRECTIVE: [${activeEmergency}] reported. Evacuation/safety protocols active. Follow Gate A red route.`);
      list.push("DISPATCH ALERT: Emergency services deployed to incident coordinate.");
      return list;
    }

    // Contextual milestones recommendations
    switch (phase) {
      case "pre-match":
        list.push("TICKET ADVISORY: Download mobile ticket TKT-128456-M89D to offline cache before entering gates.");
        list.push("TRANSIT LOG: Meadowlands rail links running on schedule. Trains departing platform 3 every 10m.");
        break;
      case "arrival":
        list.push("SHUTTLE CONGESTION: Fan express buses delayed 24 mins. Meadowlands Express rail recommended.");
        list.push("GATE ACCESS: Staff stations active. First Aid hubs clear.");
        break;
      case "security":
        list.push("SECURITY QUEUES: North perimeter baggage check is clear (avg wait: 3 mins). Avoid central queues.");
        list.push("BAG RESTRICTIONS: Bags larger than A4 sizes must be checked at the perimeter lockers.");
        break;
      case "gate-entry":
        list.push("INGRESS CHOKEPOINT: Gate B turnstiles congested (28m wait). Use Gate A North (3m wait).");
        list.push("REROUTING OVERLAY: Green directional arrows are active on the digital twin map.");
        break;
      case "find-seat":
        list.push("ACCESSIBILITY: West Lift Core step-free concrete ramps are clear. Core lifts fully operational.");
        list.push("SECTOR INGRESS: Seating entrances for Sector 112 are open. Proceed through Level 1.");
        break;
      case "pre-kickoff":
        list.push("CEREMONY TIMING: Opening anthems starting in 3 mins. Please occupy seat Sec 112 Row F.");
        list.push("BOWL STATUS: General ingress gates closed. Floodlights active.");
        break;
      case "kickoff":
        list.push("MATCH LIVE: Argentina vs. Germany kickoff. Navigation systems locked to seat coordinates.");
        list.push("DOME ENERGY: Solar capture offsets running at peak. 94% efficiency.");
        break;
      case "halftime":
        list.push("SNACK DELAYS: Halftime active. Restroom wait times peaking at Sector 112 (use Sector 103).");
        list.push("CONCESSIONS ALERT: El Tri Tacos wait time is 4m. Maple Syrup counter is congested (14m wait).");
        break;
      case "second-half":
        list.push("HYDRATION: High humidity recorded in bowl. Keep hydrated. Drink concessions active in Sector 110.");
        list.push("DOME TELEMETRY: Temperatures holding steady at 28°C under NW winds.");
        break;
      case "full-time":
        list.push("MATCH COMPLETED: Full whistle. Argentina wins 2-1. Preparing egress pathways.");
        list.push("SHUTTLE DELAY: Manhattan shuttle lines showing high exit congestion. Board rail lines.");
        break;
      case "exit":
        list.push("MASS EGRESS: Proceed out via Gate A North for direct connection to Platform 3 rail loops.");
        list.push("RIDESHARE SURGE: Rideshare Zone 1 showing 35m delay. Reroute to Subway Terminal loops.");
        break;
      case "post-match":
        list.push("OPS SUSPENDED: Stadium egress finished. Concourse cleanup modules dispatched.");
        list.push("MAINTENANCE: Technical support checks commencing on Lift Core West.");
        break;
    }

    return list;
  }
}
