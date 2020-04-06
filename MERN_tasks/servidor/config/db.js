const mongoose = require('mongoose');

//Requiere dotenv
require('dotenv').config({ path:'variables.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
        //Temanda mensaje en consol
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Base de datos conectada ...');
  } catch (error) {
      console.log(error);
      console.log("holaaaaaaaaaaaaaaaaaaaaaaaa");
      process.exit(1);//Detener la app
  }
}

module.exports = conectarDB;