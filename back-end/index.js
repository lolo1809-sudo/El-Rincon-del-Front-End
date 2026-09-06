const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Cuando entres a esa ruta "/api/componentes", el servidor (app) te devolverá los datos de misComponentes en formato JSON.

app.get("/api/componentes", (req, res) => {
  const misComponentes = [{ id: 1, nombre: "Botón Dark", codigoHTML: '<button class="dark">Click</button>' }];
  res.json(misComponentes);
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
