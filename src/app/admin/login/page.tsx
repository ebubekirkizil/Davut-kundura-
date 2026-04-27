"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1a472a]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#2d6a4f]/15 rounded-full blur-[100px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Başlık */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center font-serif font-bold text-white text-3xl mx-auto mb-5 shadow-[0_8px_32px_rgba(34,197,94,0.3)]">
            D
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Davut Kundura Yönetim</h1>
          <p className="text-[#666] text-sm mt-1">Admin paneline güvenli giriş yapın</p>
        </div>

        {/* Form Kartı */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* E-posta */}
            <div>
              <label className="block text-sm font-medium text-[#aaa] mb-2">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@davutkundura.com"
                  required
                  className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all placeholder:text-[#444]"
                />
              </div>
            </div>

            {/* Şifre */}
            <div>
              <label className="block text-sm font-medium text-[#aaa] mb-2">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all placeholder:text-[#444]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#aaa] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Hata */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Giriş Butonu */}
            <button
              id="login-submit"
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(34,197,94,0.25)] hover:shadow-[0_4px_24px_rgba(34,197,94,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                "Panele Giriş Yap"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#444] text-xs mt-6">
          Davut Kundura E-ticaret Yönetim Sistemi v2.0
        </p>
      </div>
    </div>
  );
}
