@echo off
echo BOOTBOOKINGCAMP Backend - Servidor Portable
echo ===========================================
echo.
echo Iniciando servidor en http://localhost:8000
echo Presiona Ctrl+C para detener
echo.

REM Verificar que estamos en la carpeta backend
if not exist "public\index.php" (
    echo Error: Ejecutar desde la carpeta backend del proyecto
    echo    Ubicacion correcta: [tu-proyecto]\backend\
    pause
    exit /b 1
)

REM Verificar PHP
php --version >nul 2>&1
if errorlevel 1 (
    echo Error: PHP no encontrado en el PATH
    echo    Instalar PHP 8.1+ o agregar al PATH del sistema
    pause
    exit /b 1
)

echo PHP encontrado - Iniciando servidor...
echo.
php -S localhost:8000 -t public
pause