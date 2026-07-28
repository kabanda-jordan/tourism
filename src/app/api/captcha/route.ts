import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateSVG(code: string): string {
  const grays = ["#111827", "#374151", "#6B7280", "#9CA3AF", "#4B5563", "#1F2937"];
  const w = 240;
  const h = 72;

  const chars = code.split("").map((ch, i) => {
    const x = 30 + i * 42 + Math.random() * 14;
    const y = 44 + Math.random() * 14;
    const angle = (Math.random() - 0.5) * 30;
    const color = grays[i % grays.length];
    const size = 28 + Math.random() * 8;
    return `<text x="${x}" y="${y}" transform="rotate(${angle},${x},${y})" font-family="monospace" font-size="${size}" font-weight="bold" fill="${color}" opacity="0.85">${ch}</text>`;
  }).join("");

  const lines = Array.from({ length: 6 }, () => {
    const x1 = Math.random() * w;
    const y1 = Math.random() * h;
    const x2 = Math.random() * w;
    const y2 = Math.random() * h;
    const stroke = grays[Math.floor(Math.random() * grays.length)];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${1 + Math.random() * 2}" opacity="0.25"/>`;
  }).join("");

  const dots = Array.from({ length: 40 }, () => {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = 1 + Math.random() * 2;
    const color = grays[Math.floor(Math.random() * grays.length)];
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.3"/>`;
  }).join("");

  const wave = `<path d="M0 ${h * 0.7} Q${w * 0.25} ${h * 0.3} ${w * 0.5} ${h * 0.7} T${w} ${h * 0.7}" fill="none" stroke="#D1D5DB" stroke-width="1.5" opacity="0.4"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="#FFFFFF" rx="8"/>
    ${wave}
    ${lines}
    ${dots}
    ${chars}
  </svg>`;
}

export async function GET() {
  const code = generateCode();
  const svg = generateSVG(code);

  const adminClient = createAdminClient();
  await adminClient.from("verification_codes").insert({
    code,
    type: "captcha",
    email: "captcha@internal",
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "X-Captcha-Id": code,
    },
  });
}

export async function POST(request: Request) {
  const { code, solution } = await request.json();

  if (!code || !solution) {
    return NextResponse.json({ valid: false, error: "Missing code or solution" }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const { data: stored } = await adminClient
    .from("verification_codes")
    .select("*")
    .eq("code", code)
    .eq("type", "captcha")
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!stored) {
    return NextResponse.json({ valid: false, error: "Captcha expired or not found" }, { status: 400 });
  }

  if (new Date(stored.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, error: "Captcha expired" }, { status: 400 });
  }

  const valid = stored.code.toUpperCase() === solution.toUpperCase();

  if (valid) {
    await adminClient.from("verification_codes").update({ used: true }).eq("id", stored.id);
  }

  return NextResponse.json({ valid });
}
