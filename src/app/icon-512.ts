export function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#2563eb" rx="64"/>
    <text x="256" y="340" font-size="256" font-family="system-ui" fill="white" text-anchor="middle" font-weight="bold">C</text>
  </svg>`
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=31536000, immutable' } })
}
