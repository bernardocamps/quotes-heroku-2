// Importando Express, CORS e MongoDB
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();

// Habilitando os CORS Requests
// Saiba mais: https://github.com/expressjs/cors
app.use(cors());
app.use(express.json());

/**
 * Passa a ser servidor da página front-end de quotes
 */
app.use(express.static(path.join(path.resolve(), 'client')));

// Importando Dotenv para não deixar a credencial do Banco de Dados exposta no código
// Saiba mais: https://github.com/motdotla/dotenv
require('dotenv').config();

const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database = null;
let collection = null;
let quotesLength = 0;

// Definindo a rota
app.get("/api/quotes", async (_, res) => {
  try {
    // Extraindo os dados requisitados
    const rand = Math.floor(Math.random() * quotesLength);
    let getQuote = await collection.find().skip(rand).limit(1).toArray();

    // Não retornar o _id e retira da array
    getQuote = {
        text: getQuote[0].text,
        author: getQuote[0].author,
    }

    return res.send(getQuote);

  // Err caso a consulta falhe
  } catch (err) {
    console.log(err);
    res.status(400).send(null);
  }
});

// Heroku utiliza uma variável de ambiente chamada process.env.PORT para armazenar a porta
var port = process.env.PORT || 8080;

app.listen(port, async() => {
    try {
        // Fazendo a requisição ao Banco de Dados, acessando pelo nome do database e da coleção desejada
        await client.connect();
        database = client.db('quotes');
        collection = database.collection('quotesCollection');

        // Retorna o número de quotes na coleção
        quotesLength = await collection.countDocuments({});

        console.log('Conectado ao Mongo...');
        console.log('Servidor ligado');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});
