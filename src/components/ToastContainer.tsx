"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore, Toast } from "@/stores/useToastStore";
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-400" />,
    error: <XCircle className="h-5 w-5 text-rose-500" />,
    info: <Info className="h-5 w-5 text-cyan-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  };

  const bgStyles = {
    success: "bg-emerald-950/80 border-emerald-500/20 text-emerald-100",
    error: "bg-rose-950/80 border-rose-500/20 text-rose-100",
    info: "bg-cyan-950/80 border-cyan-500/20 text-cyan-100",
    warning: "bg-amber-950/80 border-amber-500/20 text-amber-100",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${bgStyles[toast.type]}`}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-grow text-sm font-medium leading-5">{toast.message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white rounded"
        aria-label="Close alert"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
