"use client";

import React from "react";
import Image from "next/image";
import { useMatchStore } from "@/stores/useMatchStore";
import { useUiStore } from "@/stores/useUiStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Award, MapPin, Clock, Sparkles, Leaf, Accessibility, Heart } from "lucide-react";

export function MatchMemory() {
  const { currentPhase } = useMatchStore();
  const { wheelchairRerouting } = useUiStore();

  // Dynamic story diary based on current phase and language selections
  const getTimelineHistory = () => {
    const list = [
      {
        time: "14:15",
        event: "Stadium Check-in",
        detail: "Passed Gate A North turnstiles security scan smoothly. Stroller check complete.",
        icon: MapPin,
        color: "text-emerald-400 border-emerald-400/20",
      },
      {
        time: "14:40",
        event: "Seat Located",
        detail: wheelchairRerouting
          ? "Occupied Row F seat bay. Guided via West lift core elevator (step-free path active)."
          : "Reached Sector 112 Row F Seat 12 via West concourse stairs ramp.",
        icon: Clock,
        color: "text-cyan-400 border-cyan-400/20",
      },
    ];

    if (["kickoff", "second-half", "full-time", "exit"].includes(currentPhase)) {
      list.push({
        time: "16:20",
        event: "Celebration Surge",
        detail: "Celebrated Argentina's opening goal. Visualizing victory crowd pulse wave.",
        icon: Sparkles,
        color: "text-victory-gold border-victory-gold/20",
      });
    }

    if (["full-time", "exit", "post-match"].includes(currentPhase)) {
      list.push({
        time: "18:30",
        event: "Egress Departure",
        detail: "Departed MetLife Arena via Platform 3 Rail loops. carbon saved offsets logged.",
        icon: Leaf,
        color: "text-eco-green border-eco-green/20",
      });
    }

    return list;
  };

  const timeline = getTimelineHistory();

  // Achievement cards list
  const achievements = [
    {
      title: "Eco Supporter",
      desc: "Selected public rail transit, offsetting carbon emissions by 1,840g.",
      icon: Leaf,
      color: "text-eco-green bg-eco-green/10 border-eco-green/20",
    },
    {
      title: "Early Bird Fan",
      desc: "Checked-in 2 hours before kickoff, avoiding Gate B queue backups.",
      icon: Award,
      color: "text-victory-gold bg-victory-gold/10 border-victory-gold/20",
    },
  ];

  if (wheelchairRerouting) {
    achievements.push({
      title: "Barrier-Free Pioneer",
      desc: "Enabled wheelchair step-free paths redirection templates.",
      icon: Accessibility,
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    });
  }

  return (
    <Card
      variant="glass"
      className="border-neutral-850 bg-neutral-950/60 backdrop-blur-xl text-left font-sans"
    >
      <CardHeader className="pb-3 border-b border-neutral-900 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
            <Heart className="h-4 w-4 text-rose-500 animate-pulse fill-rose-500" />
            My Tournament Book
          </div>
          <CardTitle className="text-white text-base">My Match Story</CardTitle>
          <CardDescription className="text-neutral-400 text-xs">
            Personal diary logs and achievements cached in companion memory.
          </CardDescription>
        </div>
        <div className="h-10 w-10 rounded-full overflow-hidden border border-victory-gold/30 flex-shrink-0">
          <Image
            src="/images/family_avatar.jpg"
            alt="Family Avatar"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="pt-5 flex flex-col sm:flex-row gap-6">
        {/* Timeline Story diary */}
        <div className="flex-grow space-y-4">
          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-2">
            Matchday Journal Timeline
          </div>

          <div className="relative pl-5 border-l border-neutral-900 space-y-4 text-xs">
            {timeline.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div key={idx} className="relative">
                  {/* Timeline point indicator */}
                  <span
                    className={`absolute -left-7 top-0.5 flex h-4 w-4 rounded-full border bg-neutral-950 items-center justify-center ${t.color}`}
                  >
                    <Icon className="h-2 w-2" />
                  </span>

                  <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 font-mono">
                    <span className="text-white font-sans text-xs">{t.event}</span>
                    <span>{t.time}</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed mt-0.5">{t.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements list */}
        <div className="w-full sm:w-[220px] flex-shrink-0 space-y-3">
          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
            Unlocked Achievements
          </div>

          <div className="flex flex-col gap-2">
            {achievements.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-[10px] leading-relaxed ${a.color}`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[11px]">{a.title}</div>
                    <p className="text-neutral-300 mt-0.5 text-[9px]">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
