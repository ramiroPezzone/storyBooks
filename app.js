const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectDB = require("./config/db");
const morgan = require("morgan");
const routes = require("./routes/index");
const authRoutes = require("./routes/auth");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

connectDB();

// Passport config
require("./config/passport")(passport);

// Morgan config
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Server
app.listen(port, () => {
  console.log(
    `Servidor en línea en modo ${process.env.NODE_ENV} en el puerto ${port}`
  );
});

// Motor de vistas
app.set("view engine", "ejs");

// Session config
app.use(
  session({
    secret: "El gato volador",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Carpeta pública
app.use(express.static(path.join(__dirname, "public")));

// Seteando JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);
app.use("/auth", authRoutes);
