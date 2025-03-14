require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const {connectDB} = require("./handlers/dbhandler.js");

const reindeerRoutes = require("./routes/reindeerRoutes");
const indexRoutes = require("./routes/indexRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const flockRoutes = require("./routes/flockRoutes");
const areaRoutes = require("./routes/areaRoutes");
const authRoutes = require("./routes/authRoutes");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// using the individual routers
app.use("/", indexRoutes);
app.use("/owners", ownerRoutes);
app.use("/reindeer", reindeerRoutes);
app.use("/flock", flockRoutes);
app.use("/map", areaRoutes);
app.use("/auth", authRoutes);

// Start the server on port 3500
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  connectDB()
  console.log('hi, this worked! :)')
});
