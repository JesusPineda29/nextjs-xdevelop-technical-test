# 🚀 Prueba Técnica - Aplicación Next.js Front-End ​Trainee Developer en XDEVELOP

## 📋 Descripción del Proyecto

Una aplicación web moderna y completamente funcional construida con **Next.js 15** que demuestra competencias avanzadas en desarrollo frontend, incluyendo autenticación simulada con tokens, gestión de estado compleja con múltiples stores, integración con tres APIs externas diferentes, y arquitectura escalable con componentes reutilizables.

### 🎯 Objetivo
Demostrar habilidades técnicas en React/Next.js, TypeScript, gestión de estado con Zustand, integración de APIs con TanStack Query, y desarrollo de interfaces de usuario modernas y responsivas con Tailwind CSS.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Competencias Técnicas Demostradas](#-competencias-técnicas-demostradas)
- [Credenciales de Acceso](#-credenciales-de-acceso)
- [Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [Arquitectura y Justificación Técnica](#-arquitectura-y-justificación-técnica)
- [Estructura del Proyecto](#️-estructura-del-proyecto)
- [APIs Utilizadas](#-apis-utilizadas)
- [Comandos Disponibles](#-comandos-disponibles)
- [Decisiones Arquitectónicas Fundamentales](#️-decisiones-arquitectónicas-fundamentales)
- [Conclusiones de la Prueba Técnica](#️-conclusiones-de-la-prueba-técnica)


## ✨ Características Principales

### 🔐 Sistema de Autenticación Simulado
- **Autenticación simulada** con usuarios predefinidos (admin@admin.com, user@user.com)
- **Tokens simulados** con expiración de 1 hora en cookies accesibles por JS
- **Refresh tokens** en cookies HttpOnly para renovación automática
- **Roles diferenciados** (Admin/Usuario) con permisos específicos
- **Middleware de protección** de rutas automático con Next.js
- **Persistencia de sesión** con localStorage para datos de usuario
- **Logout completo** que limpia todos los datos y stores

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
- **Visualización de posts** desde JSONPlaceholder API con paginación
- **Comentarios** que se cargan al expandir
- **Sistema de favoritos** persistente con IndexedDB
- **Creación de posts** (solo administradores) con IDs únicos generados
- **Edición inline** de posts con actualizaciones optimistas
- **Eliminación de posts** con confirmación y marcado como eliminado
- **Persistencia local** para posts creados/editados en localStorage
- **Modal de favoritos** para gestión centralizada
- **Filtrado inteligente** que excluye posts eliminados

### 📚 Buscador Avanzado de Libros
- **Búsqueda en tiempo real** en Open Library API 
- **Filtros avanzados** por autor y año de publicación
- **Paginación de resultados** (15 libros por página)
- **Portadas de libros** cuando están disponibles desde Open Library
- **Modal de detalles** con información completa del libro
- **Búsqueda combinada** con múltiples filtros simultáneos
- **Estados de carga** y manejo de errores de API

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

**Importante:** Esta variable de entorno es **requerida** para que la aplicación funcione correctamente. Sin ella, la API de ReqRes no responderá adecuadamente.

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
- ✅ **Login simulado** con usuarios predefinidos (admin@admin.com, user@user.com)
- ✅ **Tokens simulados** almacenados en cookies
- ✅ **Refresh de tokens** implementado con endpoint `/api/auth/refresh`
- ✅ **Roles diferenciados** (admin/usuario) con validación en componentes
- ✅ **Protección de rutas** con Next.js middleware (solo verifica tokens)
- ✅ **Logout completo** que limpia cookies, localStorage y todos los stores
- ✅ **Persistencia de sesión** con localStorage para datos de usuario

### 👥 Gestión de Usuarios
- ✅ **Tabla interactiva** con TanStack Table
- ✅ **Paginación real** usando la API de ReqRes
- ✅ **Búsqueda en tiempo real** por nombre o email
- ✅ **Filtros de rol** simulados (admin/moderator/user)
- ✅ **Acciones masivas** (eliminación y cambio de roles)
- ✅ **Diseño responsive** optimizado para móviles
- ✅ **Navegación a posts** por usuario específico

### 📝 Sistema de Posts
- ✅ **Visualización de posts** desde JSONPlaceholder con paginación (9 posts por página)
- ✅ **Comentarios condicionales** que se cargan solo al expandir cada post
- ✅ **Sistema de favoritos** persistente con IndexedDB
- ✅ **Creación de posts** (solo administradores) con IDs únicos generados
- ✅ **Edición inline** de posts con actualizaciones optimistas
- ✅ **Eliminación simulada** con marcado como eliminado (no se borra realmente)
- ✅ **Paginación** para mejor rendimiento
- ✅ **Persistencia local** para posts creados/editados en localStorage
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
- **Persistencia diferenciada** con localStorage para posts locales e IndexedDB para favoritos
- **TypeScript nativo** sin configuración adicional
- **Limpieza automática** de datos específicos por usuario al logout
- **Múltiples stores** especializados (auth, posts, users)

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
- **authStore**: Autenticación, roles, tokens y usuarios predefinidos
- **postsStore**: Favoritos persistentes en IndexedDB
- **postsLocalStore**: Posts creados/editados localmente en localStorage
- **usersStore**: Gestión de usuarios eliminados y cambios de rol

#### **Estado del Servidor (TanStack Query)**
- **Caché básico** de datos de APIs (staleTime: 0)
- **Invalidación manual** cuando se actualizan datos
- **Estados de loading/error** manejados globalmente

#### **Estado Local (useState)**
- **Estado de UI** (modales, formularios, filtros)
- **Estado temporal** que no necesita persistencia

### Seguridad

#### **Autenticación Simulada**
- **Usuarios predefinidos** (admin@admin.com, user@user.com) con roles específicos
- **Access tokens simulados** en cookies accesibles por JS con expiración de 1 hora
- **Refresh tokens simulados** en cookies HttpOnly para renovación automática
- **Middleware** que protege rutas automáticamente verificando cookies
- **API Routes** para manejo de refresh tokens y limpieza de sesiones

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

## 🏗️ Decisiones Arquitectónicas Fundamentales

### 🎯 **1. Arquitectura de Estado: Separación por Dominio**

#### **Decisión: Múltiples Stores Zustand Especializados**
```typescript
// 4 stores independientes con responsabilidades específicas
- authStore: Autenticación, tokens y roles
- postsStore: Favoritos con IndexedDB
- postsLocalStore: Posts creados/editados con localStorage  
- usersStore: Gestión de usuarios eliminados y cambios de rol
```

**Justificación Técnica:**
- **Principio de Responsabilidad Única**: Cada store maneja un dominio específico
- **Evita acoplamiento**: Cambios en un store no afectan otros
- **Facilita testing**: Cada store se puede probar independientemente
- **Escalabilidad**: Fácil agregar nuevos stores sin refactorizar existentes

**Implementación Real:**
- `authStore`: Maneja login/logout, tokens, roles y limpieza de datos
- `postsStore`: Persiste favoritos en IndexedDB (mayor capacidad)
- `postsLocalStore`: Persiste posts locales en localStorage (simplicidad)
- `usersStore`: Gestiona estado temporal de usuarios (eliminados, roles)

### 🔄 **2. Gestión de Datos: Patrón Híbrido API + Local**

#### **Decisión: Sincronización Inteligente entre APIs y Estado Local**
```typescript
// Lógica de combinación en usePosts hook
const apiPosts = await getPosts(page, 9);
const localPosts = getAllLocalPosts();
const filteredApiPosts = apiPosts.filter(post => !isPostDeleted(post.id));
return page === 1 ? [...localPosts, ...filteredApiPosts] : filteredApiPosts;
```

**Justificación Técnica:**
- **Resilencia**: Si la API falla, los datos locales siguen funcionando
- **UX optimizada**: Los posts creados aparecen inmediatamente en la primera página
- **Simulación realista**: Los posts no se eliminan realmente de la API, se marcan como eliminados
- **Consistencia**: El usuario ve una experiencia fluida sin errores de API

**Implementación Real:**
- **Posts de API**: Se filtran los eliminados localmente
- **Posts locales**: Se agregan solo en la primera página
- **IDs únicos**: Se generan para evitar conflictos con la API
- **Persistencia**: Los cambios se mantienen entre sesiones

### 🔐 **3. Autenticación: Simulación Completa con Seguridad**

#### **Decisión: Sistema de Autenticación Simulado con Flujo Real**
```typescript
// Usuarios predefinidos con roles específicos
const VALID_USERS = [
  { email: 'admin@admin.com', password: 'admin123', role: 'admin' },
  { email: 'user@user.com', password: 'user123', role: 'user' }
];
```

**Justificación Técnica:**
- **Demostración completa**: Muestra todos los aspectos de un sistema de auth real
- **Sin dependencias externas**: No requiere backend real para funcionar
- **Roles funcionales**: Los permisos realmente afectan la UI y funcionalidad
- **Seguridad realista**: Cookies HttpOnly para refresh tokens, accesibles para access tokens

**Implementación Real:**
- **Tokens con expiración**: 1 hora para access tokens
- **Refresh automático**: Endpoint `/api/auth/refresh` para renovar tokens
- **Middleware de protección**: Verifica tokens en rutas protegidas
- **Limpieza completa**: Al logout se limpian todos los stores y cookies

### ⚡ **4. Rendimiento: Optimizaciones Estratégicas**

#### **Decisión: Carga Condicional y Caché Básico**
```typescript
// TanStack Query con configuración específica
const [queryClient] = useState(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Always refetch
      retry: 1,
    },
  },
}));
```

**Justificación Técnica:**
- **staleTime: 0**: Asegura datos frescos de APIs de prueba
- **Carga condicional**: Los comentarios solo se cargan al expandir posts
- **Paginación**: Reduce la carga inicial de datos
- **Invalidación manual**: Control preciso sobre cuándo refrescar datos

**Implementación Real:**
- **Comentarios lazy**: `useComments(showComments ? post.id : 0)`
- **Paginación**: 9 posts por página, 15 libros por página
- **Estados de carga**: Feedback visual durante las operaciones
- **Optimistic updates**: Los cambios se muestran inmediatamente

### 🌐 **5. Integración de APIs: Patrón de Abstracción**

#### **Decisión: Configuración Centralizada y Interceptores**
```typescript
// API_CONFIG centraliza todas las configuraciones
export const API_CONFIG = {
  REQRES_BASE_URL: 'https://reqres.in/api',
  OPENLIBRARY_BASE_URL: 'https://openlibrary.org',
  JSONPLACEHOLDER_BASE_URL: 'https://jsonplaceholder.typicode.com',
  // Headers, endpoints y configuración centralizada
};
```

**Justificación Técnica:**
- **Mantenibilidad**: Un solo lugar para cambiar URLs y configuraciones
- **Consistencia**: Headers y configuración uniforme
- **Flexibilidad**: Fácil agregar nuevas APIs
- **Interceptores**: Manejo automático de refresh tokens

**Implementación Real:**
- **3 APIs diferentes**: ReqRes (usuarios), JSONPlaceholder (posts), Open Library (libros)
- **Interceptores**: Manejo automático de tokens expirados
- **Fallbacks**: Si la API falla, se usa estado local
- **Configuración por entorno**: Variables de entorno para API keys

### 🎨 **6. UI/UX: Patrones Consistentes**

#### **Decisión: Sistema de Estados y Feedback Unificado**
```typescript
// Patrones consistentes en toda la aplicación
- Loading states con TanStack Query
- Error handling con try/catch
- Toast notifications con Sonner
- Modales de confirmación para acciones destructivas
```

**Justificación Técnica:**
- **Consistencia**: Mismos patrones en toda la aplicación
- **Accesibilidad**: Estados claros para todos los usuarios
- **Prevención de errores**: Confirmaciones para acciones importantes
- **Feedback inmediato**: El usuario siempre sabe qué está pasando

**Implementación Real:**
- **Estados de carga**: `isLoading`, `isPending` en mutaciones
- **Manejo de errores**: Try/catch con toast notifications
- **Confirmaciones**: Modales para eliminar posts/usuarios
- **Validación**: Formularios con validación en tiempo real

### 🔧 **7. Persistencia: Estrategia Diferenciada**

#### **Decisión: Tecnologías de Almacenamiento Específicas por Tipo de Dato**
```typescript
// Persistencia diferenciada según el tipo de dato
- IndexedDB: Para favoritos (mayor capacidad, mejor rendimiento)
- localStorage: Para posts locales (simplicidad, datos temporales)
- Cookies: Para tokens (seguridad, expiración automática)
```

**Justificación Técnica:**
- **IndexedDB para favoritos**: Mayor capacidad, mejor para datos que pueden crecer
- **localStorage para posts locales**: Simplicidad para datos temporales
- **Cookies para tokens**: Seguridad con expiración automática
- **Limpieza automática**: Al logout se limpian todos los datos específicos del usuario

**Implementación Real:**
- **Zustand persist**: Middleware que maneja la persistencia automáticamente
- **Storage personalizado**: Función `createIndexedDBStorage()` para IndexedDB
- **Limpieza por usuario**: `clearUserData()` en cada store
- **Fallbacks**: Si IndexedDB falla, se usa localStorage


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
