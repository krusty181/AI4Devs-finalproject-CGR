@echo off
echo BOOTBOOKINGCAMP - Verificacion de Entorno
echo ========================================
echo.

REM Verificar PHP
echo 1. Verificando PHP...
php --version >nul 2>&1
if errorlevel 1 (
    echo PHP no encontrado
    goto :error
) else (
    php --version | findstr "PHP 8"
    if errorlevel 1 (
        echo Advertencia: Se recomienda PHP 8.1+
    ) else (
        echo PHP 8.x detectado
    )
)

REM Verificar Node.js
echo.
echo 2. Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js no encontrado
    goto :error
) else (
    node --version
    echo Node.js detectado
)

REM Verificar npm
echo.
echo 3. Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm no encontrado
    goto :error
) else (
    npm --version
    echo npm detectado
)

REM Verificar estructura del proyecto
echo.
echo 4. Verificando estructura del proyecto...
if not exist "backend\public\index.php" (
    echo backend\public\index.php no encontrado
    goto :error
) else (
    echo Backend encontrado
)

if not exist "frontend\package.json" (
    echo frontend\package.json no encontrado
    goto :error
) else (
    echo Frontend encontrado
)

if not exist "frontend\.env" (
    echo frontend\.env no encontrado - usar .env.example
) else (
    echo Configuracion frontend encontrada
)

echo.
echo Entorno listo para desarrollo!
echo.
echo Comandos para iniciar:
echo   Backend:  cd backend ^&^& start-simple.bat
echo   Frontend: cd frontend ^&^& npm run dev
echo.
pause
exit /b 0

:error
echo.
echo Configuracion incompleta - revisar requisitos
pause
exit /b 1