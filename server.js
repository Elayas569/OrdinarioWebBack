const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const conectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { notFound } = require("./middleware/notFoundMiddleware");
const cors = require("cors"); // Importar CORS

conectDB();

const app = express();

const corsOptions = {
  origin:
    "https://ordinario-web-front-qqevua2ov-elayas-projects-d13d6d3e.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.use("/api/casas", require("./routes/casaRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
