const notFound = (req, res, next) => {
  res.status(404);
  throw new Error(`Ruta no encontrada - ${req.originalUrl}`);
};

module.exports = { notFound };
