import express from "express";
import helmet from "helmet";
import dbConnect from "./config/mongo.js";
import Handlebars from "handlebars";
import exphbs from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from 'cors';
import __dirname from "./utils.js";
import ViewsRouter from "./routes/ViewsRouter.js";
import SessionsRouter from "./routes/SessionsRouter.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersMocksRouter from "./routes/usersMocks.router.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import config from "./config/config.js";
import initializePassportConfig from "./config/passport.config.js";
import { handlerError } from "./middlewares/handler.error.js";
import handlerSend from "./middlewares/handler.send.js";
import { info } from "./docs/info.js";

  const app = express();
  app.use(cors());

  // Swagger Configuration
  const specs = swaggerJSDoc(info);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

  const PORT = config.app.PORT;

  app.use(helmet()); // Usar helmet para mejorar la seguridad
  
  const server = app.listen(PORT, () =>
    console.log(
      `****SERVER RUNNING ON PORT ${PORT} **** - ` + new Date().toLocaleString()
    )
  );

  // Conexión a la base de datos
  dbConnect();

  // Register Handlebars helpers
  Handlebars.registerHelper("multiply", (a, b) => a * b);
  Handlebars.registerHelper("calculateTotal", function (products) {
    let total = 0;
    products.forEach((product) => {
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

  
  app.engine("handlebars", handlebars.engine);
  app.set("view engine", "handlebars");
  app.set("views", `${__dirname}/views`);
  app.use(express.static(`${__dirname}/public`));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("dev")); // Configura morgan para registrar las solicitudes HTTP en la consola

  //Passport Configuración
  initializePassportConfig(); 
  app.use(passport.initialize());

  //Rutas
  app.use("/", ViewsRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/users", usersRouter)
  app.use("/api/carts", cartsRouter);
  app.use("/api/sessions", SessionsRouter);
  app.use("/api/mockingtoys", usersMocksRouter);

  // Middleware de errores
 app.use(handlerError);
 app.use(handlerSend);

  export { app, server };
  
