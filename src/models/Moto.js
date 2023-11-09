import { Schema, model } from "mongoose";
const motoSchema = new Schema({
  modelo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  filname: {
    type: String,
  },
  path: {
    type: String,
  },
  originalname: {
     type: String 
    },
  mimetype: {
     type: String
     },
});
module.exports = model("Moto", motoSchema);
