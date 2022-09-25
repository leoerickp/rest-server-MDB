const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');




class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //Cors controlar accesos al API
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Carpeta pública
        this.app.use(express.static('public'));
    }
    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor se está ejecutando en el puerto ${this.port}`)
        })
    }
}
module.exports = Server;