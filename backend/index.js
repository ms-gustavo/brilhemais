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
const AdminRoutes = require("./routes/AdminRoutes");
app.use("/admin", AdminRoutes);

const CategoriesRoutes = require("./routes/CategoriesRoutes");
app.use("/categories", CategoriesRoutes);

const AccessoryRoutes = require("./routes/AccessoryRoutes")
app.use("/accessory", AccessoryRoutes)
//Ports
app.listen(4000);
