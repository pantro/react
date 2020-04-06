const express = require('express');

const conectarDB = require('./config/db');

//Crear servidor
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto del app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyecto', require('./routes/proyecto'));
app.use('/api/tarea', require('./routes/tarea'));

//arranca la app
app.listen(PORT, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

//Definir la pagina principal
app.get('/', (req, res)=> {
  res.send('Hola mundao');
})