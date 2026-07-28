"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onVerify: (token: string) => void;
  error?: string;
}

export function Captcha({ onVerify, error }: CaptchaProps) {
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [input, setInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [fail, setFail] = useState(false);
  const captchaIdRef = useRef("");

  const imgSrc = `/api/captcha?_=${key}`;

  const refresh = useCallback(() => {
    setKey((k) => k + 1);
    setInput("");
    setVerified(false);
    setFail(false);
    captchaIdRef.current = "";
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleVerify = useCallback(async () => {
    if (input.length < 5) return;
    setLoading(true);
    try {
      const r = await fetch("/api/captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: captchaIdRef.current, solution: input }),
      });
      const d = await r.json();
      if (d.valid) {
        setVerified(true);
        onVerify(input);
      } else {
        setFail(true);
        refresh();
      }
    } catch {
      setFail(true);
      refresh();
    } finally {
      setLoading(false);
    }
  }, [input, onVerify, refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length >= 5 && !verified) handleVerify();
    }, 600);
    return () => clearTimeout(timer);
  }, [input, verified, handleVerify]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="rounded-[10px] overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt="CAPTCHA"
            width={240}
            height={72}
            className="block"
            onLoad={() => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = imgSrc;
              fetch(imgSrc).then(async (r) => {
                const id = r.headers.get("X-Captcha-Id") || "";
                captchaIdRef.current = id;
              });
            }}
          />
        </div>
        <button
          type="button"
          onClick={refresh}
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"
          title="Refresh CAPTCHA"
        >
          <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5))}
        placeholder="Type the code above"
        maxLength={5}
        disabled={verified}
        className={`w-full h-10 px-3 text-sm font-mono border rounded-[10px] outline-none transition-colors ${
          verified
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : fail
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
        }`}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {verified && <p className="text-xs text-emerald-600">Verified</p>}
      {fail && <p className="text-xs text-red-500">Incorrect, try again</p>}
    </div>
  );
}
