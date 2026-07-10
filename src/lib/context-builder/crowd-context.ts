export function getCrowdContext(gateWaitMinutes: number, concessionWaitMinutes: number): string {
  return `[CROWD OVERLAYS]: Security gate ingress delays: ${gateWaitMinutes} mins. Nearby concession wait time averages: ${concessionWaitMinutes} mins.`;
}
