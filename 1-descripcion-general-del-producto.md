## Índice

1. [Descripción general del producto](1-descripcion-general-del-producto.md)
2. [Arquitectura del sistema](2-arquitectura-del-sistema.md)
3. [Modelo de datos](3-modelo-de-datos.md)
4. [Especificación de la API](4-especificaciones-de-la-api.md)
5. [Historias de usuario](5-historias-de-usuario.md)
6. [Tickets de trabajo](6-tickets-de-trabajo.md)
7. [Pull requests](7-pull-requests.md)

---

## 1. Descripción general del producto

**Prompt 1:** 
Rol: 
Product Owner (PO o PDO) especialista en sector Hospederias 
Objetivo:
Hazme una descripcion para la creacion de un proyecto nuevo.
Este proycto sera un motor de reservas que permitira a un usuario final reservar estancias de alojamientos vacacionales de campings, hoteles, apartamentos... todo enfocado a hospederias.
Especificaciones:
-En estos resultados de busqueda apareceran diferentes empresas (camping, hoteles etc..) con las disponibilidades o alojamientos correspondienetes.
tendremos un area privada de usuario y un area privada de cliente
-En ambitos geograficos, añadiremos que solo se trabajara con empresas españolas.
-Podremos trabajar con los idiomas (ES, CA, EN, FR)
-A nivel técnico trabajaremos con javascript, quizas php, graphql y mysql


Antes de empezar, como product owner, preguntame que mas necesitas saber para definir el proyecto

**Respuesta 1:** COPILOT - GPT-5

## Proyecto: Motor de Reservas para Hospederías

### Fase actual del proyecto:
**BOOTBOOKINGCAMP - Versión Piloto para Un Camping**

En esta fase inicial, el desarrollo se enfoca en crear una **versión específica para un único camping**, funcionando como proyecto piloto antes de evolucionar hacia el motor de reservas completo multi-establecimiento.

### Descripción general:

Este proyecto consiste en el desarrollo de una plataforma digital que funcionará como un motor de reservas especializado en alojamientos vacacionales dentro del sector de las hospederías. **En la fase actual, se desarrollará específicamente para mostrar disponibilidades y gestionar reservas de un único camping**, estableciendo las bases para la futura expansión hacia un sistema multi-establecimiento que incluirá campings, hoteles, apartamentos turísticos y otros tipos de alojamientos.

### Funcionalidades principales:
#### Buscador de alojamientos:

- Filtros por tipo de alojamiento (camping, hotel, apartamento, etc.)
- Fechas de entrada y salida
- Número de personas
- Ubicación geográfica
- Servicios disponibles (piscina, mascotas, accesibilidad, etc.)

#### Resultados dinámicos:
- Visualización de empresas con disponibilidad en tiempo real
- Información detallada de cada alojamiento (fotos, descripción, servicios, opiniones)
- Comparador de precios y condiciones

#### Área privada de usuario final:
- Registro e inicio de sesión
- Historial de reservas
- Gestión de datos personales
- Valoración de estancias

#### Área privada de cliente (empresas):
- Panel de gestión de alojamientos
- Control de disponibilidad y precios
- Recepción de reservas y comunicación con usuarios
- Estadísticas de rendimiento y ocupación

#### Sistema de pagos integrado:
- Pasarela segura para pagos online
- Gestión de cancelaciones y reembolsos

#### Multidispositivo y responsive:
- Accesible desde móviles, tablets y ordenadores
- Interfaz intuitiva y amigable

### Objetivos del proyecto:
- Centralizar la oferta de alojamientos vacacionales en una única plataforma.
- Facilitar la reserva directa entre usuarios y empresas del sector.
- Mejorar la visibilidad de pequeñas y medianas hospederías.
- Ofrecer una experiencia de usuario fluida, segura y personalizada.


**Prompt 2:**

Como Product Owner (PO o PDO).
Mejora o detalla la definicion del proyecto:
[...]
Antes de empezar, pregunatme si necesitas saber más detalles antes de empezar o puntos que debeía considerar


**Prompt 3:**
Respondo a las pregunmtas para poder generar la definicion del proyecto completa:
1. Visión estratégica
¿Cuál es el propósito principal del proyecto? ¿Qué necesidad del mercado estás cubriendo? 
Ofrecer canal de reservas a clientes del sector de hoospederiasmo, turismo rural y alojamientos turísticos.

¿Qué diferencia o ventaja competitiva tendrá frente a otros motores de reservas existentes?
Compatibilidad con los PMS de gestion de los usuarios
🎯 2. Público objetivo
¿Qué perfil de usuario final se espera atraer? ¿Turistas nacionales, internacionales, familias, jóvenes, etc.?
Turistas nacionales e internacionales, familias y parejas.
¿Qué tipo de empresas podrán registrarse? ¿Solo alojamientos turísticos o también rurales, glampings, albergues, etc.?
Alojamientos turísticos, rurales, glampings,  hoteles, hostales, apartamentos turísticos.
💰 3. Modelo de negocio
¿Cómo se monetizará la plataforma? ¿Comisión por reserva, suscripción mensual, modelo freemium?
Comisión por reserva y suscripción mensual para empresas.

¿Habrá diferentes planes o niveles de servicio para las empresas? No. siempre el mismo plan.
🧩 4. Funcionalidades clave
¿Se permitirá la reserva directa desde la plataforma o se redirigirá a la web del cliente? reserva directa desde la plataforma.
¿Qué filtros de búsqueda consideras imprescindibles?
Ubicación, tipo de alojamiento, precio, personas.
¿Qué funcionalidades específicas debe tener el área privada del usuario y del cliente?
Solo area de usuario al final. Para ver historial de reservas, gestionar perfil.
🔗 5. Gestión de disponibilidad
¿Las empresas gestionarán su disponibilidad manualmente o se integrará con sistemas externos (channel managers, PMS)? channel managers y PMS
¿Habrá validación previa de las empresas antes de que puedan publicar alojamientos? No. datos obtenidos de channel managers y PMS
🌐 6. Idiomas y localización
¿Los idiomas definidos (ES, CA, EN, FR) estarán disponibles desde el inicio o se activarán por fases? inicio
¿Se contempla localización automática según idioma del navegador o ubicación del usuario? No
📱 7. Plataforma y tecnología
¿Se desarrollará solo como web responsive o también como app móvil nativa? web responsive
¿Hay preferencia por frameworks específicos en JavaScript (React, Vue, etc.)? React y JavaScript
¿Se prevé una arquitectura modular o monolítica para el MVP? Modular
📈 8. Roadmap y escalabilidad
¿Qué funcionalidades consideras imprescindibles para el MVP? Lo básico para realizar una busqueda y reserva.
¿Qué funcionalidades se dejarán para fases posteriores? Areas de cliente y empresa. Multiples métodos de pago.
¿Se contempla una expansión internacional en el futuro? Si


**Respuesta 3:**

# Proyecto: Motor de Reservas para Hospederías

## 🎯 Visión estratégica

### Fase Actual (Piloto)
El proyecto tiene como objetivo inicial desarrollar una **plataforma de reservas específica para un camping piloto**, estableciendo las bases tecnológicas y funcionales que posteriormente se escalarán hacia un motor de reservas completo.

### Visión Futura (Escalabilidad)
La visión a largo plazo es ofrecer una plataforma digital de reservas especializada en el sector de hospederías, turismo rural y alojamientos turísticos en España. Esta solución permitirá a los usuarios finales buscar, comparar y reservar estancias en múltiples tipos de alojamientos: campings, hoteles, glampings, apartamentos turísticos, hostales y casas rurales.

La ventaja competitiva clave será la compatibilidad con sistemas PMS y channel managers, comenzando con la integración piloto en el camping inicial.

## 👥 Público objetivo

### Fase Actual (Piloto)
- **Usuarios finales**: Turistas interesados específicamente en el camping piloto, familias y parejas que buscan experiencias de camping.
- **Cliente (empresa)**: Un camping específico que actuará como caso piloto para validar la funcionalidad y el modelo de negocio.

### Visión Futura (Escalabilidad)
- **Usuarios finales**: Turistas nacionales e internacionales, especialmente familias y parejas que buscan experiencias vacacionales en entornos naturales o rurales.
- **Clientes (empresas)**: Alojamientos turísticos de todo tipo ubicados en España, incluyendo rurales, glampings, hoteles, hostales y apartamentos turísticos.

## 💰 Modelo de negocio

### Fase Actual (Piloto)
**Enfoque de validación**:
- Implementación inicial **sin comisiones** para validar el modelo con el camping piloto
- Enfoque en la funcionalidad y experiencia de usuario
- Recogida de feedback para definir el modelo definitivo

### Visión Futura (Escalabilidad)
**Monetización**:
- Comisión por cada reserva realizada.
- Suscripción mensual para empresas que deseen publicar sus alojamientos.
- Plan único: No se contemplan niveles de servicio diferenciados; todas las empresas tendrán acceso a las mismas funcionalidades.

## 🧩 Funcionalidades clave del MVP

### Fase Actual (Piloto - Un Camping)

### 🏡 Ficha del camping
- **Información del camping**: Nombre, descripción, ubicación, servicios principales
- **Galería de imágenes**: Fotos del camping y las instalaciones
- **Tipos de alojamiento**: Parcelas, bungalows, caravanas (según disponibilidad del camping)

### 📅 Visualización de disponibilidades
- **Calendario de disponibilidad** para cada tipo de alojamiento
- **Precios por fecha** y tipo de alojamiento
- **Filtros básicos**: Fechas, número de personas, tipo de alojamiento

### 👤 Área de usuario (simplificada)
- Formulario de contacto/interés para reservas
- Información de contacto del camping

### Funcionalidades Futuras (Post-MVP)
- Sistema de reserva directa integrado
- Pasarela de pago
- Área privada completa de usuario
- Buscador multi-camping

### 🌐 Multidioma
- Interfaz disponible desde el inicio en ES, CA, EN y FR.

### 📱 Diseño responsive
- Accesible desde móviles, tablets y ordenadores.
- Interfaz clara, rápida y amigable.

## 🔗 Gestión de disponibilidad

### Fase Actual (Piloto)
- **Integración directa** con el sistema PMS del camping piloto
- **Datos en tiempo real** de disponibilidad y precios
- **Validación manual inicial** para asegurar la correcta integración

### Visión Futura (Escalabilidad)
- Las empresas no gestionarán manualmente su disponibilidad
- Toda la información se obtendrá directamente de sus sistemas PMS o channel managers
- No se requerirá validación previa de empresas, ya que los datos provendrán de fuentes verificadas

## 🧱 Tecnología y arquitectura
- **Frontend**: React + JavaScript.
- **Backend**: PHP, GraphQL, MySQL.
- **Arquitectura**: Modular desde el MVP, para facilitar escalabilidad y evolución por componentes.

## 📈 Roadmap y escalabilidad

### Fase 1: MVP Piloto (Camping Único)
- **Visualización de disponibilidades** del camping piloto
- **Ficha detallada** del camping con información y servicios
- **Calendario de disponibilidad** por tipo de alojamiento
- **Formulario de contacto** para solicitudes de reserva
- **Integración básica con PMS** del camping piloto

### Fase 2: Funcionalidades de Reserva
- **Sistema de reserva directa** integrado
- **Pasarela de pago** segura
- **Área privada de usuario** con historial
- **Confirmaciones automáticas** de reserva

### Fase 3: Expansión Multi-Camping
- **Buscador de campings** con filtros avanzados
- **Comparador de opciones** entre múltiples campings
- **Gestión de múltiples integraciones** PMS
- **Área privada para empresas**

### Fase 4: Expansión Sector Hospederías
- **Ampliación a hoteles**, apartamentos turísticos, hostales
- **Múltiples métodos de pago**
- **Funcionalidades avanzadas**: promociones, valoraciones, campañas
- **Herramientas de gestión empresarial**

### Expansión futura
- **Internacionalización** del producto
- **Adaptación a otros mercados** europeos
- **Funcionalidades avanzadas** de BI y analytics



**Prompt 4:**

Enumeramen todos los perfiles necesarios que contruya el equipo necesario para realizar el proyecto descrito.
y una breve definicion de su funcion


**Respuesta 4:**

# Equipo Necesario para el Proyecto de Motor de Reservas

## Área Técnica y Desarrollo

**Arquitecto de Software**
- Diseña la estructura técnica del sistema, define el stack tecnológico y asegura escalabilidad, seguridad y rendimiento.

**Tech Lead / Líder de Desarrollo**
- Supervisa al equipo técnico, toma decisiones clave de implementación y garantiza la calidad del código.

**Desarrollador Backend**
- Implementa la lógica del servidor, gestión de reservas, usuarios, pagos y conexión con PMS.

**Desarrollador Frontend**
- Desarrolla la interfaz de usuario en React, asegurando que sea responsive, accesible y multilingüe.

**Desarrollador Full Stack (opcional en equipos pequeños)**
- Cubre tanto frontend como backend, ideal para fases iniciales o MVP.

**Ingeniero DevOps**
- Configura la infraestructura, despliegue continuo, monitorización y escalabilidad del sistema.

**Especialista en Integraciones**
- Conecta el sistema con PMS, channel managers y pasarelas de pago mediante APIs.

**QA – Quality Assurance**
- Realiza pruebas funcionales, de rendimiento y usabilidad para asegurar la calidad del producto antes de cada entrega.

## Área de Diseño y Experiencia de Usuario

**Diseñador UX/UI**
- Diseña la experiencia de usuario, wireframes, prototipos y la interfaz visual del sistema.

## Área de Producto y Negocio

**Product Owner (PO / PDO)**
- Define los requisitos del producto, prioriza funcionalidades y asegura que el desarrollo esté alineado con los objetivos del negocio.

**Project Manager**
- Coordina el equipo, gestiona tiempos, recursos y comunicación entre áreas.

**Especialista en Marketing Digital**
- Diseña estrategias de captación, posicionamiento SEO, campañas y promoción de alojamientos.

**Copywriter / Especialista en Contenidos**
- Redacta textos para la plataforma en los distintos idiomas (ES, CA, EN, FR), incluyendo descripciones, mensajes y contenidos informativos.

## Área Legal y Financiera

**Asesor Legal / Compliance**
- Revisa términos legales, protección de datos (RGPD), contratos con clientes y condiciones de uso.

**Especialista en Finanzas**
- Define el modelo de negocio, gestiona presupuestos, comisiones, facturación y control financiero.

## Área de Atención y Soporte

**Responsable de Atención al Cliente**
- Da soporte a usuarios finales y empresas, gestiona incidencias y consultas.

## Área de Localización y Multilingüismo

**Traductores / Localizadores**
- Traducen y adaptan los contenidos de la plataforma a los idiomas definidos (ES, CA, EN, FR).

## Perfiles opcionales según escala del proyecto

**Analista de Datos / BI**
- Analiza el comportamiento de usuarios, rendimiento de alojamientos y métricas clave para la toma de decisiones.

**Community Manager**
- Gestiona redes sociales, interacción con usuarios y reputación online.

**Growth Hacker**
- Diseña estrategias creativas para acelerar el crecimiento de usuarios

**Prompt 5:Crear imagenes de diseño**

Crea el prompt a partir del proyecto definido para poder solicitar a builder.io las maquetas paara as páginas principales del proyecto. Antes de empezar, que necsitas saber mas?





Definir las etapas de realizacion

**Respuesta 6:**


## 🗺️ Fases de realización del proyecto

Aquí te presento una propuesta estructurada en 5 etapas, con una breve definición de cada una:

### 1. Fase de Descubrimiento y Planificación
**Objetivo**: Alinear visión, objetivos y requisitos del proyecto.

**Tareas clave**:
- Validación del concepto y análisis de mercado.
- Definición funcional y técnica del MVP.
- Selección del stack tecnológico (React, PHP, GraphQL, MySQL).
- Diseño de arquitectura modular.
- Planificación de recursos, tiempos y presupuesto.

**Perfiles involucrados**: Product Owner, Project Manager, Arquitecto de Software, Tech Lead.

### 2. Fase de Diseño UX/UI
**Objetivo**: Crear una experiencia de usuario clara, intuitiva y atractiva.

**Tareas clave**:
- Diseño de wireframes y prototipos.
- Definición de flujos de navegación.
- Diseño visual multidioma (ES, CA, EN, FR).
- Validación con usuarios (si es posible).

**Perfiles involucrados**: UX/UI Designer, Product Owner, QA (para test de usabilidad).

### 3. Fase de Desarrollo del MVP
**Objetivo**: Construir la versión mínima viable del producto.

**Tareas clave**:
- Desarrollo del buscador de alojamientos.
- Integración con PMS y channel managers.
- Implementación de reservas y pagos.
- Área privada de usuario final.
- Multidioma y diseño responsive.

**Perfiles involucrados**: Frontend, Backend, Full Stack (si aplica), DevOps, QA, Integraciones.

### 4. Fase de Pruebas y Validación
**Objetivo**: Asegurar la calidad, estabilidad y funcionalidad del MVP.

**Tareas clave**:
- Pruebas funcionales, de rendimiento y seguridad.
- Validación de reservas, pagos y disponibilidad.
- Corrección de errores y ajustes finales.
- Preparación para el lanzamiento.

**Perfiles involucrados**: QA, Tech Lead, Product Owner, Atención al Cliente (para test de soporte).

### 5. Fase de Lanzamiento y Monitorización
**Objetivo**: Publicar el producto y recoger feedback real.

**Tareas clave**:
- Despliegue en entorno de producción.
- Monitorización de uso y rendimiento.
- Soporte a usuarios y empresas.
- Recogida de métricas y feedback.
- Planificación de siguientes versiones.

**Perfiles involucrados**: DevOps, Atención al Cliente, Marketing, Product Owner, Analista de Datos.

---

## Prompt para stitch.withgoogle.com - Generación de Maquetas

### Contexto del Proyecto:
**Proyecto:** BOOTBOOKINGCAMP - Plataforma de reservas para camping (Fase Piloto)  
**Nombre del Camping:** KCAMP  
**Enfoque:** Mobile-first, diseño minimalista  
**Stack Técnico:** React 18+, responsive design  

### Prompt Principal para stitch.withgoogle.com:

```
Crea las maquetas para una plataforma web de reservas de camping llamada "KCAMP" con las siguientes especificaciones:

**CONTEXTO DEL PROYECTO:**
- Plataforma de reservas para un camping específico (proyecto piloto)
- Enfoque mobile-first con diseño minimalista y limpio
- Target: familias y parejas que buscan experiencias de camping
- Idiomas: ES, CA, EN, FR (mostrar selector de idioma)

**PÁGINAS A MAQUETAS (4 páginas principales):**

1. **PÁGINA PRINCIPAL DEL CAMPING**
   - Header con logo "KCAMP" y navegación simple
   - Hero section con imagen principal del camping
   - Información del camping: nombre, descripción breve, ubicación
   - Sección de servicios principales (iconos minimalistas): piscina, restaurante, WiFi, lavandería
   - Galería de imágenes (grid responsive)
   - Tipos de alojamiento disponibles: parcelas estándar, parcelas premium, bungalows, zona autocaravanas
   - Mapa de ubicación integrado
   - Información de contacto (teléfono, email, dirección)
   - Footer simple con enlaces básicos
   - Selector de idioma (ES, CA, EN, FR) en header

2. **PÁGINA DE BÚSQUEDA DE DISPONIBILIDADES**
   - Header consistente con navegación
   - Formulario de búsqueda destacado:
     * Date picker para fecha entrada/salida
     * Selector número de personas (adultos/niños)
     * Filtros por tipo de alojamiento
     * Botón de búsqueda prominente
   - Sección de resultados con cards para cada tipo disponible:
     * Imagen del tipo de alojamiento
     * Nombre y descripción breve
     * Precio por noche
     * Servicios incluidos
     * Botón "Ver disponibilidad" o "Contactar"
   - Mensaje claro cuando no hay disponibilidad
   - Estados de carga y error

3. **PÁGINA DE DETALLE DEL ALOJAMIENTO**
   - Header consistente con navegación + breadcrumb (Inicio > Disponibilidades > Parcela Estándar)
   - Hero section con imagen principal del tipo de alojamiento específico
   - Información detallada del alojamiento:
     * Nombre del tipo de alojamiento (ej: "Parcela Estándar")
     * Descripción completa y características específicas
     * Capacidad máxima de personas
     * Dimensiones del espacio (si aplica)
   - Galería específica del tipo de alojamiento (4-8 imágenes)
   - Servicios incluidos específicos:
     * Servicios del alojamiento (electricidad, agua, sombra, etc.)
     * Servicios del camping accesibles desde este alojamiento
     * Iconografía clara para cada servicio
   - Sección de precios detallada:
     * Precio base por noche
     * Breakdown de extras (electricidad, personas adicionales, etc.)
     * Impuestos incluidos/excluidos
     * Precio total estimado para las fechas seleccionadas
   - Selector/refinador de fechas:
     * Date picker para modificar fechas si es necesario
     * Selector de número de personas
     * Recalculo automático de precios
   - Call-to-Action principal: "Reservar este Alojamiento"
   - Botón secundario: "Contactar para más información"
   - Sección de información adicional:
     * Políticas de cancelación
     * Horarios de check-in/check-out
     * Normas específicas del alojamiento

4. **PÁGINA DE FORMULARIO DE CONTACTO/RESERVA**
   - Header consistente
   - Resumen del alojamiento seleccionado (si viene desde detalle):
     * Imagen pequeña del alojamiento
     * Nombre y fechas seleccionadas
     * Precio total
   - Formulario principal con campos:
     * Nombre completo (requerido)
     * Email (requerido)
     * Teléfono (requerido)
     * Fechas deseadas (date pickers) - pre-completadas si viene desde detalle
     * Número de personas - pre-completado si viene desde detalle
     * Tipo de alojamiento preferido (dropdown) - pre-completado si viene desde detalle
     * Mensaje/comentarios (textarea)
   - Validaciones visuales claras
   - Botón de envío destacado: "Enviar Solicitud de Reserva"
   - Mensaje de confirmación tras envío exitoso
   - Información de contacto alternativa (teléfono, email directo)

**ESPECIFICACIONES DE DISEÑO:**

**Estilo Visual:**
- Minimalista y limpio
- Colores: palette natural (verdes suaves, beiges, blancos)
- Tipografía clara y legible (sans-serif moderna)
- Espaciado generoso, mucho white space
- Iconografía simple y consistente

**Responsive Design:**
- Mobile-first approach
- Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop)
- Navigation: hamburger menu en mobile, horizontal en desktop
- Grid layouts flexibles
- Imágenes responsive con lazy loading

**Componentes Clave:**
- Cards para tipos de alojamiento
- Date pickers nativos y usables
- Formularios con validación visual
- Galería de imágenes con modal/lightbox
- Mapa integrado responsive
- Selector de idioma dropdown

**UX/UI Considerations:**
- CTAs (Call-to-Action) claros y prominentes
- Estados de loading, success, error bien definidos
- Navegación intuitiva entre páginas
- Accesibilidad básica (contrastes, alt texts)
- Optimización para touch devices

**Elementos Específicos del Camping:**
- Mostrar ambiente natural y relajado
- Destacar servicios familiares
- Imágenes representativas: parcelas, bungalows, piscina, zonas comunes
- Sensación de lugar acogedor y bien cuidado

Genera maquetas wireframe + diseño visual para estas 3 páginas, priorizando la experiencia mobile y la simplicidad de uso.
```

### Especificaciones Técnicas Adicionales:
- **Framework:** React 18+ con hooks
- **Styling:** CSS Modules o Styled Components
- **Responsive:** Mobile-first con CSS Grid y Flexbox
- **Performance:** Lazy loading de imágenes, code splitting
- **SEO:** Estructura semántica HTML5

### Páginas Prioritarias:
1. **Página Principal** - Landing page del camping KCAMP
2. **Búsqueda de Disponibilidades** - Core functionality del sistema
3. **Detalle del Alojamiento** - Página intermedia de conversión con información específica
4. **Formulario de Contacto/Reserva** - Conversión final y captación de leads

### Flujo de Usuario Actualizado:
**Página Principal** → **Búsqueda de Disponibilidades** → **Detalle del Alojamiento** → **Formulario de Contacto/Reserva**

Este prompt está optimizado para generar maquetas que se alineen perfectamente con las 4 páginas críticas del proyecto BOOTBOOKINGCAMP, incluyendo la nueva página de detalle que mejora significativamente la experiencia de usuario y las tasas de conversión.