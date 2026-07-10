"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { TelemetryPublisher } from "@/lib/event-bus/event.publisher";
import { UserRole } from "@/domain/user.entity";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Bot, 
  Menu, 
  X, 
  Wifi, 
  WifiOff, 
  CloudSun,
  ShieldAlert,
  User,
  ChevronDown,
  Activity,
  Cloud,
  History
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole, setRole, sidebarOpen, toggleSidebar, offlineMode } = useUiStore();
  const { addToast } = useToastStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setDropdownOpen(false);
    TelemetryPublisher.publish("ROLE_PORTAL_SWITCHED", { role });
    addToast(`Switched to ${role.toUpperCase()} view`, "success");
  };

  const navItems = [
    { name: "Digital Twin Map", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "AI Concierge", href: "/dashboard/assistant", icon: <Bot className="h-4 w-4" /> },
    { name: "GCP Architecture", href: "/dashboard/architecture", icon: <Cloud className="h-4 w-4" /> },
    { name: "Replay Cockpit", href: "/dashboard/replay", icon: <History className="h-4 w-4" /> },
  ];

  const roleColors: Record<UserRole, string> = {
    fan: "border-cyber-green text-cyber-green bg-cyber-green/10",
    volunteer: "border-victory-gold text-victory-gold bg-victory-gold/10",
    organizer: "border-stadium-blue text-stadium-blue bg-stadium-blue/10",
    security: "border-pulsing-coral text-pulsing-coral bg-pulsing-coral/10",
    staff: "border-electric-cyan text-electric-cyan bg-electric-cyan/10",
  };

  const roleGlows: Record<UserRole, string> = {
    fan: "shadow-[0_0_15px_rgba(0,230,118,0.15)] border-cyber-green/20",
    volunteer: "shadow-[0_0_15px_rgba(245,158,11,0.15)] border-victory-gold/20",
    organizer: "shadow-[0_0_15px_rgba(2,132,199,0.15)] border-stadium-blue/20",
    security: "shadow-[0_0_15px_rgba(255,23,68,0.15)] border-pulsing-coral/20",
    staff: "shadow-[0_0_15px_rgba(0,229,255,0.15)] border-electric-cyan/20",
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <header className="sticky top-0 z-45 w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-colors md:hidden focus:outline-none focus:ring-1 focus:ring-cyber-green"
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyber-green animate-pulse" />
            <span className="font-display font-bold text-base tracking-wider text-white uppercase hidden sm:inline-block">
              StadiumPulse
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs text-neutral-400 font-medium">
            <CloudSun className="h-4 w-4 text-amber-400" />
            <span>28°C · MetLife Dome Open</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs font-semibold">
            {offlineMode ? (
              <>
                <WifiOff className="h-4 w-4 text-amber-500 animate-pulse" />
                <span className="text-amber-500 hidden sm:inline-block">Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 text-cyber-green" />
                <span className="text-cyber-green hidden sm:inline-block">Telemetry Connected</span>
              </>
            )}
          </div>

          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold text-xs uppercase transition-all tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white ${roleColors[currentRole]}`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{currentRole} Mode</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-800 bg-neutral-950 p-1.5 shadow-2xl z-50 pointer-events-auto">
                <div className="px-2.5 py-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                  Select User View
                </div>
                {(["fan", "volunteer", "organizer", "security", "staff"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-semibold capitalize transition-colors hover:bg-neutral-900 cursor-pointer relative z-50 ${
                      currentRole === r ? "text-white bg-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {r} View
                    {currentRole === r && <div className="h-1.5 w-1.5 rounded-full bg-cyber-green" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-grow relative overflow-hidden">
        <aside
          className={`fixed inset-y-16 left-0 z-20 w-64 border-r border-neutral-900 bg-neutral-950/90 backdrop-blur-md p-4 flex flex-col gap-6 transition-transform duration-300 md:translate-x-0 md:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-1.5 flex-grow">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-cyber-green ${
                    active
                      ? "bg-neutral-900 text-white border border-neutral-800"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-950/40"
                  }`}
                  onClick={() => sidebarOpen && toggleSidebar()}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border border-neutral-900 bg-neutral-950/40 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider font-display">
              <ShieldAlert className="h-4 w-4" />
              SOS Dispatcher
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Direct connection to medical & safety hubs. In case of evacuation or medical alerts, tap the alert button.
            </p>
            <Button
              variant="danger"
              size="sm"
              className="w-full font-bold uppercase tracking-wider py-2 rounded-xl glow-red"
              onClick={() => {
                TelemetryPublisher.publish("EMERGENCY_ALARM_TRIGGERED", { location: "Current GPS Location" });
                addToast("Emergency Alert Broadcasted to Stadium security commanders!", "error", 6000);
              }}
            >
              Broadcast Alert
            </Button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 z-10 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}

        <main className={`flex-grow overflow-y-auto p-6 transition-all duration-300 border-t-2 ${roleGlows[currentRole]}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
