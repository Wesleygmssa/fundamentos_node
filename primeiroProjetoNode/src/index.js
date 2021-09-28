const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

//Poder receber e enviar dados em JSON
app.use(express.json());

/*
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

let customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  //validação de cpf existente no banco
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  //Simulando uma cadastro no banco
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statment", (request, response) => {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  return response.json(customer.statment);
});

app.listen(3333);
