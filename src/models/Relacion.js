import mongoose, { Schema, model } from "mongoose";
const relacionSchema = new Schema({
  moto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Moto",//Referencia al id de la moto
  },
  cia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cia", //Referencia al id de la caracteristica
  },
  peso:Number
});
module.exports = model("Relacion", relacionSchema);
