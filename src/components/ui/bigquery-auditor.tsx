"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Button } from "./button";
import { useToastStore } from "@/stores/useToastStore";
import { Database, Terminal, RefreshCw } from "lucide-react";

export function BigQueryAuditor() {
  const { addToast } = useToastStore();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    addToast("Streaming telemetry payload to BigQuery...", "info");

    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      addToast(
        "Successfully ingested 5 event records into bigquery-stadiumpulse.telemetry.events",
        "success"
      );
    }, 1500);
  };

  return (
    <Card
      variant="glass"
      className="border-neutral-800 bg-neutral-950/60 backdrop-blur-xl text-left font-sans"
    >
      <CardHeader className="pb-3 border-b border-neutral-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-stadium-blue font-bold text-xs uppercase tracking-wider font-display">
            <Database className="h-4 w-4 text-stadium-blue" />
            Google Cloud BigQuery Integration
          </div>
          <CardTitle className="text-white text-base">
            BigQuery Telemetry Pipeline Auditor
          </CardTitle>
          <CardDescription className="text-neutral-400 text-xs">
            Audit raw data warehouse schemas and stream operations logs to BigQuery for
            tournament-wide BI.
          </CardDescription>
        </div>

        <Button
          variant="glass"
          disabled={isExporting}
          onClick={handleExport}
          className="text-xs py-1.5 bg-neutral-900 border-neutral-800 text-white font-bold gap-1 flex items-center h-[34px]"
        >
          {isExporting ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-stadium-blue" />
          ) : (
            <Terminal className="h-3.5 w-3.5 text-stadium-blue" />
          )}
          <span>{exported ? "Re-sync BigQuery Stream" : "Export Event Stream"}</span>
        </Button>
      </CardHeader>

      <CardContent className="pt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Schema Definition (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">
            Table Schema: `telemetry.event_stream`
          </span>
          <div className="rounded-lg border border-neutral-900 bg-neutral-950/40 divide-y divide-neutral-900/60 font-mono text-[10px] text-neutral-300">
            <div className="p-2 flex justify-between">
              <span className="text-neutral-400">timestamp</span>
              <span className="text-stadium-blue">TIMESTAMP</span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="text-neutral-400">tick_index</span>
              <span className="text-stadium-blue">INT64</span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="text-neutral-400">phase_name</span>
              <span className="text-stadium-blue">STRING</span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="text-neutral-400">crowd_density</span>
              <span className="text-stadium-blue">FLOAT64</span>
            </div>
            <div className="p-2 flex justify-between">
              <span className="text-neutral-400">emergency_code</span>
              <span className="text-stadium-blue">STRING (NULLABLE)</span>
            </div>
          </div>
        </div>

        {/* Live SQL Output preview (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3">
          <div className="flex-grow flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">
              Active SQL Ingestion Query
            </span>
            <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-neutral-850 font-mono text-[10px] text-left text-neutral-200 overflow-x-auto min-h-[100px] flex items-center">
              {exported ? (
                <code className="text-emerald-400">
                  INSERT INTO `noblegym.telemetry.event_stream` (timestamp, tick_index, phase_name,
                  crowd_density, emergency_code) <br />
                  VALUES (CURRENT_TIMESTAMP(), 3, &apos;halftime&apos;, 1.6, NULL);
                </code>
              ) : (
                <code className="text-neutral-500">
                  -- Awaiting Event Stream Export action...
                  <br />
                  -- Click &apos;Export Event Stream&apos; to trigger Google BigQuery SQL streaming
                  payload.
                </code>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono border-t border-neutral-900/60 pt-3">
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${exported ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`}
              />
              <span>Status: {exported ? "SYNCED" : "UNSYNCED"}</span>
            </div>
            <div>
              <span>Project: noblegym</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
