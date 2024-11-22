// para trabajar con multer
import multer from "multer";
import __dirname from "../utils.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) { //carpeta destino. //cd:es una callback de multer
		let dinamicFolder;
		switch(req.baseUrl) { // aqui puedo poner las rutas donde quiera que se guarden a distintas carpetas usando switch. Seria dinamisar las rutas , donde yo quiero que se guarden las cosas
			case '/api/products':
				dinamicFolder = 'products';
		}
		return cb(null, `${__dirname}/public/files/${dinamicFolder}`);
	},
	filename: function (req, file, cb) { // nombre del archivo
		return cb(null, `${Date.now()}-${file.originalname}`);
	}
});
const uploader = multer({ storage });
export default uploader