"use client";

import React, { useEffect } from "react";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const setOfflineMode = useUiStore((state) => state.setOfflineMode);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setOfflineMode(false);
      addToast("Network connection restored. Real-time updates active.", "success");
    };

    const handleOffline = () => {
      setOfflineMode(true);
      addToast("Network connection lost. Operating in offline-safe mode.", "warning", 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      setOfflineMode(true);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOfflineMode, addToast]);

  return <>{children}</>;
}
