## Índice

1. [Descripción general del producto](1-descripcion-general-del-producto.md)
2. [Arquitectura del sistema](2-arquitectura-del-sistema.md)
3. [Modelo de datos](3-modelo-de-datos.md)
4. [Especificación de la API](4-especificaciones-de-la-api.md)
5. [Historias de usuario](5-historias-de-usuario.md)
6. [Tickets de trabajo](6-tickets-de-trabajo.md)
7. [Pull requests](7-pull-requests.md)

---

## 2. Arquitectura del sistema

**Prompt 1:** 
Rol:
Arquitecto de Software especializado en aplicaciones web
Objetivo:
Eres la persona experta en arquitectura de proyecto.
A partir del proyecto de hospederias definido anteriormente realiza Diagrama de arquitectura.
Antes de empezar, preguntame que necesitas saber y que vas a considerar para diseñar este diagrama
Explicame que pasos vas a seguir.
[...]
Hacemos segun lo que recomiendas
Con estas respuestas analiza y explicame que vas a hacer para diseñar este diagrama o arquitectura del proyecto


**Respuesta 1:** COPILOT - GPT-5

# Diseño de Arquitectura para el Motor de Reservas de Hospederías
## BOOTBOOKINGCAMP - Fase Piloto (Un Camping)

Basado en los requisitos del proyecto y considerando que **la fase actual se enfoca en un único camping piloto**, procederé a diseñar una arquitectura simplificada pero escalable que establezca las bases para la futura expansión.

## Análisis Inicial

### Fase Actual (Piloto)
Considerando:
- **Alcance limitado**: Un único camping como caso piloto
- **Funcionalidad básica**: Visualización de disponibilidades y información del camping
- **Integración específica**: Con el PMS del camping piloto
- **Arquitectura simplificada**: Enfoque en funcionalidad core con capacidad de escalabilidad

### Visión Futura (Escalabilidad)
Preparando para:
- Objetivo de disponibilidad del 99% (especialmente en verano)
- Integración con múltiples PMS y channel managers
- Despliegue escalable en AWS
- Evolución hacia sistema multi-establecimiento

He optado por una **arquitectura monolítica simplificada** para la fase piloto, con diseño modular que facilite la evolución hacia el sistema completo.

## Proceso de Diseño

### 1. Identificación de Componentes Principales

Dividiré el sistema en las siguientes capas lógicas:

- **Capa de Cliente**: Interfaces de usuario
- **Capa de Presentación**: Gestión de API y distribución de contenidos
- **Capa de Aplicación**: Lógica de negocio principal
- **Capa de Integración**: Conexiones con sistemas externos
- **Capa de Persistencia**: Almacenamiento y gestión de datos

### 2. Definición de Módulos Funcionales

#### Fase Actual (Piloto - Un Camping)
Módulos principales para el MVP:

- **Visualización de camping**: Información y servicios del camping
- **Gestión de disponibilidades**: Mostrar disponibilidad por fechas y tipos de alojamiento
- **Formulario de contacto**: Captura de interés de reservas
- **Integración PMS**: Conexión específica con el camping piloto

#### Módulos Futuros (Post-MVP)
- Búsqueda multi-camping
- Gestión completa de reservas
- Gestión de usuarios registrados
- Sistema de pagos integrado
- Notificaciones automatizadas
- Administración para múltiples empresas

### 3. Diseño de Integración con Sistemas Externos

#### Fase Actual (Piloto)
Integración específica y simplificada:

- **PMS del camping piloto**: Conexión directa para obtener disponibilidades
- **Sistema de notificaciones básico**: Email simple para formularios de contacto

#### Integraciones Futuras (Post-MVP)
- Múltiples PMS y channel managers
- Pasarelas de pago diversas
- Sistemas de notificación avanzados (SMS, push)

### 4. Estrategia de Persistencia

#### Fase Actual (Piloto)
Estructura simplificada pero escalable:

- **MySQL básico**: Información del camping, tipos de alojamiento, formularios de contacto
- **Caché simple**: Redis para disponibilidades frecuentemente consultadas
- **S3 básico**: Imágenes del camping y galería

#### Persistencia Futura (Post-MVP)
- MySQL con estructura completa multi-camping
- Redis avanzado para búsquedas y sesiones
- S3 optimizado con CDN para múltiples establecimientos

### 5. Estrategia de Escalabilidad

#### Fase Actual (Piloto)
Escalabilidad preparatoria:

- **Infraestructura básica escalable**: Configuración AWS que permita crecimiento
- **Caché inteligente**: Para consultas de disponibilidad del camping piloto
- **Arquitectura preparada**: Diseño que facilite añadir más campings

#### Escalabilidad Futura (Multi-Camping)
- Componentes horizontalmente escalables
- Auto-scaling basado en demanda estacional
- Cachés estratégicos multi-nivel

### 6. Consideraciones de Seguridad

#### Fase Actual (Piloto)
Seguridad básica pero robusta:

- **HTTPS obligatorio** para todas las comunicaciones
- **Protección de formularios** contra spam y ataques básicos
- **Cifrado de datos** de contacto y consultas
- **Backup seguro** de información del camping

#### Seguridad Futura (Sistema Completo)
- Autenticación robusta (OAuth 2.0/JWT)
- Cifrado avanzado de datos sensibles
- Protección contra vulnerabilidades complejas
- Cumplimiento GDPR completo

## Resultado: Diagrama de Arquitectura

### Fase Actual (Piloto - Un Camping)
El diagrama simplificado mostrará:

1. **Capa de Cliente**:
   - Aplicación web React enfocada en mostrar el camping
   - Versión responsive optimizada para visualización de disponibilidades

2. **Capa de Presentación**:
   - API REST básica (PHP) para servir datos del camping
   - CDN simple para imágenes del camping

3. **Capa de Aplicación**:
   - Módulo de camping (información, servicios)
   - Módulo de disponibilidades
   - Módulo de formularios de contacto

4. **Capa de Integración**:
   - Adaptador específico para PMS del camping piloto
   - Sistema de email básico para formularios

5. **Capa de Persistencia**:
   - MySQL con estructura simplificada
   - Redis para caché de disponibilidades
   - S3 para imágenes del camping

### Beneficios de esta Aproximación Piloto:
1. **Desarrollo rápido** con funcionalidad core validada
2. **Costos controlados** durante la fase de prueba
3. **Aprendizaje real** del comportamiento de usuarios
4. **Base sólida** para escalabilidad futura
5. **Validación del modelo** antes de inversión mayor

### Evolución Planificada:
- **Fase 2**: Añadir sistema de reservas directas
- **Fase 3**: Expandir a múltiples campings
- **Fase 4**: Sistema completo multi-hospederías

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

Rol:
Arquitecto de Software especializado en diseño de sistemas distribuidos y aplicaciones web

Objetivo:
Crear un conjunto completo de diagramas de arquitectura para el Motor de Reservas de Hospederías que represente todos los aspectos relevantes del sistema desde diferentes perspectivas técnicas y de negocio.

Contexto Actualizado (Fase Piloto):
- **Alcance actual**: Sistema específico para UN CAMPING como piloto (BOOTBOOKINGCAMP)
- **Funcionalidad piloto**: Visualización de disponibilidades, información del camping, formularios de contacto
- **Integración inicial**: Conexión específica con el PMS del camping piloto
- **Tecnologías**: Frontend React, Backend PHP (REST inicialmente), Base de datos MySQL
- **Infraestructura**: AWS con configuración escalable para crecimiento
- **Objetivo piloto**: Validar funcionalidad y modelo antes de expansión multi-camping
- **Áreas funcionales actuales**: Visualización camping, disponibilidades, formularios contacto

Contexto Futuro (Escalabilidad):
- Motor de reservas completo para múltiples alojamientos turísticos
- 99% de disponibilidad especialmente en temporada alta
- Múltiples integraciones PMS y channel managers
- Arquitectura escalable hacia microservicios
- Áreas funcionales completas: búsqueda, reservas, usuarios, pagos, notificaciones, administración

## 1. Diagrama de Contexto del Sistema (C4 Model - Nivel 1)

Instrucciones:
- Crea un diagrama de contexto que muestre el sistema como una única caja y todas sus interacciones externas
- Incluye los siguientes actores y sistemas externos:
  * Usuarios finales (turistas nacionales e internacionales)
  * Clientes empresariales (propietarios de hospederías)
  * Sitemander PMS
  * Channel managers
  * Pasarelas de pago
  * Sistemas de notificación (email, SMS)
- Representa claramente los flujos de información principales entre el sistema y cada entidad externa
- Añade breves descripciones de cada relación (ej: "consulta disponibilidad", "procesa pagos")
- Destaca los límites del sistema y las responsabilidades externas vs internas

## 2. Diagrama de Contenedores (C4 Model - Nivel 2)

Instrucciones:
- Descompón el sistema en contenedores de alto nivel (aplicaciones, almacenes de datos, servicios)
- Incluye los siguientes contenedores:
  * Aplicación web React (SPA)
  * Servidor API GraphQL (PHP)
  * Base de datos transaccional (MySQL)
  * Capa de caché (Redis)
  * Sistema de almacenamiento de objetos (S3)
  * Sistema de colas de mensajes (SQS/SNS)
  * Servicios AWS complementarios (CloudFront, API Gateway, etc.)
- Representa las relaciones y flujos de comunicación entre contenedores
- Especifica los protocolos de comunicación utilizados (HTTP/S, WebSockets, SQL, etc.)
- Destaca los componentes responsables de la integración con sistemas externos

## 3. Diagrama de Flujo de Datos

Instrucciones:
- Crea un diagrama que ilustre los principales flujos de información a través del sistema
- Modela al menos estos procesos críticos:
  * Proceso de búsqueda de disponibilidad:
    - Desde la solicitud del usuario hasta la visualización de resultados
    - Incluye interacción con caché y sistemas externos
  * Proceso completo de reserva:
    - Desde la selección de alojamiento hasta la confirmación final
    - Incluye validación de disponibilidad, datos de usuario, pago
  * Sincronización con PMS y channel managers:
    - Actualización bidireccional de disponibilidad e información
    - Confirmación y cancelación de reservas
  * Proceso de pago:
    - Autorización, captura, reembolsos
    - Generación de facturas/comprobantes
- Destaca puntos de potencial latencia y estrategias para optimizarlos
- Identifica claramente el tipo de datos que fluye en cada conexión

## 4. Diagrama de Despliegue en AWS

Instrucciones:
- Crea un diagrama de infraestructura mostrando la arquitectura de despliegue en AWS
- Incluye los siguientes elementos:
  * VPC con subredes públicas y privadas
  * Múltiples zonas de disponibilidad para redundancia
  * Servicios AWS específicos:
    - EC2/ECS para hosts de aplicación
    - RDS para MySQL con configuración de alta disponibilidad
    - ElastiCache para Redis
    - S3 para almacenamiento de objetos
    - CloudFront para CDN
    - API Gateway para punto de entrada unificado
    - Auto Scaling Groups para escalado horizontal
    - Load Balancers para distribución de carga
    - CloudWatch para monitorización
    - WAF/Shield para protección
  * Servicios de seguridad (IAM, KMS)
  * Estrategias de backup y recuperación
- Identifica componentes para garantizar la disponibilidad del 99% en temporada alta
- Destaca los flujos de tráfico entre componentes y hacia/desde internet
- Incluye consideraciones de escalado automático y mecanismos de replicación

## 5. Diagrama de Modelo de Datos

Instrucciones:
- Crea un diagrama entidad-relación (ERD) mostrando la estructura principal de la base de datos
- Incluye las siguientes entidades principales y sus relaciones:
  * Usuarios (clientes finales)
  * Empresas (propietarios de hospederías)
  * Alojamientos y sus tipos
  * Disponibilidad y precios
  * Reservas y su ciclo de vida
  * Pagos y transacciones
  * Valoraciones y opiniones
- Para cada entidad, incluye:
  * Atributos clave
  * Tipos de datos
  * Relaciones (cardinalidad)
  * Claves primarias y foráneas
- Considera el soporte multilingüe en las entidades relevantes
- Destaca estrategias para optimizar consultas frecuentes (índices, particionado)
- Incluye tablas auxiliares para catalogación y configuración

Formato de entrega para todos los diagramas:
- Diagramas visuales claros con leyendas explicativas
- Código fuente en formato adecuado (si aplica)
- Explicaciones textuales complementarias
- Justificación de decisiones de arquitectura clave

Considera en todos los diagramas:
- Claridad visual y facilidad de comprensión
- Consistencia entre diagramas (terminología, componentes, flujos)
- Enfoque en aspectos críticos del negocio
- Escalabilidad para temporadas de alta demanda
- Seguridad y protección de datos sensibles
- Mantenibilidad y evolución futura del sistema

**Respuesta 1:** COPILOT - GPT-5

# Diagramas de Arquitectura para BOOTBOOKINGCAMP

## Fase Piloto: Un Camping

A continuación, presento los diagramas de arquitectura adaptados para la **fase piloto del proyecto**, enfocados en un único camping, con visión de escalabilidad futura hacia el motor completo de reservas multi-hospederías.

## 1. Diagrama de Contexto del Sistema (C4 Model - Nivel 1)

```
+----------------------------------------------------------------------------------------+
|                                                                                        |
|                          ACTORES PRINCIPALES - FASE PILOTO                            |
|                                                                                        |
|  +---------------+         +--------------------+        +------------------------+     |
|  | Usuarios      |         | Camping Piloto     |        | Administrador del      |     |
|  | Interesados   |         | (Un solo camping)  |        | Sistema                |     |
|  +-------+-------+         +---------+----------+        +-----------+------------+     |
|          |                           |                               |                  |
|          | Consultar disponibilidad | Proporcionar información       | Configuración    |
|          | y contactar               | y disponibilidades             | básica           |
|          |                           |                               |                  |
+----------|---------------------------|------------------------------ | ----------------+
           |                           |                               |
           v                           v                               v
+-----------------------------------------------------------------------------------------------------+
|                                                                                                     |
|                            BOOTBOOKINGCAMP - SISTEMA PILOTO                                         |
|                           (Visualización de Disponibilidades)                                       |
|                                                                                                     |
+--------|---------------------------|--------------------------|-------------------------|-----------+
         |                           |                          |                         |
         |                           |                          |                         |
         v                           v                          v                         v
+----------------+      +------------------------+    +-------------------+     +------------------+
| Sistema de     |      | PMS del Camping        |    | Formularios       |     | Almacenamiento   |
| Email Básico   |      | Piloto                 |    | de Contacto       |     | de Imágenes      |
| (Formularios)  |      |                        |    |                   |     | (S3)             |
+----------------+      +------------------------+    +-------------------+     +------------------+
```

### Flujos Principales - Fase Piloto:

1. **Usuarios Interesados → Sistema**:
   - Consulta de información del camping piloto
   - Visualización de disponibilidades por fechas
   - Envío de formularios de contacto/interés
   - Navegación por galería de imágenes

2. **Sistema → Usuarios Interesados**:
   - Información detallada del camping y servicios
   - Disponibilidades actualizadas por tipo de alojamiento
   - Confirmación de envío de formularios
   - Información de contacto del camping

3. **Camping Piloto → Sistema**:
   - Actualización de información y servicios
   - Sincronización de disponibilidades desde su PMS
   - Gestión de imágenes y contenido

4. **Sistema → Camping Piloto**:
   - Notificaciones de consultas recibidas
   - Datos de interés de usuarios potenciales

5. **Sistema ↔ PMS del Camping Piloto**:
   - Sincronización de disponibilidad y precios
   - Actualización de información de alojamientos
   - Obtención de datos en tiempo real

6. **Sistema → Sistema de Email**:
   - Envío de formularios de contacto
   - Notificaciones al camping sobre consultas
   - Confirmaciones a usuarios

### Diferencias con Sistema Futuro:
- **Alcance limitado**: Un solo camping vs múltiples hospederías
- **Sin reservas directas**: Solo consultas y formularios de contacto
- **Sin pagos**: No hay transacciones monetarias en la fase piloto
- **Integración única**: Solo con el PMS del camping piloto

El diagrama muestra la simplicidad del sistema piloto pero con arquitectura preparada para escalabilidad futura.

## 2. Diagrama de Contenedores (C4 Model - Nivel 2)

```
+----------------------------------------------------------------------------------------------------------+
|                                       MOTOR DE RESERVAS DE HOSPEDERÍAS                                    |
|                                                                                                          |
|  +------------------+                   +---------------------------+                                    |
|  |                  |   HTTPS/JSON      |                           |                                    |
|  | Aplicación Web   +------------------>+  API Gateway (AWS)        |                                    |
|  | React (SPA)      |                   |                           |                                    |
|  |                  |<------------------+                           |                                    |
|  +------------------+                   +--------------+------------+                                    |
|                                                        |                                                 |
|                                                        | HTTPS/JSON                                      |
|                                                        v                                                 |
|  +------------------+                   +---------------------------+      +----------------------+      |
|  |                  |                   |                           |      |                      |      |
|  | CloudFront CDN   |                   |  Servidor API GraphQL     +----->+ Redis Cache         |      |
|  | (Activos         |                   |  (PHP)                    |      | (ElastiCache)       |      |
|  |  estáticos)      |                   |                           |<-----+                      |      |
|  |                  |                   +--+--------+--------+------+      +----------------------+      |
|  +------------------+                      |        |        |                                           |
|                                            |        |        |                                           |
|                                            v        v        v                                           |
|  +------------------+      +---------------+  +----------+  +---------------------+                      |
|  |                  |      |               |  |          |  |                     |                      |
|  | Amazon S3        |<-----+ Almacenamiento|  | Pagos    |  | Integraciones       |                      |
|  | (Imágenes/       |      | y consulta    |  | (SQS)    |  | (Channel Managers,  |                      |
|  |  archivos)       |      | (MySQL RDS)   |  |          |  |  PMS, Pasarelas)    |                      |
|  |                  |      |               |  |          |  |                     |                      |
|  +------------------+      +---------------+  +----------+  +---------------------+                      |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
                                                |
                                                v
+---------------------------+       +---------------------------+       +---------------------------+
| Sitemander PMS            |       | Pasarelas de Pago         |       | Sistemas de              |
| (Disponibilidad/          |       | (Stripe, PayPal, etc.)    |       | Notificación             |
|  Reservas)                |       |                           |       | (SES, SNS)               |
+---------------------------+       +---------------------------+       +---------------------------+
```

### Componentes Principales:

1. **Aplicación Web React (SPA)**:
   - Interfaz de usuario responsive
   - Implementa el patrón de Aplicación de Página Única
   - Se comunica con el backend mediante API GraphQL
   - Gestionada con AWS Amplify o S3+CloudFront

2. **API Gateway (AWS)**:
   - Punto de entrada único para todas las peticiones
   - Manejo de autenticación y autorización
   - Limitación de tasa de peticiones
   - Enrutamiento a servicios internos

3. **Servidor API GraphQL (PHP)**:
   - Implementa la lógica de negocio principal
   - Organizado en módulos por dominio
   - Optimizado para consultas específicas a través de GraphQL
   - Desplegado en instancias EC2 o ECS con auto-scaling

4. **Redis Cache (ElastiCache)**:
   - Almacenamiento en caché de resultados de búsquedas frecuentes
   - Gestión de sesiones de usuario
   - Almacenamiento temporal de disponibilidad

5. **Base de datos MySQL (RDS)**:
   - Almacenamiento transaccional principal
   - Configurada con réplicas de lectura
   - Automatización de backups
   - Multi-AZ para alta disponibilidad

6. **Amazon S3**:
   - Almacenamiento de imágenes de alojamientos
   - Documentos y archivos estáticos
   - Configurado con políticas de ciclo de vida

7. **Sistema de Colas (SQS)**:
   - Procesamiento asíncrono de pagos
   - Notificaciones
   - Sincronización con sistemas externos

8. **Módulo de Integraciones**:
   - Adaptadores para Sitemander PMS
   - Conectores para Channel Managers
   - Integración con pasarelas de pago

9. **CloudFront CDN**:
   - Distribución global de contenido estático
   - Mejora tiempos de carga para usuarios finales
   - Caching de recursos de la SPA

Este diagrama muestra claramente la separación de responsabilidades entre contenedores y cómo se comunican entre sí, siguiendo principios de acoplamiento débil y alta cohesión.

## 3. Diagrama de Flujo de Datos

### Proceso de Búsqueda de Disponibilidad

```
+------------+     +------------+     +------------+     +------------+     +------------+
| Usuario    |---->| Frontend   |---->| API        |---->| Módulo de  |---->| Cache      |
| Final      |     | React      |     | Gateway    |     | Búsqueda   |     | Redis      |
+------------+     +------------+     +------------+     +------------+     +------------+
                                                              |
                                                              v
+------------+     +------------+     +------------+     +------------+
| Frontend   |<----| API        |<----| Módulo de  |<----| Base de    |
| React      |     | Gateway    |     | Búsqueda   |     | Datos      |
+------------+     +------------+     +------------+     +------------+
                                                              |
                                                              v
                                                        +------------+     +------------+
                                                        | Sitemander |<--->| Channel    |
                                                        | PMS        |     | Managers   |
                                                        +------------+     +------------+
```

### Proceso de Reserva

```
+------------+     +------------+     +------------+     +------------+     +------------+
| Usuario    |---->| Frontend   |---->| API        |---->| Módulo de  |---->| Validación |
| Final      |     | React      |     | Gateway    |     | Reservas   |     | Disponibil.|
+------------+     +------------+     +------------+     +------------+     +------------+
                                                              |
                                                              v
+------------+     +------------+     +------------+     +------------+     +------------+
| Notificac. |<----| Procesador |<----| Cola SQS   |<----| Módulo de  |<--->| Pasarela   |
| Email/SMS  |     | Asíncrono  |     | Mensajes   |     | Pagos      |     | Pago       |
+------------+     +------------+     +------------+     +------------+     +------------+
                                                              |
                                                              v
+------------+     +------------+     +------------+     +------------+
| Usuario    |<----| Frontend   |<----| API        |<----| Base de    |
| Final      |     | React      |     | Gateway    |     | Datos      |
+------------+     +------------+     +------------+     +------------+
                                                              |
                                                              v
                                                        +------------+
                                                        | Sitemander |
                                                        | PMS        |
                                                        +------------+
```

### Puntos de Latencia Potencial y Optimizaciones:

1. **Búsquedas de disponibilidad**:
   - **Latencia**: Consultas a sistemas externos (PMS, channel managers)
   - **Optimización**: Implementación de caché agresivo con TTL ajustado según temporada

2. **Procesamiento de pagos**:
   - **Latencia**: Comunicación con pasarelas de pago externas
   - **Optimización**: Procesamiento asíncrono y feedback visual inmediato al usuario

3. **Carga de imágenes**:
   - **Latencia**: Descarga de imágenes de alojamientos
   - **Optimización**: CDN con puntos de presencia globales, optimización y formatos modernos (WebP)

4. **Sincronización con PMS**:
   - **Latencia**: Actualizaciones bidireccionales con sistemas externos
   - **Optimización**: Webhooks cuando es posible, polling optimizado cuando no lo es

## 4. Diagrama de Despliegue en AWS

```
+------------------------------------------------------------------------------------------------------------------------+
|                                                AWS Cloud (Region Principal)                                              |
|                                                                                                                        |
| +----------------------------------------------+     +----------------------------------------------+                  |
| |               Zona de Disponibilidad A       |     |               Zona de Disponibilidad B       |                  |
| |                                              |     |                                              |                  |
| | +--------------+        +-----------------+  |     | +--------------+        +-----------------+  |                  |
| | | Auto Scaling |        | RDS MySQL       |  |     | | Auto Scaling |        | RDS MySQL       |  |                  |
| | | Group (EC2)  |<------>| (Primary)       |  |     | | Group (EC2)  |<------>| (Replica)       |  |                  |
| | | PHP Servers  |        |                 |  |     | | PHP Servers  |        |                 |  |                  |
| | +--------------+        +-----------------+  |     | +--------------+        +-----------------+  |                  |
| |        ^                        ^           |     |        ^                        ^           |                  |
| |        |                        |           |     |        |                        |           |                  |
| | +--------------+        +-----------------+  |     | +--------------+        +-----------------+  |                  |
| | | ElastiCache  |        | S3 Bucket      |  |     | | ElastiCache  |        | SQS Queues     |  |                  |
| | | Redis        |        | (Imágenes)     |  |     | | Redis        |        | (Asíncrono)    |  |                  |
| | | (Primario)   |        |                |  |     | | (Réplica)    |        |                |  |                  |
| | +--------------+        +-----------------+  |     | +--------------+        +-----------------+  |                  |
| +----------------------------------------------+     +----------------------------------------------+                  |
|                              ^                                                  ^                                     |
|                              |                                                  |                                     |
|                     +------------------+                              +------------------+                            |
|                     | Load Balancer   |                              | CloudWatch       |                            |
|                     | (ALB)           |                              | Monitorización   |                            |
|                     +------------------+                              +------------------+                            |
|                              ^                                                  ^                                     |
|                              |                                                  |                                     |
|                     +------------------+                              +------------------+                            |
|                     | API Gateway      |                              | WAF/Shield      |                            |
|                     |                  |                              | Protección      |                            |
|                     +------------------+                              +------------------+                            |
|                              ^                                                                                       |
|                              |                                                                                       |
|                     +------------------+                                                                             |
|                     | CloudFront CDN  |                                                                             |
|                     |                  |                                                                             |
|                     +------------------+                                                                             |
+------------------------------------------------------------------------------------------------------------------------+
                              ^
                              |
+--------------------------------------------------------+
|              Usuarios/Sistemas Externos                |
| +------------+  +------------+  +------------+         |
| | Navegadores|  | PMS        |  | Pasarelas  |         |
| | Web        |  | Sitemander |  | de Pago    |         |
| +------------+  +------------+  +------------+         |
+--------------------------------------------------------+
```

### Componentes de Alta Disponibilidad:

1. **Múltiples Zonas de Disponibilidad**:
   - Servicios críticos desplegados en al menos dos AZs
   - Failover automático entre zonas

2. **Auto-Scaling Groups para Servidores PHP**:
   - Escalado horizontal basado en métricas de demanda
   - Configuración mínima para garantizar servicio continuo
   - Escalado predictivo para temporadas altas

3. **RDS MySQL Multi-AZ**:
   - Instancia principal con réplica en otra zona
   - Failover automático
   - Réplicas de lectura para distribuir carga de consultas

4. **ElastiCache Redis en Cluster**:
   - Configuración con nodos primarios y réplicas
   - Recuperación automática ante fallos

5. **Estrategia de Backups**:
   - Snapshots diarios de RDS
   - Replicación cross-region para recuperación ante desastres
   - Políticas de retención configuradas según criticidad

6. **Monitorización y Alertas**:
   - CloudWatch para métricas y logs
   - Alarmas configuradas para incidentes críticos
   - Dashboard operativo para visibilidad continua

## 5. Diagrama de Modelo de Datos

```
+---------------+       +-----------------+       +---------------+
| Users         |       | Companies       |       | Accommodations|
+---------------+       +-----------------+       +---------------+
| PK: user_id   |<----->| PK: company_id  |<----->| PK: accom_id  |
| email         |       | name            |       | FK: company_id|
| password_hash |       | contact_info    |       | name          |
| first_name    |       | billing_details |       | type          |
| last_name     |       | status          |       | description   |
| preferences   |       | subscription    |       | address       |
| created_at    |       | created_at      |       | coordinates   |
+---------------+       +-----------------+       | status        |
       |                                          | created_at    |
       |                                          +---------------+
       |                                                 |
       v                                                 |
+---------------+       +-----------------+              |
| Reservations  |       | Availability    |<-------------+
+---------------+       +-----------------+
| PK: reserv_id |       | PK: avail_id    |
| FK: user_id   |       | FK: accom_id    |
| FK: accom_id  |       | date_from       |
| check_in      |       | date_to         |
| check_out     |       | price           |
| guests        |       | quantity        |
| status        |       | status          |
| total_price   |       | last_updated    |
| created_at    |       +-----------------+
+---------------+              |
       |                       |
       |                       |
       v                       v
+---------------+       +-----------------+       +---------------+
| Payments      |       | AccomAttributes |       | Ratings       |
+---------------+       +-----------------+       +---------------+
| PK: payment_id|       | PK: attr_id     |       | PK: rating_id |
| FK: reserv_id |       | FK: accom_id    |       | FK: reserv_id |
| amount        |       | attribute_type  |       | FK: user_id   |
| currency      |       | attribute_value |       | score         |
| payment_method|       | translations    |       | comment       |
| status        |       +-----------------+       | created_at    |
| external_ref  |                                 +---------------+
| created_at    |
+---------------+
```

### Entidades Principales:

1. **Users**:
   - Almacena información de usuarios finales (turistas)
   - Atributos clave: información personal, preferencias, historial
   - Índices: email (UNIQUE), búsqueda por nombre

2. **Companies**:
   - Representa a los propietarios de hospederías
   - Atributos clave: información de contacto, detalles de facturación
   - Relaciones: One-to-Many con Accommodations

3. **Accommodations**:
   - Alojamientos individuales (hoteles, apartamentos, etc.)
   - Atributos clave: tipo, ubicación, descripción
   - Índices: búsqueda geoespacial, filtrado por tipo

4. **Availability**:
   - Control de disponibilidad y precios por fechas
   - Optimizado para consultas de búsqueda rápidas
   - Estrategia: particionado por fechas para consultas eficientes

5. **Reservations**:
   - Registro de todas las reservas
   - Atributos clave: fechas, huéspedes, estado, precio total
   - Índices: búsqueda por usuario, por alojamiento, por fechas

6. **Payments**:
   - Transacciones financieras asociadas a reservas
   - Referencias externas a sistemas de pago
   - Historial completo para auditoría

7. **AccomAttributes**:
   - Características y servicios de los alojamientos
   - Diseño flexible para atributos variables
   - Soporte para traducciones

8. **Ratings**:
   - Valoraciones y comentarios de usuarios
   - Vinculación con reservas completadas

### Consideraciones Multilingües:

- Tablas de traducción asociadas para contenido descriptivo
- Campos de idioma preferido en perfiles de usuario
- Estructura normalizada para traducciones de atributos clave

### Optimizaciones:

- Índices compuestos para búsquedas frecuentes (disponibilidad por fecha + ubicación)
- Particionado de tablas grandes por fecha (reservas, disponibilidad)
- Separación de datos de acceso frecuente vs históricos
- Estrategia de cacheo para resultados de búsquedas populares

## Justificación de Decisiones de Arquitectura

### Elección de Arquitectura Monolítica Modular

**Beneficios:**
1. Desarrollo inicial más rápido y menos complejo
2. Menor sobrecarga operativa en etapas tempranas
3. Facilidad para pruebas end-to-end
4. Despliegue unificado

**Consideraciones futuras:**
- Diseño con límites claros entre módulos para facilitar eventual migración a microservicios
- Interfaces bien definidas entre componentes

### Estrategia de Caché

La implementación de Redis como capa de caché es crítica para:
1. Reducir carga en la base de datos durante picos de tráfico
2. Mejorar tiempos de respuesta en búsquedas frecuentes
3. Almacenar datos de sesión y estados temporales

### Elección de AWS como Plataforma Cloud

**Ventajas clave:**
1. Servicios gestionados reducen carga operativa
2. Auto-scaling nativo para manejar estacionalidad
3. Presencia global para CDN
4. Ecosistema completo que cubre todas las necesidades del proyecto

### Modelo de Datos Relacional

La elección de MySQL (RDS) se justifica por:
1. Naturaleza relacional de los datos de reservas y alojamientos
2. Necesidad de transacciones ACID para pagos y reservas
3. Familiaridad del equipo con tecnología SQL
4. Buen soporte para escalado vertical y réplicas de lectura

### Comunicación Asíncrona para Procesos No Críticos

El uso de colas SQS para procesos como notificaciones y sincronización permite:
1. Mejor resistencia ante fallos temporales
2. Posibilidad de reintento automático
3. Desacoplamiento entre componentes
4. Absorción de picos de carga

Este conjunto de diagramas proporciona una visión completa de la arquitectura desde múltiples perspectivas, permitiendo entender cómo se estructura el sistema, cómo se desplegará en AWS, cómo fluyen los datos a través del sistema, y cómo se organizará la información en la base de datos.

### **2.2. Descripción de componentes principales:**

**Prompt 1:**
Rol: Arquitecto de Software especializado en aplicaciones web
Objetivo: Con el contexto actual del proyecto BOOTBOOKINGCAMP (fase piloto para un camping), analiza y describe los componentes principales adaptados a la realidad de la fase actual. Para cada componente incluye: responsabilidades específicas, tecnologías utilizadas, patrones de diseño, interacciones y consideraciones de escalabilidad.

**Respuesta 1:** COPILOT - GPT-5

# Descripción de Componentes Principales - BOOTBOOKINGCAMP Fase Piloto

Basándome en la arquitectura adaptada para la fase piloto de un único camping, procedo a detallar cada componente principal del sistema, organizados por las capas arquitectónicas establecidas.

## Capa de Cliente

### 1. Aplicación Web React (SPA) - Versión Piloto

**Responsabilidades Específicas**:
- **Visualización del camping piloto**: Información completa, servicios, ubicación
- **Calendario de disponibilidades**: Por tipo de alojamiento (parcelas, bungalows, etc.)
- **Galería de imágenes**: Showcase visual del camping
- **Formularios de contacto**: Captura de interés de reservas
- **Interfaz responsive**: Optimizada para móviles y tablets

**Tecnologías**:
- React 18+ con hooks
- React Router (navegación simple)
- Axios para llamadas HTTP
- Material-UI o TailwindCSS para componentes
- React Hook Form para formularios
- React Image Gallery para galería

**Patrones de Diseño**:
- Component-based architecture simple
- Custom hooks para lógica de disponibilidades
- Context API para datos del camping
- Presentational vs Container components

**Interacciones**:
- Consume API REST PHP para datos del camping
- Se comunica con CDN para imágenes
- Envía formularios de contacto al backend

**Escalabilidad Preparada**:
- Estructura de carpetas preparada para múltiples campings
- Componentes reutilizables para futura expansión
- Estado global escalable

## Capa de Presentación

### 2. API REST PHP - Versión Simplificada

**Responsabilidades Específicas**:
- **Endpoints del camping**: Información, servicios, tipos de alojamiento
- **API de disponibilidades**: Consulta por fechas y tipo
- **Gestión de formularios**: Recepción y procesamiento de contactos
- **Validación básica**: Datos de entrada y sanitización

**Tecnologías**:
- PHP 8.1+ con framework ligero (Slim Framework o puro)
- Composer para dependencias
- PHPMailer para emails
- JWT simple para futuras autenticaciones

**Patrones de Diseño**:
- RESTful API design
- Repository pattern simplificado
- Service layer básico
- Response formatters

**Interacciones**:
- Recibe peticiones del frontend React
- Consulta base de datos MySQL
- Integra con PMS del camping piloto
- Envía emails de notificación

**Preparación Futura**:
- Estructura preparada para GraphQL
- Endpoints escalables para múltiples campings

### 3. CDN Simple (CloudFront)

**Responsabilidades Específicas**:
- **Distribución de imágenes** del camping piloto
- **Caché de assets** estáticos de la aplicación React
- **Optimización automática** de imágenes

**Configuración**:
- AWS CloudFront básico
- Integración con S3 para imágenes
- Compresión automática habilitada

## Capa de Aplicación

### 4. Módulos Funcionales - Versión Piloto

#### 4.1 Módulo de Camping
**Responsabilidades**:
- Gestión de información del camping (nombre, descripción, servicios)
- Tipos de alojamiento disponibles
- Información de contacto y ubicación
- Políticas y condiciones

**Tecnología**: PHP con clases específicas del dominio

#### 4.2 Módulo de Disponibilidades
**Responsabilidades**:
- Consulta de disponibilidad por fechas
- Integración con PMS del camping
- Caché de consultas frecuentes
- Formateo de datos para el frontend

**Patrones**: Repository pattern + Caching strategy

#### 4.3 Módulo de Formularios
**Responsabilidades**:
- Validación de formularios de contacto
- Envío de notificaciones por email
- Almacenamiento de consultas para seguimiento
- Anti-spam básico

#### 4.4 Módulo de Integración PMS
**Responsabilidades**:
- Conexión específica con PMS del camping piloto
- Transformación de datos entre formatos
- Manejo de errores de conectividad
- Sincronización periódica

**Patrones**: Adapter pattern + Circuit breaker básico

## Capa de Persistencia

### 5. Base de Datos MySQL - Estructura Simplificada

**Responsabilidades**:
- **Información del camping**: Datos básicos, servicios, tipos de alojamiento
- **Formularios de contacto**: Registro de consultas recibidas
- **Configuración**: Parámetros del sistema
- **Logs básicos**: Registro de actividad

**Estructura Principal**:
```sql
-- Información del camping
camping_info (id, name, description, address, phone, email, services)
accommodation_types (id, camping_id, name, description, max_guests, base_price)
-- Formularios
contact_forms (id, name, email, phone, message, date_from, date_to, guests, created_at)
-- Configuración
config (key, value)
```

**Optimizaciones**:
- Índices básicos para consultas frecuentes
- Configuración para crecimiento futuro

### 6. Cache Redis - Implementación Básica

**Responsabilidades**:
- **Caché de disponibilidades**: Resultados de consultas PMS
- **Información del camping**: Datos estáticos cached
- **Rate limiting**: Protección contra consultas excesivas

**Configuración**:
- AWS ElastiCache Redis básico
- TTL configurado según tipo de datos
- Estrategia cache-aside

### 7. Almacenamiento S3 - Versión Simple

**Responsabilidades**:
- **Imágenes del camping**: Galería de fotos, logos
- **Assets estáticos**: CSS, JS de la aplicación
- **Documentos**: PDFs informativos si los hay

**Configuración**:
- AWS S3 con políticas básicas
- Integración con CloudFront
- Organización por tipos de contenido

## Servicios de Integración

### 8. Adaptador PMS Específico

**Responsabilidades**:
- **Conexión directa** con el PMS del camping piloto
- **Mapeo de datos** específico para el sistema del camping
- **Gestión de errores** y reintentos
- **Logging** de sincronizaciones

**Implementación**:
- Clase PHP específica para el PMS del camping
- Configuración externalizada
- Manejo de diferentes formatos de respuesta

### 9. Sistema de Email Básico

**Responsabilidades**:
- **Envío de formularios** al camping
- **Confirmaciones** a usuarios
- **Notificaciones** administrativas

**Tecnología**:
- AWS SES o SMTP simple
- PHPMailer para gestión
- Templates HTML básicos

## Consideraciones de Rendimiento - Fase Piloto

### Métricas Objetivo:
- **Tiempo de carga inicial**: < 3 segundos
- **Tiempo de respuesta API**: < 500ms
- **Disponibilidad**: 99% (sin redundancia compleja)
- **Capacidad**: 100+ usuarios concurrentes

### Optimizaciones Implementadas:
1. **Caché estratégico** de disponibilidades
2. **Compresión** de respuestas HTTP
3. **CDN** para contenido estático
4. **Lazy loading** de imágenes
5. **Minificación** de assets CSS/JS

Esta arquitectura de componentes para la fase piloto proporciona una base sólida y funcional para validar el concepto con el camping piloto, manteniendo la capacidad de evolucionar hacia el sistema completo.


### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:**

Rol: Arquitecto de Software especializado en aplicaciones web
Objetivo: Propón una descripción técnica de alto nivel del proyecto BOOTBOOKINGCAMP (fase piloto) y una estructura de ficheros completa para el desarrollo (frontend, backend), incluyendo ejemplos de organización de carpetas, archivos principales, y herramientas de build/testing/deployment.

**Respuesta 1:** COPILOT - GPT-5

# Descripción de Alto Nivel del Proyecto - BOOTBOOKINGCAMP

## Resumen Técnico del Proyecto

### Fase Piloto (Actual)
BOOTBOOKINGCAMP es un sistema web de visualización de disponibilidades para un único camping piloto, desarrollado como validación técnica y de negocio antes de la expansión al motor completo de reservas multi-hospederías.

**Características Técnicas Principales:**
- **Arquitectura**: Monolítica modular con preparación para escalabilidad
- **Frontend**: Single Page Application (SPA) en React 18+
- **Backend**: API REST en PHP 8.1+ con framework ligero
- **Base de datos**: MySQL 8.0 en AWS RDS con réplicas de lectura
- **Cache**: Redis en AWS ElastiCache para optimización de consultas
- **Storage**: AWS S3 para assets estáticos e imágenes
- **CDN**: AWS CloudFront para distribución global
- **Deployment**: Infraestructura como código en AWS

### Objetivos Técnicos de la Fase Piloto
1. **Validación de integración** con PMS específico del camping
2. **Prueba de concepto** de la arquitectura escalable
3. **Optimización de rendimiento** para consultas de disponibilidad
4. **Establecimiento de CI/CD** pipeline para futuras iteraciones
5. **Implementación de monitoring** y logging básico

### Visión Futura (Post-Piloto)
- **Evolución a microservicios** manteniendo compatibilidad
- **Escalado horizontal** para múltiples hospederías
- **API GraphQL** para consultas optimizadas complejas
- **Sistema de reservas completo** con pagos integrados
- **Plataforma multi-tenant** con administración avanzada

## Stack Tecnológico Detallado

### Frontend Stack
```
React 18.2+ (Hooks, Suspense, Concurrent Features)
├── React Router 6+ (Client-side routing)
├── Axios (HTTP client con interceptors)
├── React Hook Form (Form management y validación)
├── React Query (Server state management y cache)
├── Material-UI v5 (Component library)
├── React Image Gallery (Galería de imágenes optimizada)
├── Date-fns (Manipulación de fechas)
└── React-i18next (Internacionalización)

Build Tools:
├── Vite (Build tool y dev server)
├── TypeScript (Type safety)
├── ESLint + Prettier (Code quality)
├── Husky (Git hooks)
└── Jest + Testing Library (Unit testing)
```

### Backend Stack
```
PHP 8.1+
├── Slim Framework 4 (Microframework para API REST)
├── PHP-DI (Dependency injection container)
├── Monolog (Logging system)
├── PHPUnit (Unit testing)
├── Doctrine DBAL (Database abstraction layer)
├── Predis (Redis client)
├── SwiftMailer/PHPMailer (Email handling)
└── Guzzle HTTP (HTTP client para integraciones)

Development Tools:
├── Composer (Package management)
├── PHP_CodeSniffer (Code standards)
├── PHPStan (Static analysis)
└── Xdebug (Debugging)
```

### Infraestructura y DevOps
```
AWS Cloud Platform
├── EC2/ECS (Application hosting)
├── RDS MySQL (Database with Multi-AZ)
├── ElastiCache Redis (Caching layer)
├── S3 (Object storage)
├── CloudFront (CDN)
├── Route 53 (DNS)
├── Certificate Manager (SSL/TLS)
├── CloudWatch (Monitoring y logging)
├── Systems Manager (Configuration management)
└── CodePipeline (CI/CD)

Infrastructure as Code:
├── Terraform (Infrastructure provisioning)
├── Docker (Containerization)
├── GitHub Actions (CI/CD workflows)
└── AWS CLI (Deployment scripts)
```

## Estructura de Ficheros del Proyecto

```
bootbookingcamp/
│
├── 📁 frontend/                              # React SPA
│   ├── 📁 public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/                    # Componentes reutilizables
│   │   │   ├── 📁 common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   │
│   │   │   ├── 📁 forms/
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   ├── AvailabilitySearch.jsx
│   │   │   │   └── DateRangePicker.jsx
│   │   │   │
│   │   │   ├── 📁 camping/
│   │   │   │   ├── CampingInfo.jsx
│   │   │   │   ├── ServicesList.jsx
│   │   │   │   ├── LocationMap.jsx
│   │   │   │   └── ImageGallery.jsx
│   │   │   │
│   │   │   └── 📁 availability/
│   │   │       ├── AvailabilityCalendar.jsx
│   │   │       ├── AccommodationCard.jsx
│   │   │       └── PriceDisplay.jsx
│   │   │
│   │   ├── 📁 pages/                         # Páginas principales
│   │   │   ├── HomePage.jsx
│   │   │   ├── AvailabilityPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── 📁 hooks/                         # Custom hooks
│   │   │   ├── useAvailability.js
│   │   │   ├── useCampingInfo.js
│   │   │   └── useContactForm.js
│   │   │
│   │   ├── 📁 services/                      # API calls y servicios
│   │   │   ├── api.js
│   │   │   ├── campingService.js
│   │   │   ├── availabilityService.js
│   │   │   └── contactService.js
│   │   │
│   │   ├── 📁 utils/                         # Utilidades
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── dateHelpers.js
│   │   │
│   │   ├── 📁 styles/                        # Estilos globales
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── 📁 i18n/                          # Internacionalización
│   │   │   ├── index.js
│   │   │   ├── es.json
│   │   │   ├── en.json
│   │   │   ├── ca.json
│   │   │   └── fr.json
│   │   │
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── setupTests.js
│   │
│   ├── 📁 tests/                             # Tests del frontend
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 hooks/
│   │   └── 📁 utils/
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .prettierrc
│   └── README.md
│
├── 📁 backend/                               # API PHP
│   ├── 📁 public/                            # Punto de entrada público
│   │   ├── index.php
│   │   └── .htaccess
│   │
│   ├── 📁 src/
│   │   ├── 📁 Controllers/                   # Controladores REST
│   │   │   ├── CampingController.php
│   │   │   ├── AvailabilityController.php
│   │   │   ├── ContactController.php
│   │   │   └── HealthController.php
│   │   │
│   │   ├── 📁 Services/                      # Lógica de negocio
│   │   │   ├── CampingService.php
│   │   │   ├── AvailabilityService.php
│   │   │   ├── ContactService.php
│   │   │   ├── EmailService.php
│   │   │   └── CacheService.php
│   │   │
│   │   ├── 📁 Repositories/                  # Acceso a datos
│   │   │   ├── CampingRepository.php
│   │   │   ├── ContactRepository.php
│   │   │   └── ConfigRepository.php
│   │   │
│   │   ├── 📁 Models/                        # Modelos de datos
│   │   │   ├── Camping.php
│   │   │   ├── AccommodationType.php
│   │   │   ├── Availability.php
│   │   │   └── ContactForm.php
│   │   │
│   │   ├── 📁 Integrations/                  # Integraciones externas
│   │   │   ├── 📁 PMS/
│   │   │   │   ├── PMSAdapterInterface.php
│   │   │   │   ├── SitemanderPMSAdapter.php
│   │   │   │   └── GenericPMSAdapter.php
│   │   │   │
│   │   │   └── 📁 Email/
│   │   │       ├── EmailProviderInterface.php
│   │   │       └── SESEmailProvider.php
│   │   │
│   │   ├── 📁 Middleware/                    # Middleware HTTP
│   │   │   ├── CorsMiddleware.php
│   │   │   ├── RateLimitMiddleware.php
│   │   │   ├── AuthMiddleware.php
│   │   │   └── LoggingMiddleware.php
│   │   │
│   │   ├── 📁 Config/                        # Configuración
│   │   │   ├── database.php
│   │   │   ├── cache.php
│   │   │   ├── email.php
│   │   │   └── app.php
│   │   │
│   │   ├── 📁 Utils/                         # Utilidades
│   │   │   ├── Logger.php
│   │   │   ├── Validator.php
│   │   │   ├── ResponseFormatter.php
│   │   │   └── DateHelper.php
│   │   │
│   │   └── 📁 Routes/                        # Definición de rutas
│   │       ├── api.php
│   │       └── web.php
│   │
│   ├── 📁 tests/                             # Tests del backend
│   │   ├── 📁 Unit/
│   │   │   ├── 📁 Services/
│   │   │   ├── 📁 Repositories/
│   │   │   └── 📁 Models/
│   │   │
│   │   ├── 📁 Integration/
│   │   │   ├── 📁 Controllers/
│   │   │   └── 📁 Integrations/
│   │   │
│   │   └── 📁 Feature/
│   │       └── 📁 API/
│   │
│   ├── 📁 database/                          # Base de datos
│   │   ├── 📁 migrations/
│   │   │   ├── 001_create_camping_info.sql
│   │   │   ├── 002_create_accommodation_types.sql
│   │   │   ├── 003_create_contact_forms.sql
│   │   │   └── 004_create_config_table.sql
│   │   │
│   │   ├── 📁 seeds/
│   │   │   ├── camping_pilot_data.sql
│   │   │   └── default_config.sql
│   │   │
│   │   └── schema.sql
│   │
│   ├── 📁 storage/                           # Almacenamiento local
│   │   ├── 📁 logs/
│   │   ├── 📁 cache/
│   │   └── 📁 uploads/
│   │
│   ├── composer.json
│   ├── phpunit.xml
│   ├── phpstan.neon
│   ├── .env.example
│   └── README.md
│
├── 📁 infrastructure/                        # Infraestructura como código
│   ├── 📁 terraform/
│   │   ├── 📁 environments/
│   │   │   ├── 📁 dev/
│   │   │   │   ├── main.tf
│   │   │   │   ├── variables.tf
│   │   │   │   └── terraform.tfvars
│   │   │   │
│   │   │   ├── 📁 staging/
│   │   │   └── 📁 prod/
│   │   │
│   │   ├── 📁 modules/
│   │   │   ├── 📁 vpc/
│   │   │   ├── 📁 ec2/
│   │   │   ├── 📁 rds/
│   │   │   ├── 📁 elasticache/
│   │   │   ├── 📁 s3/
│   │   │   └── 📁 cloudfront/
│   │   │
│   │   └── providers.tf
│   │
│   ├── 📁 docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   ├── docker-compose.yml
│   │   └── docker-compose.prod.yml
│   │
│   └── 📁 scripts/
│       ├── deploy.sh
│       ├── setup-dev.sh
│       ├── backup.sh
│       └── health-check.sh
│
├── 📁 docs/                                 # Documentación técnica
│   ├── 📁 api/
│   │   ├── openapi.yaml
│   │   └── postman-collection.json
│   │
│   ├── 📁 architecture/
│   │   ├── system-design.md
│   │   ├── database-schema.md
│   │   └── deployment-guide.md
│   │
│   └── 📁 development/
│       ├── setup-guide.md
│       ├── coding-standards.md
│       └── testing-guide.md
│
├── 📁 .github/                              # GitHub Actions CI/CD
│   ├── 📁 workflows/
│   │   ├── frontend-ci.yml
│   │   ├── backend-ci.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-production.yml
│   │
│   └── 📁 templates/
│       ├── pull_request_template.md
│       └── issue_template.md
│
├── 📁 monitoring/                           # Monitorización y observabilidad
│   ├── 📁 cloudwatch/
│   │   ├── dashboards.json
│   │   └── alarms.json
│   │
│   └── 📁 logging/
│       ├── logstash.conf
│       └── log-aggregation.yml
│
├── .gitignore
├── .env.example
├── README.md
├── CHANGELOG.md
└── LICENSE
```

## Herramientas de Build, Testing y Deployment

### Frontend Build Pipeline
```bash
# Desarrollo local
npm run dev              # Vite dev server con HMR
npm run build            # Build optimizado para producción
npm run preview          # Preview del build de producción
npm run lint             # ESLint + Prettier
npm run test             # Jest + Testing Library
npm run test:coverage    # Coverage report
npm run type-check       # TypeScript type checking
```

### Backend Development Tools
```bash
# Desarrollo local
composer install         # Instalar dependencias
composer run dev         # Servidor de desarrollo PHP
composer run test        # PHPUnit tests
composer run test:coverage # Coverage report
composer run phpstan     # Static analysis
composer run cs-fix      # Fix coding standards
composer run serve       # Slim app development server
```

### CI/CD Pipeline (GitHub Actions)

#### Frontend Pipeline
```yaml
# .github/workflows/frontend-ci.yml
- Build y test en Node.js 18.x
- Lint y type checking
- Unit tests con coverage
- Build optimizado
- Deploy a S3 + CloudFront invalidation
- Lighthouse CI para performance
```

#### Backend Pipeline
```yaml
# .github/workflows/backend-ci.yml
- Test en PHP 8.1
- Composer install y optimize
- PHPUnit tests con coverage
- PHPStan static analysis
- Docker build y push a ECR
- Deploy via ECS rolling update
- Health checks post-deployment
```

### Deployment Strategy

#### Staging Environment
- **Trigger**: Push a branch `develop`
- **Infraestructura**: Terraform apply automático
- **Base de datos**: Migración automática
- **Testing**: Smoke tests automatizados
- **Rollback**: Automático en caso de fallo

#### Production Environment
- **Trigger**: GitHub Release tag
- **Approval**: Manual review required
- **Blue/Green Deployment**: Zero-downtime
- **Database**: Migración controlada manual
- **Monitoring**: Alertas automáticas activas
- **Rollback**: Manual con scripts preparados

### Monitoring y Observabilidad

#### Métricas Clave
```
Application Metrics:
├── Response time percentiles (p50, p95, p99)
├── Request rate (requests/second)
├── Error rate (4xx, 5xx responses)
├── Database query performance
├── Cache hit ratio
└── External API response times

Business Metrics:
├── Contact form submissions
├── Availability search frequency
├── Popular accommodation types
├── User session duration
└── Bounce rate by page
```

#### Alerting Strategy
- **Critical**: API down, database unavailable
- **Warning**: High response times, cache misses
- **Info**: Deployment completions, backup status

Esta estructura de proyecto está diseñada para la fase piloto pero con escalabilidad en mente, permitiendo una evolución natural hacia el sistema completo multi-hospederías manteniendo las mejores prácticas de desarrollo, testing y deployment.

### **2.4. Infraestructura y despliegue**

**Prompt 1:**

Rol: DevOps Engineer especializado en AWS y arquitecturas escalables
Objetivo: Diseña la infraestructura completa y estrategia de despliegue para BOOTBOOKINGCAMP (fase piloto), incluyendo configuraciones específicas de AWS, estrategias de deployment, configuración de entornos (dev, staging, prod), automatización de pipelines, rollback strategies, y configuración de alertas y dashboards.

**Respuesta 1:** COPILOT - GPT-5

# Infraestructura y Despliegue - BOOTBOOKINGCAMP Fase Piloto

## Arquitectura de Infraestructura AWS

### Configuración de Red (VPC)

```
BOOTBOOKINGCAMP VPC (10.0.0.0/16)
├── Zona de Disponibilidad A (eu-west-1a)
│   ├── Subnet Pública A (10.0.1.0/24)    # ALB, NAT Gateway
│   └── Subnet Privada A (10.0.3.0/24)    # EC2, RDS Primary
├── Zona de Disponibilidad B (eu-west-1b)
│   ├── Subnet Pública B (10.0.2.0/24)    # ALB, NAT Gateway
│   └── Subnet Privada B (10.0.4.0/24)    # EC2, RDS Replica
└── Zona de Disponibilidad C (eu-west-1c)
    └── Subnet Privada C (10.0.5.0/24)    # ElastiCache, Backup
```

### Componentes de Infraestructura Específicos

#### 1. Compute Layer (EC2/ECS)
```yaml
# Configuración recomendada para fase piloto
Frontend (React SPA):
  - Hosting: S3 + CloudFront
  - No requiere instancias EC2

Backend (PHP API):
  Environment: Production
    - Instance Type: t3.medium (2 vCPU, 4 GB RAM)
    - Min Instances: 2
    - Max Instances: 6
    - Auto Scaling Target: 70% CPU
  
  Environment: Staging
    - Instance Type: t3.small (2 vCPU, 2 GB RAM)
    - Min Instances: 1
    - Max Instances: 2
  
  Environment: Development
    - Instance Type: t3.micro (2 vCPU, 1 GB RAM)
    - Min Instances: 1
    - Max Instances: 1
```

#### 2. Database Layer (RDS MySQL)
```yaml
Production:
  - Instance Class: db.t3.medium
  - Engine: MySQL 8.0
  - Multi-AZ: Enabled
  - Storage: 100 GB SSD (gp2)
  - Backup Retention: 7 days
  - Read Replica: 1 instance (db.t3.small)

Staging:
  - Instance Class: db.t3.small
  - Engine: MySQL 8.0
  - Multi-AZ: Disabled
  - Storage: 50 GB SSD (gp2)
  - Backup Retention: 3 days

Development:
  - Instance Class: db.t3.micro
  - Engine: MySQL 8.0
  - Multi-AZ: Disabled
  - Storage: 20 GB SSD (gp2)
  - Backup Retention: 1 day
```

#### 3. Cache Layer (ElastiCache Redis)
```yaml
Production:
  - Node Type: cache.t3.medium
  - Number of Nodes: 2 (Primary + Replica)
  - Engine: Redis 7.0
  - Parameter Group: Custom (optimizado para disponibilidades)

Staging/Development:
  - Node Type: cache.t3.micro
  - Number of Nodes: 1 (Single node)
  - Engine: Redis 7.0
```

#### 4. Storage (S3)
```yaml
Buckets Configuration:
  bootbookingcamp-assets-prod:
  - Propósito: Imágenes del camping, assets estáticos
  - Storage Class: Standard
  - Versioning: Enabled
  - Lifecycle: Transition to IA after 30 days
  
  bootbookingcamp-backups:
  - Propósito: Backups de base de datos y logs
  - Storage Class: Standard-IA
  - Encryption: AES-256

  bootbookingcamp-logs:
  - Propósito: Logs de aplicación
  - Storage Class: Standard
  - Lifecycle: Delete after 90 days
```

#### 5. CDN (CloudFront)
```yaml
Distribution Configuration:
  Origins:
  - S3 Bucket (React SPA): bootbookingcamp-assets-prod
  - ALB (API): api.bootbookingcamp.com
  
  Behaviors:
  - /api/*: Forward to ALB (no caching)
  - /assets/*: Cache for 1 year
  - /*: Cache for 1 hour (SPA routing)
  
  Geographic Restrictions: None
  SSL Certificate: AWS Certificate Manager
```

### Security Groups Configuration

```yaml
ALB Security Group:
  Inbound:
  - Port 80 (HTTP): 0.0.0.0/0
  - Port 443 (HTTPS): 0.0.0.0/0
  Outbound:
  - All traffic: 0.0.0.0/0

EC2 Security Group:
  Inbound:
  - Port 80: ALB Security Group
  - Port 22: Bastion Host (maintenance)
  Outbound:
  - All traffic: 0.0.0.0/0

RDS Security Group:
  Inbound:
  - Port 3306: EC2 Security Group
  Outbound: None

ElastiCache Security Group:
  Inbound:
  - Port 6379: EC2 Security Group
  Outbound: None
```

## Estrategia de Despliegue

### Pipeline CI/CD con GitHub Actions

#### Estrategia Recomendada: **Rolling Deployment con Blue/Green para Producción**

**Justificación:**
- **Rolling Updates**: Ideal para staging y desarrollo (rápido, costo-efectivo)
- **Blue/Green**: Para producción (zero-downtime, rollback inmediato)
- **Automatización progresiva**: Manual approval para producción

### 1. Frontend Deployment Pipeline

```yaml
# .github/workflows/frontend-deploy.yml
name: Frontend Deployment Pipeline

on:
  push:
    branches: [develop, main]
    paths: ['frontend/**']

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Setup Node.js 18.x
      - name: Install dependencies
      - name: Run tests with coverage
      - name: ESLint and Prettier check
      - name: Build optimized bundle
      - name: Upload build artifacts

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: test-and-build
    environment: staging
    steps:
      - name: Deploy to S3 staging
      - name: Invalidate CloudFront staging
      - name: Run smoke tests

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test-and-build
    environment: production
    steps:
      - name: Manual approval required
      - name: Deploy to S3 production
      - name: Invalidate CloudFront production
      - name: Run production smoke tests
      - name: Notify team on Slack
```

### 2. Backend Deployment Pipeline

```yaml
# .github/workflows/backend-deploy.yml
name: Backend Deployment Pipeline

on:
  push:
    branches: [develop, main]
    paths: ['backend/**']

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Setup PHP 8.1
      - name: Composer install
      - name: PHPUnit tests with coverage
      - name: PHPStan static analysis
      - name: Build Docker image
      - name: Push to ECR

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: test-and-build
    environment: staging
    strategy: rolling-update
    steps:
      - name: Deploy to ECS staging (rolling)
      - name: Health check validation
      - name: Integration tests

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test-and-build
    environment: production
    strategy: blue-green
    steps:
      - name: Manual approval required
      - name: Deploy to Blue environment
      - name: Comprehensive health checks
      - name: Load testing validation
      - name: Switch traffic to Blue
      - name: Monitor for 10 minutes
      - name: Terminate Green environment
```

### Estrategias de Rollback

#### 1. Rollback Automático
```yaml
Triggers automáticos:
- Health check failures (>3 consecutive)
- Error rate > 5% durante 5 minutos
- Response time > 2000ms durante 10 minutos
- Database connection failures

Actions:
- Frontend: CloudFront invalidation a versión anterior
- Backend: ECS service rollback to previous task definition
- Notification: Slack alert al equipo de desarrollo
```

#### 2. Rollback Manual
```yaml
Comandos disponibles:
- aws ecs update-service --rollback
- aws s3 sync s3://backup-bucket/version-X/ s3://prod-bucket/
- ./scripts/rollback-database.sh [version]

Tiempo estimado:
- Frontend: < 2 minutos
- Backend: < 5 minutos
- Database: 10-30 minutos (según tamaño)
```

## Configuración de Entornos

### Development Environment
```yaml
Purpose: Desarrollo local y testing individual
Infrastructure:
  - EC2: t3.micro (1 instancia)
  - RDS: db.t3.micro (single AZ)
  - ElastiCache: cache.t3.micro (1 nodo)
  - S3: Bucket compartido dev

Deployment:
  - Trigger: Push a feature branches
  - Strategy: Direct deployment
  - Rollback: Manual only
  - Retention: 3 días para logs y backups

Access:
  - Developers: SSH access via VPN
  - Database: Accessible from development subnet
  - Monitoring: Basic CloudWatch metrics
```

### Staging Environment
```yaml
Purpose: Testing de integración y UAT
Infrastructure:
  - EC2: t3.small (1-2 instancias con ASG)
  - RDS: db.t3.small (single AZ, 3-day backup)
  - ElastiCache: cache.t3.micro (1 nodo)
  - S3: Bucket dedicado staging

Deployment:
  - Trigger: Push to develop branch
  - Strategy: Rolling updates
  - Rollback: Automatic on health check failure
  - Retention: 7 días para logs, 3 días backups

Access:
  - QA Team: Web access only
  - Developers: SSH access via bastion
  - Monitoring: CloudWatch + custom dashboards
```

### Production Environment
```yaml
Purpose: Entorno live para usuarios finales
Infrastructure:
  - EC2: t3.medium (2-6 instancias con ASG)
  - RDS: db.t3.medium (Multi-AZ, read replica)
  - ElastiCache: cache.t3.medium (2 nodos)
  - S3: Múltiples buckets con versionado

Deployment:
  - Trigger: Push to main branch + manual approval
  - Strategy: Blue/Green deployment
  - Rollback: Automatic + manual override
  - Retention: 30 días logs, 7 días backups

Access:
  - Limited SSH access (emergency only)
  - Database: Private subnet only
  - Monitoring: Full observability stack
```

## Monitorización y Alertas

### Dashboards Operativos

#### 1. Application Performance Dashboard
```yaml
Métricas principales:
- Response Time Percentiles (p50, p95, p99)
- Request Rate (requests/minute)
- Error Rate (4xx, 5xx by endpoint)
- Database Connection Pool Status
- Cache Hit/Miss Ratio
- Queue Depth (if applicable)

Visualización:
- Time Series: Últimas 24 horas
- Aggregation: 5-minute intervals
- Alerting: Integrated thresholds
```

#### 2. Infrastructure Health Dashboard
```yaml
Métricas de sistema:
- EC2 CPU/Memory/Disk utilization
- RDS CPU/Connections/Query performance
- ElastiCache Memory/CPU/Connections
- ALB Request count/Target health
- CloudFront Cache statistics

Network metrics:
- VPC Flow logs analysis
- NAT Gateway bandwidth
- Data transfer costs tracking
```

#### 3. Business Metrics Dashboard (Camping-específico)
```yaml
Métricas de negocio:
- Contact Form Submissions (por hora/día)
- Availability Search Frequency
- Popular Accommodation Types
- Geographic Distribution of Users
- Session Duration and Bounce Rate
- Peak Usage Times
- Seasonal Patterns

Integration:
- Google Analytics data
- Custom events from React app
- Backend business logic metrics
```

### Sistema de Alertas por Criticidad

#### Critical Alerts (Immediate Action Required)
```yaml
Application Down:
- Condition: Health check failures > 3 consecutive
- Notification: SMS + Slack + Email
- Escalation: 5 minutes

Database Unavailable:
- Condition: Connection failures > 90%
- Notification: SMS + Slack + Email
- Escalation: Immediate

High Error Rate:
- Condition: 5xx errors > 5% for 5 minutes
- Notification: Slack + Email
- Escalation: 10 minutes

Response Time Degradation:
- Condition: p95 > 2000ms for 10 minutes
- Notification: Slack + Email
- Escalation: 15 minutes
```

#### Warning Alerts (Monitor Closely)
```yaml
High CPU Usage:
- Condition: > 80% for 15 minutes
- Notification: Slack
- Action: Consider scaling

Low Cache Hit Rate:
- Condition: < 70% for 30 minutes
- Notification: Slack
- Action: Review cache strategy

Disk Space:
- Condition: > 85% usage
- Notification: Email
- Action: Clean up or expand storage

High Memory Usage:
- Condition: > 85% for 20 minutes
- Notification: Slack
- Action: Investigate memory leaks
```

#### Info Alerts (Awareness)
```yaml
Deployment Completions:
- Trigger: Successful deployment
- Notification: Slack
- Include: Version info, duration

Backup Status:
- Trigger: Daily backup completion/failure
- Notification: Email
- Include: Backup size, duration

Unusual Traffic Patterns:
- Trigger: 50% increase in traffic
- Notification: Slack
- Include: Source analysis
```

### Configuración de CloudWatch

#### Custom Metrics para BOOTBOOKINGCAMP
```yaml
Application Metrics:
- camping.contact_forms.submitted
- camping.availability.searches
- camping.accommodation.views
- camping.errors.pms_integration
- camping.cache.availability_hits

Infrastructure Metrics:
- EC2: Custom memory metrics via CloudWatch agent
- RDS: Query performance insights enabled
- ElastiCache: Custom Redis metrics
- Application Load Balancer: Request routing metrics

Log Groups:
- /aws/ec2/bootbookingcamp/application
- /aws/rds/bootbookingcamp/error
- /aws/rds/bootbookingcamp/general
- /aws/elasticache/bootbookingcamp
```

#### Retention Policies
```yaml
CloudWatch Logs:
- Application logs: 30 days
- Error logs: 90 days
- Access logs: 14 days

CloudWatch Metrics:
- Detailed monitoring: 15 months
- Basic monitoring: 15 months
- Custom metrics: 15 months

S3 Logs:
- ALB access logs: 30 days → IA → Delete 90 days
- CloudFront logs: 30 days → IA → Delete 90 days
```

## Automatización de Infraestructura

### Terraform Strategy (General)
```yaml
Structure:
terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── ec2/
│   ├── rds/
│   └── monitoring/
└── shared/
    ├── variables.tf
    └── outputs.tf

Deployment:
- Plan: Automated on PR
- Apply: Manual approval for prod
- State: S3 backend with DynamoDB locking
- Modules: Versioned and tested
```

### Scripts de Automatización
```bash
# Deployment scripts
./scripts/deploy.sh [environment] [component]
./scripts/rollback.sh [environment] [version]
./scripts/health-check.sh [environment]

# Maintenance scripts
./scripts/backup-database.sh [environment]
./scripts/cleanup-logs.sh [retention-days]
./scripts/scale-environment.sh [environment] [desired-capacity]

# Monitoring scripts
./scripts/generate-report.sh [date-range]
./scripts/check-performance.sh [environment]
```

Esta infraestructura está diseñada específicamente para soportar BOOTBOOKINGCAMP en su fase piloto, proporcionando la base para una expansión futura manteniendo altos estándares de disponibilidad, seguridad y observabilidad.

### **2.5. Seguridad**

**Prompt 1:**

Rol: Security Engineer especializado en aplicaciones web y compliance
Objetivo: Diseña un sistema de seguridad completo para BOOTBOOKINGCAMP que cumpla con GDPR, maneje datos sensibles y pagos futuros, implemente diferentes niveles de acceso, use cifrado recomendado, incluya estrategias de anonización, proteja contra DDoS y scraping, con auditoría detallada y alta trazabilidad.

**Respuesta 1:** COPILOT - GPT-5

# Sistema de Seguridad Integral - BOOTBOOKINGCAMP

## Arquitectura de Seguridad Multi-Capa

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PERÍMETRO                           │
├─────────────────────────────────────────────────────────────────┤
│ AWS WAF + Shield → CloudFront → Route 53 → Certificate Manager │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CAPA DE APLICACIÓN                           │
├─────────────────────────────────────────────────────────────────┤
│ API Gateway → ALB → Rate Limiting → CSRF Protection → Input Val │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                               │
├─────────────────────────────────────────────────────────────────┤
│ Encryption at Rest → Encryption in Transit → Access Control    │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                  CAPA DE AUDITORÍA                             │
├─────────────────────────────────────────────────────────────────┤
│ CloudTrail → CloudWatch → Security Logs → Compliance Reports   │
└─────────────────────────────────────────────────────────────────┘
```

## 1. Seguridad de Infraestructura

### AWS WAF (Web Application Firewall)

```yaml
# Configuración WAF específica para BOOTBOOKINGCAMP
WAF Rules Priority:

1. IP Reputation Lists (Priority: 1):
   - AWS IP Reputation list
   - Anonymous proxies list
   - Known malicious IPs
   - Action: Block

2. Geographic Restrictions (Priority: 2):
   - Allow: EU, North America, Australia
   - Block: High-risk countries
   - Action: Block suspicious regions

3. Rate Limiting (Priority: 3):
   - General requests: 2000/5min per IP
   - API endpoints: 100/1min per IP
   - Contact forms: 5/hour per IP
   - Availability searches: 50/hour per IP
   - Action: Block with 429 status

4. Common Attack Patterns (Priority: 4):
   - SQL Injection protection
   - XSS protection
   - Local File Inclusion (LFI)
   - Remote File Inclusion (RFI)
   - Action: Block and log

5. Bot Protection (Priority: 5):
   - AWS Managed Bot Control
   - CAPTCHA challenge for suspicious behavior
   - JavaScript challenge for scrapers
   - Action: Challenge/Block

6. DDoS Protection (Priority: 6):
   - AWS Shield Standard (included)
   - AWS Shield Advanced (recommended for production)
   - Layer 3/4 protection
   - Application layer DDoS mitigation
```

### Network Security

```yaml
VPC Security Configuration:

Network ACLs:
  Public Subnets:
    Inbound:
    - Port 80 (HTTP): Allow from 0.0.0.0/0
    - Port 443 (HTTPS): Allow from 0.0.0.0/0
    - Port 22 (SSH): Deny from 0.0.0.0/0
    Outbound:
    - All traffic: Allow to private subnets only

  Private Subnets:
    Inbound:
    - Port 80/443: Allow from public subnets only
    - Port 3306: Allow from application subnet only
    - Port 6379: Allow from application subnet only
    Outbound:
    - HTTPS (443): Allow to 0.0.0.0/0 (for API calls)
    - NTP (123): Allow to 0.0.0.0/0
    - DNS (53): Allow to 0.0.0.0/0

Security Groups (Refined):
  ALB-SG:
    Inbound: 80, 443 from 0.0.0.0/0
    Outbound: 80 to EC2-SG
  
  EC2-SG:
    Inbound: 80 from ALB-SG, 22 from Bastion-SG
    Outbound: 443 to 0.0.0.0/0, 3306 to RDS-SG, 6379 to Cache-SG
  
  RDS-SG:
    Inbound: 3306 from EC2-SG only
    Outbound: None
  
  Cache-SG:
    Inbound: 6379 from EC2-SG only
    Outbound: None

VPC Flow Logs:
  - Enable for all network interfaces
  - Destination: CloudWatch Logs
  - Traffic type: ALL (Accept, Reject, All)
  - Retention: 90 days
  - Analysis: Automated anomaly detection
```

### Cifrado Integral

```yaml
Encryption at Rest:

RDS MySQL:
  - Engine: MySQL 8.0 with encryption enabled
  - KMS Key: Customer-managed CMK for production
  - Backup encryption: Enabled
  - Log encryption: Enabled
  - Performance Insights: Encrypted

ElastiCache Redis:
  - Encryption at rest: Enabled
  - Auth token: Required
  - Transit encryption: Enabled
  - KMS Key: AWS managed for staging, customer-managed for prod

S3 Buckets:
  - Default encryption: AES-256 or KMS
  - Bucket versioning: Enabled
  - MFA Delete: Enabled for production
  - Public access: Blocked
  - SSL requests only: Enforced

EBS Volumes:
  - All volumes encrypted with KMS
  - Default encryption enabled in region
  - Snapshot encryption: Automatic

Encryption in Transit:

SSL/TLS Configuration:
  - TLS 1.2 minimum (TLS 1.3 preferred)
  - Strong cipher suites only
  - Perfect Forward Secrecy (PFS)
  - HSTS headers enforced
  - Certificate pinning for mobile apps (future)

API Communications:
  - All API calls require HTTPS
  - Certificate validation enforced
  - Internal service mesh encryption (future microservices)

Database Connections:
  - SSL certificates for MySQL connections
  - Encrypted Redis connections
  - Connection pooling with encryption
```

## 2. Autenticación y Autorización

### Sistema de Autenticación Híbrido

```yaml
# Fase Piloto: Simplified Auth + Future-ready
Authentication Methods:

1. Anonymous Users (Fase Piloto Actual):
   - Contact forms: No auth required
   - Availability searches: Rate-limited by IP
   - Session management: Temporary tokens for form state
   - CSRF protection: Required for all forms

2. JWT for API Authentication (Preparado para futuro):
   - Access tokens: 15 minutes expiry
   - Refresh tokens: 7 days expiry
   - Token rotation: Automatic on refresh
   - Secure storage: HTTP-only cookies + localStorage hybrid

3. OAuth 2.0 Integration (Futuro sistema completo):
   - Providers: Google, Facebook, Apple Sign-In
   - PKCE flow for SPAs
   - Scope-based access control
   - Social login with email verification

4. Session Management:
   - Secure session cookies
   - SameSite=Strict attribute
   - HttpOnly flag
   - Secure flag for HTTPS
   - Session timeout: 30 minutes inactive
```

### Modelo de Autorización RBAC

```yaml
# Role-Based Access Control System
Roles and Permissions:

1. Anonymous User (Fase Piloto):
   Permissions:
   - camping.info.read
   - camping.availability.search
   - camping.gallery.view
   - contact.form.submit (rate-limited)
   - camping.location.view

2. Registered User (Future):
   Permissions:
   - All Anonymous permissions
   - user.profile.manage
   - user.preferences.update
   - booking.history.view
   - favorites.manage

3. Camping Admin (Future):
   Permissions:
   - camping.info.update
   - camping.gallery.manage
   - camping.availability.view
   - booking.requests.view
   - reports.basic.view

4. System Admin:
   Permissions:
   - system.config.manage
   - users.manage
   - security.logs.view
   - monitoring.access
   - audit.reports.generate

Authorization Middleware:
```php
// Ejemplo de middleware PHP para autorización
class AuthorizationMiddleware {
    public function authorize($permission, $resource = null) {
        $user = $this->getCurrentUser();
        $roles = $this->getUserRoles($user);
        
        foreach ($roles as $role) {
            if ($this->roleHasPermission($role, $permission, $resource)) {
                return true;
            }
        }
        
        throw new UnauthorizedException("Insufficient permissions");
    }
    
    private function roleHasPermission($role, $permission, $resource) {
        // Check permission matrix with resource-level access
        return $this->permissionMatrix[$role][$permission] ?? false;
    }
}
```

## 3. Protección de Datos y GDPR Compliance

### Estrategias de Protección de Datos Personales

```yaml
Data Classification:

Public Data:
  - Camping general information
  - Services and amenities
  - Location and contact info (general)
  - Public gallery images

Personal Data (GDPR Protected):
  - Contact form submissions
  - Email addresses
  - Phone numbers
  - Names and messages
  - IP addresses and session data
  - Booking preferences (future)

Sensitive Data (High Protection):
  - Payment information (future)
  - Identity documents (future)
  - Location tracking data
  - Communication records

Data Processing Principles:

1. Lawfulness and Transparency:
   - Explicit consent for contact forms
   - Clear privacy policy
   - Purpose limitation clearly stated
   - Data retention periods specified

2. Data Minimization:
   - Collect only necessary information
   - Optional vs required fields clearly marked
   - Progressive data collection

3. Accuracy and Storage Limitation:
   - Data validation at input
   - Regular data cleanup processes
   - User-initiated data correction (future)
```

### Anonización y Pseudonimización

```php
// Estrategias de Anonización implementadas
class DataAnonymization {
    
    // Pseudonimización de emails para analytics
    public function pseudonymizeEmail($email) {
        $hash = hash('sha256', $email . $this->salt);
        return substr($hash, 0, 16) . '@anonymized.local';
    }
    
    // Anonización de IPs para logs
    public function anonymizeIP($ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            return preg_replace('/\.\d+$/', '.0', $ip);
        }
        // IPv6 anonymization
        return preg_replace('/:[^:]+:[^:]+$/', ':0:0', $ip);
    }
    
    // Eliminación automática de datos sensibles
    public function scheduleDataDeletion($userId, $retentionPeriod) {
        $deleteDate = now()->addDays($retentionPeriod);
        
        DataDeletionJob::dispatch($userId)
            ->delay($deleteDate)
            ->onQueue('data-privacy');
    }
    
    // Exportación de datos (Right to portability)
    public function exportUserData($userId) {
        return [
            'contact_forms' => $this->getContactForms($userId),
            'preferences' => $this->getUserPreferences($userId),
            'interactions' => $this->getAnonymizedInteractions($userId)
        ];
    }
}
```

### GDPR Compliance Implementation

```yaml
Rights Implementation:

1. Right to Information:
   - Privacy policy accessible from all pages
   - Cookie consent banner
   - Data processing purposes clearly stated
   - Contact details for data protection

2. Right of Access:
   - User data export functionality
   - Self-service data viewing (future)
   - Response within 30 days

3. Right to Rectification:
   - Data correction forms
   - Automated validation
   - Audit trail for changes

4. Right to Erasure (Right to be Forgotten):
   - One-click data deletion request
   - Automated deletion workflows
   - Verification of complete removal

5. Right to Restrict Processing:
   - Data processing pause functionality
   - Minimal processing modes
   - Clear restoration procedures

6. Right to Data Portability:
   - Structured data export (JSON/CSV)
   - Automated export generation
   - Secure transfer mechanisms

Consent Management:
```javascript
// Frontend consent management
class ConsentManager {
    constructor() {
        this.consentTypes = {
            necessary: true,  // Always required
            analytics: false, // Optional
            marketing: false, // Optional
            preferences: false // Optional
        };
    }
    
    requestConsent(type, purpose) {
        return new Promise((resolve) => {
            this.showConsentDialog({
                type: type,
                purpose: purpose,
                onAccept: () => {
                    this.recordConsent(type, true);
                    resolve(true);
                },
                onDecline: () => {
                    this.recordConsent(type, false);
                    resolve(false);
                }
            });
        });
    }
    
    recordConsent(type, granted) {
        const consent = {
            type: type,
            granted: granted,
            timestamp: new Date().toISOString(),
            version: this.getPrivacyPolicyVersion()
        };
        
        this.sendToBackend('/api/consent', consent);
        localStorage.setItem(`consent_${type}`, JSON.stringify(consent));
    }
}
```

## 4. Protección contra Amenazas Específicas

### Anti-DDoS Strategy

```yaml
Multi-Layer DDoS Protection:

Layer 3/4 Protection (Network Level):
  AWS Shield Standard:
  - SYN/UDP floods protection
  - Reflection attacks mitigation
  - Automatic detection and mitigation
  - 99.99% uptime SLA

  AWS Shield Advanced (Production):
  - Enhanced detection algorithms
  - 24/7 DDoS Response Team access
  - Cost protection against scaling charges
  - Advanced attack diagnostics

Layer 7 Protection (Application Level):
  Rate Limiting Rules:
  - API endpoints: 100 requests/minute/IP
  - Search functionality: 50 searches/hour/IP
  - Contact forms: 5 submissions/hour/IP
  - Static assets: 1000 requests/minute/IP

  Behavioral Analysis:
  - Request pattern anomaly detection
  - Geographic distribution analysis
  - User-Agent string analysis
  - JavaScript challenge for suspicious traffic

Application-Level Mitigation:
  - Circuit breaker pattern for external services
  - Graceful degradation during high load
  - Queue-based processing for non-critical operations
  - Cache optimization for frequently accessed data
```

### Anti-Scraping Protection

```yaml
Scraping Protection Strategy:

1. Technical Measures:
   Rate Limiting:
   - Availability API: 10 requests/minute/IP
   - Progressive delays for repeated requests
   - Temporary IP blocking for violations
   
   CAPTCHAs:
   - Trigger after 20 availability searches/hour
   - Google reCAPTCHA v3 integration
   - Challenge escalation for persistent scrapers
   
   JavaScript Challenges:
   - Dynamic token generation
   - Browser fingerprinting
   - Headless browser detection

2. Behavioral Detection:
   Pattern Analysis:
   - Request timing analysis
   - Sequential access patterns
   - Missing referrer headers
   - Unusual User-Agent strings
   
   Honeypot Techniques:
   - Hidden form fields
   - Invisible links
   - Fake data endpoints
   - Time-based traps

3. Content Protection:
   - Dynamic content rendering
   - Anti-copy JavaScript
   - Watermarked images
   - Obfuscated API responses

Implementation Example:
```php
class AntiScrapingMiddleware {
    public function handle($request, $next) {
        $ip = $request->ip();
        $userAgent = $request->userAgent();
        
        // Check rate limits
        if ($this->exceedsRateLimit($ip)) {
            return $this->challengeUser($request);
        }
        
        // Detect suspicious patterns
        if ($this->isSuspiciousPattern($request)) {
            $this->logSuspiciousActivity($request);
            return $this->requireVerification($request);
        }
        
        // Check for bot signatures
        if ($this->isKnownBot($userAgent)) {
            return $this->handleBot($request);
        }
        
        return $next($request);
    }
    
    private function challengeUser($request) {
        return response()->json([
            'error' => 'Rate limit exceeded',
            'challenge' => $this->generateCaptchaChallenge(),
            'retry_after' => 3600
        ], 429);
    }
}
```

### Input Validation and Sanitization

```php
// Comprehensive input validation
class SecurityValidator {
    
    public function validateContactForm($data) {
        $rules = [
            'name' => 'required|string|max:100|regex:/^[a-zA-ZñÑáéíóúüÁÉÍÓÚÜ\s]+$/',
            'email' => 'required|email|max:255|filter:email',
            'phone' => 'nullable|regex:/^[+]?[0-9\s\-\(\)]+$/',
            'message' => 'required|string|max:1000',
            'date_from' => 'required|date|after:today',
            'date_to' => 'required|date|after:date_from',
            'guests' => 'required|integer|min:1|max:20'
        ];
        
        $validator = Validator::make($data, $rules);
        
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        
        // Additional security checks
        $this->checkForMaliciousContent($data);
        $this->sanitizeInputs($data);
        
        return $data;
    }
    
    private function checkForMaliciousContent($data) {
        $maliciousPatterns = [
            '/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/mi',
            '/javascript:/i',
            '/on\w+\s*=/i',
            '/\bunion\b.*\bselect\b/i',
            '/\bdrop\b.*\btable\b/i'
        ];
        
        foreach ($data as $field => $value) {
            foreach ($maliciousPatterns as $pattern) {
                if (preg_match($pattern, $value)) {
                    $this->logSecurityIncident([
                        'type' => 'malicious_input',
                        'field' => $field,
                        'pattern' => $pattern,
                        'ip' => request()->ip()
                    ]);
                    throw new SecurityException("Malicious input detected");
                }
            }
        }
    }
}
```

## 5. Auditoría y Trazabilidad

### Sistema de Auditoría Completo

```yaml
Audit Logging Strategy:

Security Events (High Priority):
  - Authentication attempts (success/failure)
  - Authorization failures
  - Privilege escalations
  - Data access patterns
  - Configuration changes
  - Suspicious activities
  - Rate limit violations

Business Events (Medium Priority):
  - Contact form submissions
  - Availability searches
  - Data exports/modifications
  - User preferences changes
  - System integrations (PMS)

System Events (Low Priority):
  - Application starts/stops
  - Database connections
  - Cache operations
  - External API calls
  - Performance metrics

Log Format (JSON Structure):
```json
{
  "timestamp": "2025-10-05T10:30:00.000Z",
  "event_type": "security_incident",
  "severity": "high",
  "user_info": {
    "user_id": "anonymous",
    "ip_address": "192.168.1.100",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess_abc123"
  },
  "event_details": {
    "action": "malicious_input_detected",
    "resource": "/api/contact",
    "field": "message",
    "pattern_matched": "script_injection",
    "blocked": true
  },
  "context": {
    "request_id": "req_xyz789",
    "trace_id": "trace_def456",
    "environment": "production"
  },
  "metadata": {
    "source": "security_middleware",
    "version": "1.0.0"
  }
}
```

### Compliance Monitoring

```yaml
GDPR Compliance Tracking:

Data Processing Activities:
  - Track all personal data collection points
  - Monitor consent status and changes
  - Log data retention and deletion activities
  - Record data sharing with third parties
  - Audit data access and modifications

Automated Compliance Checks:
  - Daily scan for expired data
  - Weekly consent compliance report
  - Monthly data inventory update
  - Quarterly security assessment
  - Annual privacy impact assessment

Compliance Dashboard Metrics:
  - Active consents by type
  - Data retention compliance rate
  - Privacy request response times
  - Security incident trends
  - Third-party data sharing audit
```

### Security Monitoring and Alerting

```yaml
Real-time Security Monitoring:

Critical Alerts (Immediate Response):
  - Multiple failed authentication attempts
  - SQL injection attempts
  - Unusual data access patterns
  - DDoS attack indicators
  - System intrusion attempts

Warning Alerts (Monitor Closely):
  - Rate limit violations
  - Suspicious user behavior
  - Configuration changes
  - Failed authorization attempts
  - Unusual traffic patterns

Info Alerts (Awareness):
  - Successful privilege changes
  - Large data exports
  - New device logins
  - System maintenance events
  - Compliance report generation

Security Dashboard Components:
```javascript
// Security metrics dashboard
const securityMetrics = {
    realTimeThreats: {
        blocked_requests: 150,
        rate_limit_violations: 23,
        malicious_ips_blocked: 8,
        captcha_challenges: 45
    },
    
    complianceStatus: {
        gdpr_compliance_rate: 98.5,
        active_consents: 1250,
        pending_deletion_requests: 3,
        data_retention_violations: 0
    },
    
    securityHealth: {
        ssl_certificate_expiry: "90 days",
        vulnerability_scan_score: "A+",
        security_patches_pending: 0,
        backup_integrity: "100%"
    }
};
```

## 6. Incident Response Plan

```yaml
Security Incident Response Workflow:

Detection Phase:
  - Automated alert triggers
  - Log analysis and correlation
  - Threat intelligence integration
  - User reports and feedback

Analysis Phase:
  - Incident severity assessment
  - Impact analysis
  - Root cause investigation
  - Evidence collection

Containment Phase:
  - Immediate threat isolation
  - System access restriction
  - Data breach prevention
  - Service continuity maintenance

Recovery Phase:
  - System restoration
  - Data integrity verification
  - Security patch application
  - Monitoring enhancement

Post-Incident Phase:
  - Incident documentation
  - Lessons learned analysis
  - Process improvement
  - Stakeholder communication

Response Team Contacts:
  - Security Lead: immediate escalation
  - DevOps Engineer: system recovery
  - Legal/Compliance: regulatory requirements
  - Communications: stakeholder updates
```

Este sistema de seguridad integral proporciona protección robusta para BOOTBOOKINGCAMP desde su fase piloto, cumpliendo con GDPR y preparando la base para el crecimiento futuro con múltiples niveles de protección, auditoría completa y capacidades de respuesta ante incidentes.

### **2.6. Tests**

**Prompt 1:**

Rol: QA Engineer especializado en testing de aplicaciones web
Objetivo: Diseña un sistema de testing básico para BOOTBOOKINGCAMP fase piloto con 80% cobertura, usando Cypress para E2E multi-browser y responsive, Jest para frontend, PHPUnit para backend, con fixtures estáticos, load testing, y estrategia de test data específica para el camping piloto.

**Respuesta 1:** COPILOT - GPT-5

# Sistema de Testing Integral - BOOTBOOKINGCAMP Fase Piloto

## Estrategia de Testing General

```
                    PIRÁMIDE DE TESTING BOOTBOOKINGCAMP
                             
                         🔺 E2E Tests (10%)
                        /                  \
                   ┌─────────────────────────┐
                   │  Critical User Flows   │
                   │  Cross-browser Testing │
                   │  Mobile Responsive     │
                   └─────────────────────────┘
                      /                  \
                 ┌─────────────────────────────┐
                 │   Integration Tests (20%)   │
                 │   API Endpoints             │
                 │   Component Integration     │
                 │   Service Layer             │
                 └─────────────────────────────┘
                /                              \
           ┌─────────────────────────────────────┐
           │        Unit Tests (70%)             │
           │   React Components + Hooks          │
           │   PHP Services + Repositories       │
           │   Utilities + Helpers               │
           └─────────────────────────────────────┘
```

### Cobertura Target: 80%
- **Frontend**: 80% cobertura de componentes críticos
- **Backend**: 80% cobertura de lógica de negocio
- **E2E**: 100% cobertura de flujos críticos de usuario

## 1. Tests End-to-End (E2E) con Cypress

### Configuración Multi-Browser

```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    
    // Multi-browser configuration
    browsers: [
      {
        name: 'chrome',
        family: 'chromium',
        displayName: 'Chrome'
      },
      {
        name: 'firefox',
        family: 'firefox', 
        displayName: 'Firefox'
      },
      {
        name: 'edge',
        family: 'chromium',
        displayName: 'Edge'
      }
    ],
    
    // Mobile testing viewports
    mobileViewports: [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone 11 Pro' },
      { width: 360, height: 640, name: 'Android' },
      { width: 768, height: 1024, name: 'iPad' }
    ]
  }
})
```

### Tests E2E Críticos para BOOTBOOKINGCAMP

#### 1. Test de Flujo Principal del Usuario

```javascript
// cypress/e2e/user-journey/main-flow.cy.js
describe('BOOTBOOKINGCAMP - Flujo Principal de Usuario', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('GET', '/api/camping/info', { fixture: 'camping-info.json' })
    cy.intercept('GET', '/api/availability/**', { fixture: 'availability.json' })
  })

  it('Usuario puede ver información del camping y buscar disponibilidad', () => {
    // Verificar carga de página principal
    cy.contains('BOOTBOOKINGCAMP').should('be.visible')
    cy.get('[data-testid="camping-info"]').should('be.visible')
    
    // Verificar galería de imágenes
    cy.get('[data-testid="image-gallery"]').should('be.visible')
    cy.get('[data-testid="gallery-image"]').should('have.length.at.least', 1)
    
    // Buscar disponibilidad
    cy.get('[data-testid="date-from"]').type('2025-07-15')
    cy.get('[data-testid="date-to"]').type('2025-07-20')
    cy.get('[data-testid="guests-select"]').select('4')
    cy.get('[data-testid="search-availability"]').click()
    
    // Verificar resultados
    cy.get('[data-testid="availability-results"]').should('be.visible')
    cy.get('[data-testid="accommodation-card"]').should('have.length.at.least', 1)
    
    // Verificar precios mostrados
    cy.get('[data-testid="price-display"]').should('contain', '€')
  })

  it('Usuario puede enviar formulario de contacto', () => {
    // Navegar a formulario de contacto
    cy.get('[data-testid="contact-button"]').click()
    
    // Completar formulario
    cy.get('[data-testid="contact-name"]').type('Juan Pérez')
    cy.get('[data-testid="contact-email"]').type('juan@ejemplo.com')
    cy.get('[data-testid="contact-phone"]').type('+34 600 123 456')
    cy.get('[data-testid="contact-message"]').type('Interesado en reservar para vacaciones familiares')
    cy.get('[data-testid="contact-dates-from"]').type('2025-08-01')
    cy.get('[data-testid="contact-dates-to"]').type('2025-08-07')
    cy.get('[data-testid="contact-guests"]').select('6')
    
    // Enviar formulario
    cy.intercept('POST', '/api/contact', { statusCode: 200, body: { success: true } })
    cy.get('[data-testid="submit-contact"]').click()
    
    // Verificar confirmación
    cy.get('[data-testid="success-message"]').should('be.visible')
    cy.contains('Tu consulta ha sido enviada').should('be.visible')
  })

  it('Información del camping es accesible y completa', () => {
    // Verificar información básica
    cy.get('[data-testid="camping-name"]').should('contain', 'BOOTBOOKINGCAMP')
    cy.get('[data-testid="camping-description"]').should('be.visible')
    cy.get('[data-testid="camping-services"]').should('be.visible')
    
    // Verificar información de contacto
    cy.get('[data-testid="camping-phone"]').should('be.visible')
    cy.get('[data-testid="camping-email"]').should('be.visible')
    cy.get('[data-testid="camping-address"]').should('be.visible')
    
    // Verificar mapa de ubicación
    cy.get('[data-testid="location-map"]').should('be.visible')
  })
})
```

#### 2. Tests Responsive Multi-Device

```javascript
// cypress/e2e/responsive/mobile-experience.cy.js
describe('BOOTBOOKINGCAMP - Experiencia Móvil', () => {
  
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 11 Pro', width: 414, height: 896 },
    { name: 'Android', width: 360, height: 640 },
    { name: 'iPad', width: 768, height: 1024 }
  ]

  devices.forEach(device => {
    it(`Funcionalidad completa en ${device.name}`, () => {
      cy.viewport(device.width, device.height)
      cy.visit('/')
      
      // Verificar responsive design
      cy.get('[data-testid="mobile-header"]').should('be.visible')
      cy.get('[data-testid="hamburger-menu"]').should('be.visible')
      
      // Test navigation móvil
      cy.get('[data-testid="hamburger-menu"]').click()
      cy.get('[data-testid="mobile-nav"]').should('be.visible')
      
      // Test formulario en móvil
      cy.get('[data-testid="mobile-search-form"]').should('be.visible')
      cy.get('[data-testid="date-from"]').should('be.visible')
      
      // Test galería en móvil
      cy.get('[data-testid="mobile-gallery"]').should('be.visible')
      cy.get('[data-testid="gallery-swipe"]').should('be.visible')
    })
  })
})
```

#### 3. Tests Cross-Browser

```javascript
// cypress/e2e/cross-browser/compatibility.cy.js
describe('BOOTBOOKINGCAMP - Compatibilidad Cross-Browser', () => {
  
  it('Funcionalidad completa en Chrome', { browser: 'chrome' }, () => {
    cy.visit('/')
    cy.testMainFunctionality()
  })

  it('Funcionalidad completa en Firefox', { browser: 'firefox' }, () => {
    cy.visit('/')
    cy.testMainFunctionality()
  })

  it('Funcionalidad completa en Edge', { browser: 'edge' }, () => {
    cy.visit('/')
    cy.testMainFunctionality()
  })
})

// Cypress command personalizado
Cypress.Commands.add('testMainFunctionality', () => {
  // Verificar carga básica
  cy.contains('BOOTBOOKINGCAMP').should('be.visible')
  
  // Test formulario de búsqueda
  cy.get('[data-testid="search-form"]').should('be.visible')
  cy.get('[data-testid="date-from"]').should('be.enabled')
  
  // Test galería
  cy.get('[data-testid="image-gallery"]').should('be.visible')
  
  // Test formulario de contacto
  cy.get('[data-testid="contact-form"]').should('be.visible')
})
```

### Fixtures para Testing

```json
// cypress/fixtures/camping-info.json
{
  "id": 1,
  "name": "BOOTBOOKINGCAMP",
  "description": "Camping piloto para testing de la plataforma",
  "address": "Calle Ejemplo 123, 12345 Ciudad Test",
  "phone": "+34 123 456 789",
  "email": "info@bootbookingcamp.test",
  "services": [
    "WiFi gratuito",
    "Piscina",
    "Restaurante",
    "Supermercado",
    "Actividades para niños"
  ],
  "coordinates": {
    "lat": 41.3851,
    "lng": 2.1734
  }
}
```

```json
// cypress/fixtures/availability.json
{
  "results": [
    {
      "id": 1,
      "type": "Parcela Estándar",
      "description": "Parcela con electricidad y agua",
      "max_guests": 4,
      "price_per_night": 25.00,
      "available_units": 5,
      "images": ["parcela1.jpg", "parcela2.jpg"]
    },
    {
      "id": 2,
      "type": "Bungalow Familiar",
      "description": "Bungalow completo para familias",
      "max_guests": 6,
      "price_per_night": 85.00,
      "available_units": 2,
      "images": ["bungalow1.jpg", "bungalow2.jpg"]
    }
  ],
  "total": 2,
  "dates": {
    "from": "2025-07-15",
    "to": "2025-07-20"
  }
}
```

## 2. Tests Parciales (Unit + Integration)

### Frontend Testing con Jest + Testing Library

#### Configuración Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.stories.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ]
}
```

#### Tests de Componentes React Críticos

```javascript
// src/components/camping/__tests__/CampingInfo.test.js
import { render, screen } from '@testing-library/react'
import CampingInfo from '../CampingInfo'

const mockCampingData = {
  name: 'BOOTBOOKINGCAMP',
  description: 'Camping de prueba',
  services: ['WiFi', 'Piscina'],
  phone: '+34 123 456 789',
  email: 'test@camping.com'
}

describe('CampingInfo Component', () => {
  it('renders camping information correctly', () => {
    render(<CampingInfo data={mockCampingData} />)
    
    expect(screen.getByText('BOOTBOOKINGCAMP')).toBeInTheDocument()
    expect(screen.getByText('Camping de prueba')).toBeInTheDocument()
    expect(screen.getByText('WiFi')).toBeInTheDocument()
    expect(screen.getByText('Piscina')).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<CampingInfo data={mockCampingData} />)
    
    expect(screen.getByText('+34 123 456 789')).toBeInTheDocument()
    expect(screen.getByText('test@camping.com')).toBeInTheDocument()
  })

  it('handles missing data gracefully', () => {
    render(<CampingInfo data={{}} />)
    
    expect(screen.queryByText('BOOTBOOKINGCAMP')).not.toBeInTheDocument()
    expect(screen.getByText('Información no disponible')).toBeInTheDocument()
  })
})
```

```javascript
// src/components/forms/__tests__/ContactForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../ContactForm'

describe('ContactForm Component', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)
    
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)
    
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const mockSubmit = jest.fn()
    const user = userEvent.setup()
    
    render(<ContactForm onSubmit={mockSubmit} />)
    
    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@ejemplo.com')
    await user.type(screen.getByLabelText(/mensaje/i), 'Consulta de prueba')
    
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        message: 'Consulta de prueba'
      })
    })
  })
})
```

#### Tests de Custom Hooks

```javascript
// src/hooks/__tests__/useAvailability.test.js
import { renderHook, waitFor } from '@testing-library/react'
import { useAvailability } from '../useAvailability'

// Mock API service
jest.mock('../../services/availabilityService', () => ({
  searchAvailability: jest.fn()
}))

describe('useAvailability Hook', () => {
  it('fetches availability data', async () => {
    const mockData = { results: [], total: 0 }
    require('../../services/availabilityService').searchAvailability.mockResolvedValue(mockData)
    
    const { result } = renderHook(() => useAvailability())
    
    result.current.searchAvailability('2025-07-15', '2025-07-20', 4)
    
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
      expect(result.current.loading).toBe(false)
    })
  })

  it('handles error states', async () => {
    require('../../services/availabilityService').searchAvailability.mockRejectedValue(new Error('API Error'))
    
    const { result } = renderHook(() => useAvailability())
    
    result.current.searchAvailability('2025-07-15', '2025-07-20', 4)
    
    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
      expect(result.current.loading).toBe(false)
    })
  })
})
```

### Backend Testing con PHPUnit

#### Configuración PHPUnit

```xml
<!-- phpunit.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="tests/bootstrap.php"
         colors="true"
         processIsolation="false"
         stopOnFailure="false"
         testdox="true">
    
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    
    <coverage processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./src</directory>
        </include>
        <report>
            <html outputDirectory="coverage-html"/>
            <clover outputFile="coverage.xml"/>
        </report>
    </coverage>
    
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

#### Tests de Servicios PHP

```php
<?php
// tests/Unit/Services/CampingServiceTest.php

namespace Tests\Unit\Services;

use PHPUnit\Framework\TestCase;
use App\Services\CampingService;
use App\Repositories\CampingRepository;

class CampingServiceTest extends TestCase
{
    private $campingService;
    private $mockRepository;

    protected function setUp(): void
    {
        $this->mockRepository = $this->createMock(CampingRepository::class);
        $this->campingService = new CampingService($this->mockRepository);
    }

    public function testGetCampingInfoReturnsData()
    {
        // Arrange
        $expectedData = [
            'id' => 1,
            'name' => 'BOOTBOOKINGCAMP',
            'description' => 'Camping de prueba'
        ];
        
        $this->mockRepository
            ->expects($this->once())
            ->method('findById')
            ->with(1)
            ->willReturn($expectedData);

        // Act
        $result = $this->campingService->getCampingInfo(1);

        // Assert
        $this->assertEquals($expectedData, $result);
        $this->assertEquals('BOOTBOOKINGCAMP', $result['name']);
    }

    public function testValidateCampingDataWithValidData()
    {
        // Arrange
        $validData = [
            'name' => 'Test Camping',
            'description' => 'Una descripción válida',
            'phone' => '+34 123 456 789',
            'email' => 'test@camping.com'
        ];

        // Act
        $result = $this->campingService->validateCampingData($validData);

        // Assert
        $this->assertTrue($result['isValid']);
        $this->assertEmpty($result['errors']);
    }

    public function testValidateCampingDataWithInvalidData()
    {
        // Arrange
        $invalidData = [
            'name' => '', // Vacío
            'email' => 'invalid-email', // Email inválido
            'phone' => '123' // Teléfono muy corto
        ];

        // Act
        $result = $this->campingService->validateCampingData($invalidData);

        // Assert
        $this->assertFalse($result['isValid']);
        $this->assertContains('El nombre es obligatorio', $result['errors']);
        $this->assertContains('Email inválido', $result['errors']);
    }
}
```

```php
<?php
// tests/Unit/Services/ContactServiceTest.php

namespace Tests\Unit\Services;

use PHPUnit\Framework\TestCase;
use App\Services\ContactService;
use App\Services\EmailService;
use App\Repositories\ContactRepository;

class ContactServiceTest extends TestCase
{
    private $contactService;
    private $mockEmailService;
    private $mockRepository;

    protected function setUp(): void
    {
        $this->mockEmailService = $this->createMock(EmailService::class);
        $this->mockRepository = $this->createMock(ContactRepository::class);
        $this->contactService = new ContactService(
            $this->mockRepository,
            $this->mockEmailService
        );
    }

    public function testProcessContactFormWithValidData()
    {
        // Arrange
        $formData = [
            'name' => 'Juan Pérez',
            'email' => 'juan@ejemplo.com',
            'phone' => '+34 600 123 456',
            'message' => 'Consulta de prueba',
            'date_from' => '2025-07-15',
            'date_to' => '2025-07-20',
            'guests' => 4
        ];

        $this->mockRepository
            ->expects($this->once())
            ->method('save')
            ->willReturn(true);

        $this->mockEmailService
            ->expects($this->once())
            ->method('sendContactNotification')
            ->willReturn(true);

        // Act
        $result = $this->contactService->processContactForm($formData);

        // Assert
        $this->assertTrue($result['success']);
        $this->assertEquals('Formulario procesado correctamente', $result['message']);
    }

    public function testValidateContactFormData()
    {
        // Arrange
        $validData = [
            'name' => 'Juan Pérez',
            'email' => 'juan@ejemplo.com',
            'message' => 'Una consulta válida'
        ];

        // Act
        $result = $this->contactService->validateFormData($validData);

        // Assert
        $this->assertTrue($result['isValid']);
        $this->assertEmpty($result['errors']);
    }

    public function testRateLimitingForContactForms()
    {
        // Arrange
        $ipAddress = '192.168.1.100';
        
        // Simular que ya se enviaron 5 formularios en la última hora
        $this->mockRepository
            ->expects($this->once())
            ->method('countRecentSubmissions')
            ->with($ipAddress, 3600)
            ->willReturn(5);

        // Act
        $result = $this->contactService->checkRateLimit($ipAddress);

        // Assert
        $this->assertFalse($result['allowed']);
        $this->assertEquals('Rate limit exceeded', $result['message']);
    }
}
```

#### Tests de API Endpoints

```php
<?php
// tests/Feature/Api/CampingControllerTest.php

namespace Tests\Feature\Api;

use Tests\TestCase;

class CampingControllerTest extends TestCase
{
    public function testGetCampingInfoReturnsJsonResponse()
    {
        // Act
        $response = $this->get('/api/camping/info');

        // Assert
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'services',
                'contact' => [
                    'phone',
                    'email',
                    'address'
                ]
            ]
        ]);
    }

    public function testSearchAvailabilityWithValidParameters()
    {
        // Arrange
        $searchParams = [
            'date_from' => '2025-07-15',
            'date_to' => '2025-07-20',
            'guests' => 4
        ];

        // Act
        $response = $this->get('/api/availability?' . http_build_query($searchParams));

        // Assert
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'results' => [
                    '*' => [
                        'id',
                        'type',
                        'description',
                        'max_guests',
                        'price_per_night',
                        'available_units'
                    ]
                ],
                'total',
                'dates'
            ]
        ]);
    }

    public function testContactFormSubmissionWithValidData()
    {
        // Arrange
        $contactData = [
            'name' => 'Juan Pérez',
            'email' => 'juan@ejemplo.com',
            'phone' => '+34 600 123 456',
            'message' => 'Consulta de prueba',
            'date_from' => '2025-07-15',
            'date_to' => '2025-07-20',
            'guests' => 4
        ];

        // Act
        $response = $this->post('/api/contact', $contactData);

        // Assert
        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Formulario enviado correctamente'
        ]);
    }

    public function testContactFormValidationWithInvalidData()
    {
        // Arrange
        $invalidData = [
            'name' => '', // Vacío
            'email' => 'invalid-email', // Email inválido
            'message' => '' // Vacío
        ];

        // Act
        $response = $this->post('/api/contact', $invalidData);

        // Assert
        $response->assertStatus(422);
        $response->assertJsonStructure([
            'errors' => [
                'name',
                'email',
                'message'
            ]
        ]);
    }
}
```

## 3. Load Testing con Artillery

### Configuración de Load Testing

```yaml
# load-tests/camping-load-test.yml
config:
  target: 'https://bootbookingcamp.com'
  phases:
    # Warm-up phase
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    
    # Normal load
    - duration: 300
      arrivalRate: 20
      name: "Normal load"
    
    # Peak season simulation
    - duration: 180
      arrivalRate: 50
      name: "Peak season"
    
    # Stress test
    - duration: 60
      arrivalRate: 100
      name: "Stress test"

  defaults:
    headers:
      User-Agent: "LoadTest/1.0"

scenarios:
  - name: "User browsing and searching"
    weight: 70
    flow:
      - get:
          url: "/"
          capture:
            - json: "$.csrf_token"
              as: "csrfToken"
      
      - think: 3
      
      - get:
          url: "/api/camping/info"
      
      - think: 5
      
      - get:
          url: "/api/availability"
          qs:
            date_from: "2025-07-15"
            date_to: "2025-07-20"
            guests: "{{ $randomInt(1, 8) }}"
      
      - think: 10

  - name: "Contact form submission"
    weight: 20
    flow:
      - get:
          url: "/"
      
      - think: 30
      
      - post:
          url: "/api/contact"
          json:
            name: "Load Test User"
            email: "loadtest@ejemplo.com"
            phone: "+34 600 000 000"
            message: "Load testing message"
            date_from: "2025-08-01"
            date_to: "2025-08-07"
            guests: 4

  - name: "Image gallery browsing"
    weight: 10
    flow:
      - get:
          url: "/"
      - get:
          url: "/api/camping/gallery"
      - think: 15
```

### Scripts de Ejecución de Tests

```bash
#!/bin/bash
# scripts/run-tests.sh

echo "🧪 Ejecutando suite completa de tests BOOTBOOKINGCAMP"

# Tests unitarios frontend
echo "📱 Running Frontend Unit Tests..."
cd frontend && npm run test:coverage

# Tests unitarios backend
echo "🔧 Running Backend Unit Tests..."
cd ../backend && composer run test:coverage

# Tests E2E con Cypress
echo "🌐 Running E2E Tests..."
cd ../frontend && npm run test:e2e

# Load testing
echo "⚡ Running Load Tests..."
cd ../load-tests && artillery run camping-load-test.yml

echo "✅ Tests completados. Revisar reportes de cobertura."
```

## 4. CI/CD Integration

### GitHub Actions para Tests

```yaml
# .github/workflows/test-suite.yml
name: Test Suite

on:
  pull_request:
    branches: [ develop, main ]
  push:
    branches: [ develop, main ]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: cd frontend && npm ci
      
      - name: Run unit tests
        run: cd frontend && npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: frontend/coverage/lcov.info

  backend-tests:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: password
          MYSQL_DATABASE: bootbookingcamp_test
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
          extensions: mbstring, mysql, pdo_mysql
      
      - name: Install dependencies
        run: cd backend && composer install --no-scripts
      
      - name: Run PHPUnit tests
        run: cd backend && composer run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: backend/coverage.xml

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [frontend-tests, backend-tests]
    if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd frontend && npm ci
      
      - name: Start application
        run: |
          cd frontend && npm run build
          cd ../backend && php -S localhost:8000 -t public &
          cd ../frontend && npm run serve &
      
      - name: Wait for app to be ready
        run: npx wait-on http://localhost:3000
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v4
        with:
          working-directory: frontend
          browser: chrome
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}

  load-tests:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: [e2e-tests]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Artillery
        run: npm install -g artillery
      
      - name: Run load tests
        run: cd load-tests && artillery run camping-load-test.yml
```

## 5. Métricas y Reporting

### Coverage Reports y Quality Gates

```javascript
// jest.config.js - Coverage thresholds
module.exports = {
  // ... otras configuraciones
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Umbrales específicos para componentes críticos
    './src/components/forms/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
```

### Test Data Strategy para Camping Piloto

```javascript
// cypress/fixtures/bootbookingcamp-test-data.js
export const testCampingData = {
  campingInfo: {
    name: "BOOTBOOKINGCAMP",
    description: "Camping piloto en ubicación privilegiada",
    services: [
      "WiFi gratuito", "Piscina", "Restaurante", 
      "Supermercado", "Actividades niños", "Lavandería"
    ],
    contact: {
      phone: "+34 123 456 789",
      email: "info@bootbookingcamp.com",
      address: "Avenida del Camping 1, 12345 Costa Brava"
    }
  },
  
  accommodationTypes: [
    {
      id: 1,
      type: "Parcela Estándar",
      maxGuests: 4,
      basePrice: 25.00,
      description: "Parcela con electricidad y agua"
    },
    {
      id: 2, 
      type: "Parcela Premium",
      maxGuests: 6,
      basePrice: 35.00,
      description: "Parcela grande con servicios premium"
    },
    {
      id: 3,
      type: "Bungalow Familiar",
      maxGuests: 6,
      basePrice: 85.00,
      description: "Bungalow completo equipado"
    }
  ],
  
  testScenarios: {
    lowSeason: {
      dateFrom: "2025-05-15",
      dateTo: "2025-05-20",
      expectedAvailability: "high"
    },
    highSeason: {
      dateFrom: "2025-07-15", 
      dateTo: "2025-07-20",
      expectedAvailability: "limited"
    },
    peakSeason: {
      dateFrom: "2025-08-01",
      dateTo: "2025-08-07", 
      expectedAvailability: "very_limited"
    }
  }
}
```

Este sistema de testing básico pero completo proporciona una cobertura sólida del 80% para BOOTBOOKINGCAMP en su fase piloto, asegurando la calidad del código y la funcionalidad crítica antes del lanzamiento.



