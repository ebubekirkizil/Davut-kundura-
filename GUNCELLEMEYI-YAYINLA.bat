@echo off
color 0B
echo =======================================================
echo DAVUT KUNDURA OTOMATIK YAYIN SISTEMI
echo Lutfen bekleyin, kodlar kontrol ediliyor...
echo =======================================================
cd /d "%~dp0"

echo.
echo [1/3] Dosyalar paketleniyor...
git add -A

echo.
echo [2/3] Degisiklikler kaydediliyor...
git commit -m "fix: Tasarim guncellemeleri ve otonom bat duzeltmeleri"

echo.
echo [3/3] Kodlar canliya (Vercel) gonderiliyor...
git push

if %errorlevel% neq 0 (
    color 4F
    echo.
    echo =======================================================
    echo X HATA OLUSTU! GONDERILEMEDI! X
    echo.
    echo Sorun sizden kaynakli degil. Ya internette bir kesinti
    echo oldu, ya da gonderilecek yeni bir degisiklik yok.
    echo Veya sistem su an mesgul olabilir.
    echo =======================================================
    pause
    exit
)

color 2F
echo.
echo =======================================================
echo V BASARILI! HER SEY MUKEMMEL! V
echo.
echo Tebrikler, islem sorunsuz tamamlandi! Yeni luks tasarim
echo su anda Vercel'e ulasti ve kisa sure icinde canli
echo sitenizde yayinda olacak.
echo =======================================================
pause
