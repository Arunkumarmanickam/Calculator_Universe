// Simple SVG icons for PWA — 1x1 transparent pixels to prevent 404s
// Replace with real icons before production deployment
export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
    <rect width="192" height="192" fill="#2563eb" rx="32"/>
    <text x="96" y="130" font-size="96" font-family="system-ui" fill="white" text-anchor="middle" font-weight="bold">C</text>
  </svg>`
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000, immutable' } })
}
