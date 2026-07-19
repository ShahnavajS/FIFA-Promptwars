# StadiumPulse AI

StadiumPulse AI is a GenAI-enabled stadium operations companion for the FIFA World Cup 2026. It helps fans, volunteers, venue staff, security, and organizers make safer, more accessible, and lower-impact decisions throughout the matchday journey.

This project is a scenario-driven concept demo. It intentionally labels simulated data and local fallbacks so that a demo never looks like a live venue control system.

## What It Solves

- Navigation: a digital twin recommends lower-congestion paths to gates, seats, transport, and amenities.
- Crowd management: the operations view forecasts bottlenecks and provides role-specific recommendations.
- Accessibility: step-free routing, wheelchair mode, font scaling, high contrast, and multilingual concierge support are built into the core flow.
- Transportation and sustainability: the control room compares low-impact travel modes and quantifies the scenario impact of moving fans away from rideshare queues.
- Multilingual assistance: the concierge supports contextual language and persona choices, plus urgent phrasebook shortcuts.
- Operational intelligence: multi-agent advisories, replay simulation, confidence, provenance, expected outcomes, and review checkpoints make recommendations auditable.

## Product Walkthrough

1. Choose a role from the landing page: fan, volunteer, organizer, security, or venue staff.
2. Open the Digital Twin Map to change match phases, inspect congestion, and see accessible routing.
3. Use AI Concierge for contextual wayfinding, translation, and accessibility assistance.
4. Switch to organizer, security, staff, or volunteer mode to open the Operations Decision Center.
5. Review a recommendation before approving it. Critical and high-impact recommendations never auto-dispatch.
6. Open Replay Cockpit to generate a bounded five-tick Gemini scenario or a clearly labeled local safety fallback.

## GenAI Architecture

```text
Browser UI
  -> POST /api/assistant or POST /api/replay
  -> Zod validation + per-instance rate limit
  -> server-only GEMINI_API_KEY
  -> Gemini 2.5 Flash with operational guardrails
  -> validated reply/timeline or labeled local safety fallback
```

The browser never receives `GEMINI_API_KEY`. Client requests are bounded, schema-validated, and rate-limited. Generated replay JSON is validated again before it reaches the UI.

## Safety and Trust Controls

- Gemini calls are server-side only, using `GEMINI_API_KEY` rather than a `NEXT_PUBLIC_*` secret.
- Concierge and replay requests have strict schemas, maximum input sizes, allow-listed scenario controls, and rate limits.
- Prompt instructions treat user content as untrusted and reject attempts to override operating rules.
- The assistant avoids presenting unverified schedules, emergency commands, or medical guidance as fact; urgent guidance directs people to official venue staff and signage.
- High-impact operational actions require a human review. Approvals and holds emit audit events.
- Gemini and deterministic fallback results are visibly distinguished in the UI.
- All dashboard data is marked as scenario data until a real, authenticated integration replaces it.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For live Gemini output, set the following server-side environment variable. Without it, the app remains fully demoable with a deterministic safety fallback.

```bash
GEMINI_API_KEY=your_restricted_gemini_key
```

Google Maps and Firebase values remain public client configuration and should be restricted by origin, API, and Firebase security rules in production:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Verification

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

The test suite covers core navigation behavior, accessibility controls, replay validation, Gemini fallback behavior, request contracts, rate limiting, sustainability recommendations, and the human approval checkpoint.

## Production Integration Path

The demo's simulated data adapters can be replaced by authenticated feeds from venue counters, transit providers, weather services, and accessibility dispatch systems. Keep the server route as the trust boundary, preserve the provenance label for each source, and require human approval for any recommendation that can change crowd flow or public messaging.
