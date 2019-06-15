const express = require("express"),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser"),
    passport = require('passport'),
    multer = require("multer");

const admin = require("./routes/api/admin");
const users = require("./routes/api/users");
const patientProfile = require("./routes/api/patient-profile");
const resource = require("./routes/api/resource");
const therapeuticNote = require("./routes/api/therapeuticNote");

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

// Static folder with uploaded assets
app.use("/uploads", express.static(__dirname + '/uploads'));

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/patient-profile", patientProfile);
app.use("/api/resource", resource);
app.use("/api/therapeuticNote", therapeuticNote);

app.get("/", (req, res) => {
  res.send("Welcome to plasticine");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));