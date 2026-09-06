import React from "react";

export default function InicioPages() {
  return (
    <>
      <title>Inicio | El Rincón del Front-end</title>

      {/* Cambiamos h-screen por un padding superior (pt-12) para empujarlo arriba */}
      <div className="bg-[var(--bg-body--inicio)] w-full flex flex-col items-center pt-12 pb-8 transition-all duration-300 ease-in-out">
        <h1 className="text-[50px] sm:text-[65px] font-bold tracking-tighter mb-[10px] text-center bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(160,184,0,0.3)] animate-[subirYaparecer_1s_ease-out]">
          El Rincón del Front-end
        </h1>

        <h2 className="text-[20px] text-[var(--text-secondary)] font-light leading-[1.6] mb-5 text-center animate-[subirYaparecer_1.2s_ease-out]">
          Todo lo que un Front-end necesita <br />
          en un solo lugar
        </h2>

        <p className="text-[15px] sm:text-[18px] md:text-[20px] text-center px-4 max-w-xl text-[var(--text-primary)] opacity-80 font-medium italic mb-5 sm:mb-7 animate-[subirYaparecer_1.3s_ease-out]">
          Plataforma educativa de principiante para principiante
        </p>

        <h3 className="font-mono text-[18px] text-[var(--accent-color)] bg-[rgba(160,184,0,0.15)] px-4 py-2 rounded-[20px] border border-[var(--accent-color)] inline-block animate-[subirYaparecer_1.4s_ease-out]">
          (HTML, CSS, JS, TS, REACT)
        </h3>
      </div>
    </>
  );
}
