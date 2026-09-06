import { useState, useEffect } from "react";

// Importar la librería de analytics y hook de ruta
import ReactGA from "react-ga4";
import { Routes, Route, useLocation } from "react-router-dom";

// Importa tu cliente de Supabase
import { supabase } from "../../supabaseClient";

// Importación de los componentes usados en todas (o casi todas) las páginas
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "../../components/Footer";

// Conexión a todas las Páginas
import InputsPage from "./pages/InputsPages";
import ButtonsPage from "./pages/ButtonsPages";
import SeleccionPage from "./pages/SeleccionPages";
import ModalesPage from "./pages/ModalesPages";
import NavegacionPage from "./pages/Navegacion";
import CardsPage from "./pages/CardsPages";
import FormulariosPage from "./pages/FormulariosPages";
import TipografiasPage from "./pages/TipografiasPages";
import JuegosPage from "./pages/JuegosPages";
import WebsPage from "./pages/WebsPages";
import FavoritosPage from "./pages/FavoritosPage";
import NotFound from "../not_found";

// Inicializar el GA4 con el ID
ReactGA.initialize("G-S0DE4Y0ZXM");

// Componente auxiliar para rastrear las visitas al cambiar de página
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function Catalogo() {
  // ----------------- 1. LÓGICA DE FAVORITOS ---------------
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("misFavoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("misFavoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // ----------------- 2. LÓGICA DE DATOS Y SUPABASE ---------------
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("");

  // Función asíncrona para traer toda la tabla "components"

  useEffect(() => {
    async function fetchComponentes() {
      try {
        const { data, error } = await supabase.from("components").select("*");

        if (error) throw error;

        if (data) {
          setDatos(data);
        }
      } catch (error) {
        console.error("Error al cargar los componentes de Supabase:", error.message);
      } finally {
        setCargando(false);
      }
    }

    fetchComponentes();
  }, []);

  // ----------------- 3. CONTROLAR EL SIDEBAR ---------------
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* 4. ACTIVAR EL RASTREADOR DE PÁGINAS */}
      <AnalyticsTracker />

      <Header onSearch={setFiltro} estado={sidebarOpen} setEstado={setSidebarOpen} />

      <div className="flex-container">
        <Sidebar estaAbierto={sidebarOpen} setEstaAbierto={setSidebarOpen} />

        <main className="content">
          <Routes>
            <Route path="inputs" element={<InputsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="buttons" element={<ButtonsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="seleccion" element={<SeleccionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="modales" element={<ModalesPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="navegacion" element={<NavegacionPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="cards" element={<CardsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="formularios" element={<FormulariosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="tipografias" element={<TipografiasPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="juegos" element={<JuegosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="paginas" element={<WebsPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="favoritos" element={<FavoritosPage datos={datos} filtro={filtro} favoritos={favoritos} toggleFav={toggleFavorito} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Catalogo;
