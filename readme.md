# BOOTBOOKINGCAMP

**Sistema completo de reservas para camping** - *Ready to run anywhere!*

[![PHP 8.1+](https://img.shields.io/badge/PHP-8.1%2B-777BB4)](https://php.net)
[![React 18](https://img.shields.io/badge/React-18-61DAFB)]## Guías de Instalación por Sistema

### Windowstps://reactjs.org)
[![TypeScript](https://img.s# Abrir -# Abrir http://localhost:3000
```

---

## Documentación del Proyecto

El proyecto incluye documentación técnica completa siguiendo mejores prácticas:ocumentación del Proyecto

El proyecto incluye documentación técnica completa siguiendo mejores prácticas:Documentación del Proyectop://localhost:3000
```

---

## Documentación del Proyecto.io/badge/TypeScript-5.0-3178C6)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF)](https://vitejs.dev)
[![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)](./TESTING.md)
[![License](https://img.shields.io/badge/license-Educational-blue)](./readme.md)

> **Proyecto listo para producción** con frontend React + backend PHP, diseñado para funcionar en cualquier entorno de desarrollo sin configuración compleja.

### **¿Qué es BOOTBOOKINGCAMP?**
- **Sistema de reservas** completo para campings y hospederías
- **Mock-First development** - funciona desde el primer minuto
- **Responsive design** - desktop, tablet y móvil
- **Repository pattern** - fácil migración a base de datos real
- **Testing integrado** - Unit, integration y E2E tests
- **Documentación completa** - arquitectura, API, diagramas

### **Demo en vivo:**
- **Frontend:** Interfaz de usuario completa con búsqueda, filtros y formularios
- **Backend API:** 3 endpoints RESTful con datos realistas
- **Mock Data:** 6 meses de disponibilidad simulada con precios dinámicos

---

## **Primera vez? Instalación en 2 minutos**

```bash
# 1. Clonar y entrar al proyecto
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 2. Backend (Terminal 1)
cd backend
composer install
php -S localhost:8000 -t public

# 3. Frontend (Terminal 2) 
cd frontend
npm install
npm run dev

# Abrir http://localhost:3000 - Ya funciona!
```

> **¿Necesitas ayuda?** Ver **[QUICK-START.md](./QUICK-START.md)** para instrucciones detalladas paso a paso

---

## Instalación para Nuevos Usuarios

### Requisitos del Sistema
- **PHP 8.1+** con Composer
- **Node.js 18+** con npm
- **Git** (para clonar el repositorio)

### Instalación Rápida (Recomendada)

```bash
# 1. Clonar el repositorio
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 2. Verificar que tienes todo instalado
./verify-setup.bat      # Windows
./verify-setup.sh       # Linux/Mac

# 3. Instalar dependencias backend
cd backend
composer install
cd ..

# 4. Configurar frontend (IMPORTANTE: cambiar URL si es necesario)
cd frontend
cp .env.example .env
# Editar .env si usas configuración diferente a localhost:8000
npm install
cd ..

# 5. Iniciar el proyecto (2 terminales)
# Terminal 1: Backend
cd backend
./start-simple.bat      # Windows - Detecta PHP automáticamente
./start-portable.sh     # Linux/Mac
# O manualmente: php -S localhost:8000 -t public

# Terminal 2: Frontend  
cd frontend
npm run dev

# Abrir http://localhost:3000
```

### Configuración por Entorno
```

### Configuración por Entorno

#### **Opción 1: Servidor PHP Integrado (RECOMENDADO)**
```bash
# No requiere configuración especial
# Backend: http://localhost:8000
# Frontend ya configurado para esta URL
```

#### **Opción 2: XAMPP/Laragon/WAMP**
```bash
# 1. Copiar proyecto a tu carpeta web:
# XAMPP: C:/xampp/htdocs/bootbookingcamp
# Laragon: C:/laragon/www/bootbookingcamp  
# WAMP: C:/wamp64/www/bootbookingcamp

# 2. Configurar URL en frontend/.env:
VITE_API_BASE_URL=http://localhost/bootbookingcamp/backend/public

# 3. Iniciar tu servidor web (XAMPP/Laragon/WAMP)
# Backend: http://localhost/bootbookingcamp/backend/public
```

#### **Opción 3: Docker (Futuro)**
```bash
# Preparado pero no implementado aún
docker-compose up -d  # Próximamente
```

### Verificar Instalación

```bash
# Backend API (debe devolver JSON)
curl http://localhost:8000/health
curl http://localhost:8000/api/camping/info

# Frontend (abrir en navegador)
http://localhost:3000
```

### Resolución de Problemas

#### Error: PHP no encontrado
```bash
# Windows: Descargar de https://php.net
# Ubuntu/Debian: sudo apt install php8.1-cli composer
# macOS: brew install php composer
```

#### Error: Puerto ocupado
```bash
# Backend: Cambiar puerto
php -S localhost:8001 -t public

# Frontend: Cambiar .env
VITE_API_BASE_URL=http://localhost:8001
```

#### Error: CORS
```bash
# Asegúrate que backend esté en localhost:8000
# Y frontend en localhost:3000
# Los scripts automáticos configuran CORS correctamente
```

---

## Quick Start para Desarrollo

Si ya tienes todo configurado y solo quieres continuar desarrollando:

```bash
# Terminal 1: Backend
cd backend && php -S localhost:8000 -t public

# Terminal 2: Frontend
cd frontend && npm run dev

# URLs de acceso
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## Estructura del Proyecto

```
bootbookingcamp/
├── data/mock/              # Datos JSON para desarrollo
│   ├── camping.json        # Información del camping KCAMP
│   ├── accommodation_types.json  # Tipos de parcelas
│   ├── availability.json   # 6 meses de disponibilidad
│   ├── pricing_rules.json  # Reglas estacionales
│   └── pms_responses.json  # Simulación PMS externo
├── backend/                # API PHP con Slim Framework
│   ├── public/            # Entry point y assets
│   ├── src/               # Repository pattern, controllers
│   ├── tests/             # PHPUnit tests (coverage >80%)
│   └── composer.json      # Dependencies y scripts
├── frontend/               # App React con TypeScript
│   ├── src/               # Components, hooks, services
│   ├── public/            # Static assets
│   └── package.json       # React 18+ stack
├── docs/                   # Documentación técnica completa
├── diagramas/              # Diagramas Mermaid y visuales
├── página_*/               # Mockups UI generados
├── TESTING.md              # Estrategia de testing completa
├── BACKEND_STATUS.md       # Estado actual del desarrollo
└── docker-compose.future.yml  # Preparado para migración
```

---

## Funcionalidades Implementadas

### MVP Actual (Mock Data)
- **GET /api/camping/info** - Información completa del camping KCAMP
- **GET /api/availability** - Búsqueda de disponibilidades con filtros avanzados
- **POST /api/contact** - Formulario de contacto/reserva con validaciones
- **Frontend React** - Interfaz completa responsive con Material-UI
- **Datos realistas** - 6 meses de disponibilidad simulada con precios dinámicos
- **Testing integrado** - Unit + Integration + E2E tests

### Preparado para Migración
- **Repository Pattern** - Swap transparente JSON → Database
- **Docker configuration** - MySQL + Redis preparado
- **AWS integration** - Scripts de migración listos
- **PMS integration** - Arquitectura preparada para sistemas externos

---

## � Guías de Instalación por Sistema

### Windows

#### Con XAMPP:
```bash
# 1. Instalar XAMPP desde https://www.apachefriends.org
# 2. Clonar en c:/xampp/htdocs/
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 3. Instalar backend
cd backend && composer install && cd ..

# 4. Configurar frontend para XAMPP
cd frontend
cp .env.example .env
# Editar .env: VITE_API_BASE_URL=http://localhost/bootbookingcamp/backend/public
npm install && cd ..

# 5. Iniciar XAMPP (Apache) y abrir http://localhost:3000
cd frontend && npm run dev
```

#### Con Laragon:
```bash
# 1. Instalar Laragon desde https://laragon.org
# 2. Clonar en c:/laragon/www/
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 3. Usar el script automático (detecta Laragon)
cd backend && ./start.bat  # Detecta PHP de Laragon automáticamente

# 4. En otra terminal:
cd frontend && npm install && npm run dev
```

#### Solo PHP (Recomendado):
```bash
# 1. Instalar PHP 8.1+ desde https://windows.php.net
# 2. Instalar Composer desde https://getcomposer.org
# 3. Clonar proyecto
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 4. Setup automático  
./verify-setup.bat  # Verificar requisitos
cd backend && composer install && php -S localhost:8000 -t public

# 5. En otra terminal:
cd frontend && npm install && npm run dev
```

### Linux (Ubuntu/Debian)

```bash
# 1. Instalar requisitos
sudo apt update
sudo apt install php8.1-cli php8.1-mbstring php8.1-xml php8.1-curl composer nodejs npm git

# 2. Clonar proyecto  
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 3. Setup automático
./verify-setup.sh  # Verificar instalación
cd backend && composer install && ./start-portable.sh

# 4. En otra terminal:
cd frontend && npm install && npm run dev

# Abrir http://localhost:3000
```

### macOS

```bash
# 1. Instalar Homebrew si no lo tienes: https://brew.sh
# 2. Instalar requisitos
brew install php composer node git

# 3. Clonar proyecto
git clone https://github.com/krusty181/AI4Devs-finalproject-CGR.git bootbookingcamp
cd bootbookingcamp

# 4. Setup automático
./verify-setup.sh  # Verificar instalación  
cd backend && composer install && ./start-portable.sh

# 5. En otra terminal:
cd frontend && npm install && npm run dev

# Abrir http://localhost:3000
```

---

## �📚 Documentación del Proyecto

El proyecto incluye documentación técnica completa siguiendo mejores prácticas:

| Documento | Descripción | Estado |
|-----------|-------------|---------|
| [**0-ficha-del-proyecto.md**](0-ficha-del-proyecto.md) | Información general y datos del proyecto | Completo |
| [**1-descripcion-general-del-producto.md**](1-descripcion-general-del-producto.md) | Objetivos, funcionalidades y roadmap | Completo |
| [**2-arquitectura-del-sistema.md**](2-arquitectura-del-sistema.md) | Diagramas C4, componentes y decisiones técnicas | Completo |
| [**3-modelo-de-datos.md**](3-modelo-de-datos.md) | 8 entidades con diagramas Mermaid | Completo |
| [**4-especificaciones-de-la-api.md**](4-especificaciones-de-la-api.md) | OpenAPI 3.0.3 specification completa | Completo |
| [**5-historias-de-usuario.md**](5-historias-de-usuario.md) | HU críticas con criterios de aceptación | Completo |
| [**6-tickets-de-trabajo.md**](6-tickets-de-trabajo.md) | 3 tickets especializados (26 story points) | Completo |
| [**7-pull-requests.md**](7-pull-requests.md) | PRs del desarrollo con reviews | Pendiente |

## Índice

0. [Ficha del proyecto](0-ficha-del-proyecto.md)
1. [Descripción general del producto](1-descripcion-general-del-producto.md)
2. [Arquitectura del sistema](2-arquitectura-del-sistema.md)
3. [Modelo de datos](3-modelo-de-datos.md)
4. [Especificación de la API](4-especificaciones-de-la-api.md)
5. [Historias de usuario](5-historias-de-usuario.md)
6. [Tickets de trabajo](6-tickets-de-trabajo.md)
7. [Pull requests](7-pull-requests.md)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**
Cristina Gutierrez Rich

### **0.2. Nombre del proyecto:**
BOOTBOOKINGCAMP - Motor de Reservas para Hospederías

### **0.3. Descripción breve del proyecto:**
Sistema de reservas especializado en alojamientos vacacionales del sector hospederías. **Fase piloto** enfocada en un camping específico (KCAMP) con funcionalidades de información, búsqueda de disponibilidades y formulario de contacto. Desarrollado con **React 18+ y PHP 8.1+** usando arquitectura mock-first preparada para migración a producción.

### **0.4. URL del proyecto:**
https://github.com/krusty181/AI4Devs-finalproject-CGR

### **0.5. URL o archivo comprimido del repositorio:**
https://github.com/krusty181/AI4Devs-finalproject-CGR

> Para información detallada, consultar [0-ficha-del-proyecto.md](0-ficha-del-proyecto.md)


---

## 1. Descripción general del producto

> Describe en detalle los siguientes aspectos del producto:

### **1.1. Objetivo:**

> Propósito del producto. Qué valor aporta, qué soluciona, y para quién.

### **1.2. Características y funcionalidades principales:**

> Enumera y describe las características y funcionalidades específicas que tiene el producto para satisfacer las necesidades identificadas.

### **1.3. Diseño y experiencia de usuario:**

> Proporciona imágenes y/o videotutorial mostrando la experiencia del usuario desde que aterriza en la aplicación, pasando por todas las funcionalidades principales.

### **1.4. Instrucciones de instalación:**
> Documenta de manera precisa las instrucciones para instalar y poner en marcha el proyecto en local (librerías, backend, frontend, servidor, base de datos, migraciones y semillas de datos, etc.)

**Documentación completa:** [1-descripcion-general-del-producto.md](1-descripcion-general-del-producto.md)

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**
> Usa el formato que consideres más adecuado para representar los componentes principales de la aplicación y las tecnologías utilizadas. Explica si sigue algún patrón predefinido, justifica por qué se ha elegido esta arquitectura, y destaca los beneficios principales que aportan al proyecto y justifican su uso, así como sacrificios o déficits que implica.


### **2.2. Descripción de componentes principales:**

> Describe los componentes más importantes, incluyendo la tecnología utilizada

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

> Representa la estructura del proyecto y explica brevemente el propósito de las carpetas principales, así como si obedece a algún patrón o arquitectura específica.

### **2.4. Infraestructura y despliegue**

> Detalla la infraestructura del proyecto, incluyendo un diagrama en el formato que creas conveniente, y explica el proceso de despliegue que se sigue

### **2.5. Seguridad**

> Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede

### **2.6. Tests**

> Describe brevemente algunos de los tests realizados

**Documentación completa:** [2-arquitectura-del-sistema.md](2-arquitectura-del-sistema.md)

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.


### **3.2. Descripción de entidades principales:**

> Recuerda incluir el máximo detalle de cada entidad, como el nombre y tipo de cada atributo, descripción breve si procede, claves primarias y foráneas, relaciones y tipo de relación, restricciones (unique, not null…), etc.

**Documentación completa:** [3-modelo-de-datos.md](3-modelo-de-datos.md)

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

🔌 **Documentación completa:** [4-especificaciones-de-la-api.md](4-especificaciones-de-la-api.md)

---

## 5. Historias de Usuario

> Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto.

**Historia de Usuario 1:** Información del Camping

**Historia de Usuario 2:** Búsqueda de Disponibilidades  

**Historia de Usuario 3:** Formulario de Contacto

👤 **Documentación completa:** [5-historias-de-usuario.md](5-historias-de-usuario.md)

---

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

**Ticket 1:** Backend - API de Disponibilidades con Integración PMS

**Ticket 2:** Frontend - Interfaz de Búsqueda de Disponibilidades

**Ticket 3:** Base de Datos - Estructura completa con migraciones y datos semilla

🎫 **Documentación completa:** [6-tickets-de-trabajo.md](6-tickets-de-trabajo.md)

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1:** [Pendiente de creación]

**Pull Request 2:** [Pendiente de creación]

**Pull Request 3:** [Pendiente de creación]

🔀 **Documentación completa:** [7-pull-requests.md](7-pull-requests.md)

---

## Testing y Calidad

- **Backend:** >85% coverage con PHPUnit + análisis estático PHPStan
- **Frontend:** >78% coverage con Vitest + Testing Library
- **E2E:** Cypress para flujos críticos completos
- **Code Quality:** ESLint + Prettier + PHP CS Fixer

**Detalles completos:** [TESTING.md](TESTING.md)

---

## 📈 Estado del Desarrollo

- **MVP Fase Piloto:** Completado (Mock data)
- **Backend API:** 3 endpoints implementados
- **Frontend React:** Interfaz completa responsive
- **Testing Suite:** Unit + Integration + E2E
- **Migración Production:** Preparado (Docker + AWS)

**Estado detallado:** [BACKEND_STATUS.md](BACKEND_STATUS.md)

---

## Scripts de Desarrollo

### Backend (PHP 8.1+)
```bash
composer start              # Servidor desarrollo
composer test               # Tests PHPUnit
composer test-coverage      # Coverage HTML
composer phpstan            # Análisis estático
composer cs-fix             # Code style fix
```

### Frontend (React 18+)
```bash
npm run dev                 # Desarrollo con HMR
npm run build              # Build producción
npm run test               # Tests Vitest
npm run test:coverage      # Coverage report
npm run lint:fix           # ESLint + Prettier fix
npm run type-check         # TypeScript verification
```

### Migración a Producción
```bash
# Cuando esté listo:
docker-compose -f docker-compose.future.yml up
# Incluye: MySQL 8.0, Redis, nginx load balancer
```

---

## FAQ - Preguntas Frecuentes

### **Q: ¿Por qué no funciona en mi computadora?**
A: Ejecuta `./verify-setup.bat` (Windows) o `./verify-setup.sh` (Linux/Mac) para verificar que tienes todos los requisitos instalados.

### **Q: ¿Cómo cambio la URL del backend?**
A: Solo necesitas editar **un archivo**: `frontend/.env`
```bash
# Para servidor PHP integrado (recomendado)
VITE_API_BASE_URL=http://localhost:8000

# Para XAMPP/Laragon
VITE_API_BASE_URL=http://localhost/tu-proyecto/backend/public
```

### **Q: Error "PHP no encontrado"**
A: 
- **Windows:** Descargar PHP 8.1+ desde https://windows.php.net
- **Linux:** `sudo apt install php8.1-cli composer`
- **Mac:** `brew install php composer`

### **Q: Error "Puerto 8000 ocupado"**
A: Usa otro puerto:
```bash
# Backend
php -S localhost:8001 -t public

# Frontend: cambiar .env
VITE_API_BASE_URL=http://localhost:8001
```

### **Q: ¿Funciona sin Docker?**
A: ¡Sí! El proyecto está diseñado para funcionar directamente con PHP y Node.js. Docker es opcional para producción.

### **Q: ¿Cómo contribuir al proyecto?**
A: 
1. Fork del repositorio
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Q: ¿Dónde están los archivos de configuración importantes?**
- **Backend:** `backend/public/index.php`, `backend/composer.json`
- **Frontend:** `frontend/.env`, `frontend/package.json`, `frontend/vite.config.ts`
- **Scripts:** `backend/start-simple.bat`, `verify-setup.bat`

### **Q: ¿El proyecto funciona en móviles?**
A: Sí, el frontend es completamente responsive y funciona en móviles, tablets y desktop.

---

## Licencia

Este proyecto es parte del programa AI4Devs y está desarrollado con fines educativos.

**Autor:** Cristina Gutierrez Rich  
**Curso:** AI4Devs - Proyecto Final  
**Fecha:** Octubre 2025

