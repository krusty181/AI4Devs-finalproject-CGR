@echo off
echo 🏕️  BOOTBOOKINGCAMP Backend - Inicio Rapido
echo ==========================================

REM Encontrar PHP de Laragon automaticamente
set "PHP_PATH="
for /d %%i in ("C:\laragon\bin\php\php-8.*") do (
    if exist "%%i\php.exe" set "PHP_PATH=%%i\php.exe"
)

if "%PHP_PATH%"=="" (
    echo ❌ No se encontro PHP en Laragon
    echo Verifica que Laragon este instalado en C:\laragon\
    pause
    exit /b 1
)

echo ✅ PHP encontrado: %PHP_PATH%
echo.

echo 🚀 Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener
echo.

"%PHP_PATH%" -S localhost:8000 -t public