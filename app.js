// Importando Express, CORS e MongoDB
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const app = express();

// Habilitando os CORS Requests
// Saiba mais: https://github.com/expressjs/cors
app.use(cors());

// Importando Dotenv para não deixar a credencial do Banco de Dados exposta no código
// Saiba mais: https://github.com/motdotla/dotenv
require('dotenv').config();
const uri = process.env.DB_URL;

// Definindo a rota
app.get("/api/quotes", async (req, res) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    // Fazendo a requisição ao Banco de Dados, acessando pelo nome do database e da coleção desejada
    const database = client.db('quotes');
    const collection = database.collection('quotesCollection');

    // Extraindo os dados requisitados
    const quotes = await collection.find().toArray();

    // Exportando no formato JSON
    return res.json(quotes);

  // Err caso a conexão falhe
  } catch (err) {
    console.log(err);
  }
  // Garante que a requisição feche após "sucesso" ou "erro"
  finally {
    await client.close();
  }
});

// Heroku utiliza uma variável de ambiente chamada process.env.PORT para armazenar a porta
var port = process.env.PORT || 8080;

app.listen(port);
