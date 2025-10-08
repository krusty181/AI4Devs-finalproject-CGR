# BOOTBOOKINGCAMP - Instalación Súper Rápida

## **2 Comandos. 2 Minutos. Funcionando!**

### **Opción 1: Automático (Recomendado)**

```bash
# Clonar proyecto
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# Backend (Terminal 1)
cd backend && composer install && php -S localhost:8000 -t public

# Frontend (Terminal 2)
cd frontend && npm install && npm run dev

# Abrir http://localhost:3000
```

### **Opción 2: Con Verificación**

```bash
# 1. Verificar que tienes todo
./verify-setup.bat      # Windows
./verify-setup.sh       # Linux/Mac

# 2. Si todo está OK, usar scripts automáticos
cd backend && ./start-simple.bat      # Windows
cd backend && ./start-portable.sh     # Linux/Mac

# 3. Frontend
cd frontend && npm install && npm run dev
```

---

## **URLs una vez funcionando:**
- **Aplicación web:** http://localhost:3000
- **API Backend:** http://localhost:8000/api/camping/info  
- **Health Check:** http://localhost:8000/health

---

## **¿Usando XAMPP/Laragon?**

Solo cambia esta línea en `frontend/.env`:
```bash
# Para XAMPP/Laragon en lugar de puerto 8000
VITE_API_BASE_URL=http://localhost/bootbookingcamp/backend/public
```

---

## **Requisitos (si no los tienes):**
- **PHP 8.1+** - [Descargar](https://php.net/downloads.php)
- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **Composer** - [Descargar](https://getcomposer.org/download/)

---

## **¿Errores?**

### "PHP no encontrado"
```bash
# Windows: Descargar PHP y agregarlo al PATH
# Linux: sudo apt install php8.1-cli composer
# Mac: brew install php composer
```

### "Puerto ocupado"  
```bash
# Usar otro puerto
php -S localhost:8001 -t public
# Y cambiar frontend/.env: VITE_API_BASE_URL=http://localhost:8001
```

### "No funciona nada"
```bash
# Ejecutar diagnóstico
./verify-setup.bat      # Windows
./verify-setup.sh       # Linux/Mac
```

---

## **¿Necesitas ayuda?**
1. **Primero:** Leer el [README.md](./README.md) completo
2. **Problemas técnicos:** Ver [DEPLOYMENT.md](./DEPLOYMENT.md)  
3. **Testing:** Ver [TESTING.md](./TESTING.md)
4. **Arquitectura:** Ver carpeta `docs/`

---

**Ya puedes empezar a desarrollar!**

> **Tip:** El proyecto funciona con datos mock realistas, no necesitas base de datos para empezar.