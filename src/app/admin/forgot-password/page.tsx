"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, KeyRound, Lock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Step = "email" | "otp" | "newpass" | "done";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("ebukizil@gmail.com");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("otp");
      } else {
        const data = await res.json();
        setError(data.error || "Bir hata oluştu");
      }
    } catch {
      setError("Sunucuya bağlanılamadı");
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    if (newPassword.length < 4) {
      setError("Şifre en az 4 karakter olmalı");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("done");
      } else {
        setError(data.error || "Kod geçersiz veya süresi dolmuş");
      }
    } catch {
      setError("Sunucuya bağlanılamadı");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1a472a]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#2d6a4f]/15 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center font-serif font-bold text-white text-2xl mx-auto mb-4 shadow-[0_8px_32px_rgba(34,197,94,0.3)]">
            D
          </div>
          <h1 className="text-xl font-bold text-white">Şifre Sıfırlama</h1>
          <p className="text-[#555] text-sm mt-1">Davut Kundura Yönetim Paneli</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          
          {/* Adım 1: E-posta */}
          {step === "email" && (
            <form onSubmit={sendOtp} className="space-y-5">
              <div>
                <h2 className="text-white font-semibold text-lg mb-1">E-posta Doğrulama</h2>
                <p className="text-[#555] text-sm">Kayıtlı e-posta adresinize 6 haneli bir kod göndereceğiz.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#aaa] mb-2">E-posta Adresi</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 placeholder:text-[#444]"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor...</> : "Doğrulama Kodu Gönder"}
              </button>
            </form>
          )}

          {/* Adım 2: OTP Kodu */}
          {step === "otp" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-white font-semibold text-lg mb-1">Kodu Girin</h2>
                <p className="text-[#555] text-sm">
                  <span className="text-green-400">{email}</span> adresine gönderilen 6 haneli kodu girin.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#aaa] mb-2">Doğrulama Kodu</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 tracking-[0.4em] text-center text-lg placeholder:text-[#333] placeholder:tracking-normal"
                  />
                </div>
                <p className="text-xs text-[#444] mt-2">
                  Mail gelmedi mi?{" "}
                  <button onClick={() => setStep("email")} className="text-green-500 hover:text-green-400 transition-colors">
                    Tekrar gönder
                  </button>
                </p>
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { setStep("email"); setOtp(""); setError(""); }} className="py-3 border border-[#333] text-[#888] rounded-xl text-sm hover:bg-[#222] transition-colors">
                  Geri Dön
                </button>
                <button
                  onClick={() => { setError(""); if (otp.length === 6) setStep("newpass"); else setError("6 haneli kodu girin"); }}
                  className="py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl text-sm font-semibold"
                >
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {/* Adım 3: Yeni Şifre */}
          {step === "newpass" && (
            <form onSubmit={resetPassword} className="space-y-5">
              <div>
                <h2 className="text-white font-semibold text-lg mb-1">Yeni Şifre Belirle</h2>
                <p className="text-[#555] text-sm">En az 4 karakter olan yeni şifrenizi girin.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#aaa] mb-2">Yeni Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={4}
                    className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#aaa] mb-2">Şifre Tekrar</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555]" />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full bg-[#111] border border-[#333] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50" />
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3.5 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2">
                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Güncelleniyor...</> : "Şifremi Güncelle"}
              </button>
            </form>
          )}

          {/* Adım 4: Başarılı */}
          {step === "done" && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Şifreniz Güncellendi!</h2>
                <p className="text-[#555] text-sm mt-2">Artık yeni şifrenizle giriş yapabilirsiniz.</p>
              </div>
              <Link href="/admin/login" className="block w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3.5 rounded-xl text-center">
                Giriş Sayfasına Dön
              </Link>
            </div>
          )}
        </div>

        {step !== "done" && (
          <div className="text-center mt-5">
            <Link href="/admin/login" className="text-[#444] text-sm hover:text-[#888] transition-colors flex items-center gap-1 justify-center">
              <ArrowLeft className="h-3 w-3" /> Giriş sayfasına dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
