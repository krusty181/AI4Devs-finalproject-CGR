# TROUBLESHOOTING - Backend Server Issues

## ❌ Problema: "php no se reconoce como comando"

### Causa
PHP no está en el PATH del sistema (normal en Laragon).

### ✅ SOLUCIÓN 1: Terminal de Laragon (FÁCIL)
1. Abrir **Laragon**
2. Click **"Terminal"** (abre PowerShell con PHP configurado)
3. Ejecutar:
```powershell
cd C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\backend
composer install
php -S localhost:8000 -t public
```

### ✅ SOLUCIÓN 2: Script Automático
Ejecutar el archivo `start-server.bat`:
```powershell
cd C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\backend
.\start-server.bat
```

### ✅ SOLUCIÓN 3: Comandos Manuales
```powershell
cd C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\backend

# Instalar dependencias con Composer
C:\laragon\bin\composer\composer.bat install

# Iniciar servidor con PHP 8.1
& "C:\laragon\bin\php\php-8.1.16-nts-Win32-vs16-x64\php.exe" -S localhost:8000 -t public
```

### ✅ SOLUCIÓN 4: Añadir PHP al PATH (Permanente)
1. Abrir **Variables de Entorno**
2. Añadir a PATH: `C:\laragon\bin\php\php-8.1.16-nts-Win32-vs16-x64`
3. Añadir a PATH: `C:\laragon\bin\composer`
4. Reiniciar PowerShell

## 🧪 Verificar que Funciona

Una vez iniciado el servidor, en **otra terminal**:

```powershell
# Verificar health
curl http://localhost:8000/health

# Verificar API camping
curl http://localhost:8000/api/camping/info

# Verificar disponibilidades
curl "http://localhost:8000/api/availability?check_in=2025-07-15&check_out=2025-07-20&adults=2"
```

## 🚨 Otros Problemas Comunes

### Error: "composer no se reconoce"
```powershell
# Usar ruta completa
C:\laragon\bin\composer\composer.bat install
```

### Error: "Cannot find module"
```powershell
# Regenerar autoloader
C:\laragon\bin\composer\composer.bat dump-autoload
```

### Error: "Permission denied" en data/mock/
```powershell
# Verificar permisos en directorio data
icacls C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\data /grant Everyone:F /T
```

### Server inicia pero APIs no responden
```powershell
# Verificar que .env existe
ls C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\.env

# Si no existe, copiar de ejemplo
copy C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\.env.example C:\laragon\www\LIDR-AI4Devs\AI4Devs-finalproject-CGR\.env
```

## ✅ Setup Completo Exitoso

Cuando veas esto, todo está funcionando:

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2025-01-18T...",
  "mode": "mock"
}
```