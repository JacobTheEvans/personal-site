let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let path = require("path");
let cors = require("cors");

//import config
let settings = require("./config/settings.js");

//import routes
let api =  require("./routes/api.js");
let auth = require("./routes/auth.js");

//connect to db
mongoose.connect("mongodb://localhost/" + settings.db);

//base express app
const app = express();

//setup cors
app.use(cors());

//setup JSON requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setup static files
app.use(express.static(path.resolve(__dirname, "..", "build")));

//setup routes
app.use("/auth", auth);
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || settings.port;
app.listen(PORT, () => {
  console.log(`[+] Starting server on port ${PORT}`);
});
