# 🎁 Lista de Regalos

Una aplicación web moderna y profesional diseñada para gestionar y visualizar listas de regalos de forma dinámica. El proyecto separa inteligentemente la vista pública interactiva de un panel de administración privado, ofreciendo una experiencia de usuario fluida para organizar y priorizar deseos y artículos.

---

## 🚀 Tecnologías Principales

- **Framework Core:** Angular v21 (Arquitectura moderna con *Standalone Components*)
- **Renderizado:** Server-Side Rendering (SSR) optimizado para SEO y carga rápida
- **Estilos:** SCSS (Sass)
- **Backend & Base de Datos:** Supabase (PostgreSQL)
- **Almacenamiento (Storage):** Supabase Storage para la gestión de imágenes
- **Ruteo:** Angular Router avanzado con *Lazy Loading*

---

## ✨ Características Destacadas

- **Perfiles Duales:** El sistema divide la vista entre perfiles de usuario (ej. *Josué* y *Dafyanie*), permitiendo cambiar de lista con una interfaz amigable.
- **Sistema de Rangos (Tiers):** Clasificación visual de regalos por niveles de prioridad (S+, S, A, B, C, D) aplicando una paleta de colores y emojis únicos para cada nivel.
- **Panel de Administración Seguro:** Interfaz protegida mediante Angular Guards (`authGuard`) para garantizar el acceso exclusivo.
- **Gestión de Contenido (CRUD):** Capacidad para crear, editar y eliminar productos en tiempo real.
- **Subida de Archivos Integrada:** Soporte *Drag & Drop* y selector de archivos para subir imágenes directamente a la nube (Supabase).

---

## 🗺️ Mapa de Rutas

La aplicación está estructurada para ser extremadamente rápida, cargando sus módulos bajo demanda (*Lazy Loading*).

| Ruta | Componente | Acceso | Descripción |
|---|---|---|---|
| `/` | `LandingComponent` | **Público** | Página principal interactiva. Muestra los regalos agrupados por perfil y priorizados según el sistema de rangos (S+ hasta D). |
| `/admin/login` | `LoginComponent` | **Público** | Pantalla segura de inicio de sesión para administradores. |
| `/admin` | `AdminComponent` | 🔒 **Privado** | Panel de control. Permite la administración total de los productos del inventario y la gestión de archivos multimedia. |
| `**` | Redirección | - | Cualquier ruta no reconocida redirigirá automáticamente a la página principal (`/`). |

---

## 💡 Datos Curiosos del Proyecto (Fun Facts)

1. **Diseño inspirado en el Gaming:** En lugar de utilizar una cuadrícula de tienda genérica, la lista de regalos está inspirada en las *"Tier Lists"* de la cultura de los videojuegos y el anime, asignando rangos jerárquicos y estéticos a cada regalo (Donde *S+* representa la joya de la corona y *D* lo menos urgente).
2. **Arquitectura "Module-less":** El proyecto fue construido utilizando los últimos estándares de Angular, es decir, es 100% *Standalone*. No hay ni rastro del antiguo archivo `app.module.ts`.
3. **Presupuestos de Estilos Personalizados:** Durante el desarrollo, fue necesario realizar un ["ajuste de tuercas" en `angular.json`](#) para ampliar el presupuesto (budget) de los componentes CSS, permitiendo alojar fuentes externas de Google Fonts con diseños mucho más enriquecidos sin detener las compilaciones de producción.
4. **Backend-less (BaaS):** Toda la infraestructura, base de datos y alojamiento de imágenes reside en **Supabase**, utilizando su potente cliente JavaScript para realizar consultas asíncronas y seguras sin tener que escribir o desplegar un servidor propio.

---

## 🛠️ Instalación y Uso

Asegúrate de contar con [Node.js](https://nodejs.org/) y [Angular CLI](https://angular.dev/tools/cli) instalados en tu entorno.

**1. Clonar e instalar dependencias:**
```bash
npm install
```

**2. Configuración del Entorno:**
Debido a la integración con Supabase, asegúrate de tener correctamente configuradas las llaves de acceso en tus servicios de conexión (archivos de entorno si aplican).

**3. Despliegue en desarrollo:**
```bash
ng serve
# o
npm start
```
*Visita `http://localhost:4200` en tu navegador.*

**4. Compilar para producción:**
```bash
ng build
```
*Generará los archivos listos para despliegue dentro del directorio `dist/`.*
