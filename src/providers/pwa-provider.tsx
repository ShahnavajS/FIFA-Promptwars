"use client";

import React, { useEffect } from "react";
import { useToastStore } from "@/stores/useToastStore";

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("PWA Service Worker registered with scope: ", registration.scope);

            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed") {
                    if (navigator.serviceWorker.controller) {
                      addToast("App update available! Please reload to apply.", "info", 6000);
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.error("Service Worker registration failed: ", error);
          });
      });
    }
  }, [addToast]);

  return <>{children}</>;
}
