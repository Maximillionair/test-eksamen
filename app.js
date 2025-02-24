require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const {connectDB} = require('../handlers/dbHandler');

app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded data
app.use(routes);
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));


// Start the server on port 3500
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  connectDB()
  console.log('hi, this worked! :)')
});
