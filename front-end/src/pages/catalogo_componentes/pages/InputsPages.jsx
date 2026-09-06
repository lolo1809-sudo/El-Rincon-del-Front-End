import React from "react";
import BotonFavorito from "../components/BotonFav";
import BotonDescargar from "../components/BotonDescargar";
import { Revelar } from "../../../components/Revelar";

export default function InputsPage({ datos, filtro, favoritos, toggleFav }) {
  const normalizar = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const inputsFiltrados = datos.filter((item) => item.categoria === "inputs" && normalizar(item.titulo).includes(normalizar(filtro)));

  return (
    <>
      <title>Inputs | El Rincón del Front-end</title>
      <meta name="description" content="Colección de inputs geniales, hechos con HTML, CSS, JS, listos para usar" />

      {/* Contenedor Grid (Reemplaza .container-catalogo) */}
      <div className="w-[95%] max-w-[1300px] mx-auto pt-[100px] pb-[50px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-[40px] cursor-[url('/cursor.svg')_16_16,_auto] [&_input]:cursor-[url('/pointer.svg')_16_16,_text]">
        {inputsFiltrados.map((item) => {
          const nombreCarpeta = item.id;
          const nombreCategoria = item.categoria;

          return (
            <Revelar key={item.id}>
              {/* Tarjeta (Reemplaza .card) */}
              <article
                data-id={item.id}
                className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-[40px_20px] h-auto shadow-[var(--shadow-card)] relative overflow-visible flex flex-col items-center justify-between gap-[15px] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:border-[#a0b800] hover:shadow-[0_10px_40px_rgba(160,184,0,0.1)] cursor-[url('/pointer.svg')_16_16,_pointer] animate-[subirYaparecer_0.5s_ease-out]"
              >
                {/* Demo (Reemplaza .componente-demo) */}
                <div className="w-full flex flex-col items-center justify-center gap-[30px] py-[10px] cursor-[url('/pointer.svg')_16_16,_pointer]">
                  {/* Título (Reemplaza .titulo-gradiente) */}
                  <h2 className="text-[30px] font-semibold text-center mb-[10px] bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent">
                    {item.titulo}
                  </h2>

                  <div className="absolute top-[10px] right-[10px] z-10">
                    <BotonFavorito esFavorito={favoritos.includes(item.id)} onClick={() => toggleFav(item.id)} aria-label={`Añadir ${item.titulo} a favoritos`} />
                  </div>

                  <div className="absolute top-[10px] left-[10px] z-10">
                    <BotonDescargar categoria={nombreCategoria} nombreCarpeta={nombreCarpeta} />
                  </div>

                  {/* Imagen */}
                  <div className="w-full">
                    <img
                      src={`${item.img_url}`}
                      alt={`Vista previa del componente ${item.titulo}`}
                      loading="lazy"
                      className="w-full h-[200px] object-cover block rounded-[12px] cursor-[url('/pointer.svg')_16_16,_pointer]"
                    />
                  </div>

                  {/* Botón Jugar Demo */}
                  <div>
                    <a
                      href={`${item.demo_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline text-[16px] font-semibold text-white bg-[#d32f2f] py-[10px] px-[24px] rounded-[50px] transition-all duration-300 ease-in-out hover:bg-[#ff0000] hover:shadow-[4px_4px_20px_rgba(255,0,0,0.5)] hover:-translate-y-[2px] cursor-[url('/pointer.svg')_16_16,_pointer] flex items-center justify-center gap-2"
                    >
                      <i aria-hidden="true" className="fa-solid fa-gamepad text-white cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                      Ver Demo
                    </a>
                  </div>

                  {/* Botón Ver Repositorio */}
                  <a
                    href={`${item.git_hub_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent text-[#a0b800] py-[10px] px-[25px] rounded-[50px] border border-[#a0b800] text-[16px] font-semibold tracking-[1px] transition-all duration-300 ease-in-out w-fit h-fit flex items-center justify-center gap-[8px] hover:bg-[#a0b800] hover:text-black hover:shadow-[0_0_15px_rgba(160,184,0,0.4)] cursor-[url('/pointer.svg')_16_16,_pointer]"
                  >
                    <i aria-hidden="true" className="fa-solid fa-code cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                    Ver Repositorio
                  </a>
                </div>
              </article>
            </Revelar>
          );
        })}

        {inputsFiltrados.length === 0 && <p className="text-[var(--text-primary)] text-center w-full">No se encontraron inputs con ese nombre.</p>}
      </div>
    </>
  );
}
