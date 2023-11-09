import { Schema, model } from "mongoose";

const ciaSchema = new Schema({
  caracteristica: {
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

module.exports = model("Cia", ciaSchema);
