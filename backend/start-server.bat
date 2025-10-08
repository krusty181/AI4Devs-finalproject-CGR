@echo off
echo 🏕️  BOOTBOOKINGCAMP Backend Server
echo ================================

REM Usar PHP de Laragon
set PHP_PATH=C:\laragon\bin\php\php-8.1.16-nts-Win32-vs16-x64\php.exe
set COMPOSER_PATH=C:\laragon\bin\composer\composer.bat

echo 📦 Installing dependencies...
call %COMPOSER_PATH% install

echo 🚀 Starting server on http://localhost:8000
echo Press Ctrl+C to stop
echo.

%PHP_PATH% -S localhost:8000 -t public