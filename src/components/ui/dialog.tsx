"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md border border-neutral-800 bg-neutral-950/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-bold font-display text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white rounded p-1"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-neutral-300 text-sm leading-relaxed">{children}</div>
      </motion.div>
    </div>,
    document.body
  );
}
