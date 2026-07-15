"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Heart,
  Compass,
  Terminal,
  CheckCircle2,
  Languages,
  Activity,
} from "lucide-react";

export function HumanStories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll for Left Image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Slow parallax translation: image moves upward relative to container
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -50]);

  // Timeline height expansion based on scroll entering viewport
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const floatingWidgets = [
    {
      id: 1,
      title: "Family Located",
      value: "✓ Safe",
      icon: Heart,
      iconColor: "text-rose-400",
      bgBorder: "border-rose-500/20 bg-neutral-950/70",
      posClass: "top-[8%] left-[6%]",
    },
    {
      id: 2,
      title: "AI Translation",
      value: "Spanish // Completed",
      icon: Languages,
      iconColor: "text-electric-cyan",
      bgBorder: "border-electric-cyan/20 bg-neutral-950/70",
      posClass: "top-[32%] left-[4%]",
    },
    {
      id: 3,
      title: "Recommended Gate",
      value: "Gate A4 // 3 min detour",
      icon: Compass,
      iconColor: "text-victory-gold",
      bgBorder: "border-victory-gold/20 bg-neutral-950/70",
      posClass: "top-[15%] right-[8%]",
    },
    {
      id: 4,
      title: "Stress Level",
      value: "Reduced // AI Assisted",
      icon: Activity,
      iconColor: "text-cyber-green",
      bgBorder: "border-cyber-green/20 bg-neutral-950/70",
      posClass: "bottom-[12%] left-[16%]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="human-stories"
      className="py-28 bg-[#020203] border-t border-neutral-900 px-6 relative overflow-hidden text-left scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-semibold uppercase tracking-widest font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Human-Centric Impact</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-none">
            Empathetic Companion Support
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            StadiumPulse AI translates operations directives into human comfort. Read the Martinez
            family case study to see how machine learning eases stress.
          </p>
        </div>

        {/* Premium Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch mt-12">
          {/* LEFT COLUMN: Large Image (65% width) */}
          <div className="w-full lg:w-[65%] rounded-3xl border border-neutral-900 bg-neutral-950/40 relative overflow-hidden min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] shadow-2xl">
            {/* Parallax Scaling Image Wrapper */}
            <motion.div
              style={{ y: imgY }}
              className="absolute -inset-y-16 inset-x-0 w-full h-[calc(100%+128px)]"
            >
              <Image
                src="/images/family_volunteer.jpg"
                alt="Martinez family receiving bilingual guidance from stadium coordinator"
                fill
                loading="lazy"
                className="object-cover"
              />
            </motion.div>

            {/* Dark gradient mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Floating Glass widgets */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {floatingWidgets.map((w, idx) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.id}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: (i: number) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.25 + i * 0.15,
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      }),
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      y: {
                        duration: 4.0 + idx * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className={`absolute p-1.5 sm:p-3 rounded-xl sm:rounded-2xl border backdrop-blur-xl pointer-events-auto flex items-center gap-1.5 sm:gap-3 shadow-lg ${w.bgBorder} ${w.posClass}`}
                  >
                    <div className="p-1 sm:p-2 rounded-lg bg-neutral-900/80 border border-neutral-855">
                      <Icon className={`h-3 w-3 sm:h-4.5 sm:w-4.5 ${w.iconColor}`} />
                    </div>
                    <div className="text-left font-mono">
                      <div className="text-[6px] sm:text-[7.5px] font-bold text-neutral-500 uppercase tracking-widest leading-none">
                        {w.title}
                      </div>
                      <div className="text-[8px] sm:text-[10px] font-extrabold text-white mt-0.5 leading-none">
                        {w.value}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Metadata (35% width) */}
          <div className="w-full lg:w-[35%] flex flex-col justify-between gap-8 text-left">
            <div className="space-y-6">
              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-snug">
                Martinez Family case study
              </h3>

              {/* Story */}
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                The Martinez family is traveling with young children, including a member with
                mobility constraints. StadiumPulse identifies concourse bottleneck anomalies,
                dispatches localized multilingual messages, and maps elevator-safe pathways to
                de-escalate crowd ingress anxiety.
              </p>
            </div>

            {/* AI Assistance Feed */}
            <div className="space-y-3">
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block font-mono">
                AI ASSISTANCE DISPATCH
              </span>

              <div className="p-4 rounded-2xl border border-neutral-900 bg-neutral-950/60 font-mono text-[10px] text-neutral-300 space-y-2 leading-relaxed">
                <div className="flex items-center gap-1.5 text-cyber-green font-bold">
                  <Terminal className="h-4 w-4" />
                  <span>COGNITIVE COMPANION LOG</span>
                </div>
                <p>1. Telemetry ingest: Gate B bottleneck detected (wait time 28 min).</p>
                <p>2. Speech Solver: Spanish translation active (latency 8ms).</p>
                <p>3. Routing API: wheelchair-safe detours resolved via Ramp C to Gate A North.</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block font-mono">
                JOURNEY TIMELINE STAGES
              </span>

              <div className="relative pl-6 space-y-4 py-1">
                {/* Expanding Glowing Vertical timeline line */}
                <motion.div
                  style={{ scaleY: lineScaleY, originY: 0 }}
                  className="absolute left-2.5 top-2 w-[1.5px] h-[calc(100%-16px)] bg-cyber-green/50"
                />

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-[20px] top-1.5 h-2 w-2 rounded-full bg-cyber-green" />
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Platform Arrivals
                    </h5>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Assigned step-free route map solved.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-[20px] top-1.5 h-2 w-2 rounded-full bg-cyber-green" />
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Gate Ingress Detour
                    </h5>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Redirected to covered elevator lanes.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-[20px] top-1.5 h-2 w-2 rounded-full bg-cyber-green" />
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Sector 112 Seat HUD
                    </h5>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      Arrived at row seat safely.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Result (Glows Green) */}
            <div className="p-4.5 rounded-2xl border border-cyber-green/30 bg-cyber-green/5 shadow-[0_0_20px_rgba(0,230,118,0.06)] relative overflow-hidden flex items-start gap-3 mt-2">
              <CheckCircle2 className="h-5 w-5 text-cyber-green flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Result Checkpoint
                </h4>
                <p className="text-neutral-200 text-xs leading-relaxed mt-1">
                  Martinez family successfully arrived at Sector 112, Row F, Seat 12 inside the
                  covered bowl, avoiding storm wind lines and turnstile bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
