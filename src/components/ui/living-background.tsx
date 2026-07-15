"use client";

import React, { useEffect, useRef } from "react";
import { useUiStore } from "@/stores/useUiStore";

export function LivingBackground() {
  const { currentRole } = useUiStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track simulated traffic flows and trains
    const traffic: {
      x: number;
      y: number;
      speed: number;
      lane: number;
    }[] = [];

    // Initialize 25 road traffic dots
    for (let i = 0; i < 25; i++) {
      traffic.push({
        x: Math.random() * width,
        y: Math.random() * 0.15 * height + 0.05 * height, // Top road strip
        speed: Math.random() * 0.5 + 0.2,
        lane: 0,
      });
      traffic.push({
        x: Math.random() * width,
        y: Math.random() * 0.15 * height + 0.8 * height, // Bottom road strip
        speed: Math.random() * 0.5 + 0.2,
        lane: 1,
      });
    }

    // Metro train coordinates
    let trainX = 0;
    const trainY = 0.5 * height; // Middle metro tracks

    // Crowd ripple animation variables
    let rippleRadius = 0;
    const centerStadium = { x: width * 0.5, y: height * 0.5 };

    // Camera flashes in the stadium
    const flashes: { x: number; y: number; age: number }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerStadium.x = width * 0.5;
      centerStadium.y = height * 0.5;
    };
    window.addEventListener("resize", handleResize);

    // Dynamic color maps matching role configurations
    const getColors = () => {
      switch (currentRole) {
        case "fan":
          return { primary: "rgba(0, 230, 118, 0.04)", track: "rgba(0, 230, 118, 0.1)" };
        case "organizer":
          return { primary: "rgba(33, 150, 243, 0.04)", track: "rgba(33, 150, 243, 0.1)" };
        case "security":
          return { primary: "rgba(255, 23, 68, 0.04)", track: "rgba(255, 23, 68, 0.1)" };
        default:
          return { primary: "rgba(0, 229, 255, 0.04)", track: "rgba(0, 229, 255, 0.1)" };
      }
    };

    // Draw loop running at 60fps
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const colors = getColors();

      // 1. Draw static gridlines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Metro Rail Line & moving Train capsule
      ctx.strokeStyle = colors.track;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, trainY);
      ctx.lineTo(width, trainY);
      ctx.stroke();

      // Update train coordinates
      trainX += 0.8;
      if (trainX > width + 150) {
        trainX = -150;
      }
      ctx.fillStyle = "rgba(0, 229, 255, 0.5)";
      ctx.beginPath();
      ctx.roundRect(trainX, trainY - 4, 80, 8, 4);
      ctx.fill();

      // 3. Draw Road traffic paths
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0.1 * height);
      ctx.lineTo(width, 0.1 * height);
      ctx.moveTo(0, 0.85 * height);
      ctx.lineTo(width, 0.85 * height);
      ctx.stroke();

      // Update and draw traffic dots
      ctx.fillStyle = "rgba(245, 158, 11, 0.3)";
      traffic.forEach((dot) => {
        dot.x += dot.speed;
        if (dot.x > width) dot.x = 0;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Center Stadium ring & Concentric Crowd waves
      ctx.strokeStyle = colors.track;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerStadium.x, centerStadium.y, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing concentric crowd ripples
      rippleRadius += 0.6;
      if (rippleRadius > 260) {
        rippleRadius = 0;
      }
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerStadium.x, centerStadium.y, 140 + rippleRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Draw random camera flashes inside the stadium ring
      if (Math.random() < 0.08) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 120 + 20;
        flashes.push({
          x: centerStadium.x + Math.cos(angle) * radius,
          y: centerStadium.y + Math.sin(angle) * radius,
          age: 0,
        });
      }

      flashes.forEach((f) => {
        f.age += 1;
        const opacity = 1 - f.age / 15;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Clear expired flashes
      while (flashes.length > 0 && flashes[0].age > 15) {
        flashes.shift();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentRole]);

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      {/* Ambient slowly moving radial aurora gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-950/10 blur-[130px] animate-pulse-slow pointer-events-none" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-victory-gold/5 blur-[120px] animate-pulse-slow pointer-events-none"
        style={{ animationDelay: "3s" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}
