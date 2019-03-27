const express = require("express"),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser"),
    passport = require('passport');

const admin = require("./routes/api/admin");
const users = require("./routes/api/users");

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use("/api/admin", admin);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Welcome to plasticine");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));