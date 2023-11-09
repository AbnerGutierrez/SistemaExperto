import express from "express"; //modulo para el req y res dek servidor
import { engine } from "express-handlebars"; //modulo del motor de plantilla
import indexRoutes from "./routes/index.routes"; //modulo para importar las rutas(los get y post)
import path from "path";
import multer from "multer";
import uuid from "uuid/v4";
import morgan from "morgan";
const bodyParser = require("body-parser");
const app = express(); //ejecutamos express pq es una funcion

//configurar el motor de plantillas
app.set("views", path.join(__dirname, "views")); //decirle en donde esta la carpeta views(carpet,rutaabsuluta)
app.engine(
  ".hbs",
  engine({
    layoutDir: path.join(app.get("views"), "layouts"), //
    defaultLayout: "main",
    extname: ".hbs",
  })
); //le decimos exphbs que va servidr archivos .hbs
app.set("view engine", ".hbs"); //le decimos que utilice la conf del motor de plantillas
//midelwares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //creo que es para la lista
app.use(express.json()); //habilitar analisis jsno
app.use(express.urlencoded({ extended: false }));
//multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});


app.use(multer({ storage: storage }).single("imagenMoto"));


//routes
app.use(indexRoutes); //le decimos que va a utilizar el modulo de las rutas

//static files
app.use(express.static(path.join(__dirname, "public")));

export default app; //exportamos por default la app para utilizarlo en otras secciones
