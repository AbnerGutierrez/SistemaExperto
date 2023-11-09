import { Router } from "express";
const router = Router();
import Moto from "../models/Moto";
import Cia from "../models/Cia";
import Relacion from "../models/Relacion";
import { unlink } from "fs-extra"; //no se porque se marca así
import {
  about,
  aboutAutores,
  entrar,
  index,
  insertarMoto,
  MotosInsert,
  bd,
  compare,
  eliminarD,
  frmAddMoto,
  frmEditMoto,
  login,
  preInsertar,
  primeraMoto,
  ultimaMoto,
  editarMoto,
  editarMotoGet,
  editMotoPost,
  cuadroMorfo,
  eliminarDC,
  editarciaGet,
  editciaPost,
  InsertarCia,
  primeraCia,
  ultimaCia,
  bdc,
  cuadro,
  guardarRelacion,
  userAtras,
  user,
} from "../controller/controller";
import path from "path";

/*---------------RUTAS NORMALES---------------*/
router.get("/", index); //rute que pide el index
router.get("/about", about); //rute que pide el about
router.get("/about/autores", aboutAutores); //rute pedir autores
router.get("/entrar", entrar); //rute que pide el entrar

/*---------------RUTAS PAR EL FORMULARIO DEL SISTEMA EXPERTO---------------*/

router.get("/entrar/login", login); //rute que pide el formulario de entrar-login
router.get("/preInsertar", preInsertar); //rute nos lleva a la pestaña despues de logearse
router.post("/entrar/login/pos", compare); //rute que resive los datos del fomulario de entrar-login
router.get("/entrar/login/get", MotosInsert); //rute obtener la pantalla de insert-motos
router.get("/entrar/login/motosp/insertar", frmAddMoto); //rute mandar al form insertar motos
router.post("/entrar/login/motosp/insertar", insertarMoto); //rute post de formulario para agregar una moto
router.get("/entrar/login/motosp/editar", frmEditMoto); //rute mandar a editar motos
router.get("/entrar/login/get/:id/editar", editarMotoGet);
/*EDITAR MOTO*/
router.post("/entrar/login/get/:id/editar", editMotoPost); //Editar una moto
router.get("/entrar/login/get/:id/delete", eliminarD); //eliminar una moto
/*---------------BUSCAR PRIMERA Y BUSCAR ULTIMA ---------------*/
router.get("/entrar/login/get/primera", primeraMoto); //Buscar y mostrar primera moto
router.get("/entrar/login/get/ultima", ultimaMoto); //Buscar y mostrar ultima moto
/*---------------CONSULTAR LA BASE DE DATOS ---------------*/
router.get("/entrar/login/motosp/mostrarbd", bd); //rute mandar a mostrar los datos de la bd

/*--------------- P A R T E  D E  L A S   C A R A C T E R I S T I C A S ---------------*/
router.get("/preInsertar/caracteristicas", async (req, res) => {
  const todasLasCias = await Cia.find().lean();
  res.render("caracteristicasGet", { todasLasCias });
}); //Esta es la principal de caracteristicas
/*AGREGAR UNA CARACTERISTICA*/
router.get("/entrar/login/get/:id/editar/cia", editarciaGet); //ObtenerFormulario para editar cia
router.post("/entrar/login/get/:id/editar/cia", editciaPost); //ObtenerFormulario para editar cia
router.get("/entrar/login/motosp/insertar/cia", (req, res) => {
  res.render("frmAddCia");
}); //Esta es para obtener el formulario de agregar Cia.
/*---- PRIMERA Y ULTIMA CARACTAERISTIA-----*/
router.get("/entrar/login/get/primera/cia", primeraCia); //Buscar y mostrar primera moto
router.get("/entrar/login/get/ultima/cia", ultimaCia); //Buscar y mostrar ultima moto
/* FIN DE LA ULTIMA Y PRIMERA CARACTERISTICA */
router.post("/entrar/login/motosp/insertar/cia", InsertarCia); //esto es para insertar la cia
router.get("/preInsertar/cia/:id/delete", eliminarDC);
router.get("/entrar/login/motosp/mostrarbd/cias", bdc); //rute mandar a mostrar los datos de la bd
/* CUADRO MORFOLOFIFSLKFJDOISLKCO */
router.get("/cuadro", cuadroMorfo); //Pagina mostrar el cuadro morfoligico
router.post("/cuadro-form", cuadro);
/*---- PRUEBA DE LA RELACION DE LAS MOTOS Y CARACTERISTICAS */
router.post("/guardar-elemento", guardarRelacion);
/*---- FIN PRUEBA DE LA RELACION DE LAS MOTOS Y CARACTERISTICAS */

/**************COMIENZO DE LO DE LA PANTALLA DE USUARIO ******************** */
router.get("/user", user);

router.get("/user/atras", userAtras);

/**************FIN DE LO DE LA PANTALLA DE USUARIO ******************** */

router.get("/consultaRelaciondb",async(req,res)=>{
    const motos_cias = await Relacion.find({}).populate("moto cia");
    const motos_cias_tr = motos_cias.map((mct)=>({
      moto:mct.moto.modelo,
      cia:mct.cia.caracteristica,
      peso:mct.peso,
    }));
  const allMotos = await Moto.find({}).lean();
  const allCias = await Cia.find({}).lean();
  res.render("consultRelacion",{allCias,allMotos,motos_cias_tr});
  console.log(motos_cias_tr);
})
export default router;
