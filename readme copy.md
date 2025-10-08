# BOOTBOOKINGCAMP

**Sistema de reservas para camping - Fase Piloto**  
*Desarrollo Mock-First con migración preparada a producción*

---

## 🚀 Quick Start (Development)

### Requisitos Mínimos
- **Node.js 18+** (para frontend)
- **PHP 8.1+** (para backend) 
- **Composer** (para dependencias PHP)
- **Git**

### Setup en 5 minutos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd bootbookingcamp
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env si es necesario (configuración por defecto funciona)
```

3. **Instalar dependencias backend**
```bash
cd backend
composer install
cd ..
```

4. **Instalar dependencias frontend**
```bash
cd frontend
npm install
cd ..
```

5. **Iniciar desarrollo**
```bash
# Terminal 1 - Backend
cd backend
php -S localhost:8000 -t public

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

6. **Abrir navegador**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Test:** http://localhost:8000/api/camping/info

---

## 📁 Estructura del Proyecto

```
bootbookingcamp/
├── data/mock/              # 📊 Datos JSON para desarrollo
│   ├── camping.json        # Información del camping KCAMP
│   ├── accommodation_types.json  # Tipos de parcelas
│   ├── availability.json   # 6 meses de disponibilidad
│   ├── pricing_rules.json  # Reglas de precios
│   └── pms_responses.json  # Simulación PMS
├── backend/                # 🔧 API PHP con Slim Framework
├── frontend/               # 💻 App React con TypeScript
├── docs/                   # 📚 Documentación técnica completa
└── docker-compose.future.yml  # 🐳 Preparado para migración
```

---

## 🎯 Funcionalidades Implementadas

### ✅ MVP Actual (Mock Data)
- **GET /api/camping/info** - Información completa del camping
- **GET /api/availability** - Búsqueda de disponibilidades con filtros
- **POST /api/contact** - Formulario de contacto/reserva
- **Frontend React** - Interfaz completa responsive
- **Datos realistas** - 6 meses de disponibilidad simulada
- **Testing integrado** - Unit + Integration + E2E

### 🔄 Preparado para Migración
- **Repository Pattern** - Swap transparente JSON → Database
- **Docker configuration** - MySQL + Redis preparado
- **AWS integration** - Scripts de migración listos
- **PMS integration** - Arquitectura preparada

---

## 📚 Documentación del Proyecto

El proyecto incluye documentación técnica completa:

## Índice

0. [Ficha del proyecto](0-ficha-del-proyecto.md)
1. [Descripción general del producto](1-descripcion-general-del-producto.md)
2. [Arquitectura del sistema](2-arquitectura-del-sistema.md)
3. [Modelo de datos](3-modelo-de-datos.md)
4. [Especificación de la API](4-especificaciones-de-la-api.md)
5. [Historias de usuario](5-historias-de-usuario.md)
6. [Tickets de trabajo](6-tickets-de-trabajo.md)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**

### **0.2. Nombre del proyecto:**

### **0.3. Descripción breve del proyecto:**

### **0.4. URL del proyecto:**

> Puede ser pública o privada, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/).

### 0.5. URL o archivo comprimido del repositorio

> Puedes tenerlo alojado en público o en privado, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/). También puedes compartir por correo un archivo zip con el contenido


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

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.


### **3.2. Descripción de entidades principales:**

> Recuerda incluir el máximo detalle de cada entidad, como el nombre y tipo de cada atributo, descripción breve si procede, claves primarias y foráneas, relaciones y tipo de relación, restricciones (unique, not null…), etc.

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

---

## 5. Historias de Usuario

> Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto.

**Historia de Usuario 1**

**Historia de Usuario 2**

**Historia de Usuario 3**

---

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto. 

**Ticket 1**

**Ticket 2**

**Ticket 3**

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1**

**Pull Request 2**

**Pull Request 3**

