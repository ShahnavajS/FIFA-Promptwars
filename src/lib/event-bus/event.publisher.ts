import { TelemetryEvent, TelemetryEventType } from "./event.types";

export class TelemetryPublisher {
  /**
   * Publishes an event to the global event bus.
   */
  static publish<T>(type: TelemetryEventType, payload: T): void {
    if (typeof window === "undefined") return;

    const eventDetail: TelemetryEvent<T> = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    const customEvent = new CustomEvent("stadium_telemetry_event", {
      detail: eventDetail,
    });

    window.dispatchEvent(customEvent);
  }
}
