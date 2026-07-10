import { TelemetryEvent, TelemetryEventHandler, TelemetryEventType } from "./event.types";

export class TelemetryListener {
  /**
   * Subscribes to events on the global event bus.
   * Returns an unsubscribe function.
   */
  static subscribe<T = unknown>(
    type: TelemetryEventType,
    handler: TelemetryEventHandler<T>
  ): () => void {
    if (typeof window === "undefined") return () => {};

    const wrapper = (e: Event) => {
      const customEvent = e as CustomEvent<TelemetryEvent<T>>;
      if (customEvent.detail && customEvent.detail.type === type) {
        handler(customEvent.detail);
      }
    };

    window.addEventListener("stadium_telemetry_event", wrapper);

    return () => {
      window.removeEventListener("stadium_telemetry_event", wrapper);
    };
  }
}
