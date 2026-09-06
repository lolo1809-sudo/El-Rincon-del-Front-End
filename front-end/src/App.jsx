import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// Importar la librería de analytics y hook de ruta
import ReactGA from "react-ga4";

// Inicializar el GA4 con el ID
ReactGA.initialize("G-S0DE4Y0ZXM");

// Componente auxiliar para rastrear las visitas al cambiar de página
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

/* ------------------ COMPONENTES -----------------------------*/
import TituloDescripcion from "./components/TituloDescripcion";
import Footer from "./components/Footer.jsx";

/* ---------------------- PÁGINAS ------------------------ */
import Catalogo from "./pages/catalogo_componentes/app_catalogo_componentes.jsx";
import datos from "./pages/catalogo_componentes/components/datos.json";
import Consejos from "./pages/consejos_diseno/consejos_diseno.jsx";
import { Revelar } from "./components/Revelar.jsx";
import NotFound from "./pages/not_found.jsx";

const Inicio = () => (
  <>
    <Revelar>
      <TituloDescripcion />
    </Revelar>

    <div className="min-h-screen w-full bg-[var(--bg-body--inicio)] p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tarjeta 1: Catálogo */}
        <Link
          to="/catalogo/inputs"
          className="lg:col-span-4 h-[400px] bg-[var(--bg-card)] rounded-[32px] shadow-[var(--shadow-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] hover:scale-[1.02] transition-all flex flex-col justify-center p-8 group overflow-hidden relative"
        >
          {/* Imagen de fondo */}
          <img
            src="img_secciones_inicio/catalogo_img.webp"
            alt="Catálogo"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0"
          />
          {/* Contenido (z-10 para estar sobre la imagen) */}
          <div className="relative z-10">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform origin-left">🧩</div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Catálogo de Componentes</h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed w-full max-w-2xl">
              Explora la mejor colección de componentes reutilizables, listos para copiar y pegar en tus páginas webs.
            </p>
          </div>
        </Link>

        {/* Tarjeta 2: Consejos de Diseño */}
        <Link
          to="/consejos"
          className="lg:col-span-4 h-[300px] bg-[var(--bg-card)] rounded-[32px] shadow-[var(--shadow-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] hover:scale-[1.02] transition-all flex flex-col justify-center p-8 group overflow-hidden relative"
        >
          <img
            src="img_secciones_inicio/consejos_diseño_img.webp"
            alt="Consejos de Diseño"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-0"
          />
          <div className="relative z-10">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform origin-left">🎨</div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Consejos de Diseño</h2>
            <p className="text-[var(--text-secondary)] text-md max-w-xl">Mejora la UI/UX de tus aplicaciones con tips esenciales de tipografía, espaciado y teoría del color.</p>
          </div>
        </Link>

        {/*-------------------- ACLARACIÓN------------------------- 
        Para agregar una nueva tarjeta, copiar el mismo formato (con los mismos estilos de classname), y cambiar las columnas o ancho*/}
      </div>
    </div>
    <Revelar>
      <Footer />
    </Revelar>
  </>
);

// 3. Configuración del Enrutador
export default function App() {
  return (
    <BrowserRouter basename="/El-Rincon-del-Front-End">
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo*" element={<Catalogo />} />
        <Route path="/consejos" element={<Consejos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
