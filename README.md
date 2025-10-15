# 🎉 Sistema de Gestión de Eventos

Una aplicación web moderna para la gestión integral de eventos, desarrollada con React, TypeScript y Vite.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roles de Usuario](#-roles-de-usuario)
- [Funcionalidades](#-funcionalidades)
- [API y Backend](#-api-y-backend)
- [Desarrollo](#-desarrollo)
- [Construcción](#-construcción)
- [Contribución](#-contribución)

## ✨ Características

- **Dashboard Interactivo**: Métricas en tiempo real con gráficos dinámicos
- **Gestión de Eventos**: Creación, edición y seguimiento de eventos
- **Gestión de Proveedores**: Catálogo y administración de proveedores
- **Sistema de Roles**: ADMIN, PROVEEDOR y CLIENTE con permisos específicos
- **Autenticación Segura**: JWT con refresh token automático
- **UI Responsiva**: Diseño moderno con Tailwind CSS
- **Componentes Reutilizables**: Biblioteca de componentes personalizados

## 🛠 Tecnologías

### Frontend
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.1.2** - Herramienta de construcción
- **Tailwind CSS 4.1.13** - Framework de CSS
- **React Router 7.9.1** - Enrutamiento
- **Redux Toolkit 2.9.0** - Gestión de estado
- **Chart.js 4.5.0** - Gráficos interactivos
- **PrimeReact 10.9.7** - Componentes UI
- **React Icons 5.5.0** - Iconografía

### Herramientas de Desarrollo
- **ESLint 9.33.0** - Linter de código
- **Formik 2.4.6** - Manejo de formularios
- **Yup 1.7.0** - Validación de esquemas
- **Axios 1.12.2** - Cliente HTTP

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd gestion-eventos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## ⚙️ Configuración

### Variables de Entorno
Crear un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sistema de Gestión de Eventos
```

### Configuración de la API
El archivo `src/connections/mainApi.ts` contiene la configuración base de la API:

```typescript
export const url = "http://localhost:3000/api";
```

## 📁 Estructura del Proyecto
   npm installe Usuario

### ADMIN
- Acceso completo al dashboard
- Gestión de todos los eventos
- Administración de proveedores
- Gestión de usuarios
- Métricas globales del sistema

### PROVEEDOR
- Dashboard con métricas específicas
- Gestión de sus propios eventos
- Visualización de participantes asignados
- Calificaciones y estadísticas

### CLIENTE
- Visualización de eventos disponibles
- Inscripción a eventos
- Historial de participación
- Gestión de perfil

## 🎯 Funcionalidades

### Dashboard
- **KPIs Dinámicos**: Métricas específicas por rol
- **Gráficos Interactivos**: Eventos por mes, participación
- **Eventos Recientes**: Lista de eventos con estados
- **Estadísticas Adicionales**: Eventos semanales, participantes activos

### Gestión de Eventos
- Crear, editar y eliminar eventos
- Estados: Confirmado, Pendiente, Cancelado
- Gestión de asistentes
- Ubicaciones y fechas
- Imágenes y descripciones

### Gestión de Proveedores
- Catálogo de proveedores
- Categorías y calificaciones
- Sistema de reseñas
- Gestión de información de contacto

### Autenticación
- Login seguro con JWT
- Refresh token automático
- Protección de rutas por rol
- Logout seguro

## 🔌 API y Backend

### Endpoints Principales
- `POST /auth/login` - Inicio de sesión
- `POST /auth/refreshToken` - Renovar token
- `GET /events` - Listar eventos
- `POST /events` - Crear evento
- `PUT /events/:id` - Actualizar evento
- `DELETE /events/:id` - Eliminar evento
- `GET /providers` - Listar proveedores
- `POST /providers` - Crear proveedor

### Interceptores
- **Request**: Añade automáticamente el token JWT
- **Response**: Maneja refresh token automático en caso de 401

## 🛠 Desarrollo

### Scripts Disponibles
```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

### Convenciones de Código
- **TypeScript**: Tipado estricto habilitado
- **ESLint**: Configuración personalizada para React
- **Componentes**: PascalCase para nombres de archivos
- **Hooks**: Prefijo `use` para hooks personalizados
- **Rutas**: kebab-case para URLs

**Desarrollado con ❤️ usando React, TypeScript y Vite**