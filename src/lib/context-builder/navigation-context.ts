export function getNavigationContext(targetGate: string, seat: string, routeMode: string): string {
  return `[NAVIGATION & TRANSIT]: Destination seat: ${seat}. Entrance gate: ${targetGate}. Route preferences: ${routeMode.toUpperCase()} (Accessibility or family optimized paths).`;
}
