const dotenv = require("dotenv").config();
express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// sequelize models
const {models} = require("./models");
const eraseDatabaseOnSync = false;
models.sequelize.sync({force: eraseDatabaseOnSync}).then(() => {
console.log(`has migrated postgres data`);
hasFinishedPostgresMigrations = true;
});
try {
    app.set("models", models);
} catch (error) {
    console.error("Error while abstracting models", {
        "error.message": error
    });
}

// loading routes
const routes = require("./routes/routes");

app.use(express.static(path.join(__dirname,"frontend")));

// Initializing routes
app.use('/api', routes);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend", "index.html"));
});

http.listen(process.env.APPLICATION_PORT || 5000, () => { 
    console.debug(`Todo backend server listening on port : ${
        process.env.APPLICATION_PORT
    }`);
});
