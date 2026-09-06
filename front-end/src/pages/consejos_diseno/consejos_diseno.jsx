import React, { memo, useState, useMemo } from "react";
import Footer from "../../components/Footer";
import { tips } from "./consejos";
import { Revelar } from "../../components/Revelar";

const Consejos = memo(() => {
  const [busqueda, setBusqueda] = useState("");

  // Memorizamos y filtramos los consejos
  const consejosFiltrados = useMemo(() => {
    // Agregamos el índice original para no perder la numeración al filtrar
    const consejosConIndice = tips.map((tip, index) => ({
      ...tip,
      numeroReal: index + 1,
    }));

    if (!busqueda) return consejosConIndice;

    const esNumero = !isNaN(busqueda) && busqueda.trim() !== "";

    if (esNumero) {
      const numeroBuscado = parseInt(busqueda, 10);
      return consejosConIndice.filter((tip) => tip.numeroReal === numeroBuscado);
    } else {
      return consejosConIndice.filter((tip) => tip.titulo.toLowerCase().includes(busqueda.toLowerCase()));
    }
  }, [busqueda]);

  return (
    <>
      <title>Consejos de Diseño | El Rincón del Front-end</title>
      <meta name="description" content="consejos esenciales de diseño UI basados en Refactoring UI para desarrolladores Front-end." />

      <div className="max-w-[800px] mx-auto min-h-screen py-[100px] px-[10px] sm:px-[50px] flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-[35px] sm:text-[50px] font-bold text-[var(--text-primary)] leading-tight">200 CONSEJOS DE UI</h2>
          <p className="text-[var(--accent-color)] text-lg font-medium tracking-wide mt-2">
            Inspirados en{" "}
            <a href="https://refactoringui.com/" target="_blank" rel="noreferrer" className="underline text-sky-400 hover:text-sky-200 transition-colors">
              Refactoring UI
            </a>
          </p>
        </div>

        {/* Buscador */}
        <div className="w-full max-w-md mb-12">
          <input
            type="text"
            placeholder="Buscar por título o número..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-[var(--input-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-[12px] px-5 py-3 focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] transition-all shadow-md placeholder-[var(--text-secondary)]"
          />
        </div>

        <div className="w-full h-auto border-l-2 border-[var(--border-color)] ml-[15px] py-[10px]">
          {consejosFiltrados.length > 0 ? (
            consejosFiltrados.map((tip) => (
              <div key={tip.id || tip.numeroReal} className="relative mb-[40px] pl-[35px] last:mb-0 group">
                <div className="absolute -left-[16px] top-0 w-[30px] h-[30px] rounded-full bg-[var(--bg-body)] border-2 border-[var(--accent-color)] flex items-center justify-center text-[var(--text-primary)] font-bold text-[14px] shadow-[0_0_10px_var(--accent-color)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-color)] group-hover:text-[var(--bg-body)]">
                  {tip.numeroReal}
                </div>

                <div className="bg-[var(--bg-card)] p-[20px] rounded-[16px] border border-[var(--border-color)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <h3 className="text-[20px] sm:text-[22px] tracking-[0.5px] font-black text-[var(--text-primary)] mb-[10px] uppercase">{tip.titulo}</h3>
                  <p className="m-0 text-[var(--text-secondary)] text-[15px] sm:text-[16px] leading-[1.6]">{tip.desc}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <a
                      href={tip.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline text-[16px] font-semibold text-white bg-[#d32f2f] py-[10px] px-[24px] rounded-[50px] transition-all duration-300 ease-in-out hover:bg-[#ff0000] hover:shadow-[4px_4px_20px_rgba(255,0,0,0.5)] hover:-translate-y-[2px] cursor-[url('/pointer.svg')_16_16,_pointer] flex items-center justify-center gap-2"
                    >
                      <i aria-hidden="true" className="fa-solid fa-gamepad text-white"></i>
                      Ver Consejo
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[var(--text-secondary)] mt-10 text-lg">No se encontraron consejos con esa búsqueda.</p>
          )}
        </div>
      </div>

      <Revelar>
        <Footer />
      </Revelar>
    </>
  );
});

export default Consejos;
