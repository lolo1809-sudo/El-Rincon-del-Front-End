// ------------- 1. LÓGICA DEL MOSTRAR MAS/MENOS ---------------

const botonesContainer = document.querySelectorAll(".button__container");

botonesContainer.forEach((container) => {
  const botonTexto = container.querySelector(".button__cargar-mas");

  container.addEventListener("click", () => {
    const seccionProductos = container.previousElementSibling;
    const tarjetasOcultas = seccionProductos.querySelectorAll(
      ".productos__prod.oculto"
    );
    const tarjetasVisibles = seccionProductos.querySelectorAll(
      ".productos__prod.visible-temp"
    );

    // Preguntamos si el contenedor tiene la clase 'expandido', NO leemos el texto.
    const estaExpandido = container.classList.contains("expandido");

    if (!estaExpandido) {
      // --- ABRIR ---
      tarjetasOcultas.forEach((tarjeta) => {
        tarjeta.classList.remove("oculto");
        tarjeta.classList.add("visible-temp");
      });

      // Cambiamos el estado y el texto
      container.classList.add("expandido");
      // Aquí podrías poner una lógica para detectar idioma si quisieras, o dejarlo simple:
      botonTexto.innerHTML =
        botonTexto.innerHTML === "Show More" ? "Show Less" : "Mostrar Menos";
    } else {
      // --- CERRAR ---
      tarjetasVisibles.forEach((tarjeta) => {
        tarjeta.classList.remove("visible-temp");
        tarjeta.classList.add("oculto");
      });

      // Cambiamos el estado y el texto
      container.classList.remove("expandido");
      botonTexto.innerHTML =
        botonTexto.innerHTML === "Show Less" ? "Show More" : "Mostrar Mas";
    }
  });
});

// ------------- 2. LÓGICA DEL BOTÓN DE COMPRAR ---------------
const botonCompra = document.querySelector(".comprar");
const cartelConfirmacion = document.querySelector(".confirmacion_compra");
const aceptarCompra = document.querySelector(".confirmacion_compra-aceptar");
const laminaBorrosa = document.querySelector(".lamina");

// 1. Evento para ABRIR el cartel
botonCompra.addEventListener("click", () => {
  //Condición para que solo aparezca el cartel cuando el precio sea distinto de $0
  if (document.querySelector(".comprar").textContent != "Comprar $0") {
    // Quitamos la clase que oculta para MOSTRAR los elementos
    cartelConfirmacion.classList.remove("ocultar");
    laminaBorrosa.classList.remove("ocultar");

    // Repetimos el código y lógica del vaciar carrito
    articulosCarrito = [];
    limpiarHTML();
    document.querySelector(".comprar").textContent = "Comprar $0";
    guardarLocalStorage();
  }
});

// 2. Evento para CERRAR el cartel
aceptarCompra.addEventListener("click", () => {
  // Agregamos la clase que oculta para ESCONDER los elementos
  cartelConfirmacion.classList.add("ocultar");
  laminaBorrosa.classList.add("ocultar");
});

// ------------- 3. LÓGICA DEL FILTRADO DE PRODUCTOS ---------------

const filterSelect = document.querySelector(".filtro"); // sección de filtrado
const sections = document.querySelectorAll(".productos"); //todas las secciones de productos
const titles = document.querySelectorAll(".productos__tittle"); //los títulos de esas secciones

filterSelect.addEventListener("change", (e) => {
  const category = e.target.value;

  sections.forEach((section, index) => {
    // Lógica de desaparecer el boton "Mostrar Mas/Menos"
    // En tu HTML, el div 'button__container' está justo después de la etiqueta 'section'
    const botonContainer = section.nextElementSibling;

    // Validamos: ¿Existe algo después y es un contenedor de botón?
    const tieneBoton =
      botonContainer && botonContainer.classList.contains("button__container");

    // Lógica de Mostrar/Ocultar
    if (category === "todo" || section.classList.contains(category)) {
      // --- MOSTRAR ---
      section.style.display = "grid";
      titles[index].style.display = "block";

      // Solo mostramos el botón si la sección realmente tenía uno
      if (tieneBoton) {
        botonContainer.style.display = "flex";
      }
    } else {
      // --- OCULTAR ---
      section.style.display = "none";
      titles[index].style.display = "none";

      // Solo ocultamos si existe
      if (tieneBoton) {
        botonContainer.style.display = "none";
      }
    }
  });
});

// ------------- 4. LÓGICA DEL CARRITO DE COMPRAS ---------------

// 1. Variables y Selectores
const carrito = document.querySelector(".fa-cart-shopping");
const contenedorCarrito = document.querySelector(".carrito__container");
const listaProductosEnCarrito = document.querySelector("#lista-carrito");
const vaciarCarritoBtn = document.querySelector(".vaciar_carrito");
const cartelCarrito = document.querySelector(".confirmacion__carrito");
const cantidadesDeProductos = document.querySelectorAll(".cantidad");
const listasProductos = document.querySelectorAll(".productos");
const acaboStock = document.querySelector(".stock");

let articulosCarrito = [];

// 2. Event Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Iteramos sobre CADA lista de productos para escuchar el click en todas las secciones
  listasProductos.forEach((lista) => {
    lista.addEventListener("click", agregarProducto);
  });

  // Cuando se elimina un producto del carrito
  contenedorCarrito.addEventListener("click", eliminarProducto);

  // Muestra el carrito
  carrito.addEventListener("click", () => {
    contenedorCarrito.classList.toggle("ocultar__carrito");
  });

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el arreglo
    limpiarHTML(); // Eliminamos todo el HTML
    document.querySelector(".comprar").textContent = "Comprar $0";
    guardarLocalStorage();
  });

  // Cuando el documento carga, leemos el LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
    // Intentamos buscar 'carrito'. Si no existe, asignamos un array vacío []
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Volvemos a pintar el HTML con lo recuperado
    carritoHTML();
  });
}

// 3. Funciones

function mostrarCartelAgregado() {
  // Quitamos la clase que oculta para que aparezca
  cartelCarrito.classList.add("activo");

  setTimeout(() => {
    cartelCarrito.classList.remove("activo");
  }, 1000);
}

function agregarProducto(e) {
  e.preventDefault();

  // 1. Verificamos si es el botón de agregar
  if (e.target.classList.contains("productos__carrito")) {
    // 2. Identificamos la tarjeta de ESTE producto específico
    const productoSeleccionado = e.target.parentElement;

    // 3. Buscamos el elemento que tiene el número
    // Usamos querySelector sobre productoSeleccionado, NO sobre document
    const stockElement = productoSeleccionado.querySelector(".cantidad");

    // 4. Obtenemos el número actual
    let stockActual = Number(stockElement.textContent);

    // 5. Verificamos si hay stock para restar
    if (stockActual > 0) {
      stockElement.textContent = stockActual - 1; // Restamos 1 visualmente

      // Agregamos al carrito
      leerDatosProducto(productoSeleccionado);
      mostrarCartelAgregado();
    } else {
      // aparece el cartel que se acabó el stock
      acaboStock.classList.add("activo");
      setTimeout(() => {
        acaboStock.classList.remove("activo");
      }, 1000);
    }
  }
}

function eliminarProducto(e) {
  if (e.target.classList.contains("cruz")) {
    const productoId = e.target.getAttribute("data-id");

    // Buscamos el producto específico
    const productoEncontrado = articulosCarrito.find(
      (producto) => producto.id === productoId
    );

    if (productoEncontrado.cantidad > 1) {
      // Si hay más de 1, restamos cantidad
      articulosCarrito = articulosCarrito.map((producto) => {
        if (producto.id === productoId) {
          producto.cantidad--;
          return producto;
        }
        return producto;
      });
    } else {
      // Si queda 1, lo eliminamos del arreglo
      articulosCarrito = articulosCarrito.filter(
        (producto) => producto.id !== productoId
      );
    }

    carritoHTML(); // Actualizamos la vista
  }
}

function leerDatosProducto(producto) {
  // Crear un objeto con el contenido del producto actual
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h3").textContent,
    precio: producto.querySelector("span").textContent,
    id: producto.querySelector(".productos__carrito").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );

  if (existe) {
    // Actualizamos la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    // Agregamos el producto al carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  carritoHTML();
}

function carritoHTML() {
  // Limpiar el HTML previo
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((producto) => {
    const { imagen, titulo, precio, cantidad, id } = producto;
    const row = document.createElement("div");
    row.classList.add("carrito__producto");

    row.innerHTML = `
      <img src="${imagen}" alt="${titulo}">
      <p class="nombre">${titulo}</p>
      <span class="precio">${precio}</span>
      <span class="cantidad">${cantidad}</span> 
      <span class="cruz" data-id="${id}">X</span>
    `;

    listaProductosEnCarrito.appendChild(row);
  });
  calcularTotal();
  guardarLocalStorage();
}

function limpiarHTML() {
  while (listaProductosEnCarrito.firstChild) {
    listaProductosEnCarrito.removeChild(listaProductosEnCarrito.firstChild);
  }
}

function calcularTotal() {
  let total = 0;

  // Recorremos el carrito sumando (Precio * Cantidad)
  articulosCarrito.forEach((producto) => {
    // Quitamos el signo '$' y convertimos el texto a número
    const precioNumerico = Number(producto.precio.replace("$", ""));
    total += precioNumerico * producto.cantidad;
  });

  // Texto del botón Comprar
  const botonCompra = document.querySelector(".comprar");
  botonCompra.textContent = `Comprar $${total}`;

  return total;
}

/*Función de Local Storage(guardar los productos del carrito)*/
function guardarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// ------------- 5. LÓGICA DEL CÓDIGO DE DESCUENTO ---------------
const descuentoContainer = document.querySelector(".descuento__container");
const botonDescuento = document.querySelector(".descuento");
const aceptarDescuento = document.querySelector(".confirmacion_decuento");
const inputDescuento = document.querySelector(".descuento__container > input");
const codigo = "lolo1809";

// 1. Evento para ABRIR el cartel
botonDescuento.addEventListener("click", () => {
  descuentoContainer.classList.remove("ocultar");
  laminaBorrosa.classList.remove("ocultar");
});

// 2. Evento para CERRAR el cartel (Lo sacamos afuera para que no se duplique)
aceptarDescuento.addEventListener("click", () => {
  descuentoContainer.classList.add("ocultar");
  laminaBorrosa.classList.add("ocultar");
  inputDescuento.value = ""; //borramos lo que esta escrito en el input
});

// 3. Lógica del Input
inputDescuento.addEventListener("input", (e) => {
  const codigoIngresado = e.target.value;

  // Obtenemos el total actual sin modificar el texto todavía
  let total = calcularTotal();

  if (codigoIngresado === codigo) {
    // --- CÓDIGO CORRECTO ---
    inputDescuento.style.color = "#40ff06"; // Verde

    let totalDescuento = total * 0.9; // Calculamos el 10% off

    botonCompra.innerHTML = `
        Comprar 
        <span style="color: #ccc; text-decoration: line-through; margin: 0 5px;">$${total}</span> 
        $${totalDescuento}
    `;
  } else {
    // --- CÓDIGO INCORRECTO O VACÍO ---
    inputDescuento.style.color = "#db241b";

    //Si borra el código, volvemos a mostrar el precio normal
    botonCompra.textContent = `Comprar $${total}`;
  }
});

/* ----------------------- RESPONSIVE DESIGN ---------------------- */

const query = window.matchMedia("(max-width: 1200px)");

if (query.matches) {
  /* ------------ MENU HAMBURGUESA ------------ */

  const menu = document.querySelector(".fa-bars");
  const lista = document.querySelector(".header__list");

  menu.addEventListener("click", () => {
    lista.classList.toggle("responsive");
    menu.classList.toggle("fa-circle-xmark");
  });
}
