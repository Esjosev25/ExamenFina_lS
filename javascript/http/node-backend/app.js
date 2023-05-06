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

app.use('/candidato', require('./routes/candidato'));
app.use('/fase', require('./routes/fase'));
app.use('/voto', require('./routes/voto'));
app.use('/usuario', require('./routes/usuario'));
app.use('/reportes', require('./routes/reportes'));
const port = 3005;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
