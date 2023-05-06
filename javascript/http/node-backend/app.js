require('dotenv').config();
//const {port} = require('./config/dapr');
const express = require('express');
const cors = require('cors');

const { connectDB } = require('./config/db');
const morgan = require('morgan');

const app = express();

//Configurar CORS
app.use(cors());

app.use(morgan('dev'));

//lectura del body
app.use(express.json());

//Base de datos
connectDB();

app.use('/usuarios', require('./routes/usuarios'));
app.use('/fase', require('./routes/fase'));

const port = 3005;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
