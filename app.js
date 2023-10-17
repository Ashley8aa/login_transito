//1- Invocar express
const express = require('express'); //importa el framework Express.js a la aplicación Node.js.
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const app = express(); // instancia de la app Express.


//2- Se implementa urlencoded para poder capturar datos del formulario
app.use(express.urlencoded({extended:false})); 
//este middleware toma los datos que se ingresan del html y los convierte en un formato con el que el servidor puede trabajar fácilmente
app.use(express.json());
//ayuda al servidor a comprender los datos que se le envían en formato JSON
    //El middleware json() toma los datos JSON y los convierte en un objeto con el que puede trabajar el código del servidor.

//3- Invocar a dotenv
const dotenv = require('dotenv'); // se utiliza para importar la biblioteca dotenv a su aplicación Node.js
dotenv.config({path:'./env/.env'}); //se utiliza para configurar la libreria dotenv para cargar variables de entorno desde el archivo .env específico ubicado en la ruta

//4- Directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5- Establecer el motor de plantillas ejs
app.set('view engine', 'ejs'); //se utiliza para configurar el motor de plantillas para representar contenido HTML dinámico en una app Express

//6- Invocar a bcryptjs
 const bcryptjs = require('bcryptjs'); //importar la biblioteca/módulo bcryptjs.

//7- Variables de session
const session = require('express-session'); //importar libreria de express-session, lo q permite administrar sesiones de usuario y mantener datos específicos del usuario entre solicitudes HTTP
app.use(session({
    secret:'secret', //Clave secreta para cifrar los datos de la sesión
    resave: true,
    saveUninitialized:true //La sesión se creará y guardará para cada usuario, incluso si no interactúa con su sitio ni establece ningún dato de sesió
}));

//8- Invocar modulo de conexion de la BD
const connection = require('./database/db');

//9- Rutas
app.get('/', (req, res) =>{
    res.render('index');
})

app.get('/login', (req, res) =>{
    res.render('login');
})

app.get('/register', (req, res) =>{
    res.render('register');
})
app.get('/terms', (req, res) => {
    res.render('terms');
});
app.post('/auth', (req, res) => {
    res.render('index');

});
//10- Registracion
app.post('/register', async (req, res) =>{
    const user = req.body.user;
    const name = req.body.name;
    const password= req.body.password;
    const email= req.body.email;
    //responsable de hashing de la contraseña antes de almacenarla en la base de datos.
    let passwordHash = await bcryptjs.hash(password, 8);
        //El 8 es el factor de costo, que determina la complejidad del algoritmo hash. Los valores más altos lo hacen más seguro pero más lento.
    //insertar a la basde de datos
    connection.query('INSERT INTO usertable SET ?', {user:user, name:name, password:passwordHash, email:email}, async(error, results)=>{
        if(error){
            console.log(error);
        } else {
            res.send('Register Complete!!')
        }   
    })
})
app.listen(3000, (req, res) => {
    console.log('SERVER RUNNING... http:localhost:3000'); 
})
