const mongoose = require("mongoose");

const casaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Necesita un nombre"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "Necesita un precio"],
      min: [0, "Tiene que ser un valor positivo"],
    },
    ubicacion: {
      type: String,
      required: [true, "Necesita una ubicacion"],
    },
    descripcion: {
      type: String,
      required: [true, "Necesita una descripcion"],
    },
    estatus: {
      type: String,
      enum: ["disponible", "vendido", "reservado"],
      default: "disponible",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Casa", casaSchema);
