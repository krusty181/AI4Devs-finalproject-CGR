# Especificación de la API - BOOTBOOKINGCAMP

**Proyecto:** BOOTBOOKINGCAMP - Sistema de reservas para camping (Fase Piloto)  
**Versión API:** v1.0.0  
**Base URL:** `https://api.bootbookingcamp.com/v1`  
**Formato:** OpenAPI 3.0.3

---

## Índice

1. [Información General de la API](#1-información-general-de-la-api)
2. [Endpoints Principales](#2-endpoints-principales)
3. [Esquemas de Datos](#3-esquemas-de-datos)
4. [Códigos de Respuesta](#4-códigos-de-respuesta)
5. [Ejemplos de Uso](#5-ejemplos-de-uso)

---

## 1. Información General de la API

### Especificación OpenAPI 3.0.3

```yaml
openapi: 3.0.3
info:
  title: BOOTBOOKINGCAMP API
  description: API REST para sistema de reservas de camping - Fase Piloto
  version: 1.0.0
  contact:
    name: BOOTBOOKINGCAMP Team
    email: api@bootbookingcamp.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.bootbookingcamp.com/v1
    description: Servidor de producción
  - url: https://staging-api.bootbookingcamp.com/v1  
    description: Servidor de staging
  - url: http://localhost:3000/api/v1
    description: Servidor de desarrollo local

security:
  - RateLimiting: []

components:
  securitySchemes:
    RateLimiting:
      type: apiKey
      in: header
      name: X-RateLimit-Token
      description: Token para control de rate limiting

  parameters:
    AcceptLanguage:
      name: Accept-Language
      in: header
      description: Idioma preferido (es, ca, en, fr)
      required: false
      schema:
        type: string
        enum: [es, ca, en, fr]
        default: es
        
  responses:
    BadRequest:
      description: Solicitud inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    UnprocessableEntity:
      description: Error de validación
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidationErrorResponse'
    TooManyRequests:
      description: Demasiadas solicitudes
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    InternalServerError:
      description: Error interno del servidor
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'

paths:
  /camping/info:
    get:
      summary: Obtener información completa del camping
      description: |
        Devuelve toda la información del camping piloto incluyendo descripción,
        servicios, ubicación, galería de imágenes y datos de contacto.
        Soporta múltiples idiomas.
      operationId: getCampingInfo
      tags:
        - Camping
      parameters:
        - $ref: '#/components/parameters/AcceptLanguage'
      responses:
        '200':
          description: Información del camping obtenida exitosamente
          headers:
            Cache-Control:
              description: Política de caché
              schema:
                type: string
                example: "public, max-age=3600"
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CampingInfoResponse'
              example:
                success: true
                data:
                  camping_id: 1
                  name: "KCAMP - Camping Piloto"
                  description: "Un camping familiar ubicado en un entorno natural privilegiado, perfecto para desconectar y disfrutar de la naturaleza."
                  address: "Carretera Nacional 123, Km 15, 17001 Girona, España"
                  phone: "+34 972 123 456"
                  email: "info@kcamp.com"
                  location:
                    latitude: 41.9794
                    longitude: 2.8214
                    city: "Girona"
                    region: "Cataluña"
                    country: "ES"
                  services:
                    - "piscina"
                    - "restaurante"
                    - "wifi_gratis"
                    - "lavanderia"
                    - "parque_infantil"
                    - "supermercado"
                  images:
                    - url: "https://cdn.bootbookingcamp.com/kcamp/main-view.jpg"
                      alt: "Vista principal del camping"
                      type: "principal"
                    - url: "https://cdn.bootbookingcamp.com/kcamp/pool-area.jpg"
                      alt: "Zona de piscina"
                      type: "instalaciones"
                  accommodation_types:
                    - accommodation_type_id: 1
                      name: "Parcela Estándar"
                      description: "Parcela espaciosa para tienda o caravana pequeña"
                      max_capacity: 4
                      area_m2: 80
                      base_price: 25.00
                    - accommodation_type_id: 2
                      name: "Parcela Premium"
                      description: "Parcela grande con servicios adicionales"
                      max_capacity: 6
                      area_m2: 120
                      base_price: 35.00
                language: "es"
                timestamp: "2025-10-05T10:30:00Z"
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /availability:
    get:
      summary: Consultar disponibilidad de alojamientos
      description: |
        Consulta la disponibilidad de alojamientos para fechas específicas.
        Integra datos del PMS externo con información local y aplica reglas de precios dinámicos.
        Implementa caché Redis para optimizar rendimiento.
      operationId: getAvailability
      tags:
        - Availability
      parameters:
        - name: check_in
          in: query
          description: Fecha de entrada (YYYY-MM-DD)
          required: true
          schema:
            type: string
            format: date
            example: "2025-07-15"
        - name: check_out
          in: query
          description: Fecha de salida (YYYY-MM-DD)
          required: true
          schema:
            type: string
            format: date
            example: "2025-07-20"
        - name: adults
          in: query
          description: Número de adultos
          required: true
          schema:
            type: integer
            minimum: 1
            maximum: 10
            example: 2
        - name: children
          in: query
          description: Número de niños
          required: false
          schema:
            type: integer
            minimum: 0
            maximum: 8
            default: 0
            example: 1
        - name: accommodation_type_id
          in: query
          description: Filtrar por tipo de alojamiento específico
          required: false
          schema:
            type: integer
            example: 1
        - $ref: '#/components/parameters/AcceptLanguage'
      responses:
        '200':
          description: Disponibilidades obtenidas exitosamente
          headers:
            Cache-Control:
              description: Política de caché
              schema:
                type: string
                example: "public, max-age=900"
            X-Cache-Status:
              description: Estado del caché (HIT/MISS)
              schema:
                type: string
                example: "MISS"
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AvailabilityResponse'
              example:
                success: true
                data:
                  search_params:
                    check_in: "2025-07-15"
                    check_out: "2025-07-20"
                    nights: 5
                    adults: 2
                    children: 1
                    total_guests: 3
                  available_accommodations:
                    - accommodation_type_id: 1
                      name: "Parcela Estándar"
                      description: "Parcela espaciosa para tienda o caravana pequeña"
                      max_capacity: 4
                      area_m2: 80
                      available_units: 3
                      total_units: 10
                      pricing:
                        base_price_per_night: 25.00
                        total_base_price: 125.00
                        seasonal_modifier: 15.00
                        total_price: 140.00
                        extra_person_price: 5.00
                        currency: "EUR"
                      services:
                        - "electricidad"
                        - "agua"
                        - "desague"
                      images:
                        - "https://cdn.bootbookingcamp.com/kcamp/parcela-standard.jpg"
                    - accommodation_type_id: 2
                      name: "Parcela Premium"
                      description: "Parcela grande con servicios adicionales"
                      max_capacity: 6
                      area_m2: 120
                      available_units: 1
                      total_units: 5
                      pricing:
                        base_price_per_night: 35.00
                        total_base_price: 175.00
                        seasonal_modifier: 20.00
                        total_price: 195.00
                        extra_person_price: 7.00
                        currency: "EUR"
                      services:
                        - "electricidad"
                        - "agua"
                        - "desague"
                        - "wifi_privado"
                        - "barbacoa"
                      images:
                        - "https://cdn.bootbookingcamp.com/kcamp/parcela-premium.jpg"
                metadata:
                  data_source: "pms_integration"
                  last_updated: "2025-10-05T10:25:00Z"
                  cache_ttl: 900
                language: "es"
                timestamp: "2025-10-05T10:30:00Z"
        '400':
          $ref: '#/components/responses/BadRequest'
        '422':
          $ref: '#/components/responses/UnprocessableEntity'
        '429':
          $ref: '#/components/responses/TooManyRequests'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /contact:
    post:
      summary: Enviar formulario de contacto/reserva
      description: |
        Procesa formularios de contacto y solicitudes de reserva.
        Incluye validaciones anti-spam, rate limiting y notificaciones automáticas
        bidireccionales (usuario y camping).
      operationId: submitContactForm
      tags:
        - Contact
      parameters:
        - $ref: '#/components/parameters/AcceptLanguage'
      requestBody:
        description: Datos del formulario de contacto
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactRequest'
            example:
              full_name: "María García López"
              email: "maria.garcia@email.com"
              phone: "+34 612 345 678"
              check_in_date: "2025-07-15"
              check_out_date: "2025-07-20"
              num_adults: 2
              num_children: 1
              accommodation_type_id: 1
              message: "Hola, estamos interesados en reservar una parcela estándar para nuestras vacaciones familiares. ¿Podrían confirmar disponibilidad y enviarnos más información sobre los servicios incluidos?"
              language: "es"
              utm_data:
                utm_source: "google"
                utm_medium: "organic"
                utm_campaign: "summer2025"
      responses:
        '201':
          description: Formulario procesado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactResponse'
              example:
                success: true
                data:
                  contact_request_id: 12345
                  status: "pending"
                  confirmation_code: "KCAMP-2025-10-05-12345"
                  estimated_response_time: "24 horas"
                  notifications_sent:
                    user_confirmation: true
                    camping_notification: true
                message: "Su solicitud ha sido enviada correctamente. Recibirá una confirmación por email y el camping se pondrá en contacto con usted en un plazo máximo de 24 horas."
                language: "es"
                timestamp: "2025-10-05T10:30:00Z"
        '400':
          $ref: '#/components/responses/BadRequest'
        '422':
          $ref: '#/components/responses/UnprocessableEntity'
        '429':
          description: Rate limit excedido
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              example:
                success: false
                error:
                  code: "RATE_LIMIT_EXCEEDED"
                  message: "Ha excedido el límite de formularios por hora. Puede enviar máximo 5 formularios por hora."
                  details:
                    limit: 5
                    window: "1 hour"
                    retry_after: 3600
                timestamp: "2025-10-05T10:30:00Z"
        '500':
          $ref: '#/components/responses/InternalServerError'

components:
  schemas:
    CampingInfoResponse:
      type: object
      required: [success, data, language, timestamp]
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          required: [camping_id, name, description, address, phone, email, location, services, images, accommodation_types]
          properties:
            camping_id:
              type: integer
              example: 1
            name:
              type: string
              example: "KCAMP - Camping Piloto"
            description:
              type: string
              example: "Un camping familiar ubicado en un entorno natural privilegiado"
            address:
              type: string
              example: "Carretera Nacional 123, Km 15, 17001 Girona, España"
            phone:
              type: string
              example: "+34 972 123 456"
            email:
              type: string
              format: email
              example: "info@kcamp.com"
            location:
              $ref: '#/components/schemas/Location'
            services:
              type: array
              items:
                type: string
              example: ["piscina", "restaurante", "wifi_gratis"]
            images:
              type: array
              items:
                $ref: '#/components/schemas/Image'
            accommodation_types:
              type: array
              items:
                $ref: '#/components/schemas/AccommodationType'
        language:
          type: string
          enum: [es, ca, en, fr]
          example: "es"
        timestamp:
          type: string
          format: date-time
          example: "2025-10-05T10:30:00Z"

    AvailabilityResponse:
      type: object
      required: [success, data, language, timestamp]
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          required: [search_params, available_accommodations, metadata]
          properties:
            search_params:
              $ref: '#/components/schemas/SearchParams'
            available_accommodations:
              type: array
              items:
                $ref: '#/components/schemas/AvailableAccommodation'
            metadata:
              $ref: '#/components/schemas/AvailabilityMetadata'
        language:
          type: string
          enum: [es, ca, en, fr]
          example: "es"
        timestamp:
          type: string
          format: date-time
          example: "2025-10-05T10:30:00Z"

    ContactRequest:
      type: object
      required: [full_name, email, phone, num_adults, language]
      properties:
        full_name:
          type: string
          minLength: 2
          maxLength: 100
          example: "María García López"
        email:
          type: string
          format: email
          maxLength: 100
          example: "maria.garcia@email.com"
        phone:
          type: string
          pattern: '^\+?[1-9]\d{1,14}$'
          example: "+34 612 345 678"
        check_in_date:
          type: string
          format: date
          example: "2025-07-15"
        check_out_date:
          type: string
          format: date
          example: "2025-07-20"
        num_adults:
          type: integer
          minimum: 1
          maximum: 10
          example: 2
        num_children:
          type: integer
          minimum: 0
          maximum: 8
          example: 1
        accommodation_type_id:
          type: integer
          nullable: true
          example: 1
        message:
          type: string
          maxLength: 2000
          example: "Estamos interesados en reservar una parcela para nuestras vacaciones familiares."
        language:
          type: string
          enum: [es, ca, en, fr]
          default: "es"
          example: "es"
        utm_data:
          type: object
          nullable: true
          properties:
            utm_source:
              type: string
              example: "google"
            utm_medium:
              type: string
              example: "organic"
            utm_campaign:
              type: string
              example: "summer2025"

    ContactResponse:
      type: object
      required: [success, data, message, language, timestamp]
      properties:
        success:
          type: boolean
          example: true
        data:
          type: object
          required: [contact_request_id, status, confirmation_code, estimated_response_time, notifications_sent]
          properties:
            contact_request_id:
              type: integer
              example: 12345
            status:
              type: string
              enum: [pending, contacted, converted, cancelled]
              example: "pending"
            confirmation_code:
              type: string
              example: "KCAMP-2025-10-05-12345"
            estimated_response_time:
              type: string
              example: "24 horas"
            notifications_sent:
              type: object
              properties:
                user_confirmation:
                  type: boolean
                  example: true
                camping_notification:
                  type: boolean
                  example: true
        message:
          type: string
          example: "Su solicitud ha sido enviada correctamente."
        language:
          type: string
          enum: [es, ca, en, fr]
          example: "es"
        timestamp:
          type: string
          format: date-time
          example: "2025-10-05T10:30:00Z"

    Location:
      type: object
      required: [latitude, longitude, city, region, country]
      properties:
        latitude:
          type: number
          format: float
          example: 41.9794
        longitude:
          type: number
          format: float
          example: 2.8214
        city:
          type: string
          example: "Girona"
        region:
          type: string
          example: "Cataluña"
        country:
          type: string
          example: "ES"

    Image:
      type: object
      required: [url, alt, type]
      properties:
        url:
          type: string
          format: uri
          example: "https://cdn.bootbookingcamp.com/kcamp/main-view.jpg"
        alt:
          type: string
          example: "Vista principal del camping"
        type:
          type: string
          enum: [principal, instalaciones, alojamiento]
          example: "principal"

    AccommodationType:
      type: object
      required: [accommodation_type_id, name, description, max_capacity, area_m2, base_price]
      properties:
        accommodation_type_id:
          type: integer
          example: 1
        name:
          type: string
          example: "Parcela Estándar"
        description:
          type: string
          example: "Parcela espaciosa para tienda o caravana pequeña"
        max_capacity:
          type: integer
          example: 4
        area_m2:
          type: number
          format: float
          example: 80.0
        base_price:
          type: number
          format: float
          example: 25.00

    SearchParams:
      type: object
      required: [check_in, check_out, nights, adults, children, total_guests]
      properties:
        check_in:
          type: string
          format: date
          example: "2025-07-15"
        check_out:
          type: string
          format: date
          example: "2025-07-20"
        nights:
          type: integer
          example: 5
        adults:
          type: integer
          example: 2
        children:
          type: integer
          example: 1
        total_guests:
          type: integer
          example: 3

    AvailableAccommodation:
      type: object
      required: [accommodation_type_id, name, description, max_capacity, area_m2, available_units, total_units, pricing, services, images]
      properties:
        accommodation_type_id:
          type: integer
          example: 1
        name:
          type: string
          example: "Parcela Estándar"
        description:
          type: string
          example: "Parcela espaciosa para tienda o caravana pequeña"
        max_capacity:
          type: integer
          example: 4
        area_m2:
          type: number
          format: float
          example: 80.0
        available_units:
          type: integer
          example: 3
        total_units:
          type: integer
          example: 10
        pricing:
          $ref: '#/components/schemas/Pricing'
        services:
          type: array
          items:
            type: string
          example: ["electricidad", "agua", "desague"]
        images:
          type: array
          items:
            type: string
            format: uri
          example: ["https://cdn.bootbookingcamp.com/kcamp/parcela-standard.jpg"]

    Pricing:
      type: object
      required: [base_price_per_night, total_base_price, total_price, currency]
      properties:
        base_price_per_night:
          type: number
          format: float
          example: 25.00
        total_base_price:
          type: number
          format: float
          example: 125.00
        seasonal_modifier:
          type: number
          format: float
          example: 15.00
        total_price:
          type: number
          format: float
          example: 140.00
        extra_person_price:
          type: number
          format: float
          example: 5.00
        currency:
          type: string
          enum: [EUR]
          example: "EUR"

    AvailabilityMetadata:
      type: object
      required: [data_source, last_updated, cache_ttl]
      properties:
        data_source:
          type: string
          enum: [pms_integration, local_cache, fallback]
          example: "pms_integration"
        last_updated:
          type: string
          format: date-time
          example: "2025-10-05T10:25:00Z"
        cache_ttl:
          type: integer
          example: 900

    ErrorResponse:
      type: object
      required: [success, error, timestamp]
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          required: [code, message]
          properties:
            code:
              type: string
              example: "INVALID_REQUEST"
            message:
              type: string
              example: "La solicitud contiene parámetros inválidos"
            details:
              type: object
              nullable: true
        timestamp:
          type: string
          format: date-time
          example: "2025-10-05T10:30:00Z"

    ValidationErrorResponse:
      type: object
      required: [success, error, timestamp]
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          required: [code, message, validation_errors]
          properties:
            code:
              type: string
              example: "VALIDATION_ERROR"
            message:
              type: string
              example: "Los datos enviados contienen errores de validación"
            validation_errors:
              type: array
              items:
                type: object
                required: [field, code, message]
                properties:
                  field:
                    type: string
                    example: "email"
                  code:
                    type: string
                    example: "INVALID_FORMAT"
                  message:
                    type: string
                    example: "El formato del email no es válido"
        timestamp:
          type: string
          format: date-time
          example: "2025-10-05T10:30:00Z"
```

---

## 2. Endpoints Principales

### 2.1. GET /camping/info - Información del Camping

**Propósito:** Obtener información completa del camping (HU001)

**Características:**
- ✅ Sin autenticación requerida
- ✅ Soporte multiidioma (ES, CA, EN, FR)
- ✅ Cache público con TTL de 1 hora
- ✅ Información estática con baja frecuencia de cambios

**Parámetros:**
- `Accept-Language` (header, opcional): Idioma preferido

**Respuesta 200:** Información completa del camping incluyendo ubicación, servicios, galería y tipos de alojamiento disponibles.

### 2.2. GET /availability - Consulta de Disponibilidades

**Propósito:** Consultar disponibilidad de alojamientos para fechas específicas (HU003)

**Características:**
- ✅ Integración con PMS externo del camping
- ✅ Cache Redis con TTL de 15 minutos
- ✅ Fallback a datos locales si PMS no disponible
- ✅ Aplicación de reglas de precios dinámicos
- ✅ Rate limiting: 100 req/min

**Parámetros obligatorios:**
- `check_in`: Fecha de entrada
- `check_out`: Fecha de salida  
- `adults`: Número de adultos

**Parámetros opcionales:**
- `children`: Número de niños
- `accommodation_type_id`: Filtro por tipo específico

**Respuesta 200:** Lista de alojamientos disponibles con precios calculados, información de capacidad y servicios incluidos.

### 2.3. POST /contact - Formulario de Contacto

**Propósito:** Procesar formularios de contacto y solicitudes de reserva (HU006)

**Características:**
- ✅ Validaciones anti-spam integradas
- ✅ Rate limiting: 5 formularios/hora por IP
- ✅ Notificaciones automáticas bidireccionales
- ✅ Validación exhaustiva de datos
- ✅ Generación de código de confirmación único

**Campos obligatorios:**
- `full_name`: Nombre completo
- `email`: Email válido
- `phone`: Teléfono con formato internacional
- `num_adults`: Número de adultos

**Respuesta 201:** Confirmación de envío con código de seguimiento y estado de notificaciones.

---

## 3. Esquemas de Datos

### 3.1. Estructuras Principales

**CampingInfoResponse:** Información completa del camping
- Datos básicos: nombre, descripción, contacto
- Ubicación: coordenadas, ciudad, región
- Servicios: array de servicios disponibles
- Imágenes: galería con metadata
- Tipos de alojamiento: resumen con precios base

**AvailabilityResponse:** Resultados de búsqueda de disponibilidades
- Parámetros de búsqueda: fechas, huéspedes
- Alojamientos disponibles: detalles completos con precios
- Metadata: origen de datos, timestamp, TTL

**ContactRequest/Response:** Formulario de contacto
- Datos personales: validaciones estrictas
- Fechas y preferencias: opcionales pero recomendadas
- Respuesta con confirmación y código de seguimiento

### 3.2. Validaciones Implementadas

**Formato de fechas:** ISO 8601 (YYYY-MM-DD)
**Emails:** Validación RFC 5322
**Teléfonos:** Formato internacional E.164
**Capacidades:** Límites realistas por tipo de alojamiento
**Rate limiting:** Headers X-RateLimit-* informativos

---

## 4. Códigos de Respuesta

### 4.1. Respuestas Exitosas

- **200 OK:** Consulta procesada correctamente
- **201 Created:** Recurso creado exitosamente (formulario)

### 4.2. Errores del Cliente

- **400 Bad Request:** Parámetros inválidos o malformados
- **422 Unprocessable Entity:** Datos válidos pero lógicamente incorrectos
- **429 Too Many Requests:** Rate limit excedido

### 4.3. Errores del Servidor

- **500 Internal Server Error:** Error interno, PMS no disponible

### 4.4. Headers de Respuesta

```
Cache-Control: public, max-age=3600
X-Cache-Status: HIT|MISS
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1696507200
```

---

## 5. Ejemplos de Uso

### 5.1. Consulta de Información del Camping

```bash
curl -X GET \
  "https://api.bootbookingcamp.com/v1/camping/info" \
  -H "Accept-Language: es" \
  -H "Accept: application/json"
```

### 5.2. Búsqueda de Disponibilidades

```bash
curl -X GET \
  "https://api.bootbookingcamp.com/v1/availability?check_in=2025-07-15&check_out=2025-07-20&adults=2&children=1" \
  -H "Accept-Language: es" \
  -H "Accept: application/json"
```

### 5.3. Envío de Formulario de Contacto

```bash
curl -X POST \
  "https://api.bootbookingcamp.com/v1/contact" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: es" \
  -d '{
    "full_name": "María García López",
    "email": "maria.garcia@email.com",
    "phone": "+34 612 345 678",
    "check_in_date": "2025-07-15",
    "check_out_date": "2025-07-20",
    "num_adults": 2,
    "num_children": 1,
    "accommodation_type_id": 1,
    "message": "Estamos interesados en reservar una parcela estándar.",
    "language": "es"
  }'
```

---

## Consideraciones de Implementación

### Seguridad
- ✅ Rate limiting por IP y endpoint
- ✅ Validación estricta de inputs
- ✅ Sanitización anti-XSS
- ✅ Headers de seguridad (CORS, CSP)

### Rendimiento
- ✅ Cache Redis estratégico
- ✅ CDN para imágenes
- ✅ Paginación en endpoints futuros
- ✅ Compresión gzip/brotli

### Monitorización
- ✅ Logging completo de requests
- ✅ Métricas de rendimiento
- ✅ Alertas por errores 5xx
- ✅ Tracking de integración PMS

Esta especificación API está diseñada específicamente para las necesidades de BOOTBOOKINGCAMP en su fase piloto, proporcionando una base sólida y escalable para el desarrollo del sistema de reservas de camping.