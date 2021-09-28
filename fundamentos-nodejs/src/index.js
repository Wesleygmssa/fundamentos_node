const express = require("express");
const app = express();

//configuração necessária para configurar JSON na aplicação
app.use(express.json());

app.get("/courses", (request, response) => {
  //query params e opcinal
  const query = request.query;
  console.log(query); // usando para filtros e paginação
  return response.json(["Cruso 1", "Curso2"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["Cruso 1", "Curso 2", "Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
  //params se for passando em rota e obrigátorio
  const params = request.params.id; // usando para encontrar um dados especifico
  console.log("put", params);
  return response.json(["Cruso 6", "Curso 2", "Curso 4"]);
});
app.patch("/courses/:id", (request, response) => {
  return response.json(["Cruso 6", "Curso 7", "Curso 4"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Cruso 6", "Curso 7", "Curso 4"]);
});
app.listen(3333);
