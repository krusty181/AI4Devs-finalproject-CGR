# Tickets de Trabajo - BOOTBOOKINGCAMP

**Proyecto:** BOOTBOOKINGCAMP - Sistema de reservas para camping (Fase Piloto)  
**Sprint Planning:** Octubre 2025  
**Team:** Frontend Developer + Backend Developer + QA Support

---

## 0. Prompt Utilizado para la Generación

### Contexto del Prompt:
**Fecha:** Octubre 2025  
**Proyecto:** BOOTBOOKINGCAMP - Sistema de reservas para campings (Fase Piloto)  
**Objetivo:** Crear tickets de trabajo detallados basados en las historias de usuario críticas

### Prompt Principal:
```
"A partir de las historias de usuario creadas, crea los tickets de trabajo en un nuevo documento según estas especificaciones:

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto."
```

### Contexto Previo Proporcionado:
- **Historias de Usuario:** HU001 (información camping), HU003 (disponibilidades), HU006 (formulario contacto)
- **Arquitectura Técnica:** React 18+, PHP 8.1+, MySQL 8.0, AWS (RDS, ElastiCache, S3, CloudFront)
- **API Specifications:** OpenAPI 3.0.3 con 3 endpoints principales definidos
- **Modelo de Datos:** 8 entidades relacionadas con diagramas Mermaid y especificaciones completas
- **Restricciones:** Fase piloto, equipo reducido, integración PMS requerida

### Criterios de Creación Aplicados:
1. **Especialización por Disciplina:** Un ticket backend, uno frontend, uno database
2. **Detalle Técnico Completo:** Stack, código ejemplo, estructura de archivos
3. **Mejores Prácticas:** Testing, validaciones, gestión de errores, documentación
4. **Estimaciones Realistas:** Basadas en complejidad y dependencias
5. **Criterios de Aceptación:** Verificables y específicos

### Metodología de Desarrollo:
- **Agile/Scrum:** Sprints de 2-3 semanas con entregas incrementales
- **Definition of Done:** Tests, documentación, code review, deployment
- **Risk Management:** Dependencias identificadas, mitigaciones definidas
- **Quality Assurance:** Cobertura de tests > 75%, performance benchmarks

### Estructura de Tickets Implementada:
```
Cada Ticket incluye:
├── Información General (ID, tipo, prioridad, estimación, sprint, asignado)
├── Descripción y Objetivos (propósito, valor aportado)
├── Requisitos Técnicos (stack, especificaciones, estructura)
├── Tareas de Desarrollo (desglosadas por puntos de historia)
├── Código de Ejemplo (implementación específica)
├── Criterios de Aceptación (verificables)
├── Dependencias (bloqueantes y facilitadores)
├── Testing Requirements (casos de prueba específicos)
└── Riesgos y Mitigaciones (identificación proactiva)
```

### Resultado de la Creación:
**3 tickets especializados** que cubren el desarrollo completo de la funcionalidad más crítica:
- **BOOT-001 (Backend):** API de disponibilidades con integración PMS - 13 puntos
- **BOOT-002 (Frontend):** Interfaz de búsqueda responsive - 8 puntos  
- **BOOT-003 (Database):** Estructura completa con migraciones - 5 puntos
- **Total:** 26 puntos de historia para 6-7 semanas de desarrollo

---

## Índice

0. [Prompt Utilizado para la Generación](#0-prompt-utilizado-para-la-generación)
1. [Ticket 1 - Backend: API de Disponibilidades con Integración PMS](#ticket-1---backend-api-de-disponibilidades-con-integración-pms)
2. [Ticket 2 - Frontend: Interfaz de Búsqueda de Disponibilidades](#ticket-2---frontend-interfaz-de-búsqueda-de-disponibilidades)
3. [Ticket 3 - Base de Datos: Estructura completa con migraciones y datos semilla](#ticket-3---base-de-datos-estructura-completa-con-migraciones-y-datos-semilla)

---

## Ticket 1 - Backend: API de Disponibilidades con Integración PMS

### Información General
- **ID:** BOOT-001
- **Tipo:** Backend Development
- **Historia de Usuario:** HU003 - Consultar disponibilidad por fechas
- **Prioridad:** Alta
- **Estimación:** 13 puntos de historia
- **Sprint:** 2
- **Asignado a:** Backend Developer
- **Estado:** To Do

### Descripción
Implementar el sistema completo de consulta de disponibilidades que integre con el PMS externo del camping, incluya sistema de caché inteligente y proporcione una API REST optimizada para el frontend.

### Objetivos
1. Crear endpoint `/api/availability` con parámetros completos de búsqueda
2. Integrar con API del PMS del camping piloto
3. Implementar sistema de caché Redis para optimización
4. Gestionar estados de error y fallbacks
5. Implementar rate limiting y validaciones de seguridad

### Requisitos Técnicos

#### Stack Tecnológico
- **Framework:** PHP 8.1+ con Slim Framework
- **Base de Datos:** MySQL 8.0 en AWS RDS
- **Cache:** Redis en AWS ElastiCache
- **Infraestructura:** AWS (EC2/ECS)
- **Testing:** PHPUnit

#### Especificaciones del Endpoint

**GET /api/availability**

**Parámetros de Entrada:**
```php
[
    'check_in' => 'required|date|after:today',
    'check_out' => 'required|date|after:check_in',
    'adults' => 'required|integer|min:1|max:10',
    'children' => 'integer|min:0|max:8',
    'accommodation_type_id' => 'integer|exists:accommodation_types,id'
]
```

**Respuesta Esperada:**
```json
{
    "success": true,
    "data": {
        "search_params": {
            "check_in": "2025-07-15",
            "check_out": "2025-07-20",
            "nights": 5,
            "adults": 2,
            "children": 1,
            "total_guests": 3
        },
        "available_accommodations": [
            {
                "accommodation_type_id": 1,
                "name": "Parcela Estándar",
                "description": "Parcela espaciosa para tienda o caravana pequeña",
                "max_capacity": 4,
                "area_m2": 80.0,
                "available_units": 3,
                "total_units": 10,
                "pricing": {
                    "base_price_per_night": 25.00,
                    "total_base_price": 125.00,
                    "seasonal_modifier": 15.00,
                    "total_price": 140.00,
                    "currency": "EUR"
                },
                "services": ["electricidad", "agua", "desague"],
                "images": ["https://cdn.bootbookingcamp.com/kcamp/parcela-standard.jpg"]
            }
        ],
        "metadata": {
            "data_source": "pms_integration",
            "last_updated": "2025-10-05T10:25:00Z",
            "cache_ttl": 900
        }
    },
    "language": "es",
    "timestamp": "2025-10-05T10:30:00Z"
}
```

### Tareas de Desarrollo

#### 1. Configuración Base (2 puntos)
- [ ] Configurar estructura de rutas para `/api/availability`
- [ ] Implementar middleware de validación de parámetros
- [ ] Configurar conexión Redis con AWS ElastiCache
- [ ] Establecer logging específico para disponibilidades

#### 2. Integración PMS (5 puntos)
- [ ] Analizar documentación API del PMS del camping piloto
- [ ] Crear adaptador `PMSIntegrationService`
- [ ] Implementar mapeo de datos PMS → formato interno
- [ ] Gestionar autenticación y tokens del PMS
- [ ] Implementar retry logic para fallos de conectividad
- [ ] Crear fallback a datos locales si PMS no disponible

```php
class PMSIntegrationService
{
    public function getAvailability($checkIn, $checkOut, $guests): array
    {
        // Implementación de integración con PMS
        $response = $this->httpClient->post($this->pmsEndpoint, [
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'adults' => $guests['adults'],
            'children' => $guests['children']
        ]);
        
        return $this->mapPMSResponse($response);
    }
    
    private function mapPMSResponse($pmsData): array
    {
        // Mapeo específico del formato PMS al formato interno
    }
}
```

#### 3. Sistema de Caché (3 puntos)
- [ ] Implementar `AvailabilityCacheService`
- [ ] Definir estrategia de keys de caché
- [ ] Configurar TTL dinámico por temporada
- [ ] Implementar invalidación inteligente de caché
- [ ] Crear métricas de hit/miss ratio

```php
class AvailabilityCacheService
{
    private $redis;
    
    public function getCachedAvailability($searchParams): ?array
    {
        $key = $this->generateCacheKey($searchParams);
        return $this->redis->get($key);
    }
    
    public function setCachedAvailability($searchParams, $data, $ttl = 900): void
    {
        $key = $this->generateCacheKey($searchParams);
        $this->redis->setex($key, $ttl, json_encode($data));
    }
    
    private function generateCacheKey($params): string
    {
        return 'availability:' . md5(serialize($params));
    }
}
```

#### 4. Controlador Principal (2 puntos)
- [ ] Crear `AvailabilityController`
- [ ] Implementar lógica de negocio completa
- [ ] Gestionar estados de error (404, 422, 500)
- [ ] Implementar rate limiting (100 req/min)

```php
class AvailabilityController
{
    public function getAvailability(Request $request, Response $response): Response
    {
        try {
            // Validar parámetros
            $params = $this->validateSearchParams($request->getQueryParams());
            
            // Verificar caché
            $cachedData = $this->cacheService->getCachedAvailability($params);
            if ($cachedData) {
                return $this->jsonResponse($response, $cachedData);
            }
            
            // Consultar PMS
            $availability = $this->pmsService->getAvailability(
                $params['check_in'],
                $params['check_out'],
                $params
            );
            
            // Aplicar reglas de precios
            $pricedAvailability = $this->pricingService->applyPricing($availability, $params);
            
            // Cachear resultado
            $this->cacheService->setCachedAvailability($params, $pricedAvailability);
            
            return $this->jsonResponse($response, $pricedAvailability);
            
        } catch (ValidationException $e) {
            return $this->errorResponse($response, 422, $e->getErrors());
        } catch (PMSUnavailableException $e) {
            return $this->errorResponse($response, 503, 'PMS temporalmente no disponible');
        }
    }
}
```

#### 5. Testing (1 punto)
- [ ] Tests unitarios para PMSIntegrationService
- [ ] Tests unitarios para AvailabilityCacheService
- [ ] Tests de integración para el endpoint completo
- [ ] Mocks para PMS externo
- [ ] Tests de performance y load testing

### Criterios de Aceptación
- ✅ El endpoint responde correctamente con disponibilidades reales del PMS
- ✅ Sistema de caché funcionando con TTL de 15 minutos
- ✅ Rate limiting configurado a 100 requests/minuto
- ✅ Fallback a datos locales si PMS no disponible
- ✅ Respuestas < 500ms para datos cacheados
- ✅ Respuestas < 2 segundos para consultas PMS
- ✅ Cobertura de tests > 80%
- ✅ Logs estructurados para debugging

### Dependencias
- Acceso a API del PMS del camping piloto
- AWS ElastiCache Redis configurado
- Base de datos con estructura de ACCOMMODATION_TYPES
- SSL certificado para llamadas HTTPS al PMS

### Riesgos y Mitigaciones
- **Riesgo:** PMS inestable o lento
  - **Mitigación:** Timeout de 3s + fallback + datos locales
- **Riesgo:** Cambios en API del PMS
  - **Mitigación:** Versionado del adaptador + monitorización
- **Riesgo:** Sobrecarga de Redis
  - **Mitigación:** TTL configurables + métricas de uso

---

## Ticket 2 - Frontend: Interfaz de Búsqueda de Disponibilidades

### Información General
- **ID:** BOOT-002
- **Tipo:** Frontend Development
- **Historia de Usuario:** HU003 - Consultar disponibilidad por fechas
- **Prioridad:** Alta
- **Estimación:** 8 puntos de historia
- **Sprint:** 2
- **Asignado a:** Frontend Developer
- **Estado:** To Do

### Descripción
Desarrollar la interfaz completa de búsqueda de disponibilidades con React 18+, incluyendo formulario de búsqueda, visualización de resultados, estados de carga, gestión de errores y diseño responsive.

### Objetivos
1. Crear componente `AvailabilitySearch` completo y reutilizable
2. Implementar formulario con validaciones client-side
3. Mostrar resultados con información de precios y disponibilidad
4. Gestionar estados de carga, éxito y error
5. Garantizar diseño responsive y accesible

### Requisitos Técnicos

#### Stack Tecnológico
- **Framework:** React 18+ con hooks
- **Gestión de Estado:** React Query + useState/useReducer
- **Formularios:** React Hook Form + Zod validations
- **UI Components:** Material-UI v5 o TailwindCSS
- **Date Picker:** React DatePicker
- **HTTP Client:** Axios
- **Testing:** Jest + React Testing Library

#### Estructura de Componentes

```
src/components/availability/
├── AvailabilitySearch/
│   ├── index.ts
│   ├── AvailabilitySearch.tsx
│   ├── AvailabilitySearch.test.tsx
│   ├── AvailabilitySearch.styles.ts
│   └── types.ts
├── SearchForm/
│   ├── SearchForm.tsx
│   ├── DateRangePicker.tsx
│   ├── GuestSelector.tsx
│   └── AccommodationFilter.tsx
├── ResultsList/
│   ├── ResultsList.tsx
│   ├── AccommodationCard.tsx
│   ├── PricingDisplay.tsx
│   └── LoadingSkeletons.tsx
└── hooks/
    ├── useAvailabilitySearch.ts
    ├── useSearchValidation.ts
    └── useSearchResults.ts
```

### Tareas de Desarrollo

#### 1. Configuración Base y Hooks (2 puntos)
- [ ] Configurar estructura de carpetas y archivos
- [ ] Implementar custom hook `useAvailabilitySearch`
- [ ] Configurar React Query para gestión de estado
- [ ] Establecer types TypeScript para toda la funcionalidad

```typescript
// useAvailabilitySearch.ts
interface SearchParams {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  accommodationType?: number;
}

interface AvailabilityResult {
  accommodationTypeId: number;
  name: string;
  description: string;
  maxCapacity: number;
  availableUnits: number;
  totalUnits: number;
  pricing: {
    basePricePerNight: number;
    totalBasePrice: number;
    totalPrice: number;
    currency: string;
  };
  services: string[];
  images: string[];
}

export const useAvailabilitySearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['availability', searchParams],
    queryFn: () => searchParams ? fetchAvailability(searchParams) : null,
    enabled: !!searchParams,
    staleTime: 15 * 60 * 1000, // 15 minutos
    retry: 2,
  });

  const searchAvailability = useCallback((params: SearchParams) => {
    setSearchParams(params);
  }, []);

  return {
    searchAvailability,
    results: data?.data?.availableAccommodations || [],
    isLoading,
    error,
    refetch,
    searchParams
  };
};
```

#### 2. Formulario de Búsqueda (3 puntos)
- [ ] Componente `SearchForm` con React Hook Form
- [ ] `DateRangePicker` con validaciones de fechas
- [ ] `GuestSelector` para adultos y niños
- [ ] `AccommodationFilter` opcional
- [ ] Validaciones client-side completas

```typescript
// SearchForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  checkIn: z.date().min(new Date(), 'La fecha debe ser futura'),
  checkOut: z.date(),
  adults: z.number().min(1, 'Mínimo 1 adulto').max(10, 'Máximo 10 adultos'),
  children: z.number().min(0).max(8, 'Máximo 8 niños'),
  accommodationType: z.number().optional()
}).refine(
  (data) => data.checkOut > data.checkIn,
  {
    message: "La fecha de salida debe ser posterior a la de entrada",
    path: ["checkOut"]
  }
);

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      adults: 2,
      children: 0
    }
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-form">
      <div className="date-section">
        <DateRangePicker
          startDate={watch('checkIn')}
          endDate={watch('checkOut')}
          onChange={({ startDate, endDate }) => {
            setValue('checkIn', startDate);
            setValue('checkOut', endDate);
          }}
          minDate={new Date()}
          error={errors.checkIn?.message || errors.checkOut?.message}
        />
      </div>
      
      <div className="guests-section">
        <GuestSelector
          adults={watch('adults')}
          children={watch('children')}
          onAdultsChange={(value) => setValue('adults', value)}
          onChildrenChange={(value) => setValue('children', value)}
          errors={{ adults: errors.adults?.message, children: errors.children?.message }}
        />
      </div>

      <div className="filter-section">
        <AccommodationFilter
          value={watch('accommodationType')}
          onChange={(value) => setValue('accommodationType', value)}
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="search-button"
      >
        {isLoading ? 'Buscando...' : 'Buscar Disponibilidad'}
      </button>
    </form>
  );
};
```

#### 3. Visualización de Resultados (2 puntos)
- [ ] Componente `ResultsList` para mostrar alojamientos disponibles
- [ ] `AccommodationCard` individual con toda la información
- [ ] `PricingDisplay` para mostrar precios claramente
- [ ] Estados de "sin resultados" y "error"

```typescript
// AccommodationCard.tsx
export const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  searchParams
}) => {
  const {
    name,
    description,
    maxCapacity,
    availableUnits,
    totalUnits,
    pricing,
    services,
    images
  } = accommodation;

  return (
    <div className="accommodation-card">
      <div className="card-image">
        <img src={images[0]} alt={name} loading="lazy" />
        <div className="availability-badge">
          {availableUnits} de {totalUnits} disponibles
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3>{name}</h3>
          <div className="capacity">Hasta {maxCapacity} personas</div>
        </div>
        
        <p className="description">{description}</p>
        
        <div className="services">
          {services.map(service => (
            <span key={service} className="service-tag">{service}</span>
          ))}
        </div>
        
        <PricingDisplay
          pricing={pricing}
          nights={searchParams.nights}
        />
        
        <button 
          className="contact-button"
          onClick={() => handleContactClick(accommodation)}
        >
          Contactar para Reservar
        </button>
      </div>
    </div>
  );
};
```

#### 4. Estados de Carga y Error (1 punto)
- [ ] `LoadingSkeletons` para estados de carga
- [ ] Componentes de error con retry
- [ ] Estados vacíos informativos
- [ ] Indicadores de progreso

```typescript
// LoadingSkeletons.tsx
export const SearchResultsSkeleton: React.FC = () => (
  <div className="results-skeleton">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image" />
        <div className="skeleton-content">
          <div className="skeleton-title" />
          <div className="skeleton-description" />
          <div className="skeleton-services" />
          <div className="skeleton-pricing" />
        </div>
      </div>
    ))}
  </div>
);

// ErrorDisplay.tsx
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => (
  <div className="error-display">
    <div className="error-icon">⚠️</div>
    <h3>No pudimos cargar las disponibilidades</h3>
    <p>{error.message || 'Ha ocurrido un error inesperado'}</p>
    <button onClick={onRetry} className="retry-button">
      Reintentar Búsqueda
    </button>
  </div>
);
```

### Criterios de Aceptación
- ✅ Formulario de búsqueda funcional con validaciones
- ✅ Resultados se muestran correctamente con precios
- ✅ Estados de carga, error y vacío implementados
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Accesibilidad: navegación por teclado, screen readers
- ✅ Performance: lazy loading de imágenes
- ✅ Tests con cobertura > 75%

### Dependencias
- API `/api/availability` funcionando
- Tipos de alojamiento definidos en base de datos
- CDN configurado para imágenes
- Diseño UI/UX aprobado

### Testing Requirements
```typescript
// AvailabilitySearch.test.tsx
describe('AvailabilitySearch', () => {
  it('should render search form correctly', () => {
    render(<AvailabilitySearch />);
    expect(screen.getByText('Buscar Disponibilidad')).toBeInTheDocument();
  });

  it('should validate form inputs', async () => {
    render(<AvailabilitySearch />);
    
    // Test de validación de fechas
    const submitButton = screen.getByText('Buscar Disponibilidad');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('La fecha debe ser futura')).toBeInTheDocument();
    });
  });

  it('should display results after successful search', async () => {
    const mockResults = [
      { name: 'Parcela Estándar', availableUnits: 3 }
    ];
    
    jest.spyOn(api, 'fetchAvailability').mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    render(<AvailabilitySearch />);
    
    // Realizar búsqueda
    // ... setup del formulario
    
    await waitFor(() => {
      expect(screen.getByText('Parcela Estándar')).toBeInTheDocument();
      expect(screen.getByText('3 de')).toBeInTheDocument();
    });
  });
});
```

---

## Ticket 3 - Base de Datos: Estructura completa con migraciones y datos semilla

### Información General
- **ID:** BOOT-003
- **Tipo:** Database Development
- **Historias Relacionadas:** HU001, HU003, HU006 (todas las historias)
- **Prioridad:** Alta
- **Estimación:** 5 puntos de historia
- **Sprint:** 1
- **Asignado a:** Backend Developer
- **Estado:** To Do

### Descripción
Implementar la estructura completa de base de datos para BOOTBOOKINGCAMP, incluyendo todas las tablas necesarias, relaciones, índices de optimización, migraciones versionadas y datos semilla para el camping piloto.

### Objetivos
1. Crear estructura de base de datos completa en MySQL 8.0
2. Implementar migraciones versionadas con rollback capability
3. Establecer relaciones, constraints y índices optimizados
4. Poblar con datos semilla realistas del camping piloto
5. Configurar backup automático y políticas de retención

### Requisitos Técnicos

#### Stack Tecnológico
- **Database:** MySQL 8.0 en AWS RDS
- **Migration Tool:** Laravel Migrations o Phinx
- **Seeding:** Faker para datos realistas
- **Backup:** AWS RDS Automated Backups
- **Monitoring:** AWS CloudWatch

#### Estructura de Base de Datos

Basado en el modelo de datos definido en `3-modelo-de-datos.md`:

```sql
-- 1. CAMPING (información básica del camping)
-- 2. ACCOMMODATION_TYPE (tipos de alojamiento)
-- 3. AVAILABILITY (disponibilidades específicas)
-- 4. CONTACT_REQUEST (formularios de contacto)
-- 5. RESERVATION (reservas futuras)
-- 6. PMS_INTEGRATION (logs de integración)
-- 7. SYSTEM_LOG (logging del sistema)
-- 8. PRICING_RULE (reglas de precios dinámicos)
```

### Tareas de Desarrollo

#### 1. Configuración Base y Migraciones (1 punto)
- [ ] Configurar conexión MySQL en AWS RDS
- [ ] Establecer estructura de migraciones
- [ ] Configurar herramientas de migración
- [ ] Definir convenciones de naming

```php
// Migration: 001_create_camping_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampingTable extends Migration
{
    public function up()
    {
        Schema::create('camping', function (Blueprint $table) {
            $table->id('camping_id');
            $table->string('name', 100)->index();
            $table->text('description');
            $table->string('address', 255);
            $table->string('phone', 20);
            $table->string('email', 100)->index();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('city', 50)->index();
            $table->string('region', 50);
            $table->char('country', 2);
            $table->json('services'); // ["piscina", "restaurante", "wifi_gratis"]
            $table->json('images'); // [{"url": "...", "alt": "...", "type": "principal"}]
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active');
            $table->timestamps();
            
            // Índices compuestos para geolocalización
            $table->index(['latitude', 'longitude'], 'location_index');
            $table->index(['city', 'region', 'country'], 'geographic_index');
        });
    }

    public function down()
    {
        Schema::dropIfExists('camping');
    }
}
```

#### 2. Tablas Principales del Sistema (2 puntos)
- [ ] Tabla CAMPING con información completa
- [ ] Tabla ACCOMMODATION_TYPE con tipos de alojamiento
- [ ] Tabla AVAILABILITY con disponibilidades
- [ ] Tabla CONTACT_REQUEST para formularios
- [ ] Establecer todas las relaciones y constraints

```php
// Migration: 002_create_accommodation_type_table.php
class CreateAccommodationTypeTable extends Migration
{
    public function up()
    {
        Schema::create('accommodation_type', function (Blueprint $table) {
            $table->id('accommodation_type_id');
            $table->unsignedBigInteger('camping_id');
            $table->string('name', 100);
            $table->text('description');
            $table->tinyInteger('max_capacity')->unsigned();
            $table->decimal('area_m2', 6, 2)->nullable();
            $table->decimal('base_price', 8, 2); // precio base por noche
            $table->json('services'); // ["electricidad", "agua", "desague"]
            $table->json('images'); // URLs de imágenes específicas
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Relaciones
            $table->foreign('camping_id')->references('camping_id')->on('camping')->onDelete('cascade');
            
            // Índices
            $table->index(['camping_id', 'is_active'], 'active_accommodations');
            $table->index(['max_capacity'], 'capacity_index');
            $table->index(['base_price'], 'price_index');
        });
    }
}

// Migration: 003_create_availability_table.php
class CreateAvailabilityTable extends Migration
{
    public function up()
    {
        Schema::create('availability', function (Blueprint $table) {
            $table->id('availability_id');
            $table->unsignedBigInteger('accommodation_type_id');
            $table->date('available_date')->index();
            $table->tinyInteger('available_units')->unsigned();
            $table->tinyInteger('total_units')->unsigned();
            $table->decimal('price_per_night', 8, 2);
            $table->decimal('seasonal_modifier', 5, 2)->default(0.00); // % de incremento/descuento
            $table->enum('source', ['pms_sync', 'manual_entry', 'system_generated'])->default('pms_sync');
            $table->timestamp('last_sync')->nullable();
            $table->boolean('is_blocked')->default(false); // para mantenimiento
            $table->timestamps();
            
            // Relaciones
            $table->foreign('accommodation_type_id')
                  ->references('accommodation_type_id')
                  ->on('accommodation_type')
                  ->onDelete('cascade');
            
            // Índices compuestos críticos para performance
            $table->unique(['accommodation_type_id', 'available_date'], 'unique_availability');
            $table->index(['available_date', 'available_units'], 'date_units_index');
            $table->index(['accommodation_type_id', 'available_date', 'available_units'], 'search_index');
        });
    }
}

// Migration: 004_create_contact_request_table.php
class CreateContactRequestTable extends Migration
{
    public function up()
    {
        Schema::create('contact_request', function (Blueprint $table) {
            $table->id('contact_request_id');
            $table->unsignedBigInteger('camping_id');
            $table->string('full_name', 100)->index();
            $table->string('email', 100)->index();
            $table->string('phone', 20);
            $table->date('preferred_check_in')->nullable()->index();
            $table->date('preferred_check_out')->nullable();
            $table->tinyInteger('num_adults')->unsigned();
            $table->tinyInteger('num_children')->unsigned()->default(0);
            $table->unsignedBigInteger('accommodation_type_id')->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'contacted', 'converted', 'cancelled'])->default('pending')->index();
            $table->string('confirmation_code', 50)->unique();
            $table->json('utm_data')->nullable(); // tracking de marketing
            $table->timestamp('contacted_at')->nullable();
            $table->timestamp('converted_at')->nullable();
            $table->timestamps();
            
            // Relaciones
            $table->foreign('camping_id')->references('camping_id')->on('camping')->onDelete('cascade');
            $table->foreign('accommodation_type_id')
                  ->references('accommodation_type_id')
                  ->on('accommodation_type')
                  ->onDelete('set null');
            
            // Índices para reporting y búsqueda
            $table->index(['camping_id', 'status', 'created_at'], 'camping_status_date');
            $table->index(['email', 'created_at'], 'email_tracking');
            $table->index(['preferred_check_in', 'preferred_check_out'], 'date_range_index');
        });
    }
}
```

#### 3. Tablas de Soporte y Logging (1 punto)
- [ ] Tabla PMS_INTEGRATION para logs de integración
- [ ] Tabla SYSTEM_LOG para auditoría
- [ ] Tabla PRICING_RULE para reglas dinámicas
- [ ] Configurar políticas de retención

```php
// Migration: 005_create_pms_integration_table.php
class CreatePmsIntegrationTable extends Migration
{
    public function up()
    {
        Schema::create('pms_integration', function (Blueprint $table) {
            $table->id('integration_id');
            $table->unsignedBigInteger('camping_id');
            $table->enum('operation_type', ['availability_sync', 'pricing_update', 'reservation_push']);
            $table->enum('status', ['success', 'failure', 'partial']);
            $table->json('request_data')->nullable();
            $table->json('response_data')->nullable();
            $table->text('error_message')->nullable();
            $table->decimal('response_time_ms', 8, 2)->nullable();
            $table->timestamps();
            
            $table->foreign('camping_id')->references('camping_id')->on('camping')->onDelete('cascade');
            
            // Índices para monitorización
            $table->index(['camping_id', 'operation_type', 'status'], 'monitoring_index');
            $table->index(['created_at'], 'time_series_index');
        });
    }
}

// Migration: 006_create_pricing_rule_table.php
class CreatePricingRuleTable extends Migration
{
    public function up()
    {
        Schema::create('pricing_rule', function (Blueprint $table) {
            $table->id('rule_id');
            $table->unsignedBigInteger('accommodation_type_id');
            $table->string('rule_name', 100);
            $table->enum('rule_type', ['seasonal', 'advance_booking', 'length_of_stay', 'occupancy']);
            $table->json('conditions'); // {"season": "high", "min_days": 7}
            $table->decimal('modifier_percentage', 5, 2); // -20.00 a +100.00
            $table->date('valid_from');
            $table->date('valid_to');
            $table->tinyInteger('priority')->default(1); // orden de aplicación
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->foreign('accommodation_type_id')
                  ->references('accommodation_type_id')
                  ->on('accommodation_type')
                  ->onDelete('cascade');
            
            $table->index(['accommodation_type_id', 'is_active', 'priority'], 'active_rules');
            $table->index(['valid_from', 'valid_to'], 'validity_period');
        });
    }
}
```

#### 4. Datos Semilla Realistas (1 punto)
- [ ] Seeder para camping piloto (KCAMP)
- [ ] Tipos de alojamiento con precios realistas
- [ ] Disponibilidades para 6 meses
- [ ] Reglas de precios estacionales
- [ ] Datos de prueba para desarrollo

```php
// Seeder: CampingSeeder.php
class CampingSeeder extends Seeder
{
    public function run()
    {
        // Camping Piloto: KCAMP
        $camping = DB::table('camping')->insert([
            'camping_id' => 1,
            'name' => 'KCAMP - Camping Piloto',
            'description' => 'Un camping familiar ubicado en un entorno natural privilegiado en la Costa Brava, perfecto para desconectar y disfrutar de la naturaleza. Ofrecemos parcelas amplias, instalaciones modernas y un ambiente tranquilo ideal para familias y parejas.',
            'address' => 'Carretera Nacional 123, Km 15, 17001 Girona, España',
            'phone' => '+34 972 123 456',
            'email' => 'info@kcamp.com',
            'latitude' => 41.9794,
            'longitude' => 2.8214,
            'city' => 'Girona',
            'region' => 'Cataluña',
            'country' => 'ES',
            'services' => json_encode([
                'piscina', 'restaurante', 'wifi_gratis', 'lavanderia', 
                'parque_infantil', 'supermercado', 'barbacoa_comunitaria',
                'alquiler_bicicletas', 'zona_mascotas', 'duchas_agua_caliente'
            ]),
            'images' => json_encode([
                [
                    'url' => 'https://cdn.bootbookingcamp.com/kcamp/main-view.jpg',
                    'alt' => 'Vista principal del camping KCAMP',
                    'type' => 'principal'
                ],
                [
                    'url' => 'https://cdn.bootbookingcamp.com/kcamp/pool-area.jpg',
                    'alt' => 'Zona de piscina y recreo',
                    'type' => 'instalaciones'
                ],
                [
                    'url' => 'https://cdn.bootbookingcamp.com/kcamp/restaurant.jpg',
                    'alt' => 'Restaurante del camping',
                    'type' => 'instalaciones'
                ]
            ]),
            'status' => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

// Seeder: AccommodationTypeSeeder.php
class AccommodationTypeSeeder extends Seeder
{
    public function run()
    {
        $accommodationTypes = [
            [
                'camping_id' => 1,
                'name' => 'Parcela Estándar',
                'description' => 'Parcela espaciosa de 80m² para tienda de campaña o caravana pequeña. Incluye conexión eléctrica, agua y desagüe. Perfecta para familias de hasta 4 personas.',
                'max_capacity' => 4,
                'area_m2' => 80.00,
                'base_price' => 25.00,
                'services' => json_encode(['electricidad', 'agua', 'desague']),
                'images' => json_encode(['https://cdn.bootbookingcamp.com/kcamp/parcela-standard.jpg'])
            ],
            [
                'camping_id' => 1,
                'name' => 'Parcela Premium',
                'description' => 'Parcela grande de 120m² con servicios adicionales. Incluye conexión eléctrica, agua, desagüe, WiFi privado y zona de barbacoa. Ideal para familias grandes o grupos.',
                'max_capacity' => 6,
                'area_m2' => 120.00,
                'base_price' => 35.00,
                'services' => json_encode(['electricidad', 'agua', 'desague', 'wifi_privado', 'barbacoa']),
                'images' => json_encode(['https://cdn.bootbookingcamp.com/kcamp/parcela-premium.jpg'])
            ],
            [
                'camping_id' => 1,
                'name' => 'Parcela Eco',
                'description' => 'Parcela ecológica sin conexiones eléctricas, perfecta para una experiencia de camping más natural. 60m² en zona tranquila con acceso a servicios comunitarios.',
                'max_capacity' => 3,
                'area_m2' => 60.00,
                'base_price' => 18.00,
                'services' => json_encode(['agua_comunitaria', 'banos_ecologicos']),
                'images' => json_encode(['https://cdn.bootbookingcamp.com/kcamp/parcela-eco.jpg'])
            ]
        ];

        foreach ($accommodationTypes as $type) {
            DB::table('accommodation_type')->insert($type + [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

// Seeder: AvailabilitySeeder.php
class AvailabilitySeeder extends Seeder
{
    public function run()
    {
        $startDate = now();
        $endDate = now()->addMonths(6);
        $accommodationTypes = [
            ['id' => 1, 'total_units' => 10], // Parcela Estándar
            ['id' => 2, 'total_units' => 5],  // Parcela Premium
            ['id' => 3, 'total_units' => 8]   // Parcela Eco
        ];

        $current = $startDate->copy();
        while ($current <= $endDate) {
            foreach ($accommodationTypes as $type) {
                // Simular ocupación variable (más ocupación en verano)
                $occupancyRate = $this->getOccupancyRate($current);
                $availableUnits = floor($type['total_units'] * (1 - $occupancyRate));
                
                DB::table('availability')->insert([
                    'accommodation_type_id' => $type['id'],
                    'available_date' => $current->format('Y-m-d'),
                    'available_units' => max(0, $availableUnits),
                    'total_units' => $type['total_units'],
                    'price_per_night' => $this->calculatePrice($type['id'], $current),
                    'seasonal_modifier' => $this->getSeasonalModifier($current),
                    'source' => 'system_generated',
                    'last_sync' => now(),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
            $current->addDay();
        }
    }
    
    private function getOccupancyRate($date): float
    {
        $month = $date->month;
        // Verano (junio-agosto): 70-90% ocupación
        if (in_array($month, [6, 7, 8])) {
            return rand(70, 90) / 100;
        }
        // Primavera/Otoño: 40-60% ocupación
        if (in_array($month, [4, 5, 9, 10])) {
            return rand(40, 60) / 100;
        }
        // Invierno: 10-30% ocupación
        return rand(10, 30) / 100;
    }
}
```

### Criterios de Aceptación
- ✅ Base de datos creada en AWS RDS con todas las tablas
- ✅ Migraciones ejecutables con rollback functionality
- ✅ Todos los índices optimizados para consultas frecuentes
- ✅ Datos semilla realistas para 6 meses de disponibilidad
- ✅ Relaciones y constraints correctamente establecidas
- ✅ Backup automático configurado (daily snapshots)
- ✅ Documentación de esquema actualizada

### Script de Verificación
```sql
-- Verificación de estructura completa
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    AVG_ROW_LENGTH,
    DATA_LENGTH,
    INDEX_LENGTH
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'bootbookingcamp';

-- Verificación de datos semilla
SELECT 
    'camping' as table_name, COUNT(*) as records FROM camping
UNION ALL
SELECT 'accommodation_type', COUNT(*) FROM accommodation_type
UNION ALL
SELECT 'availability', COUNT(*) FROM availability
WHERE available_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 6 MONTH);

-- Verificación de índices críticos
SHOW INDEX FROM availability WHERE Key_name IN ('search_index', 'date_units_index');
```

### Dependencias
- AWS RDS MySQL 8.0 instance configurada
- Herramientas de migración instaladas
- Credenciales de acceso configuradas
- Políticas de backup establecidas

### Riesgos y Mitigaciones
- **Riesgo:** Pérdida de datos durante migración
  - **Mitigación:** Backup completo antes de cada migración + testing en staging
- **Riesgo:** Performance issues con grandes volúmenes
  - **Mitigación:** Índices optimizados + partitioning por fecha si necesario
- **Riesgo:** Inconsistencias en datos semilla
  - **Mitigación:** Seeders validados + tests de integridad

---

## Resumen de los 3 Tickets

### Distribución de Trabajo
- **Ticket 1 (Backend):** API de disponibilidades - 13 puntos
- **Ticket 2 (Frontend):** Interfaz de búsqueda - 8 puntos  
- **Ticket 3 (Base de Datos):** Estructura completa - 5 puntos

**Total:** 26 puntos de historia

### Cronograma Sugerido
- **Sprint 1:** Ticket 3 (BD) + inicio Ticket 1 (Backend)
- **Sprint 2:** Completar Ticket 1 + Ticket 2 (Frontend)
- **Sprint 3:** Testing integrado + deployment

### Dependencias Entre Tickets
1. **Ticket 3 → Ticket 1:** Base de datos debe estar lista antes del backend
2. **Ticket 1 → Ticket 2:** API debe funcionar antes del frontend
3. **Todos los tickets:** Requieren configuración AWS previa

Estos tickets representan el desarrollo completo de la funcionalidad más crítica de BOOTBOOKINGCAMP: la búsqueda de disponibilidades end-to-end.