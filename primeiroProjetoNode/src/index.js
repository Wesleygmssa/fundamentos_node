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

// Middleware
function veryIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  //verificando se usuário existe por CPF
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  request.customer = customer; // passando a informação para request para poder pegar em todas as rotas se necessário
  //o Mesmo verifica se usuário existe

  return next();
}

function getBalace(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount; // se for cretido vai somando
    } else {
      return acc - operation.amount; // se não for credito vai subtraindo
    }
  }, 0); //valor inicial do reduce
  return balance;
}

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

// app.use(veryIfExistsAccountCPF) // tudo que tiver abaixo será utilizado pelo middlewares
app.get("/statment", veryIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", veryIfExistsAccountCPF, (request, response) => {
  //OBS: a verificação de usuário já existe está sendo verificada,
  // pleo middlewares veryIfExistsAccountCPF()

  //recebendo dados do formuário
  const { description, amount } = request.body;
  const { customer } = request;

  //Criando novo objeto para inserir no statement
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  //inserido deposito no statment
  customer.statement.push(statementOperation);

  return response.status(201).send();
});

//rota para fazer saque
app.post("/withdraw", veryIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body; //quantia
  const { customer } = request;
  console.log(customer.statement); // depositos e retiradas

  const balance = getBalace(customer.statement);

  //Não tem dinheiro suficiente para fazer saque retorne uma mensagem de error
  if (balance < amount) {
    response.status(400).json({ error: "Insufficient funds!" });
  }

  //operação de saque
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  //Inserindo novo objeto caso houver um saque na aplicação
  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.get("/statement/date", veryIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00"); //hacker para pegar somente a hora

  // 10/10/2021
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

app.put("/account", veryIfExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

//retornando todos dados da conta
app.get("/account", veryIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer);
});

app.delete("account", veryIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  //removendo uma posição do array
  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

app.get("balace", veryIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balace = getBalace(customer.statement);

  return response.json(balace);
});

app.listen(3333);
