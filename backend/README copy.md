# BOOTBOOKINGCAMP Backend API

**PHP 8.1+ API con Slim Framework 4 y arquitectura Repository Pattern**

## 🚀 Setup Rápido

### Prerrequisitos
- PHP 8.1+
- Composer
- Git

### Instalación

```bash
# 1. Instalar dependencias
composer install

# 2. Configurar variables de entorno
cp ../.env.example ../.env

# 3. Iniciar servidor de desarrollo
php -S localhost:8000 -t public

# 4. Verificar funcionamiento
curl http://localhost:8000/health
```

### Verificar APIs

```bash
# Información del camping
curl http://localhost:8000/api/camping/info

# Búsqueda de disponibilidades
curl "http://localhost:8000/api/availability?check_in=2025-07-15&check_out=2025-07-20&adults=2&children=1"

# Formulario de contacto (POST)
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "María García",
    "email": "maria@example.com",
    "phone": "+34 612 345 678",
    "check_in_date": "2025-07-15",
    "check_out_date": "2025-07-20",
    "num_adults": 2,
    "num_children": 1,
    "message": "Consulta sobre disponibilidad parcela premium"
  }'
```

## 🏗️ Arquitectura

### Repository Pattern
- **JsonCampingRepository** - Datos del camping desde JSON
- **JsonAvailabilityRepository** - Búsqueda de disponibilidades 
- **JsonContactRepository** - Gestión de formularios de contacto
- **JsonAccommodationTypeRepository** - Tipos de alojamiento

### Capas de la Aplicación
```
src/
├── Domain/              # Entidades y contratos
│   ├── Entity/         # Camping, Contact, AccommodationType
│   └── Repository/     # Interfaces de repositorio
├── Application/        # Servicios de aplicación
│   ├── Service/        # CampingService, AvailabilityService, ContactService
│   └── Bootstrap.php   # Configuración DI y rutas
└── Infrastructure/     # Implementaciones
    ├── Repository/     # Repositorios JSON
    └── Controller/     # Controladores REST
```

## 🧪 Testing

```bash
# Ejecutar tests
composer test

# Tests con coverage
composer test-coverage

# Análisis estático
composer phpstan

# Code style check
composer cs-check

# Fix code style
composer cs-fix

# Ejecutar todas las verificaciones
composer check
```

## 📊 Datos Mock

Los datos están en `../data/mock/`:
- **camping.json** - Información completa del camping KCAMP
- **accommodation_types.json** - 3 tipos de parcela (Estándar, Premium, Eco)
- **availability.json** - 6 meses de disponibilidad realista
- **pricing_rules.json** - 8 reglas de precios dinámicos
- **contact_requests.json** - Formularios enviados (se crea automáticamente)

### Configuración Mock

```env
# En .env
DATA_SOURCE_MODE=mock
MOCK_ENABLE_DELAYS=true    # Simular delays reales de API
MOCK_ERROR_RATE=0.05       # 5% de errores simulados
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
composer start              # Iniciar servidor PHP
composer install           # Instalar dependencias
composer dump-autoload     # Regenerar autoloader

# Testing
composer test              # Tests unitarios e integración
composer test-coverage     # Coverage HTML en /coverage

# Calidad de código  
composer phpstan           # Análisis estático nivel 8
composer cs-check          # PSR-12 compliance check
composer cs-fix            # Fix automático de estilo
composer php-cs-fixer      # Herramienta adicional de formato

# Todo junto
composer check             # cs-check + phpstan + test
```

## 📋 APIs Disponibles

### GET /health
```json
{
  "status": "ok",
  "version": "1.0.0", 
  "timestamp": "2025-01-18T15:30:00+01:00",
  "mode": "mock"
}
```

### GET /api/camping/info
Información completa del camping KCAMP con servicios, ubicación, reglas y atracciones cercanas.

### GET /api/availability
Búsqueda de disponibilidades con filtros:
- `check_in` (requerido): Fecha entrada YYYY-MM-DD
- `check_out` (requerido): Fecha salida YYYY-MM-DD  
- `adults` (requerido): Número de adultos (1-10)
- `children` (opcional): Número de niños (0-8)

### POST /api/contact
Envío de formulario de contacto con validaciones completas.

## ⚙️ Configuración

### Variables de Entorno

```env
# Modo de datos
DATA_SOURCE_MODE=mock          # mock | database

# Configuración Mock
MOCK_ENABLE_DELAYS=true        # Simular latencia real
MOCK_ERROR_RATE=0.05          # 5% tasa de errores

# API
API_BASE_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_REQUESTS_PER_MINUTE=100
RATE_LIMIT_CONTACT_FORMS_PER_HOUR=5

# Logging
APP_ENV=development            # development | production
APP_DEBUG=true                 # Logging detallado
```

### Middleware Stack
1. **CORS** - Configuración flexible de origins
2. **Rate Limiting** - Protección contra abuso
3. **Logging** - Request/response con timings
4. **Error Handling** - Respuestas consistentes

## 🔄 Migración a Producción

### Paso 1: Cambiar a Base de Datos
```bash
# 1. Configurar Docker services
docker-compose -f ../docker-compose.future.yml up -d

# 2. Actualizar .env
DATA_SOURCE_MODE=database

# 3. Los repositorios se cambian automáticamente vía DI
# 4. Datos mock se migran automáticamente
```

### Paso 2: Configuración de Producción
```env
APP_ENV=production
APP_DEBUG=false
MOCK_ENABLE_DELAYS=false
MOCK_ERROR_RATE=0
RATE_LIMIT_REQUESTS_PER_MINUTE=1000
```

## 🐛 Troubleshooting

### Backend no inicia
```bash
# Verificar versión PHP
php --version  # Debe ser 8.1+

# Verificar extensiones necesarias
php -m | grep -E "(json|mbstring|pdo)"

# Reinstalar dependencias
rm -rf vendor && composer install
```

### Tests fallan
```bash
# Verificar permisos en data/mock/
chmod -R 755 ../data/mock/

# Regenerar autoloader
composer dump-autoload

# Ejecutar test específico
./vendor/bin/phpunit tests/CampingRepositoryTest.php --verbose
```

### APIs no responden
```bash
# Verificar rutas
curl -i http://localhost:8000/health

# Verificar logs (si están configurados)
tail -f logs/app.log

# Verificar datos mock
ls -la ../data/mock/
```

## 📈 Performance

### Benchmarks Actuales (Mock Mode)
- **Health check**: ~10ms
- **Camping info**: ~50-200ms (con delays simulados)
- **Availability search**: ~200-500ms (con delays simulados)
- **Contact form**: ~100-300ms (con delays simulados)

### Optimizaciones
- **File caching** - Los JSONs se cachean en memory
- **Validation caching** - Reglas de validación compiladas
- **Response compression** - Gzip automático para responses >1KB
- **Connection pooling** - Preparado para MySQL connections

---

**BOOTBOOKINGCAMP Backend** - *Arquitectura flexible, migración sin dolor* 🔧