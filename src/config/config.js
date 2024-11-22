import { Command } from "commander";
import { config } from "dotenv";

const program = new Command();

program.requiredOption('-m, --mode <mode>','Server mode','prod')

program.parse();

const options = program.opts();

console.log(options);

config({
    path: options.mode == "dev" ? './.env.dev' : options.mode === "stg" ? './.env.stg' : './.env.prod'
});


export default {
	app : {
		PORT: process.env.PORT || 8080,
		ADMIN_USER : process.env.ADMIN_EMAIL,
        ADMIN_PWD : process.env.ADMIN_PASSWORD,
	},	
	mongo: {
		URL: process.env.MONGO_URL,
	},
	// PUEDO PONER LAS VARIABLES DE JWT AQUI, secret token y cookies
	jwt: {
        SECRET_KEY: process.env.SECRET_KEY,
    },
	mocks: {
		MOCKS: process.env.PASSWORD_MOCKS,
	},
	
};
