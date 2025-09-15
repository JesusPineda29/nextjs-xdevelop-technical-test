# 🚀 Prueba Técnica - Aplicación Next.js Front-End ​Trainee Developer en XDEVELOP

## 📋 Descripción del Proyecto

Una aplicación web moderna y completamente funcional construida con **Next.js 15** que demuestra competencias avanzadas en desarrollo frontend, incluyendo autenticación segura, gestión de estado compleja, integración con múltiples APIs externas, y arquitectura escalable.

### 🎯 Objetivo
Demostrar habilidades técnicas en React/Next.js, TypeScript, gestión de estado, integración de APIs, y desarrollo de interfaces de usuario modernas y responsivas.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Credenciales de Acceso](#-credenciales-de-acceso)
- [Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [Arquitectura y Justificación Técnica](#-arquitectura-y-justificación-técnica)
- [Estructura del Proyecto](#️-estructura-del-proyecto)
- [APIs Utilizadas](#-apis-utilizadas)
- [Comandos Disponibles](#-comandos-disponibles)

## ✨ Características Principales

### 🔐 Sistema de Autenticación Avanzado
- **Autenticación segura** con tokens simulados
- **Roles diferenciados** (Admin/Usuario) con permisos específicos
- **Refresh tokens** en cookies HttpOnly, Secure, SameSite=Lax
- **Middleware de protección** de rutas automático
- **Persistencia de sesión** con localStorage
- **Logout completo** que limpia todos los datos

### 👥 Gestión Avanzada de Usuarios
- **Tabla interactiva** con TanStack Table
- **Paginación real** usando API de ReqRes
- **Búsqueda en tiempo real** por nombre, apellido o email
- **Filtros por rol** (admin/moderator/user)
- **Selección múltiple** con acciones masivas
- **Eliminación simulada** de usuarios
- **Cambio de roles** dinámico
- **Navegación a posts** por usuario específico

### 📝 Sistema Completo de Posts
- **Visualización de posts** desde JSONPlaceholder API
- **Comentarios** que se cargan al expandir
- **Sistema de favoritos** persistente con IndexedDB
- **Creación de posts** (solo administradores)
- **Eliminación de posts** con confirmación
- **Persistencia local** para posts creados/editados
- **Modal de favoritos** para gestión centralizada
- **Paginación** para mejor rendimiento

### 📚 Buscador Avanzado de Libros
- **Búsqueda en tiempo real** en Open Library API
- **Filtros avanzados** por autor y año de publicación
- **Paginación de resultados** 
- **Portadas de libros** cuando están disponibles
- **Modal de detalles** con información completa
- **Búsqueda combinada** con múltiples filtros

### 🎨 Interfaz y Experiencia de Usuario
- **Diseño responsive** optimizado para todos los dispositivos
- **Componentes reutilizables** construidos con Tailwind CSS
- **Estados de carga** y feedback visual
- **Notificaciones toast** para acciones del usuario
- **Navegación intuitiva** con indicadores de página activa
- **Modales confirmación** para acciones destructivas

## 🛠️ Stack Tecnológico

### 🎯 Frontend Core
- **Next.js 15.5.3** - Framework React con App Router, SSR/SSG y API Routes
- **React 19.1.1** - Biblioteca de UI con hooks modernos y componentes funcionales
- **TypeScript 5.2.2** - Tipado estático para mayor seguridad y mantenibilidad del código

### 🎨 Estilos y UI
- **Tailwind CSS 3.4.17** - Framework de estilos utilitarios para desarrollo rápido
- **Lucide React** - Iconografía consistente, ligera y accesible
- **Sonner** - Sistema de notificaciones toast moderno y elegante
- **Radix UI** - Componentes primitivos accesibles (Label, Slot, Toast)

### 📊 Gestión de Estado y Datos
- **Zustand 5.0.8** - Gestión de estado global ligera (2.9kb) y eficiente
- **TanStack Query 5.87.4** - Manejo de estado del servidor, caché y sincronización
- **TanStack Table 8.21.3** - Tablas avanzadas con funcionalidades completas


### 🌐 APIs Externas Integradas
- **ReqRes API** - Autenticación y gestión de usuarios con paginación real
- **JSONPlaceholder** - Posts y comentarios de ejemplo para testing
- **Open Library** - Base de datos de libros con búsqueda avanzada

### 🔧 Herramientas de Desarrollo
- **ESLint** - Linting y análisis de código con configuración Next.js
- **PostCSS** - Procesamiento de CSS con autoprefixer

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd prueba_jpg
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local
NEXT_PUBLIC_REQRES_API_KEY=reqres-free-v1
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000)

### 5. Construir para Producción
```bash
npm run build
npm run start
```

## 🎯 Competencias Técnicas Demostradas

### 🏗️ Arquitectura y Patrones de Diseño
- ✅ **App Router de Next.js** con routing basado en archivos
- ✅ **API Routes** para manejo de autenticación y tokens
- ✅ **Middleware** para protección automática de rutas
- ✅ **Custom Hooks** para separación de lógica de negocio
- ✅ **Compound Components** para componentes reutilizables
- ✅ **Repository Pattern** para abstracción de APIs
- ✅ **Provider Pattern** para configuración global

### 🔐 Seguridad y Autenticación
- ✅ **Tokens simulados** con expiración configurable
- ✅ **Refresh tokens** en cookies HttpOnly, Secure, SameSite=Lax
- ✅ **Middleware de autenticación** automático
- ✅ **Validación de roles** en componentes y rutas
- ✅ **Protección de rutas** con redirecciones automáticas
- ✅ **Limpieza completa** de datos al logout

### 📊 Gestión de Estado Avanzada
- ✅ **Zustand** para estado global con persistencia
- ✅ **TanStack Query** para estado del servidor y caché
- ✅ **Persistencia diferenciada** (localStorage, IndexedDB)
- ✅ **Estado específico por usuario** con limpieza automática
- ✅ **Optimistic updates** para mejor UX
- ✅ **Invalidación manual** de queries

### 🌐 Integración de APIs
- ✅ **Múltiples APIs externas** (ReqRes, JSONPlaceholder, Open Library)
- ✅ **Paginación real** y simulada
- ✅ **Manejo de errores** y estados de carga
- ✅ **Interceptores de requests** para autenticación
- ✅ **Transformación de datos** para consistencia
- ✅ **Retry logic** y fallbacks

### 🎨 UI/UX y Responsive Design
- ✅ **Tailwind CSS** para estilos utilitarios
- ✅ **Componentes custom** 
- ✅ **Diseño responsive** optimizado para móviles
- ✅ **Estados de carga** y feedback visual
- ✅ **Notificaciones toast** para acciones del usuario
- ✅ **Modales y confirmaciones** para acciones destructivas

### ⚡ Rendimiento y Optimización
- ✅ **Code splitting** automático de Next.js
- ✅ **Paginación** para reducir carga de datos
- ✅ **Carga condicional** de comentarios
- ✅ **Optimizaciones de bundle** con tree shaking
- ✅ **Caché básico** con TanStack Query

## 👤 Credenciales de Acceso

### Usuario Administrador
- **Email:** `admin@admin.com`
- **Contraseña:** `admin123`
- **Permisos:** 
  - ✅ Crear, editar y eliminar posts
  - ✅ Gestionar usuarios (eliminar, cambiar roles)
  - ✅ Acceso completo a todas las funcionalidades
  - ✅ Ver y gestionar favoritos

###  Usuario Regular
- **Email:** `user@user.com`
- **Contraseña:** `user123`
- **Permisos:** 
  - ✅ Solo lectura de posts y usuarios
  - ✅ Marcar posts como favoritos
  - ✅ Ver comentarios de posts
  - ✅ Buscar libros

## 📋 Funcionalidades Detalladas

### 🔐 Sistema de Autenticación
- ✅ **Login seguro** con validación de credenciales
- ✅ **Tokens simulados** almacenados en cookies
- ✅ **Refresh de tokens** implementado pero no automático
- ✅ **Roles diferenciados** (admin/usuario) con middleware
- ✅ **Protección de rutas** con Next.js middleware
- ✅ **Logout completo** que limpia todas las sesiones
- ✅ **Persistencia de sesión** con localStorage

### 👥 Gestión de Usuarios
- ✅ **Tabla interactiva** con TanStack Table
- ✅ **Paginación real** usando la API de ReqRes
- ✅ **Búsqueda en tiempo real** por nombre o email
- ✅ **Filtros de rol** simulados (admin/moderator/user)
- ✅ **Acciones masivas** (eliminación y cambio de roles)
- ✅ **Diseño responsive** optimizado para móviles
- ✅ **Navegación a posts** por usuario específico

### 📝 Sistema de Posts
- ✅ **Visualización de posts** desde JSONPlaceholder
- ✅ **Comentarios condicionales** que se cargan al expandir
- ✅ **Sistema de favoritos** persistente con IndexedDB
- ✅ **Creación de posts** (solo administradores)
- ✅ **Edición inline** de posts con actualizaciones optimistas
- ✅ **Paginación** para mejor rendimiento
- ✅ **Persistencia local** para posts creados/editados
- ✅ **Modal de favoritos** para gestión centralizada

### 📚 Buscador de Libros
- ✅ **Búsqueda en tiempo real** en Open Library
- ✅ **Filtros avanzados** por autor y año de publicación
- ✅ **Paginación de resultados** (15 libros por página)
- ✅ **Portadas de libros** cuando están disponibles
- ✅ **Información detallada** de cada libro
- ✅ **Modal de detalles** con información completa

## 🏗️ Arquitectura y Justificación Técnica

### Decisiones de Arquitectura

#### **1. Next.js 15 con App Router**
**Justificación:** 
- **SSR/SSG nativo** para mejor SEO y rendimiento inicial
- **App Router** proporciona routing basado en archivos más intuitivo
- **API Routes** integradas para manejo de autenticación
- **Middleware** nativo para protección de rutas
- **Optimizaciones automáticas** de imágenes y bundles

#### **2. TypeScript**
**Justificación:**
- **Tipado estático** previene errores en tiempo de desarrollo
- **IntelliSense mejorado** para mejor experiencia de desarrollo
- **Documentación implícita** a través de tipos

#### **3. Zustand para Estado Global**
**Justificación:**
- **Ligero** (2.9kb) comparado con Redux (47kb)
- **API simple** sin boilerplate excesivo
- **Persistencia integrada** con localStorage/IndexedDB
- **TypeScript nativo** sin configuración adicional
- **DevTools** para debugging

#### **4. TanStack Query**
**Justificación:**
- **Caché básico** para evitar llamadas duplicadas (staleTime: 0)
- **Estados de carga/error** manejados automáticamente
- **Optimistic updates** para mejor UX
- **Invalidación manual** de queries después de mutaciones
- **Configuración simple** sin background refetching

#### **5. Tailwind CSS**
**Justificación:**
- **Utility-first** permite desarrollo rápido y consistente
- **Componentes custom** construidos con Tailwind CSS
- **Bundle size optimizado** con purging automático
- **Design system** consistente y mantenible



### Gestión de Estado

#### **Estado Global (Zustand)**
- **authStore**: Autenticación, roles y tokens
- **postsStore**: Favoritos persistentes en IndexedDB
- **postsLocalStore**: Posts creados/editados localmente

#### **Estado del Servidor (TanStack Query)**
- **Caché básico** de datos de APIs (staleTime: 0)
- **Invalidación manual** cuando se actualizan datos
- **Estados de loading/error** manejados globalmente

#### **Estado Local (useState)**
- **Estado de UI** (modales, formularios, filtros)
- **Estado temporal** que no necesita persistencia

### Seguridad

#### **Autenticación Simulada**
- **Access tokens simulados** en cookies con expiración corta (1 hora)
- **Refresh tokens simulados** en cookies HttpOnly
- **Middleware** que protege rutas automáticamente

#### **Validación de Roles**
- **Middleware** verifica tokens en cada request
- **Componentes** condicionales basados en roles
- **API routes** protegidas con validación de tokens

## 🏗️ Estructura del Proyecto

```
prueba_jpg/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── auth/                 # Endpoints de autenticación
│   │       ├── clear-refresh/    # Limpiar refresh token
│   │       ├── refresh/          # Renovar access token
│   │       └── set-refresh/      # Establecer refresh token
│   ├── books/                    # Página de búsqueda de libros
│   │   └── page.tsx
│   ├── login/                    # Página de autenticación
│   │   └── page.tsx
│   ├── posts/                    # Sistema de posts
│   │   ├── page.tsx              # Lista de posts
│   │   └── user/                 # Posts por usuario
│   │       └── [userId]/
│   │           └── page.tsx
│   ├── users/                    # Gestión de usuarios
│   │   └── page.tsx
│   ├── layout.tsx                # Layout principal con providers
│   ├── page.tsx                  # Página de inicio
│   └── styles.css                # Estilos globales
├── src/
│   ├── components/               # Componentes reutilizables
│   │   ├── ui/                   # Componentes base (no implementados)
│   │   ├── AuthInitializer.tsx   # Inicializador de autenticación
│   │   ├── BookModal.tsx         # Modal de detalles de libro
│   │   ├── BooksList.tsx         # Lista de libros con paginación
│   │   ├── FavoritesModal.tsx    # Modal de posts favoritos
│   │   ├── Footer.tsx            # Pie de página
│   │   ├── Navigation.tsx        # Barra de navegación
│   │   ├── Pagination.tsx        # Componente de paginación
│   │   ├── PostCard.tsx          # Tarjeta de post con acciones
│   │   └── UsersTable.tsx        # Tabla de usuarios avanzada
│   ├── config/                   # Configuración de APIs
│   │   └── api.ts                # Configuración y funciones de APIs
│   ├── hooks/                    # Hooks personalizados
│   │   ├── useApi.ts             # Hooks para interacción con APIs
│   │   └── use-toast.ts          # Hook para notificaciones
│   ├── lib/                      # Utilidades y helpers
│   │   ├── api-interceptor.ts    # Interceptor de requests
│   │   ├── cookies.ts            # Manejo de cookies
│   │   └── utils.ts              # Funciones auxiliares
│   ├── store/                    # Stores de Zustand
│   │   ├── authStore.ts          # Estado de autenticación
│   │   ├── postsLocalStore.ts    # Posts locales (localStorage)
│   │   └── postsStore.ts         # Favoritos (IndexedDB)
│   └── types/                    # Definiciones de TypeScript
│       └── index.ts              # Interfaces y tipos
├── components.json               # Configuración de shadcn/ui
├── eslint.config.mjs            # Configuración de ESLint
├── middleware.ts                 # Middleware de Next.js
├── netlify.toml                  # Configuración de Netlify
├── next.config.js                # Configuración de Next.js
├── package.json                  # Dependencias y scripts
├── postcss.config.js             # Configuración de PostCSS
├── tailwind.config.js            # Configuración de Tailwind
└── tsconfig.json                 # Configuración de TypeScript
```

## 🔌 APIs Utilizadas

### ReqRes API (Autenticación y Usuarios)
**Base URL:** `https://reqres.in/api`

#### Autenticación
```typescript
POST /login
Content-Type: application/json
Headers: { "x-api-key": "tu_api_key" }

Body: {
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}

Response: {
  "token": "QpwL5tke4Pnpja7X4"
}
```

#### Usuarios Paginados
```typescript
GET /users?page=1
Headers: { "x-api-key": "tu_api_key" }

Response: {
  "page": 1,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 1,
      "email": "george.bluth@reqres.in",
      "first_name": "George",
      "last_name": "Bluth",
      "avatar": "https://reqres.in/img/faces/1-image.jpg"
    }
  ]
}
```

### JSONPlaceholder (Posts y Comentarios)
**Base URL:** `https://jsonplaceholder.typicode.com`

#### Posts Paginados
```typescript
GET /posts?_start=0&_limit=9

Response: [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
]
```

#### Comentarios de Post
```typescript
GET /posts/1/comments

Response: [
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  }
]
```

#### Crear/Actualizar Post
```typescript
POST /posts
PUT /posts/1
Content-Type: application/json

Body: {
  "title": "Título del post",
  "body": "Contenido del post",
  "userId": 1
}
```

### Open Library (Búsqueda de Libros)
**Base URL:** `https://openlibrary.org`

#### Búsqueda Básica
```typescript
GET /search.json?q=harry+potter&limit=15&offset=0

Response: {
  "numFound": 1000,
  "start": 0,
  "numFoundExact": true,
  "docs": [
    {
      "key": "/works/OL82565W",
      "title": "Harry Potter and the Philosopher's Stone",
      "author_name": ["J.K. Rowling"],
      "first_publish_year": 1997,
      "cover_i": 8191011
    }
  ]
}
```

#### Filtros Avanzados
```typescript
# Por autor
GET /search.json?q=harry+potter+author:rowling

# Por año
GET /search.json?q=harry+potter+first_publish_year:1997

# Combinado
GET /search.json?q=harry+potter+author:rowling+first_publish_year:1997
```


### Variables de Entorno de Producción
```bash
# .env.production
NEXT_PUBLIC_REQRES_API_KEY=reqres-free-v1
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en http://localhost:3000
npm run build        # Construcción optimizada para producción
npm run start        # Servidor de producción
npm run lint         # Verificación de código con ESLint

# Análisis
npm run analyze      # Análisis del bundle (si está configurado)

# Limpieza
rm -rf .next         # Limpiar caché de Next.js
rm -rf node_modules  # Limpiar dependencias
npm install          # Reinstalar dependencias
```



## 🎯 Conclusiones de la Prueba Técnica

### ✅ Fortalezas Demostradas

#### **Arquitectura y Escalabilidad**
- **Separación clara de responsabilidades** entre componentes, hooks y stores
- **Código modular** y fácilmente mantenible
- **TypeScript** para mayor seguridad y documentación implícita

#### **Funcionalidades Avanzadas**
- **Sistema de autenticación completo** con roles y tokens seguros
- **Gestión de estado compleja** con múltiples stores y persistencia
- **Integración de múltiples APIs** con manejo de errores robusto
- **UI/UX moderna** con componentes reutilizables y responsive

#### **Rendimiento y Optimización**
- **Paginación inteligente** para reducir carga de datos
- **Caché básico** con TanStack Query
- **Optimistic updates** para mejor experiencia de usuario
- **Code splitting** automático de Next.js

#### **Seguridad y Mejores Prácticas**
- **Tokens seguros** con cookies HttpOnly
- **Middleware de protección** de rutas
- **Validación de roles** en componentes
- **Limpieza completa** de datos al logout

### 🚀 Tecnologías Dominadas
- **Next.js 15** con App Router y API Routes
- **React 19** con hooks modernos
- **TypeScript** para tipado estático
- **Zustand** para gestión de estado
- **TanStack Query** para estado del servidor
- **TanStack Table** para tablas avanzadas
- **Tailwind CSS** para estilos utilitarios

### 💡 Innovaciones Implementadas
- **Persistencia diferenciada** (localStorage vs IndexedDB)
- **Estado específico por usuario** con limpieza automática
- **Edición optimista** de posts con fallback local
- **Filtros combinados** en búsqueda de libros
- **Acciones masivas** en tabla de usuarios

## 👨‍💻 Autor

**Jesús Pineda Gil**  
*Desarrollador Frontend*

---


*Esta aplicación demuestra competencias técnicas avanzadas en desarrollo frontend moderno, arquitectura escalable, y mejores prácticas de desarrollo web.*
