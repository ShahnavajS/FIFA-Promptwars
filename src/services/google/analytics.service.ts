export class GoogleAnalyticsWrapperService {
  /**
   * Logs tournament and dispatcher events to console and formats schemas ready for BigQuery sync.
   */
  public static logTelemetryEvent(
    eventName: string,
    params: Record<string, unknown>
  ): void {
    const timestamp = new Date().toISOString();
    const eventPayload = {
      event_name: eventName,
      timestamp,
      environment: "stadium_companion_demo",
      session_id: "world-cup-2026-simulation-session",
      data: params,
    };

    // Console dispatch simulation
    console.log(`[BIGQUERY PIPELINE METRIC LOGGED] ->`, JSON.stringify(eventPayload, null, 2));

    // Decoupled dispatcher fallback hook
    if (typeof window !== "undefined") {
      const customAnalyticsEvent = new CustomEvent("BIGQUERY_ANALYTICS_EVENT", {
        detail: eventPayload,
      });
      window.dispatchEvent(customAnalyticsEvent);
    }
  }
}
