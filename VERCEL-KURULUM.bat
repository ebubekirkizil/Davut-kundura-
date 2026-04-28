@echo off
echo =======================================================
echo DAVUT KUNDURA - VERCEL OTOMATIK KURULUM
echo =======================================================
echo.
echo Bu islem Vercel'e gerekli veritabani sifrelerini yukleyecektir.
echo.

cd /d "%~dp0"

echo 1. Vercel projesi baglaniyor...
call npx vercel link --yes

echo 2. Sifreler yukleniyor...
echo postgresql://postgres.kiegzuemejzaumbquxjr:24Ebubekir68%%2A%%2B@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true^&connection_limit=1 | call npx vercel env add DATABASE_URL production
echo postgresql://postgres.kiegzuemejzaumbquxjr:24Ebubekir68%%2A%%2B@aws-0-eu-central-1.pooler.supabase.com:5432/postgres | call npx vercel env add DIRECT_URL production
echo https://kiegzuemejzaumbquxjr.supabase.co | call npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo davut-kundura-super-gizli-nextauth-secret-key-2024-v2 | call npx vercel env add AUTH_SECRET production
echo https://davut-kundura.vercel.app | call npx vercel env add NEXTAUTH_URL production

echo.
echo 3. Siteniz yayina aliniyor (Deploy)...
call npx vercel deploy --prod

echo.
echo =======================================================
echo ISLEM TAMAMLANDI! Siteniz birkac dakika icinde yayinda olacak.
echo Bu pencereyi kapatabilirsiniz.
echo =======================================================
pause
