const asyncHandler = require("express-async-handler");
const Casa = require("../models/casaModel");

const getCasa = asyncHandler(async (req, res) => {
  const casas = await Casa.find().populate("user", "username");
  res.status(200).json({ casas });
});

const createCasa = asyncHandler(async (req, res) => {
  const { nombre, precio, ubicacion, descripcion } = req.body;

  if (!nombre || !precio || !ubicacion || !descripcion) {
    res.status(400);
    throw new Error("Todos los campos son obligatorios");
  }

  const casa = await Casa.create({
    nombre,
    precio,
    ubicacion,
    descripcion,
    user: req.user.id,
  });
  res.status(201).json({ casa });
});

const deleteCasa = asyncHandler(async (req, res) => {
  const casa = await Casa.findById(req.params.id);

  if (!casa) {
    res.status(404);
    throw new Error("Casa no encontrada");
  }

  if (casa.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("No tienes permiso para eliminar esta casa");
  }

  await casa.deleteOne();

  res.status(200).json({ id: req.params.id });
});

const updateCasa = asyncHandler(async (req, res) => {
  const casa = await Casa.findById(req.params.id);

  if (!casa) {
    res.status(404);
    throw new Error("Casa no encontrada");
  }

  if (casa.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("No tienes permiso para modificar esta casa");
  }

  const casaActualizada = await Casa.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(casaActualizada);
});

const getMisCasas = asyncHandler(async (req, res) => {
  const casas = await Casa.find({ user: req.user.id }).populate(
    "user",
    "username"
  );
  res.status(200).json({ casas });
});

module.exports = {
  createCasa,
  deleteCasa,
  updateCasa,
  getCasa,
  getMisCasas,
};
