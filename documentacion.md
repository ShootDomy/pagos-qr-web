# Documentación de Flujos, Funciones y Servicios

Este documento describe los principales flujos, funciones, hooks, servicios y componentes del proyecto **pagos-qr-web**.

---

## Flujos Principales

### 1. Autenticación de Usuario

- **Archivo:** `src/hooks/useAuth.ts`, `src/api/usuario.ts`, `src/app/auth/page.tsx`
- **Descripción:**
  - Permite iniciar sesión y gestionar el estado de autenticación.
  - Utiliza cookies para almacenar el token JWT.
  - Redirige al usuario según su estado de autenticación.
  - El hook `useAuth` expone el estado de autenticación, el usuario y la mutación de login.

### 2. Generación de Código QR para Pagos

- **Archivo:** `src/app/principal/page.tsx`, `src/hooks/useTransaccionGenerarQR.ts`, `src/api/transaccion.ts`
- **Descripción:**
  - Permite al usuario generar un código QR para realizar pagos.
  - El hook `useTransaccionGenerarQR` gestiona la mutación para crear el QR.
  - El flujo incluye la visualización del QR y el monitoreo del estado del pago.

### 3. Consulta de Estado de Pago

- **Archivo:** `src/hooks/useObtenerEstadoPago.ts`, `src/api/transaccion.ts`, `src/app/principal/page.tsx`
- **Descripción:**
  - Permite consultar el estado de una transacción (PENDIENTE, APROBADO, DECLINADO).
  - El hook `useObtenerEstadoPago` realiza la consulta periódica del estado.

### 4. Listado y Filtro de Transacciones

- **Archivo:** `src/app/transaccion/page.tsx`, `src/hooks/useObtenerTransaccionComercio.ts`, `src/api/transaccion.ts`, `src/components/transacciones/CardTransaccion.tsx`, `src/components/transacciones/ModalPrevisualizarQr.tsx`
- **Descripción:**
  - Permite listar, filtrar y visualizar transacciones por cliente y estado.
  - Incluye la previsualización del QR asociado a cada transacción.

---

## Hooks Personalizados

- **useAuth:** Maneja autenticación y login.
- **useTransaccionGenerarQR:** Mutación para generar QR de pago.
- **useObtenerEstadoPago:** Consulta el estado de una transacción.
- **useObtenerTransaccionComercio:** Obtiene listado de transacciones por comercio.

---

## Servicios/API

- **usuarioApi** (`src/api/usuario.ts`):

  - `iniciarSesion`: POST `/usuario/auth/inicio` para login.

- **transaccionApi** (`src/api/transaccion.ts`):

  - `generarQr`: POST `/transaccion/qr` para crear QR.
  - `obtenerEstadoPago`: GET `/transaccion/estado` para consultar estado.
  - `obtenerTransaccionesComercio`: GET `/transaccion/comercio` para listar transacciones.

- **config** (`src/api/config.ts`):
  - Configuración de Axios, manejo de token y baseURL.

---

## Componentes Principales

- **MainLayout, NavbarWrapper, FooterWrapper:** Estructura general de la app.
- **Navbar, Menu, Footer:** Navegación y pie de página.
- **LoaderComponent:** Indicador de carga.
- **CardTransaccion:** Muestra información de una transacción.
- **ModalPrevisualizarQr:** Modal para visualizar el QR de una transacción.
- **ReactQueryProvider:** Proveedor de React Query para manejo de datos asíncronos.

---

## Modelos

- **Transacción** (`src/ts/models/transaccion.ts`):
  - Interfaces para generación de QR, estado de pago y listado de transacciones.
- **Usuario** (`src/ts/models/usuario.ts`):
  - Interfaces para login y datos decodificados del usuario.
- **MenuData** (`src/ts/menu-data.ts`):
  - Estructura de los ítems del menú de navegación.

---

## Utilidades

- **constants.ts:** Constantes globales (URL base, nombre de cookie).
- **functions.ts:** Funciones utilitarias para arrays y formato de dígitos.

---

## Flujos de Pantallas

- **Inicio (`/`):** Redirige según autenticación.
- **Login (`/auth`):** Formulario de inicio de sesión y registro.
- **Principal (`/principal`):** Generación de QR y monitoreo de estado de pago.
- **Transacciones (`/transaccion`):** Listado y filtro de transacciones.
- **No autorizado (`/401`):** Pantalla para usuarios no autenticados.

---

## Uso de Dependencias Clave

A continuación se destacan las principales dependencias utilizadas en el proyecto y su propósito:

### React Query

- **Propósito:** Manejo eficiente de datos asíncronos, caché y sincronización de estado entre cliente y servidor.
- **Uso:**
  - Hooks personalizados como `useAuth`, `useTransaccionGenerarQR`, `useObtenerEstadoPago` y `useObtenerTransaccionComercio` aprovechan React Query para gestionar peticiones y mutaciones.
  - El proveedor `ReactQueryProvider` envuelve la aplicación para habilitar el contexto global de React Query.

### Axios

- **Propósito:** Cliente HTTP para realizar peticiones a la API.
- **Uso:**
  - Configuración centralizada en `src/api/config.ts` para manejar baseURL y autenticación por token.
  - Utilizado en los servicios de usuario y transacción para todas las llamadas a endpoints.

### Chakra UI

- **Propósito:** Biblioteca de componentes UI accesibles y personalizables.
- **Uso:**
  - Componentes visuales como `Button`, `Card`, `Input`, `Badge`, `Modal`, entre otros, para construir la interfaz de usuario.
  - Proveedor `ChakraProvider` para habilitar el tema y los estilos globales.

### Otras dependencias relevantes

- **Zod:** Validación de formularios y esquemas de datos.
- **React Hook Form:** Manejo de formularios reactivos y validación.
- **js-cookie:** Gestión de cookies para autenticación.
- **jwt-decode:** Decodificación de tokens JWT.
- **Lodash:** Utilidades para manipulación de datos.
- **Lucide React:** Iconos SVG modernos.
- **TailwindCSS:** Utilidad para estilos rápidos y responsivos.

---

## Estructura de Carpetas

- **src/app/**: Páginas principales y layouts.
- **src/api/**: Servicios y configuración de API.
- **src/hooks/**: Hooks personalizados.
- **src/components/**: Componentes reutilizables.
- **src/common/**: Componentes comunes (Navbar, Footer, Menu).
- **src/ts/**: Modelos y datos de menú.
- **src/utils/**: Utilidades y constantes.

---

## Notas

- El proyecto está orientado a la gestión de pagos mediante códigos QR, con autenticación y manejo de transacciones.
- El flujo principal es: login → generación de QR → consulta de estado → listado de transacciones.

---

## Contacto y Soporte

Este proyecto fue creado por **Domenica Vintimilla**.

- 📧 **Correo**: [canizaresdomenica4@gmail.com](mailto:canizaresdomenica4@gmail.com)
- 🐙 **GitHub**: [https://github.com/ShootDomy](https://github.com/ShootDomy)
- 💼 **LinkedIn**: [https://www.linkedin.com/in/domenica-vintimilla-24a735245/](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)
