@echo off
echo Node.js işlemleri sonlandırılıyor...
taskkill /F /IM node.exe 2>nul

echo Node modülleri kontrol ediliyor...
if not exist node_modules (
    echo Node modülleri yükleniyor...
    call npm install
)

echo Server başlatılıyor...
call npm start

pause