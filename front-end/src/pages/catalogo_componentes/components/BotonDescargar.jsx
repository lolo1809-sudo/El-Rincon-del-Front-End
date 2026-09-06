// Este botón sirve para descargar la carpeta del código de cada componente
import React from "react";
import confetti from "canvas-confetti";

// Ahora recibe la URL del archivo zip en lugar de solo texto
const BotonDescargar = ({ categoria, nombreCarpeta }) => {
  const handleDownload = () => {
    // 1. Confeti al descargar un componente
    const configuracionBase = {
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 }, // Altura desde la que sale
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ],
    };

    // Disparar desde el lado izquierdo
    confetti({
      ...configuracionBase,
      angle: 60,
      origin: { x: 0, y: 0.8 },
    });

    // Disparar desde el lado derecho
    confetti({
      ...configuracionBase,
      angle: 120,
      origin: { x: 1, y: 0.8 },
    });

    // Construimos la ruta al archivo zip
    const rutaZip = `/codigo_git-hub/${categoria}/${nombreCarpeta}/${nombreCarpeta}.zip`;

    // Creamos un enlace temporal para forzar la descarga
    const link = document.createElement("a");
    link.href = rutaZip;
    link.download = `${nombreCarpeta}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      // Clases de Tailwind equivalentes a tu CSS
      className="bg-transparent border-none p-2 text-[var(--text-secondary)] transition-all duration-300 ease-in-out hover:scale-110 hover:text-[var(--text-primary)] cursor-[url('/pointer.svg')_16_16,_pointer]"
      onClick={handleDownload}
      aria-label="Descargar carpeta"
      title="Descargar archivos"
      type="button"
    >
      {/* Icono de descarga (flecha hacia abajo) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="fill-current transition-colors duration-300 ease-in-out"
      >
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </button>
  );
};

export default BotonDescargar;
