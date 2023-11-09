import Moto from "../models/Moto";
import Cia from "../models/Cia";
import { unlink } from "fs-extra";
import Relacion from "../models/Relacion";
import path from "path";
/*---------------RUTAS NORMALES---------------*/
export const index = (req, res) => {
  res.render("index");
}; //controller que pide el index
export const about = (req, res) => {
  res.render("about");
}; //controller que pide el about
export const aboutAutores = (req, res) => {
  res.render("autores");
}; //controller pedir autores
export const entrar = (req, res) => {
  res.render("entrar");
}; //controller que pide el entrar
/*---------------RUTAS PAR EL FORMULARIO DEL SISTEMA EXPERTO---------------*/
export const login = (req, res) => {
  res.render("formulario-login");
}; //controller que pide el formulario de entrar-login
export const preInsertar = (req, res) => {
  res.render("preInsertar");
}; //controller nos lleva a la pestaña despues de logearse
export const compare = (req, res) => {
  const password = req.body; //comparando la contraseña
  const passwordI = password.password;
  if (passwordI == "abner") {
    res.redirect("/preInsertar");
  } else {
    res.redirect("/entrar");
  }
}; //controller que resive los datos del fomulario de entrar-login
export const MotosInsert = async (req, res) => {
  const todasLasMotos = await Moto.find().lean();

  res.render("insert-motos", { todasLasMotos });
}; //controller obtener la pantalla de insert-motos
export const frmAddMoto = (req, res) => {
  res.render("formularioaddmoto");
}; //controller mandar al form insertar motos
export const insertarMoto = async (req, res) => {
  const moto = new Moto();
  //obtener todo lo demas
  moto.modelo = req.body.modelo;
  moto.descripcion = req.body.descripcionMoto;
  moto.filename = req.file.filename;
  moto.path = "img/uploads/" + req.file.filename;
  moto.originalname = req.file.originalname;
  moto.mimetype = req.file.mimetype;
  await moto.save();
  res.redirect("/entrar/login/get");
}; //controller post de formulario para agregar una moto
export const frmEditMoto = (req, res) => {
  res.render("formularioedit-motos");
}; //controller mandar a editar motos
/*-----EDITAR MOTO-----*/
export const editarMotoGet = async (req, res) => {
  const { id } = req.params;
  const moto = await Moto.findById(req.params.id).lean();
  res.render("formularioedit-motos", { moto, id });
}; //Editar una moto GET
export const editMotoPost = async (req, res) => {
  const { id } = req.params;
  await Moto.findByIdAndUpdate(id, req.body);
  res.redirect("/entrar/login/get");
}; //Editar una moto POST
export const InsertarCia = async (req, res) => {
  const cia = new Cia();
  //obtener datos de las caracteristicas.
  cia.caracteristica = req.body.caracteristica;
  cia.descripcion = req.body.descripcion;
  cia.filename = req.file.filename;
  cia.path = "img/uploads/" + req.file.filename;
  cia.originalname = req.file.originalname;
  cia.mimetype = req.file.mimetype;
  await cia.save();
  res.redirect("/preInsertar/caracteristicas");
};
export const editarciaGet = async (req, res) => {
  const { id } = req.params;
  const cia = await Cia.findById(req.params.id).lean();
  res.render("formularioedit-cias", { cia, id });
}; //Editar una moto GET
export const editciaPost = async (req, res) => {
  const { id } = req.params;
  await Cia.findByIdAndUpdate(id, req.body);
  res.redirect("/preInsertar/caracteristicas");
}; //Editar una moto POST
/*  PRIMER Y ULTIMACARACTERISTICA*/

export const primeraCia = async (req, res) => {
  const primerCia = await Cia.findOne({});

  if (primerCia) {
    res.render("primera-cia", primerCia); // Envía el primer documento como JSON en la respuesta
  }
}; //Primera MOTO
export const ultimaCia = async (req, res) => {
  const ultimaCia = await Cia.findOne({}).sort({ _id: -1 });

  res.render("ultima-cia", ultimaCia);
}; //LTULTIMA MOTO

/* FIN DE PRIMERA Y ULTIMA CARACTERISTICAS */
export const eliminarD = async (req, res) => {
  const { id } = req.params;
  const moto = await Moto.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public/" + moto.path));
  res.redirect("/entrar/login/get");
}; //eliminar una moto
export const eliminarDC = async (req, res) => {
  const { id } = req.params;
  const cias = await Cia.findByIdAndDelete(id);
  await unlink(path.resolve("./src/public/" + cias.path));
  res.redirect("/preInsertar/caracteristicas");
};
export const primeraMoto = async (req, res) => {
  const primerMoto = await Moto.findOne({});

  if (primerMoto) {
    res.render("primera", primerMoto); // Envía el primer documento como JSON en la respuesta
  }
}; //Primera MOTO
export const ultimaMoto = async (req, res) => {
  const ultimaMoto = await Moto.findOne({}).sort({ _id: -1 });

  res.render("ultima", ultimaMoto);
}; //LTULTIMA MOTO
export const bd = async (req, res) => {
  const allMotos = await Moto.find({}).lean();
  res.render("mostrarbd", { allMotos });
}; //CONSULTA A LA BASE DE DATOS
export const bdc = async (req, res) => {
  const allCias = await Cia.find({}).lean();
  res.render("mostrarbdC", { allCias });
}; //CONSULTA A LA BASE DE DATOS
/* ------------------------- CUADRO MORFOLOFICO ---------------------------  */
export const cuadroMorfo = async (req, res) => {
  const allMotos = await Moto.find({}).lean();
  const allCias = await Cia.find({}).lean();
  res.render("cuadro-morfo", { allMotos, allCias });
};
//obtener cuadro
export const cuadro =  (req, res) => {
  res.send("Guardado");
  console.log(req.body);
}
//insertar en la nueva coleccion relacionada
export const guardarRelacion =  async (req, res) => {
  // Se obtienen los valores del formulario
  const moto = req.body.moto;
  const caracteristicas = req.body.caracteristicas;
  const pesos = req.body.pesos;

  // Elimina todo excepto los números y comas
  const valoresNumericos = pesos.replace(/[^0-9,]/g, "");
  // Obtener los valores de peso en enteros
  const pesosArray = valoresNumericos.split(",").map((item) => parseInt(item.trim(), 10));
  // Dividir la cadena de características en elementos individuales
  const caracteristicasArray = caracteristicas.split(",").map((item) => item.trim());
  // Limpiar los elementos para poder hacer la consulta
  const caracteristicasLimpio = caracteristicasArray.map((element) => {
    return element.slice(1, element.length - 2);
  });

  // Consulta de la moto seleccionada
  const bmoto = await Moto.find({ modelo: moto }).lean();

  if (bmoto.length > 0) {
    const idMoto = bmoto[0]._id; // Acceder al _id del primer resultado
    console.log(idMoto);

    for (let i = 0; i < caracteristicasArray.length; i++) {
      const busqueda = await Cia.find({ caracteristica: { $regex: caracteristicasLimpio[i] } }).exec();

      if (busqueda && busqueda.length > 0) {
        const nuevaRelacion = new Relacion({
          moto: idMoto, // El ID de la moto obtenido previamente
          cia: busqueda[0]._id, // El ID de la característica encontrada
          peso: pesosArray[i]
        });

        await nuevaRelacion.save(); // Guardar la nueva relación en la colección 'Relaciones'
        console.log("Relación guardada:", nuevaRelacion);
      } else {
        console.log("No se encontraron resultados para la característica " + caracteristicasLimpio[i]);
      }
    }
  } else {
    console.log("No se encontraron resultados para la moto " + moto);
  }

  res.redirect("/cuadro");
}
/* ------------------------- FIN DEL CUADRO MORFOLOFICO ---------------------------  */
//lo de ontener el uduaroi tras
export const userAtras = async(req,res)=>{
  const allMotos = await Moto.find({}).lean();
  const allCias = await Cia.find({}).lean();
  res.render("userAtras",{allCias,allMotos});
}

export const user =(req, res) => {
  res.render("usuario");
}