import express from "express";
import Handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import __dirname from './utils.js';
import {productsService} from "./services/repositories.js";
import ViewsRouter from './routes/ViewsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import initializePassportConfig from './config/passport.config.js';
import config from './config/config.js';

const app = express();
const PORT = config.app.PORT;
const server =app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = new Server(server);

mongoose.connect(config.mongo.URL);

// Register Handlebars helpers
Handlebars.registerHelper('multiply', (a, b) => a * b);
Handlebars.registerHelper('calculateTotal', function(products) {
  let total = 0;
  products.forEach(product => {
    total += product.quantity * product.product.price;
  });
  return total.toFixed(2); // Formato de dos decimales
});

// Handlebars Configuration
const handlebars = exphbs.create({
    handlebars: Handlebars,
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  });
  
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req,res,next)=>{
    req.io = io;
    res.sendUnauthorized = () => res.status(401).send({ status: "error", error: "Unauthorized" });
    next();
})

//Passport Configuración
initializePassportConfig();
app.use(passport.initialize());

//Rutas
app.use('/', ViewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', SessionsRouter);

//Socket.io
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