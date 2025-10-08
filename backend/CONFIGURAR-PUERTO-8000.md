# Configuración del Backend - Opciones de Despliegue

## **OPCIÓN RECOMENDADA: Servidor PHP Integrado**

La forma más sencilla y portable para desarrollo:

```bash
# Desde la carpeta backend
php -S localhost:8000 -t public

# O usar el script de inicio
./start.bat    # Windows
./start.sh     # Linux/Mac
```

**Ventajas:**
- No requiere configuración de Apache/Nginx
- Funciona en cualquier sistema con PHP 8.1+
- Portable entre desarrolladores
- Configuración automática de CORS

---

## **OPCIÓN ALTERNATIVA: Apache/Laragon**

### Para Laragon (Windows):

1. **Abrir configuración de Apache:**
   - Laragon → Click derecho → Apache → httpd.conf

2. **Agregar puerto 8000:**
   ```apache
   Listen 80
   Listen 8000    # Agregar esta línea
   ```

3. **Crear VirtualHost (reemplazar RUTA_DEL_PROYECTO):**
   ```apache
   <VirtualHost *:8000>
       DocumentRoot "[RUTA_DEL_PROYECTO]/backend/public"
       ServerName localhost
       
       <Directory "[RUTA_DEL_PROYECTO]/backend/public">
           AllowOverride All
           Require all granted
           
           RewriteEngine On
           RewriteCond %{REQUEST_FILENAME} !-f
           RewriteCond %{REQUEST_FILENAME} !-d
           RewriteRule ^(.*)$ index.php [QSA,L]
       </Directory>
       
       # Headers CORS
       Header always set Access-Control-Allow-Origin "*"
       Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
       Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
   </VirtualHost>
   ```

4. **Ejemplo de rutas comunes:**
   ```apache
   # Laragon estándar:
   DocumentRoot "C:/laragon/www/tu-proyecto/backend/public"
   
   # XAMPP:
   DocumentRoot "C:/xampp/htdocs/tu-proyecto/backend/public"
   
   # Desarrollo en subcarpeta:
   DocumentRoot "/var/www/html/tu-proyecto/backend/public"
   ```

5. **Reiniciar Apache:** Laragon → Apache → Reload

---

## **Verificar Funcionamiento**

```bash
# Test básico
curl http://localhost:8000/health

# Test API camping
curl http://localhost:8000/api/camping/info

# Test disponibilidades
curl "http://localhost:8000/api/availability?check_in=2025-07-15&check_out=2025-07-20&adults=2"
```

**Respuesta esperada del health check:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-08 12:00:00",
  "message": "Backend funcionando correctamente"
}
```

---

## **Scripts de Inicio Automatizados**

### Windows (`start.bat`):
```batch
@echo off
echo Iniciando BOOTBOOKINGCAMP Backend en puerto 8000...
php -S localhost:8000 -t public
pause
```

### Linux/Mac (`start.sh`):
```bash
#!/bin/bash
echo "Iniciando BOOTBOOKINGCAMP Backend en puerto 8000..."
php -S localhost:8000 -t public
```

---

## **Troubleshooting**

### Puerto 8000 ocupado:
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :8000    # Windows
lsof -i :8000                   # Linux/Mac

# Usar otro puerto
php -S localhost:8001 -t public
# Y cambiar VITE_API_BASE_URL=http://localhost:8001 en frontend/.env
```

### PHP no encontrado:
```bash
# Verificar instalación
php --version

# Si no está instalado:
# Windows: Descargar desde php.net
# Linux: sudo apt install php8.1-cli
# Mac: brew install php
```