"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Users, Globe, ShoppingBag, TrendingUp, TrendingDown, Eye,
  Monitor, Smartphone, Tablet, MapPin, ArrowUpRight, RefreshCw,
  Activity, Zap, Package, Clock
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ─── Tipler ───────────────────────────────
interface ActiveSession {
  sessionId: string;
  country: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  page: string | null;
  device: string | null;
  lastSeen: string;
}

interface AnalyticsData {
  activeCount: number;
  activeSessions: ActiveSession[];
  todayViews: number;
  countryBreakdown: { country: string; lat: number | null; lng: number | null; _count: { country: number } }[];
  pageBreakdown: { page: string; _count: { page: number } }[];
  hourlyTraffic: { hour: number; visits: number }[];
}

// ─── Dünya Haritası (SVG Dot Globe) ───────────────────────────────
function DotGlobe({ sessions }: { sessions: ActiveSession[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const pingRef = useRef<{ x: number; y: number; alpha: number; r: number }[]>([]);

  const latLngToXY = useCallback((lat: number, lng: number, radius: number, rotation: number) => {
    const adjustedLng = lng + rotation;
    const x = radius * Math.cos((lat * Math.PI) / 180) * Math.sin((adjustedLng * Math.PI) / 180);
    const y = -radius * Math.sin((lat * Math.PI) / 180);
    const z = radius * Math.cos((lat * Math.PI) / 180) * Math.cos((adjustedLng * Math.PI) / 180);
    return { x, y, z };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.offsetWidth;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.42;

    // Dünya'nın nokta haritası (basitleştirilmiş koordinatlar)
    const continentDots: [number, number][] = [
      // Kuzey Amerika
      ...Array.from({ length: 80 }, (_, i) => [
        30 + Math.random() * 35, -130 + Math.random() * 70,
      ] as [number, number]),
      // Güney Amerika
      ...Array.from({ length: 60 }, (_, i) => [
        -40 + Math.random() * 60, -80 + Math.random() * 40,
      ] as [number, number]),
      // Avrupa
      ...Array.from({ length: 60 }, (_, i) => [
        40 + Math.random() * 25, -10 + Math.random() * 45,
      ] as [number, number]),
      // Afrika
      ...Array.from({ length, }, (_, i) => [
        -35 + Math.random() * 75, -20 + Math.random() * 55,
      ] as [number, number]),
      // Asya
      ...Array.from({ length: 120 }, (_, i) => [
        10 + Math.random() * 55, 60 + Math.random() * 90,
      ] as [number, number]),
      // Avustralya
      ...Array.from({ length: 40 }, (_, i) => [
        -40 + Math.random() * 35, 115 + Math.random() * 40,
      ] as [number, number]),
    ];

    function draw() {
      ctx!.clearRect(0, 0, size, size);

      // Globe gölgesi
      const grad = ctx!.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
      grad.addColorStop(0, "rgba(34, 197, 94, 0.05)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.fill();

      // Dış çerçeve
      ctx!.strokeStyle = "rgba(34, 197, 94, 0.15)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.stroke();

      // Kıta noktaları
      continentDots.forEach(([lat, lng]) => {
        const { x, y, z } = latLngToXY(lat, lng, radius, rotationRef.current);
        if (z < 0) return; // Arka taraftaki noktaları gizle
        const screenX = cx + x;
        const screenY = cy + y;
        const brightness = (z / radius) * 0.6 + 0.1;
        ctx!.fillStyle = `rgba(34, 197, 94, ${brightness})`;
        ctx!.beginPath();
        ctx!.arc(screenX, screenY, 1.2, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Aktif ziyaretçi pinleri
      sessions.forEach((s) => {
        if (!s.lat || !s.lng) return;
        const { x, y, z } = latLngToXY(s.lat, s.lng, radius, rotationRef.current);
        if (z < 0) return;
        const screenX = cx + x;
        const screenY = cy + y;

        // Pin noktası
        ctx!.fillStyle = "#f59e0b";
        ctx!.beginPath();
        ctx!.arc(screenX, screenY, 3, 0, Math.PI * 2);
        ctx!.fill();

        // Ping animasyonu
        const ping = { x: screenX, y: screenY, alpha: 0.8, r: 3 };
        pingRef.current.push(ping);
      });

      // Ping animasyonları
      pingRef.current = pingRef.current.filter((p) => p.alpha > 0);
      pingRef.current.forEach((p) => {
        ctx!.strokeStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.stroke();
        p.r += 0.5;
        p.alpha -= 0.02;
      });

      // Enlem çizgileri
      [-60, -30, 0, 30, 60].forEach((lat) => {
        ctx!.strokeStyle = "rgba(255,255,255,0.04)";
        ctx!.lineWidth = 0.5;
        ctx!.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const { x, y, z } = latLngToXY(lat, lng, radius, rotationRef.current);
          if (z < 0) continue;
          if (lng === -180) ctx!.moveTo(cx + x, cy + y);
          else ctx!.lineTo(cx + x, cy + y);
        }
        ctx!.stroke();
      });

      rotationRef.current += 0.15;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [sessions, latLngToXY]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ─── Stat Kartı ───────────────────────────────
function StatCard({
  title, value, sub, icon: Icon, trend, color = "green",
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: any;
  trend?: number;
  color?: "green" | "amber" | "blue" | "purple";
}) {
  const colors = {
    green: "from-green-500/10 to-green-500/5 border-green-500/20 text-green-400",
    amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400",
    purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5 backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-3">
        <Icon className="h-5 w-5" />
        {trend !== undefined && (
          <span className={`text-xs flex items-center gap-0.5 ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-[#666] mt-1">{title}</div>
      {sub && <div className="text-xs text-[#555] mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Ana Sayfa ───────────────────────────────
export default function LiveAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastUpdate(new Date());
      }
    } catch {
      // sessiz hata
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000); // Her 8 saniyede güncelle
    return () => clearInterval(interval);
  }, [fetchData]);

  // Saatlik trafik verisini grafik için hazırla
  const chartData = Array.from({ length: 24 }, (_, h) => ({
    hour: `${h}:00`,
    ziyaretçi: data?.hourlyTraffic.find((t: any) => Number(t.hour) === h)?.visits || 0,
  }));

  const deviceBreakdown = data?.activeSessions.reduce(
    (acc, s) => {
      if (s.device === "mobile") acc.mobile++;
      else if (s.device === "tablet") acc.tablet++;
      else acc.desktop++;
      return acc;
    },
    { desktop: 0, mobile: 0, tablet: 0 }
  ) || { desktop: 0, mobile: 0, tablet: 0 };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6 text-green-400" />
            Canlı Analitik
          </h1>
          <p className="text-[#555] text-sm mt-0.5">
            Gerçek zamanlı ziyaretçi takibi • Her 8 saniyede güncellenir
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">CANLI</span>
          </div>
          <button
            onClick={fetchData}
            className="p-2 text-[#555] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors border border-[#222]"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="text-[#444] text-xs">
            <Clock className="h-3 w-3 inline mr-1" />
            {lastUpdate.toLocaleTimeString("tr-TR")}
          </span>
        </div>
      </div>

      {/* Üst Stat Kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Şu An Sitede"
          value={isLoading ? "—" : data?.activeCount || 0}
          sub="Son 3 dakika"
          icon={Zap}
          color="green"
        />
        <StatCard
          title="Bugünkü Ziyaret"
          value={isLoading ? "—" : data?.todayViews?.toLocaleString("tr-TR") || 0}
          sub="Toplam sayfa görüntüleme"
          icon={Eye}
          color="blue"
        />
        <StatCard
          title="Ülke Sayısı"
          value={isLoading ? "—" : data?.countryBreakdown?.length || 0}
          sub="Farklı ülkeden ziyaret"
          icon={Globe}
          color="purple"
        />
        <StatCard
          title="En Popüler Sayfa"
          value={data?.pageBreakdown?.[0]?.page?.replace("/", "") || "Ana Sayfa"}
          sub={`${data?.pageBreakdown?.[0]?._count?.page || 0} görüntüleme`}
          icon={Package}
          color="amber"
        />
      </div>

      {/* Ana Grid: Globe + Sağ Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Globe */}
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-sm font-semibold text-white">Dünya Haritası</h2>
              <p className="text-[#444] text-xs">Canlı ziyaretçi konumları</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#555]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" /> Kıta noktaları
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-400 rounded-full" /> Aktif ziyaretçi
              </span>
            </div>
          </div>

          <div className="h-[380px] flex items-center justify-center mt-8">
            {isLoading ? (
              <div className="text-[#333] text-sm animate-pulse">Globe yükleniyor...</div>
            ) : (
              <DotGlobe sessions={data?.activeSessions || []} />
            )}
          </div>

          {/* Alt Aktif Ziyaretçi Listesi */}
          <div className="mt-4 space-y-2 max-h-36 overflow-y-auto scrollbar-thin">
            <p className="text-xs text-[#444] font-medium mb-2">Şu an sitede:</p>
            {data?.activeSessions.length === 0 && (
              <p className="text-xs text-[#333] italic">Aktif ziyaretçi yok (Demo modunda)</p>
            )}
            {data?.activeSessions.map((s) => (
              <div key={s.sessionId} className="flex items-center gap-3 text-xs py-1.5 border-b border-[#111]">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shrink-0" />
                <MapPin className="h-3 w-3 text-[#555] shrink-0" />
                <span className="text-[#888]">{s.city || "Bilinmiyor"}, {s.country || "?"}</span>
                <span className="text-[#444] ml-auto truncate max-w-[120px]">{s.page}</span>
                {s.device === "mobile" ? <Smartphone className="h-3 w-3 text-[#444]" /> : <Monitor className="h-3 w-3 text-[#444]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="space-y-4">
          {/* Cihaz Dağılımı */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#888] mb-4">Cihaz Dağılımı</h3>
            {[
              { label: "Masaüstü", count: deviceBreakdown.desktop, icon: Monitor, color: "bg-blue-500" },
              { label: "Mobil", count: deviceBreakdown.mobile, icon: Smartphone, color: "bg-green-500" },
              { label: "Tablet", count: deviceBreakdown.tablet, icon: Tablet, color: "bg-purple-500" },
            ].map(({ label, count, icon: Icon, color }) => {
              const total = deviceBreakdown.desktop + deviceBreakdown.mobile + deviceBreakdown.tablet || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={label} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#666] flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </span>
                    <span className="text-xs text-[#888]">{count} — {pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ülke Sıralaması */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#888] mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4" /> Ülke Sıralaması
            </h3>
            {(data?.countryBreakdown?.length || 0) === 0 ? (
              <p className="text-xs text-[#333] italic">Henüz veri yok</p>
            ) : null}
            {data?.countryBreakdown?.slice(0, 8).map((c, i) => (
              <div key={c.country} className="flex items-center justify-between py-2 border-b border-[#111]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#444] w-4">{i + 1}</span>
                  <span className="text-xs text-[#888]">{c.country}</span>
                </div>
                <span className="text-xs text-[#666]">{c._count.country} görüntüleme</span>
              </div>
            ))}
          </div>

          {/* En Çok Ziyaret Edilen Sayfalar */}
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#888] mb-4">En Popüler Sayfalar</h3>
            {data?.pageBreakdown?.slice(0, 6).map((p) => (
              <div key={p.page} className="flex items-center justify-between py-2 border-b border-[#111]">
                <span className="text-xs text-[#666] truncate max-w-[140px]">{p.page || "/"}</span>
                <span className="text-xs text-[#888] flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {p._count.page}
                </span>
              </div>
            ))}
            {(data?.pageBreakdown?.length || 0) === 0 && (
              <p className="text-xs text-[#333] italic">Henüz sayfa verisi yok</p>
            )}
          </div>
        </div>
      </div>

      {/* Saatlik Trafik Grafiği */}
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-[#888] mb-6">Bugünkü Saatlik Trafik</h2>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#111" />
            <XAxis
              dataKey="hour"
              tick={{ fill: "#444", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis tick={{ fill: "#444", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff" }}
              labelStyle={{ color: "#888" }}
            />
            <Area
              type="monotone"
              dataKey="ziyaretçi"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#trafficGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
