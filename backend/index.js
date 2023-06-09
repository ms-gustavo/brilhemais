const express = require("express");
const cors = require("cors");

const app = express();

//Config JSON Response
app.use(express.json());

// Solve CORS - Evita erros ao acessar API do mesmo dominio - localhost
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folders for images
app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/UserRoutes");
app.use("/user", UserRoutes);

const CategoriesRoutes = require("./routes/CategoriesRoutes");
app.use("/categories", CategoriesRoutes);

const CarrousselRoutes = require("./routes/CarrousselRoutes");
app.use("/carroussel", CarrousselRoutes);

const AccessoryRoutes = require("./routes/AccessoryRoutes");
app.use("/accessory", AccessoryRoutes);
//Ports
app.listen(4000);
