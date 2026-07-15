"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Train, Cpu, Users, Accessibility, Calendar, Sparkles } from "lucide-react";

export function FamilyJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll scrollYProgress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Very slow scale from 1.0 (100%) to 1.05 (105%) on scroll
  const scale = useTransform(scrollYProgress, [0.1, 0.7], [1.0, 1.05]);
  // Path draw percentage matching scroll depth
  const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const hudCards = [
    {
      id: 1,
      title: "Platform 4",
      label: "Next Train",
      value: "2 min",
      icon: Train,
      iconColor: "text-electric-cyan",
      bgBorder: "border-electric-cyan/20 bg-neutral-950/70",
      posClass: "top-[8%] left-[4%]",
    },
    {
      id: 2,
      title: "AI Route",
      label: "Generated",
      value: "98.7% Conf",
      icon: Cpu,
      iconColor: "text-purple-400",
      bgBorder: "border-purple-500/20 bg-neutral-950/70",
      posClass: "top-[28%] left-[8%]",
    },
    {
      id: 3,
      title: "Crowd Density",
      label: "Medium",
      value: "Safe Route Found",
      icon: Users,
      iconColor: "text-victory-gold",
      bgBorder: "border-victory-gold/20 bg-neutral-950/70",
      posClass: "top-[12%] right-[6%]",
    },
    {
      id: 4,
      title: "Wheelchair Route",
      label: "Available",
      value: "No Elevators Blocked",
      icon: Accessibility,
      iconColor: "text-cyber-green",
      bgBorder: "border-cyber-green/20 bg-neutral-950/70",
      posClass: "top-[42%] right-[8%]",
    },
    {
      id: 5,
      title: "Family ETA",
      label: "6 mins",
      value: "On Schedule",
      icon: Calendar,
      iconColor: "text-stadium-blue",
      bgBorder: "border-stadium-blue/20 bg-neutral-950/70",
      posClass: "bottom-[8%] left-[22%]",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="family-journey"
      className="py-28 bg-[#020203] border-t border-neutral-900 px-6 relative overflow-hidden text-left scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-victory-gold/10 border border-victory-gold/20 text-victory-gold text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cinematic Fan Diary</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-none">
            Every Journey Starts Before the Stadium.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            From the moment a fan steps off the train, StadiumPulse AI begins guiding, protecting,
            translating, and optimizing every decision—before they even reach the gate.
          </p>
        </div>

        {/* Cinematic Screen Cockpit */}
        <div className="relative w-full rounded-3xl border border-neutral-900 bg-neutral-950/40 overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-2xl">
          {/* Parallax Scaling Image */}
          <motion.div style={{ scale }} className="absolute inset-0 w-full h-full">
            <Image
              src="/images/family_journey.jpg"
              alt="The Martinez family on the platform looking at MetLife Stadium"
              fill
              loading="lazy"
              className="object-cover"
            />
          </motion.div>

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Glowing Navigation Path Overlay (Traces the green dots on the path) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="routeGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00e676" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Glowing route line */}
            <motion.path
              d="M 600 550 Q 560 380 580 300 T 630 180"
              fill="none"
              stroke="url(#routeGlow)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 12"
              style={{ pathLength }}
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{
                strokeDashoffset: { duration: 5, repeat: Infinity, ease: "linear" },
                pathLength: { duration: 1 },
              }}
            />

            {/* Ambient blurred pulse backup path */}
            <motion.path
              d="M 600 550 Q 560 380 580 300 T 630 180"
              fill="none"
              stroke="#00e676"
              strokeWidth="10"
              strokeLinecap="round"
              className="blur-sm opacity-40"
              style={{ pathLength }}
            />
          </svg>

          {/* Sequential Fade-in HUD Overlay Cards */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {hudCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.2 + i * 0.15,
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    }),
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: {
                      duration: 4.5 + idx * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className={`absolute p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border backdrop-blur-xl pointer-events-auto flex items-center gap-1.5 sm:gap-3 shadow-lg ${card.bgBorder} ${card.posClass}`}
                >
                  <div
                    className={`p-1 sm:p-2 rounded-lg bg-neutral-900/80 border border-neutral-850 ${card.iconColor}`}
                  >
                    <Icon className="h-3 w-3 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-left font-mono">
                    <div className="text-[6px] sm:text-[7.5px] font-bold text-neutral-500 uppercase tracking-widest leading-none">
                      {card.title}
                    </div>
                    <div className="text-[8px] sm:text-[10px] font-extrabold text-white mt-0.5 leading-none">
                      {card.label}
                    </div>
                    <div className="text-[7px] sm:text-[8px] text-neutral-400 font-semibold mt-0.5 hidden sm:block">
                      {card.value}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Glowing Navigation Route extending out of the section bottom */}
        <div className="h-20 w-full relative pointer-events-none">
          <svg
            className="absolute inset-x-0 -top-8 w-full h-[150%] pointer-events-none z-20"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 600 0 Q 560 60 500 120"
              fill="none"
              stroke="#00e676"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="6 10"
              animate={{ strokeDashoffset: [0, -32] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 600 0 Q 560 60 500 120"
              fill="none"
              stroke="#00e676"
              strokeWidth="8"
              strokeLinecap="round"
              className="blur-sm opacity-30"
            />
          </svg>
        </div>

        {/* Continue Journey Mega CTA Button */}
        <div className="flex justify-center pt-2">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <a href="#matchday-journey">
              <Button
                variant="primary"
                size="lg"
                className="px-10 py-6 rounded-2xl font-bold tracking-widest uppercase border border-victory-gold/30 bg-gradient-to-r from-neutral-900 to-neutral-950 text-white hover:text-victory-gold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-victory-gold/60 cursor-pointer"
              >
                Continue Journey
                <ArrowRight className="h-4.5 w-4.5 ml-2 text-victory-gold" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
