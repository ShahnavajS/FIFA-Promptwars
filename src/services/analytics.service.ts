import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export interface OperationalMetric {
  metricType:
    | "crowd_density"
    | "concession_wait"
    | "navigation_request"
    | "translation_engagement"
    | "incident_report";
  stadiumId: string;
  gateId?: string;
  concessionId?: string;
  value: number;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
}

export class AnalyticsService {
  /**
   * Log standard page views / actions to Firebase Analytics
   */
  static async logUserAction(
    eventName: string,
    params?: Record<string, string | number | boolean>
  ) {
    try {
      const analyticsInstance = await analytics;
      if (analyticsInstance) {
        logEvent(analyticsInstance, eventName, params);
      } else {
        console.warn(`[Analytics Mock] Event: ${eventName}`, params);
      }
    } catch (error) {
      console.error("Failed to log analytics event:", error);
    }
  }

  /**
   * Stream operational metrics to the backend. In production, this can send to a Cloud Function
   * which pipes data into BigQuery for real-time operations dashboards.
   */
  static async streamOperationalMetric(metric: OperationalMetric): Promise<void> {
    try {
      await this.logUserAction("ops_metric_stream", {
        metric_type: metric.metricType,
        stadium_id: metric.stadiumId,
        value: metric.value,
        ...metric.metadata,
      });

      const response = await fetch("/api/metrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metric),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to stream operational metric to BigQuery:", error);
    }
  }
}
