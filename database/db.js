//Conexion con la BD, definir parametros 
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//Para probar connexion con la bd 
connection.connect((error)=>{
    if(error){
        console.log('ERROR CON CONEXION! '+error);
        return;
    }
    console.log('CONECTADO A LA BD!')
});

module.exports = connection; //permite exportar el objeto de conexión, haciéndolo accesible a otros módulos en la app *practica de node.js