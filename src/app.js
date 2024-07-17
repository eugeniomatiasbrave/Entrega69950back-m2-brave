import express from "express";
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
//import passport from 'passport';

import { Server } from "socket.io";
import __dirname from './utils.js';
import {productsService} from "./managers/index.js";
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

const CONNECTION_STRING = 'mongodb+srv://eugeniomatiasbrave:Eco336699@clustereugebrave.g7439kd.mongodb.net/EcommersToys?retryWrites=true&w=majority&appName=ClusterEugeBrave';

const connection = mongoose.connect(CONNECTION_STRING);

const server =app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(server);

//Handlebars Configuración
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

app.use(session({
    secret:"=)378!122asdzxc3",
    resave:false,
    saveUninitialized:false,
    //store: new FileStorage({path:`${__dirname}/sessions`,ttl:20,reapInterval:10})
    store:MongoStore.create({
        mongoUrl:CONNECTION_STRING,
        ttl:60*60*24
    })
}));

app.use((req,res,next)=>{
    req.io = io;
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas Vistas
app.use('/', viewsRouter);
//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);


io.on('connection', async (socket) => {
    console.log('Cliente conectado con id:', socket.id);
   
    const productsIo = await productsService.getProductsViews();
    //const productsIo = productsPaginate.docs;
    io.emit('ProductsIo', productsIo);

    socket.on('createProduct', async (data) => {
        try {
          const productsIo = await productsService.createProduct(data);
           //const productsIo = await productsService.getProducts();

            io.emit('ProductsIo', productsIo);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    });

    socket.on('deleteProduct', async (pid) => {
        try {
            await productsService.deleteProduct(pid);
            const productsIo = await productsService.getProductsViews();
            io.emit('ProductsIo', productsIo);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    });
  
    socket.on('productsUpdated', async ( updatedProducts ) => {
        try {
            const productsIoPaginate = await productsService.getProducts(updatedProducts);
            const productsIo = productsIoPaginate.docs
            io.emit('ProductsIo', productsIo);
        } catch (error) {
            console.error('Error updating products:', error);
        }
    });
});



