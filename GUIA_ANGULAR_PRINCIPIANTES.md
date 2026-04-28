# 📘 Guía Detallada del Proyecto para Principiantes

¡Hola! Si estás viendo este archivo, es porque quieres entender cómo funciona exactamente esta aplicación ("Lista de Regalos"), pero aún no tienes mucha experiencia con Angular. ¡No te preocupes! Esta guía está diseñada para explicarte todo paso a paso y desde cero, como si estuviéramos leyendo el código juntos.

---

## 1. ¿Qué es Angular y cómo funciona aquí?

Angular es un marco de trabajo (framework) de Google para crear aplicaciones web. Piénsalo como una caja de herramientas gigante de JavaScript/TypeScript que te permite crear páginas web complejas dividiéndolas en pequeños bloques de lego llamados **Componentes**.

En versiones antiguas, Angular era muy complejo y requería de archivos llamados "Módulos" para conectar todo. Sin embargo, este proyecto utiliza **Angular 21** con **Componentes Standalone** (Independientes). Esto significa que cada "bloque de lego" es independiente e importa directamente lo que necesita, lo que lo hace mucho más fácil de entender.

---

## 2. Anatomía del Proyecto (La Estructura de Carpetas)

Todo el código importante que necesitas tocar vive en la carpeta `src/app/`. Aquí te explico cómo está organizada:

```text
src/
 └─ app/
     ├─ core/         (El "Cerebro" de la app)
     │   ├─ guards/   (Los guardias de seguridad)
     │   └─ services/ (Los trabajadores que traen datos)
     │
     ├─ features/     (Las pantallas visuales de la app)
     │   ├─ admin/    (Pantallas del panel de control)
     │   └─ landing/  (Pantalla principal pública)
     │
     └─ app.routes.ts (El mapa de navegación)
```

---

## 3. Entendiendo cada pieza del Rompecabezas

### A) El Mapa: `app.routes.ts`
Imagínalo como el GPS de tu página web. Cuando alguien escribe una dirección en el navegador, Angular mira este archivo para saber qué pantalla mostrar.
- Si vas a `/`, Angular va a la carpeta `landing` y muestra el componente principal.
- Si vas a `/admin/login`, te muestra la pantalla de inicio de sesión.
- Si vas a `/admin`, muestra el panel de control (pero primero le pregunta al Guardia si tienes permiso).

### B) Los Guardias de Seguridad: `core/guards/auth-guard.ts`
Un Guardia ("Guard") es un pequeño portero de discoteca. Antes de dejar a un usuario entrar a la ruta `/admin`, este código revisa si el usuario ya inició sesión (comprobando el `sessionStorage`). Si no tiene acceso, lo empuja hacia `/admin/login`.

### C) Los Trabajadores: `core/services/`
Los "Servicios" son archivos de código que no tienen interfaz gráfica (no tienen HTML ni CSS). Su único trabajo es hacer tareas "por detrás", como conectarse a la base de datos o validar contraseñas.
- `auth.ts`: Revisa si la contraseña que pusiste es correcta (`cumple2026`) y guarda un pase VIP en la memoria de tu navegador (`sessionStorage`).
- `supabase.ts`: Tiene las llaves de acceso a **Supabase** (tu base de datos en la nube). Crea dos llaves: una anónima (para visitantes) y una de administrador (que puede editar todo).
- `products.ts`: Es el encargado de ir a Supabase y pedir la lista de regalos, o enviar la orden de crear/borrar uno nuevo.

### D) Las Pantallas: `features/`
Aquí están las vistas reales que la gente ve. Cada "Componente" siempre se divide en 3 archivos fundamentales:
1. **Un archivo `.ts` (TypeScript):** Contiene la lógica. Las variables, las funciones a ejecutar cuando se hace clic, etc.
2. **Un archivo `.html`:** Contiene la estructura visual. Usa herramientas especiales de Angular como `*ngIf` (para mostrar/ocultar cosas si una condición es cierta) y `*ngFor` (para repetir una tarjeta de producto por cada regalo que exista en la base de datos).
3. **Un archivo `.scss`:** Contiene el diseño y los colores.

#### - `features/landing/landing`
Es tu página principal. El archivo TypeScript (`landing.ts`) le pide al servicio `products.ts` que traiga todos los regalos de Supabase. Luego agrupa los regalos dependiendo de qué pestaña elegiste (Josué o Dafyanie) y en qué Rango están (S+, A, B, etc). Finalmente, el archivo HTML los dibuja en pantalla.

#### - `features/admin/admin`
Es tu panel secreto. Permite agregar, borrar o editar regalos. Lo más complejo que hace es cuando seleccionas una imagen: toma ese archivo, lo envía a Supabase Storage (tu disco duro en la nube), Supabase le devuelve el enlace (URL) de la imagen subida, y luego se guarda ese regalo en la base de datos.

---

## 4. ¿Qué es ese "SSR" del que hablamos antes?

El proyecto tiene activado **SSR (Server-Side Rendering)**. 
Normalmente, Angular envía un archivo HTML en blanco al usuario y el navegador del usuario tiene que construir todo. 

Con SSR, Angular *"pre-cocina"* la página HTML en un servidor Node.js antes de enviarla. Esto hace que tu web cargue increíblemente rápido y que sea amigable para el SEO (motores de búsqueda).
*(Por eso tuvimos que arreglar el error del `sessionStorage`. ¡El servidor que pre-cocina la página no sabe qué es un navegador ni tiene almacenamiento web!)*

---

## 5. Resumen del Flujo (Cómo viaja la información)

1. Un visitante entra a `misitio.com/`
2. El `app.routes.ts` dirige la petición al `LandingComponent`.
3. El `LandingComponent.ts` llama al servicio `ProductsService.getByProfile('josue')`.
4. El servicio envía una petición silenciosa (usando el `adminClient`) hacia los servidores de **Supabase**.
5. Supabase responde con la lista en formato JSON (datos de texto crudo).
6. El `LandingComponent.html` lee esos datos y crea una tarjeta de regalo por cada objeto que recibió.
7. ¡La página se muestra al usuario terminada!

---

## 6. ¿Cómo modifico cosas y veo los cambios?

1. Abre tu terminal en Visual Studio Code.
2. Ejecuta el comando `npm start`.
3. Abre tu navegador en `http://localhost:4200`.
4. Deja la terminal corriendo.
5. Ve a cualquier archivo `.html` (ejemplo `landing.html`) o `.scss`, haz un cambio, y guarda el archivo (`Ctrl + S`).
6. Angular detectará el cambio y recargará automáticamente la página en tu navegador en 1 segundo.

¡Y eso es todo! Ahora conoces la estructura básica. Tómate el tiempo de abrir los archivos uno por uno y leerlos comparándolos con esta guía. Angular se vuelve mucho más fácil una vez que entiendes la separación entre Pantallas (Features) y Tareas de fondo (Services).
