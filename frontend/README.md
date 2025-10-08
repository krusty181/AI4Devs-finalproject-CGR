# BOOTBOOKINGCAMP Frontend

**React 18 + TypeScript + Material-UI - Interfaz de usuario para sistema de reservas de camping**

## 🚀 Setup Rápido

### Prerrequisitos
- Node.js 18+
- npm 8+
- Backend API corriendo en `http://localhost:8000`

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (opcional)
cp .env.example .env

# 3. Iniciar desarrollo
npm run dev

# 4. Abrir navegador
# http://localhost:3000
```

### ⚙️ Configuración de API URL

**¡CONFIGURACIÓN CENTRALIZADA!** Solo necesitas cambiar la URL en un lugar:

```bash
# Archivo: .env (copia de .env.example)
VITE_API_BASE_URL=http://localhost:8000
```

**Opciones comunes:**
```bash
# Servidor PHP integrado (RECOMENDADO)
VITE_API_BASE_URL=http://localhost:8000

# Laragon/XAMPP con ruta completa
VITE_API_BASE_URL=http://localhost/LIDR-AI4Devs/AI4Devs-finalproject-CGR/backend/public

# Producción
VITE_API_BASE_URL=https://api.bootbookingcamp.com
```

### Verificar Funcionamiento

1. **Backend debe estar corriendo:**
   ```bash
   # En otra terminal, en la carpeta backend
   php -S localhost:8000 -t public
   ```

2. **Frontend conectado:**
   - Página principal: `http://localhost:3000`
   - Búsqueda de disponibilidades funcional
   - Formulario de contacto operativo

## 🏗️ Arquitectura Frontend

### Stack Tecnológico
- **React 18** - Biblioteca UI con Hooks y Concurrent Features
- **TypeScript** - Tipado estático para mayor robustez
- **Material-UI v5** - Componentes UI consistentes y accesibles
- **React Router v6** - Navegación SPA
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Formularios performantes
- **Vite** - Build tool ultra rápido
- **Axios** - Cliente HTTP con interceptors

### Estructura del Proyecto
```
src/
├── components/          # Componentes reutilizables
│   ├── Common/         # Componentes generales
│   ├── Layout/         # Header, Footer, Navigation
│   ├── Forms/          # Formularios específicos
│   └── UI/             # Componentes UI básicos
├── pages/              # Páginas principales
│   ├── HomePage.tsx    # Página principal del camping
│   ├── AvailabilityPage.tsx    # Búsqueda y resultados
│   ├── AccommodationDetailPage.tsx    # Detalle de parcela
│   └── ContactPage.tsx # Formulario de contacto
├── services/           # API calls e integración backend
├── hooks/              # Custom hooks
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades y helpers
└── theme.ts            # Configuración Material-UI
```

## 🎨 Funcionalidades UI

### ✅ Páginas Implementadas

#### 🏠 **Página Principal**
- **Hero Section** - Imagen principal del camping
- **Servicios** - Grid de servicios disponibles
- **Ubicación** - Mapa y información de contacto
- **Atracciones Cercanas** - Puntos de interés
- **CTA Búsqueda** - Acceso rápido a disponibilidades

#### 🔍 **Búsqueda de Disponibilidades**
- **Formulario de Búsqueda**
  - Selector de fechas (Date Picker)
  - Número de adultos y niños
  - Validaciones en tiempo real
- **Resultados**
  - Cards de parcelas disponibles
  - Información de precios dinámicos
  - Imágenes y amenities
  - Botón "Ver Detalles"

#### 🏕️ **Detalle de Alojamiento**
- **Galería de Imágenes** - Carousel responsive
- **Información Completa** - Capacidad, servicios, características
- **Pricing Breakdown** - Desglose de precios por noche
- **Reglas de Precios** - Temporadas y descuentos aplicados
- **Botón Reservar** - Lleva al formulario de contacto

#### 📝 **Formulario de Contacto**
- **Validación Completa** - React Hook Form + Yup
- **Campos Requeridos** - Nombre, email, teléfono, fechas, mensaje
- **Feedback Visual** - Estados de loading, success, error
- **Accesibilidad** - ARIA labels, focus management

### 🎯 **Características UX**

#### **Responsive Design**
- **Mobile First** - Optimizado para móviles
- **Breakpoints Material-UI** - xs, sm, md, lg, xl
- **Touch Friendly** - Botones y enlaces táctiles

#### **Performance**
- **Code Splitting** - Carga lazy de rutas
- **Image Optimization** - Lazy loading de imágenes
- **API Caching** - React Query con stale-while-revalidate
- **Bundle Optimization** - Tree shaking automático

#### **Accesibilidad**
- **WCAG 2.1 AA** - Contraste, navegación por teclado
- **Screen Readers** - ARIA labels y roles semánticos
- **Focus Management** - Orden lógico de navegación

## 🧪 Testing y Calidad

### Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo (puerto 3000)
npm run build           # Build para producción
npm run preview         # Preview del build

# Testing
npm run test            # Tests unitarios con Vitest
npm run test:coverage   # Coverage report
npm run cypress         # E2E tests interactivos
npm run cypress:run     # E2E tests headless

# Calidad
npm run lint            # ESLint check
npm run lint:fix        # Fix automático
npm run type-check      # TypeScript check
```

### Testing Strategy

#### **Unit Tests (Vitest)**
- Componentes aislados
- Hooks personalizados
- Utilidades y helpers
- Servicios API

#### **Integration Tests**
- Flujos de usuario completos
- Integración con APIs mock
- Navegación entre páginas

#### **E2E Tests (Cypress)**
- Flujo completo de búsqueda
- Envío de formulario
- Responsive en diferentes dispositivos

## ⚙️ Configuración

### Variables de Entorno

```env
# .env.local
VITE_API_BASE_URL=http://localhost:8000
VITE_ENABLE_DEVTOOLS=true
VITE_APP_TITLE=BOOTBOOKINGCAMP
```

### Configuración de Desarrollo

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

## 🚀 Build y Deploy

### Build de Producción

```bash
# Crear build optimizado
npm run build

# Los archivos se generan en /dist
# Listos para servir con cualquier servidor web
```

### Deploy Options

#### **Opción 1: Servidor Estático**
```bash
# Build y servir con cualquier servidor
npm run build
npx serve dist
```

#### **Opción 2: Apache/Nginx**
```bash
npm run build
# Copiar contenido de /dist a DocumentRoot
```

#### **Opción 3: Vercel/Netlify**
```bash
# Conectar repositorio
# Build automático en cada push
```

## 🔧 Integración con Backend

### API Endpoints Utilizadas

```typescript
// Servicios implementados
campingService.getCampingInfo()           // GET /api/camping/info
availabilityService.searchAvailability() // GET /api/availability  
contactService.submitContactForm()       // POST /api/contact
healthService.checkHealth()              // GET /health
```

### Error Handling

```typescript
// Manejo de errores global
- Network errors → "Check connection"  
- 429 Rate limit → "Too many requests"
- 500+ Server → "Server error, try later"
- Validation → Specific field errors
```

### Loading States

```typescript
// Estados de carga por operación
const { data, isLoading, error } = useQuery('camping', campingService.getCampingInfo)
```

## 🎨 Theming y Estilos

### Material-UI Theme

```typescript
// Colores brand BOOTBOOKINGCAMP
primary: '#2e7d32'      // Forest Green
secondary: '#ff6f00'    // Camping Orange
background: '#f5f5f5'   // Light Gray
```

### Componentes Personalizados

```typescript
// Botones con gradientes
// Cards con hover effects  
// Forms con validación visual
// Loading skeletons
```

## 🐛 Troubleshooting

### Frontend no inicia
```bash
# Verificar Node.js version
node --version  # Debe ser 18+

# Limpiar dependencias
rm -rf node_modules package-lock.json
npm install
```

### APIs no responden
```bash
# Verificar backend corriendo
curl http://localhost:8000/health

# Verificar proxy en vite.config.ts
# Verificar CORS en backend
```

### Build falla
```bash
# Verificar TypeScript errors
npm run type-check

# Verificar linting
npm run lint
```

---

**BOOTBOOKINGCAMP Frontend** - *Experiencia de usuario excepcional para reservas de camping* 🎨