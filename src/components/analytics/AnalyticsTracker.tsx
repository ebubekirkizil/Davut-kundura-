"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Ziyaretçi takibi — her sayfa yüklendiğinde çalışır
// Konum verisi için ipapi.co API'si kullanır (ücretsiz, 30k istek/ay)

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;
  const stored = sessionStorage.getItem("dk_session");
  if (stored) {
    sessionId = stored;
    return stored;
  }
  const newId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  sessionStorage.setItem("dk_session", newId);
  sessionId = newId;
  return newId;
}

async function getLocationData() {
  try {
    const cached = sessionStorage.getItem("dk_location");
    if (cached) return JSON.parse(cached);

    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    const data = await res.json();
    const location = { country: data.country_name, city: data.city, lat: data.latitude, lng: data.longitude };
    sessionStorage.setItem("dk_location", JSON.stringify(location));
    return location;
  } catch {
    return null;
  }
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

export default function AnalyticsTracker({ page }: { page: string }) {
  useEffect(() => {
    async function track() {
      const sid = getSessionId();
      const location = await getLocationData();
      const device = getDevice();
      const browser = getBrowser();

      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pageview",
          sessionId: sid,
          page,
          country: location?.country || null,
          city: location?.city || null,
          lat: location?.lat || null,
          lng: location?.lng || null,
          device,
          browser,
          referrer: document.referrer || null,
        }),
      }).catch(() => {});
    }

    track();

    // Heartbeat: aktif oturumu canlı tut (her 90 saniye)
    const heartbeat = setInterval(async () => {
      const sid = getSessionId();
      const location = sessionStorage.getItem("dk_location")
        ? JSON.parse(sessionStorage.getItem("dk_location")!)
        : null;

      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "heartbeat",
          sessionId: sid,
          page,
          country: location?.country || null,
          city: location?.city || null,
          lat: location?.lat || null,
          lng: location?.lng || null,
        }),
      }).catch(() => {});
    }, 90000);

    return () => clearInterval(heartbeat);
  }, [page]);

  return null; // Görünmez bileşen
}
