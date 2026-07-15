"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUiStore } from "@/stores/useUiStore";
import { useToastStore } from "@/stores/useToastStore";
import { useMatchStore, MatchPhase } from "@/stores/useMatchStore";
import { GeminiWrapperService } from "@/services/google/gemini.service";
import { RecommendationEngine } from "@/services/recommendation.service";
import { PersonaEngine, PersonaType, PersonaConfig } from "@/services/persona.service";
import { SmartAssistanceService } from "@/services/smart-assistance.service";
import { JourneyMemoryService } from "@/services/journey-memory.service";
import { ChatMessage } from "@/services/ai.service";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIShimmer } from "@/components/ui/loading";
import {
  Bot,
  Send,
  Mic,
  Sparkles,
  Languages,
  Eye,
  Type,
  Accessibility,
  HeartHandshake,
} from "lucide-react";

export default function AssistantPage() {
  const {
    currentRole,
    selectedLanguage,
    setLanguage,
    fontSize,
    setFontSize,
    highContrastMode,
    setHighContrast,
    wheelchairRerouting,
    setWheelchairRerouting,
  } = useUiStore();

  const { addToast } = useToastStore();

  const { currentPhase, attendance, crowdMood, matchName, domeStatus, activeEmergency } =
    useMatchStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Persona State Selector (Default general fan)
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("fan");
  const activePersona: PersonaConfig = PersonaEngine.getPersona(selectedPersona);

  // Generate suggested prompts dynamically based on active match phase
  const getSuggestedPrompts = (phase: MatchPhase): string[] => {
    switch (phase) {
      case "pre-match":
      case "arrival":
        return [
          "Where is the stroller-friendly entry gate?",
          "Meadowlands train platform?",
          "Route to Gate A (Step-Free)",
        ];
      case "security":
      case "gate-entry":
        return [
          "Is there an uncrowded gate option?",
          "Reroute to Gate A North",
          "Bag scanning regulations",
        ];
      case "find-seat":
      case "pre-kickoff":
      case "kickoff":
      case "second-half":
        return [
          "Where is Lift West elevator?",
          "Locate Row F in Sec 112",
          "Water station locations",
        ];
      case "halftime":
        return ["El Tri Tacos wait times", "Restrooms with step-free lock", "Eco poncho stations"];
      case "full-time":
      case "exit":
      case "post-match":
        return [
          "Manhattan shuttle delay",
          "Meadowlands Platform 3 rail schedule",
          "Lost & Found dispatcher",
        ];
      default:
        return ["Route to Seat 112", "Quiet zones location", "Translate Japanese"];
    }
  };

  // Generate initial contextual greeting based on active role, phase, and persona
  useEffect(() => {
    let initialGreeting = "";

    if (selectedLanguage === "es") {
      initialGreeting = `[CONCIERGE]: ¡Hola! Bienvenido a StadiumPulse AI. Hemos ajustado su asistencia en base al perfil de [${activePersona.label}]. ¿Cómo puedo apoyarle hoy?`;
    } else if (selectedLanguage === "ja") {
      initialGreeting = `[CONCIERGE]: StadiumPulse AIへようこそ。お客様のプロファイル [${activePersona.label}] に合わせてご案内をパーソナライズしました。`;
    } else {
      initialGreeting = `[STADIUM COMPANION]:
Hello! Welcome back to StadiumPulse AI. I have adjusted my communication and accessibility support for your profile: [${activePersona.label}].
Preferred tone: ${activePersona.tone.toUpperCase()}.

Ask me anything about stroller access, restrooms queues, or transit routes.`;
    }

    setMessages([{ role: "model", text: initialGreeting }]);

    // Update in-memory user preferences when persona is updated
    JourneyMemoryService.updateMemory({
      preferredLanguage: selectedLanguage,
      accessibilityEnabled: selectedPersona === "wheelchair" || selectedPersona === "family",
      transportMode: selectedPersona === "tourist" ? "rail" : "shuttle",
    });
  }, [activePersona.label, activePersona.tone, selectedLanguage, currentPhase, selectedPersona]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current?.scrollIntoView) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Append User Message
    const userMsg: ChatMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Formulate human context models
    const humanContextData = {
      language: selectedLanguage,
      mobility:
        selectedPersona === "wheelchair"
          ? ("wheelchair" as const)
          : selectedPersona === "senior"
            ? ("limited" as const)
            : ("standard" as const),
      companions: selectedPersona === "family" ? "Family with 2 children" : "Single attendee",
      favoriteTeam: "Argentina",
      stressLevel: activeEmergency ? ("high" as const) : ("calm" as const),
      journeyStage:
        currentPhase === "arrival"
          ? ("ingress" as const)
          : currentPhase === "exit"
            ? ("egress" as const)
            : ("seated" as const),
      preferences: activePersona.priorityPreferences,
    };

    // Build context parameters object
    const contextData = {
      role: currentRole,
      phase: currentPhase,
      attendance,
      mood: crowdMood,
      pairing: matchName,
      targetGate: "Gate A North",
      seat: "Sector 112, Row F, Seat 12",
      routeMode: wheelchairRerouting ? "wheelchair" : "fastest",
      gateWait: 28,
      concessionWait: 4,
      temp: 28.5,
      wind: "NW 14kmh",
      domeStatus,
      activeEmergency,
      // Human-centric parameters
      persona: activePersona,
      humanContext: humanContextData,
    };

    try {
      // Execute response generation using our new Gemini Context Engine Wrapper!
      const replyText = await GeminiWrapperService.generateContextReply(text, contextData);

      // Save interaction in memory
      JourneyMemoryService.addInteraction(text, replyText);

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch {
      setIsTyping(false);
      addToast("Failed to compile prompt", "error");
    }
  };

  const handleTranslatePhrase = (phrase: string, targetLang: string) => {
    let translated = phrase;
    if (phrase.includes("help") && targetLang === "es") {
      translated =
        "Necesito ayuda médica urgente en el sector 112. (I need urgent medical help in sector 112).";
    } else if (phrase.includes("minor") && targetLang === "es") {
      translated =
        "Tengo un menor separado cerca de las concesiones. (I have a separated minor near the concessions).";
    } else if (phrase.includes("restroom") && targetLang === "ja") {
      translated = "車椅子用のトイレはどこですか？ (Where is the wheelchair restroom?)";
    } else if (phrase.includes("gate") && targetLang === "fr") {
      translated = "Où se trouve la porte de sortie A? (Where is exit gate A?)";
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", text: `Translate: "${phrase}"` },
      { role: "model", text: `TRANSLATED PHRASEBOOK:\n${translated}` },
    ]);
  };

  const activePills = getSuggestedPrompts(currentPhase);

  // Query recommendations lists dynamically from engine
  const recommendations = RecommendationEngine.getRecommendations(
    currentPhase,
    activeEmergency,
    domeStatus
  );

  // Poll Proactive Smart Assistance opportunites list
  const proAssistAlerts = SmartAssistanceService.detectOpportunities(
    currentPhase,
    activeEmergency,
    domeStatus,
    activeEmergency ? "high" : "calm",
    selectedPersona
  );

  // FontSize style class mapping
  const sizeClasses = {
    normal: "text-sm",
    large: "text-base",
    "x-large": "text-lg",
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] font-sans ${
        highContrastMode ? "contrast-125" : ""
      } ${sizeClasses[fontSize]}`}
    >
      {/* 1. Main Chat Terminal Panel (8 Columns) */}
      <div className="lg:col-span-8 flex flex-col h-full">
        <Card
          variant="glass"
          className="flex-grow flex flex-col p-0 overflow-hidden relative border-neutral-800 bg-neutral-950/60 backdrop-blur-xl"
        >
          {/* Header Controls Bar */}
          <div className="border-b border-neutral-900 bg-neutral-950/40 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-green/10 border border-cyber-green/20 text-cyber-green">
                <Bot className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display tracking-tight">
                  StadiumPulse Concierge
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
                  </span>
                </h3>
                <p className="text-[10px] text-neutral-400 capitalize">
                  Empathetic World Cup Companion
                </p>
              </div>
            </div>

            {/* Accessibility, Language, and Persona Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Persona Selector */}
              <div className="relative">
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value as PersonaType)}
                  className="bg-neutral-905 border border-neutral-800 text-victory-gold rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-victory-gold"
                  aria-label="Select User Persona"
                >
                  <option value="fan">General Fan (Fan)</option>
                  <option value="family">Family with Kids (Family)</option>
                  <option value="senior">Elderly Fan (Senior)</option>
                  <option value="tourist">Tourist (Tourist)</option>
                  <option value="wheelchair">Wheelchair User (Access)</option>
                  <option value="volunteer">Volunteer Steward</option>
                  <option value="organizer">Operations Director</option>
                </select>
              </div>

              {/* High Contrast Toggle */}
              <button
                onClick={() => setHighContrast(!highContrastMode)}
                className={`p-2 rounded-xl border transition-colors ${
                  highContrastMode
                    ? "bg-white text-black border-white"
                    : "border-neutral-800 text-neutral-400 hover:text-white"
                }`}
                aria-label="Toggle High Contrast Mode"
                title="Toggle High Contrast"
              >
                <Eye className="h-4 w-4" />
              </button>

              {/* FontSize Toggle */}
              <button
                onClick={() =>
                  setFontSize(
                    fontSize === "normal" ? "large" : fontSize === "large" ? "x-large" : "normal"
                  )
                }
                className="p-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white flex items-center gap-1"
                aria-label="Toggle Font Size"
                title="Toggle Font Size"
              >
                <Type className="h-4 w-4" />
                <span className="text-[9px] font-bold uppercase">{fontSize}</span>
              </button>

              {/* Wheelchair Routing Toggle */}
              <button
                onClick={() => setWheelchairRerouting(!wheelchairRerouting)}
                className={`p-2 rounded-xl border transition-colors ${
                  wheelchairRerouting
                    ? "bg-purple-900 border-purple-800 text-white"
                    : "border-neutral-800 text-neutral-400 hover:text-white"
                }`}
                aria-label="Toggle Wheelchair Routing"
                title="Toggle Wheelchair Routing"
              >
                <Accessibility className="h-4 w-4" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyber-green"
                  aria-label="Select Assistant Language"
                >
                  <option value="en">English (EN)</option>
                  <option value="es">Español (ES)</option>
                  <option value="fr">Français (FR)</option>
                  <option value="pt">Português (PT)</option>
                  <option value="ar">العربية (AR)</option>
                  <option value="hi">हिन्दी (HI)</option>
                  <option value="ja">日本語 (JA)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Proactive Smart Assistance Overlay Notifications (Calm Technology) */}
          {proAssistAlerts.length > 0 && (
            <div className="px-5 py-3 border-b border-neutral-900 bg-emerald-950/20 text-xs flex flex-col gap-2">
              {proAssistAlerts.map((as, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-400 font-medium">
                  <HeartHandshake className="h-4 w-4 flex-shrink-0 animate-pulse" />
                  <span>{as}</span>
                </div>
              ))}
            </div>
          )}

          {/* Message History Feed */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4 text-sm scrollbar-thin">
            {messages.map((msg, idx) => {
              const isModel = msg.role === "model";
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3.5 ${isModel ? "" : "flex-row-reverse"}`}
                >
                  <div className="flex h-8 w-8 rounded-full overflow-hidden border border-neutral-800/80 flex-shrink-0">
                    {isModel ? (
                      <Image
                        src="/images/tourist_avatar.jpg"
                        alt="AI Concierge"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src="/images/family_avatar.jpg"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div
                    className={`max-w-md p-4 rounded-2xl leading-relaxed text-left ${
                      isModel
                        ? "bg-neutral-900/60 border border-neutral-800/80 text-neutral-200"
                        : "bg-cyan-950/60 border border-cyan-850/80 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 rounded-full overflow-hidden border border-neutral-800/80 flex-shrink-0">
                  <Image
                    src="/images/tourist_avatar.jpg"
                    alt="AI Concierge"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="max-w-md w-full p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/40">
                  <AIShimmer />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggestions Pills */}
          <div className="px-5 py-3 border-t border-neutral-900 bg-neutral-950/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {activePills.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/80 text-xs font-semibold text-neutral-300 transition-colors focus:outline-none focus:ring-1 focus:ring-cyber-green"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Inputs */}
          <div className="p-5 border-t border-neutral-900 bg-neutral-950/80 flex gap-3">
            <div className="flex-grow">
              <Input
                placeholder="Ask your tournament companion..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                className="w-full bg-neutral-950 border-neutral-800 text-white"
                id="ai-chat-input"
              />
            </div>
            <Button
              variant="glass"
              onClick={() => {
                addToast("Microphone speech model listening...", "info");
              }}
              aria-label="Voice input"
              className="p-3"
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSend(inputValue)}
              className="px-5 py-3 font-bold"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* 2. Side Panel: Contextual Recommendations & Phrasebooks (4 Columns) */}
      <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto">
        {/* Recommendation Checklist Feed */}
        <Card
          variant="glass"
          className="text-left border-neutral-800 bg-neutral-950/60 backdrop-blur-xl"
        >
          <CardHeader>
            <div className="flex items-center gap-1.5 text-cyber-green font-bold text-xs uppercase tracking-wider font-display">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Live Recommendations
            </div>
            <CardTitle className="text-white text-base">Advisory Center</CardTitle>
            <CardDescription className="text-neutral-400 text-xs">
              Context-calculated updates from the recommendation engine.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-neutral-900 bg-neutral-950/40 text-xs text-neutral-200 leading-normal flex items-start gap-2 relative overflow-hidden"
              >
                <div
                  className={`absolute left-0 top-0 w-1 h-full ${
                    rec.includes("WEATHER")
                      ? "bg-sky-400"
                      : rec.includes("CRITICAL")
                        ? "bg-rose-500"
                        : "bg-cyber-green"
                  }`}
                />
                <span>{rec}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Translation Emergency Phrasebook */}
        <Card
          variant="glass"
          className="text-left border-neutral-800 bg-neutral-950/60 backdrop-blur-xl"
        >
          <CardHeader>
            <div className="flex items-center gap-1.5 text-victory-gold font-bold text-xs uppercase tracking-wider font-display">
              <Languages className="h-4 w-4" />
              Emergency Phrasebook
            </div>
            <CardTitle className="text-white text-base">Translation Macros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <button
              onClick={() =>
                handleTranslatePhrase("I need urgent medical help in sector 112", "es")
              }
              className="w-full text-left p-2.5 rounded-lg border border-neutral-900 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors text-[11px]"
            >
              <div className="font-semibold text-neutral-300">
                &quot;I need medical help&quot; to Spanish
              </div>
              <div className="text-[10px] text-neutral-500">
                Volunteers first response translation
              </div>
            </button>

            <button
              onClick={() =>
                handleTranslatePhrase("I have a separated minor near the concessions", "es")
              }
              className="w-full text-left p-2.5 rounded-lg border border-neutral-900 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors text-[11px]"
            >
              <div className="font-semibold text-neutral-300">
                &quot;I have a separated minor&quot; to Spanish
              </div>
              <div className="text-[10px] text-neutral-500">
                Lost child perimeter protocol dispatch
              </div>
            </button>

            <button
              onClick={() => handleTranslatePhrase("Where is the wheelchair restroom?", "ja")}
              className="w-full text-left p-2.5 rounded-lg border border-neutral-900 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors text-[11px]"
            >
              <div className="font-semibold text-neutral-300">
                &quot;Where is wheelchair restroom?&quot; to Japanese
              </div>
              <div className="text-[10px] text-neutral-500">
                Accessible restroom wayfinding guide
              </div>
            </button>

            <button
              onClick={() => handleTranslatePhrase("Where is exit gate A?", "fr")}
              className="w-full text-left p-2.5 rounded-lg border border-neutral-900 bg-neutral-900/40 hover:bg-neutral-900/60 transition-colors text-[11px]"
            >
              <div className="font-semibold text-neutral-300">
                &quot;Where is exit gate A?&quot; to French
              </div>
              <div className="text-[10px] text-neutral-500">Transit egress directions guide</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
