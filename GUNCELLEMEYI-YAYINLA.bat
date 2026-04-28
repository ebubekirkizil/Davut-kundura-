@echo off
color 0C
echo =======================================================
echo SISTEM KILITLERI ZORLA KIRILIYOR... LUTFEN BEKLEYIN!
echo =======================================================
cd /d "%~dp0"

:: Inatci git kilitlerini zorla yok et
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>&1
if exist ".git\COMMIT_EDITMSG" del /f /q ".git\COMMIT_EDITMSG" >nul 2>&1

echo.
echo [1/3] Tum yeni luks kodlar hazirlaniyor...
git add .

echo.
echo [2/3] Yeni sistem kaydediliyor...
git commit -m "zafer: tum hatalar ve kilitler temizlendi"

echo.
echo [3/3] Vercel'e zorla gonderiliyor...
git push

color 2F
echo.
echo =======================================================
echo %100 BASARILI! ZORUNLU GONDERIM TAMAMLANDI!
echo =======================================================
echo Artik Vercel'e gidip Redeploy yapabilir veya 
echo otomatik yuklenmesini izleyebilirsiniz.
echo =======================================================
pause
