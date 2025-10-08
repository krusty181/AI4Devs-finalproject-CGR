# 🚀 Guía de Despliegue - BOOTBOOKINGCAMP

## 📝 **Configuración de URLs por Entorno**

### **Desarrollo Local**
> **¡IMPORTANTE!** Solo cambia la URL en el archivo `frontend/.env`

```bash
# 🚀 RECOMENDADO: Servidor PHP integrado (portable)
VITE_API_BASE_URL=http://localhost:8000

# 📁 ALTERNATIVO: Laragon/XAMPP con ruta personalizada
# VITE_API_BASE_URL=http://localhost/tu-ruta-personalizada/backend/public
```

### **🚀 Setup Inicial Rápido**

```bash
# 1. Clonar repositorio
git clone [url-repo]
cd tu-proyecto

# 2. Backend - Usar script portable
cd backend
./start-simple.bat        # Windows
./start-portable.sh       # Linux/Mac

# 3. Frontend - En otra terminal
cd frontend
cp .env.example .env      # Copiar configuración
npm install
npm run dev

# ✅ ¡Listo! 
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

### **Staging/Pruebas**
```bash
VITE_API_BASE_URL=https://staging-api.bootbookingcamp.com
```

### **Producción**
```bash
VITE_API_BASE_URL=https://api.bootbookingcamp.com
```

## 🔧 **Comandos de Build**

### **Para Desarrollo:**
```bash
npm run build:dev
```

### **Para Staging:**
```bash
npm run build:staging
```

### **Para Producción:**
```bash
npm run build
```

## 🌐 **Configuración del Servidor**

### **1. Shared Hosting (cPanel, etc.)**
```
/public_html/
  └── backend/
      ├── public/
      │   ├── index.php
      │   └── .htaccess
      └── src/
  └── frontend/ (archivos del build)
      ├── index.html
      ├── assets/
      └── ...
```

### **2. VPS/Dedicated Server**
```
/var/www/
  ├── api.tudominio.com/     # Backend
  └── www.tudominio.com/     # Frontend
```

### **3. Docker (Producción)**
```dockerfile
# Frontend
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/

# Backend  
FROM php:8.1-apache
COPY backend/ /var/www/html/
```

## ⚙️ **Variables de Entorno por Servidor**

### **Servidor de Desarrollo:**
```bash
export VITE_API_BASE_URL=http://dev-api.bootbookingcamp.com
npm run build:dev
```

### **Servidor de Producción:**
```bash
export VITE_API_BASE_URL=https://api.bootbookingcamp.com
npm run build
```

## 🔄 **Workflow de Despliegue**

1. **Desarrollo → Staging:**
   ```bash
   git push origin develop
   # CI/CD build con npm run build:staging
   ```

2. **Staging → Producción:**
   ```bash
   git push origin main  
   # CI/CD build con npm run build
   ```

## 📁 **Estructura Final en Producción**

```
tudominio.com/
├── index.html          # Frontend React
├── assets/            # CSS, JS, imágenes
└── api/               # Backend PHP
    ├── index.php
    ├── camping-test.php
    └── .htaccess
```

## ✅ **Checklist de Despliegue**

- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ URLs de API actualizadas  
- [ ] ✅ CORS configurado para dominio final
- [ ] ✅ HTTPS habilitado
- [ ] ✅ Base de datos migrada (si aplica)
- [ ] ✅ Archivos estáticos optimizados
- [ ] ✅ Tests pasando
- [ ] ✅ Monitoreo configurado

## 🛠️ **Comandos Útiles**

```bash
# Verificar configuración actual
npm run dev

# Build para diferentes entornos
npm run build           # Producción
npm run build:staging   # Staging  
npm run build:dev      # Desarrollo

# Vista previa del build
npm run preview
```