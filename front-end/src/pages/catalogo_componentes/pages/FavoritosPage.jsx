import React from "react";
import BotonFavorito from "../components/BotonFav";
import BotonDescargar from "../components/BotonDescargar";
import { Revelar } from "../../../components/Revelar"; // transición suave al bajar

export default function FavoritosPage({ datos, favoritos, toggleFav, filtro }) {
  // 1. PROTECCIÓN: Si datos no ha cargado aún, no hacemos nada
  if (!datos) return <h2 className="text-white text-center mt-10">Cargando datos...</h2>;

  // Filtramos los elementos que están en favoritos Y coinciden con la búsqueda
  const itemsFavoritos = datos.filter((item) => {
    // 2. PROTECCIÓN: Si el item no tiene ID o Título, lo saltamos
    if (!item.id || !item.titulo) return false;

    const esFavorito = favoritos.includes(item.id);

    // Verificamos que coincida con el buscador
    const coincideBusqueda = item.titulo.toLowerCase().includes(filtro.toLowerCase());

    return esFavorito && coincideBusqueda;
  });

  return (
    <>
      <title>Favoritos | El Rincón del Front-end</title>
      <meta name="description" content="Guarda tus componentes favoritos en un solo lugar" />

      {/* Contenedor Grid Principal */}
      <div className="w-[95%] max-w-[1300px] mx-auto pt-[100px] pb-[50px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-[40px] cursor-[url('/cursor.svg')_16_16,_auto] [&_input]:cursor-[url('/pointer.svg')_16_16,_text]">
        {itemsFavoritos.map((item) => {
          // Id y categoría para descargar el elemento
          const nombreCarpeta = item.id;
          const nombreCategoria = item.categoria;

          return (
            <Revelar key={item.id}>
              {/* Tarjeta */}
              <article className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[20px] p-[40px_20px] h-auto shadow-[var(--shadow-card)] relative overflow-visible flex flex-col items-center justify-between gap-[15px] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:border-[#a0b800] hover:shadow-[0_10px_40px_rgba(160,184,0,0.1)] cursor-[url('/pointer.svg')_16_16,_pointer] animate-[subirYaparecer_0.5s_ease-out]">
                {/* Demo */}
                <div className="w-full flex flex-col items-center justify-center gap-[30px] py-[10px] cursor-[url('/pointer.svg')_16_16,_pointer]">
                  {/* 3. Título y Categoría */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-[30px] font-semibold text-center mb-[5px] bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--accent-color)] bg-clip-text text-transparent">
                      {item.titulo}
                    </h2>
                    <p className="text-[#aaa] text-[0.9rem] m-0 capitalize">{item.categoria || "Sin categoría"}</p>
                  </div>

                  {/* 1. Botón Favorito */}
                  <div className="absolute top-[10px] right-[10px] z-10">
                    <BotonFavorito esFavorito={true} onClick={() => toggleFav(item.id)} aria-label={`Añadir ${item.titulo} a favoritos`} />
                  </div>

                  {/* 2. Botón de Descargar */}
                  <div className="absolute top-[10px] left-[10px] z-10">
                    <BotonDescargar categoria={nombreCategoria} nombreCarpeta={nombreCarpeta} />
                  </div>

                  {/* 4. Imagen */}
                  <div className="w-full">
                    <img
                      src={item.img_url || ""}
                      alt={`Vista previa del componente ${item.titulo}`}
                      loading="lazy"
                      onError={(e) => (e.target.style.display = "none")}
                      className="w-full h-[200px] object-cover block rounded-[12px] cursor-[url('/pointer.svg')_16_16,_pointer]"
                    />
                  </div>

                  {/* 5. Ver Demo */}
                  <div>
                    <a
                      href={item.demo_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline text-[16px] font-semibold text-white bg-[#d32f2f] py-[10px] px-[24px] rounded-[50px] transition-all duration-300 ease-in-out hover:bg-[#ff0000] hover:shadow-[4px_4px_20px_rgba(255,0,0,0.5)] hover:-translate-y-[2px] cursor-[url('/pointer.svg')_16_16,_pointer] flex items-center justify-center gap-2"
                    >
                      <i aria-hidden="true" className="fa-solid fa-gamepad text-white cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                      Ver Demo
                    </a>
                  </div>

                  {/* 6. Ver Repo */}
                  <a
                    href={item.git_hub_url || "#"}
                    className="bg-transparent text-[#a0b800] py-[10px] px-[25px] rounded-[50px] border border-[#a0b800] text-[16px] font-semibold tracking-[1px] transition-all duration-300 ease-in-out w-fit h-fit flex items-center justify-center gap-[8px] hover:bg-[#a0b800] hover:text-black hover:shadow-[0_0_15px_rgba(160,184,0,0.4)] cursor-[url('/pointer.svg')_16_16,_pointer]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i aria-hidden="true" className="fa-solid fa-code cursor-[url('/pointer.svg')_16_16,_pointer]"></i>
                    Ver Repositorio
                  </a>
                </div>
              </article>
            </Revelar>
          );
        })}

        {/* Mensaje si no hay resultados */}
        {itemsFavoritos.length === 0 && (
          <div className="text-center w-full mt-[40px] text-white">
            {favoritos.length > 0 ? (
              <p className="text-[var(--text-primary)]">No se encontraron favoritos con ese nombre.</p>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-2">Aún no tienes favoritos.</h3>
                <p className="text-[var(--text-primary)] mb-[70px]">Explora las secciones y dale al corazón ❤️.</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
