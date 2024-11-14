import express from "express";
import dbConnect  from "./config/mongo.js";
import Handlebars from 'handlebars';
import exphbs from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
import ViewsRouter from './routes/ViewsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import config from './config/config.js';
import initializePassportConfig from './config/passport.config.js';

const app = express();
const PORT = config.app.PORT;

app.listen(PORT, () => 
   console.log(`****SERVER RUNNING ON PORT ${PORT} **** - `+new Date().toLocaleString())) ;

// Conexión a la base de datos
dbConnect();

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

// Middleware global para definir res.sendUnauthorized
app.use((req, res, next) => {
  res.sendUnauthorized = (reason) => res.status(401).send({ status: "error", error: reason || "Unauthorized" });
  next();
});

//Passport Configuración
initializePassportConfig();
app.use(passport.initialize());

//Rutas
app.use('/', ViewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', SessionsRouter);

