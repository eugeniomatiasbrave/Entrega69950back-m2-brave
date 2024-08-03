import express from "express";
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { Server } from "socket.io";
import __dirname from './utils.js';
import {productsService} from "./managers/index.js";
import viewsRouter from './routes/views.router.js';
import ViewsRouter from './routes/ViewsRouter.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import SessionsRouter from './routes/SessionsRouter.js';
import initializePassportConfig from './config/passport.config.js';

const app = express();
const PORT = process.env.PORT || 8080;

const server =app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(server);


const connection = mongoose.connect('mongodb+srv://eugeniomatiasbrave:Eco336699@clustereugebrave.g7439kd.mongodb.net/EcommersToys?retryWrites=true&w=majority&appName=ClusterEugeBrave');

//Handlebars Configuración
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req,res,next)=>{
    req.io = io;
    next();
})

//Passport Configuración
initializePassportConfig();
app.use(passport.initialize());


//Rutas Vistas
app.use('/', ViewsRouter);
//Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', SessionsRouter);


io.on('connection', async (socket) => {
    console.log('Cliente conectado con id:', socket.id);
   
    const productsIo = await productsService.getProductsViews();
       io.emit('ProductsIo', productsIo);

    socket.on('createProduct', async (data) => {
        try {
          const productsIo = await productsService.createProduct(data);
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



