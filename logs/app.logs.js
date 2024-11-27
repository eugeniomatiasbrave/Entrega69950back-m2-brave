import log4js from 'log4js';
import config from '../src/config/config.js';

log4js.configure({
    appenders:{
        fileAppender: {
            type: 'file', filename: './logs/app.log'
        },
        consoleAppender: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['fileAppender', 'consoleAppender'], level: 'debug' },
        stg: { appenders: ['fileAppender'], level: 'info' },
        prod: { appenders: ['fileAppender'], level: 'trace' }
    }
})

const logger = log4js.getLogger(config.app.MODE === 'dev' ? 'default' : config.app.MODE);

export default logger;

/*
logger.trace("Entering cheese testing"); // Para mensajes muy detallados, generalmente utilizados para rastrear la ejecución del código y diagnosticar problemas.
logger.debug("Got cheese."); // Para mensajes de depuración que son útiles durante el desarrollo y la depuración del código.
logger.info("Cheese is Comté."); // Para mensajes informativos que destacan el progreso normal de la aplicación.
logger.warn("Cheese is quite smelly."); //  Para mensajes de advertencia que indican una posible situación problemática que no impide el funcionamiento de la aplicación.
logger.error("Cheese is too ripe!"); // Para mensajes de error que indican un problema que ha ocurrido y que puede afectar el funcionamiento de la aplicación.
logger.fatal("Cheese was breeding ground for listeria."); // Para mensajes críticos que indican un problema grave que probablemente hará que la aplicación falle.
logger.mark("Cheese is marked for special attention."); // Para marcar eventos importantes que no necesariamente son errores o advertencias, pero que deben ser destacados.

*/