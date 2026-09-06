# El Rincón del Front-end

# ¿Qué es "El Rincón del Front-end"?

¡Bienvenido a El Rincón del Front-end! Este proyecto es una plataforma integral diseñada para desarrolladores Front-end. Aquí encontrarás desde componentes listos para usar hasta una guía clara para dominar el desarrollo Front-end.

# ✨ ¿Qué hay en la página?

Catálogo de Componentes: gran variedad de componentes gratuitos, listos para usar en tus proyectos

Documentaciones Lite: Guías rápidas y al grano sobre conceptos clave, sin rellenos.

Roadmap Interactivo: Un camino de aprendizaje estructurado para pasar de principiante a avanzado.

Consejos de Diseño: Tips de UI/UX aplicados al desarrollo para que tus webs no solo funcionen, sino que se vean increíbles.

## 🛠️ Stack Tecnológico & Dependencias

El proyecto corre sobre React 19 y Vite, utilizando las siguientes librerías para garantizar rendimiento y experiencia de usuario:

Dependencia,Versión,Propósito
React / React-DOM,^19.2.0,El motor principal de la interfaz (última versión estable).
React Router Dom,^7.12.0,Manejo de navegación dinámica entre secciones.
@tailwindcss/vite,^4.2.1,Estilizado ultra rápido y moderno mediante utilidades.
Framer Motion,^12.33.0,Animaciones fluidas y transiciones de página profesionales.
Canvas-confetti,^1.9.4,Efectos visuales de celebración al descargar componentes.
React-GA4,^2.1.0,Integración con Google Analytics para medir visitas y eventos.
Iconografía,Variable,Combinación de FontAwesome (Solid/Brands) y React-Icons para máxima variedad.
@fontsource/poppins,^5.2.7,Tipografía local para optimizar el CLS y la velocidad de carga.

## 📦 Dependencias principales

Para que este proyecto funcione, se instalaron las siguientes librerías:

- **React (v19)**: El motor principal para crear la interfaz por componentes.
- **React Router Dom (v7)**: Encargado de la navegación entre páginas sin recargar el navegador.
- **Next-themes**: La librería que facilita la lógica del cambio entre modo claro y oscuro.
- **Vite**: El entorno de desarrollo rápido que utilizamos para compilar el proyecto.
- **@fontsource/poppins**: Tipografía importada localmente para evitar peticiones externas y acelerar la carga inicial.
- **@fortawesome/fontawesome-free**: Librería de íconos instalada directamente en el proyecto para eliminar la dependencia de CDNs y mejorar el rendimiento.
- **Canvas-confetti**: Efectos visuales de celebración.
- **Framer Motion**: Animaciones avanzadas y transiciones fluidas.
- **React-GA4**: Librería para integrar Google Analytics 4 en aplicaciones React, permitiendo el rastreo de visitas y eventos personalizados de forma sencilla.

git clone [URL_DEL_REPO]
npm install
npm run dev

## 📦 Principales Funcionalidades

Buscador en Tiempo Real: Filtra componentes y categorías al instante.

Visualizador de Código: Previsualiza el código antes de implementarlo.

Descarga Directa: Obtén componentes en formato .zip con un solo clic.

Favoritos: Guarda tus componentes preferidos mediante localStorage.

Roadmap & Docs: Contenido educativo integrado para tu crecimiento profesional.

# ¿Cómo está organizado?

A continuación voy a explicar la funcón de cada carpeta y archivo:

1\_ src: contiene todo el código de la págin

2\_ pages: las distintas secciónes que aparecen en el inicio, Ej: catálogo de componentes, documentaciones lite, etc.

3\_ components: los componentes de React que se repiten

4\_ App.jsx: la aplicación de todo el proyecto, que une todos los links con el objeto de Brouse Router

5\_ public: todas las imágenes y archivos públicos

src/
├── App.jsx #La App que conecta todo
├── components/ # Componentes globales (Footer, Revelar, TituloDescripcion)
├── pages/ # Todas las páginas del inicio
│ ├── Catalogo/ # Todo lo referente al catálogo de componentes
│ │ ├── components/ # Componentes exclusivos del catálogo (BotonFav, BotonDescargar)
│ │ ├── pages/ # Las sub-páginas (Buttons, Cards, etc.)
│ │ └── app_catalogo_componentes.jsx # (app del catálogo)
│ ├── Roadmap/
│ ├── Documentaciones/
│ └── ConsejosDiseno/
├── App.jsx
└── main.jsx
