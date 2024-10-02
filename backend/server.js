// External requires

require("dotenv").config();
const path = require("path");
const express = require("express");
let livereload = undefined;
let connectLivereload = undefined;
if (process.env.ON_HEROKU === "false") {
    console.log("processing dev-only require() statements...");
    livereload = require("livereload");
    connectLivereload = require("connect-livereload");
}

// Internal requires

const testController = require("./controllers/test");
const models = require("./models/index");
    const testModel = models.testModel;

// Usual express.js setup

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')));

let livereloadServer = undefined;
if (process.env.ON_HEROKU === "false") {
    console.log("Processing dev-only liveload and connect-livereload configuration.");
    livereloadServer = livereload.createServer();
    livereloadServer.server.once("connection", () => {
        setTimeout(() => {
            livereloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLivereload());
}

// Mount controllers

app.use('/api/test', testController);

// Non-REST routes

app.get("/api", (req, res) => {
    res.send("This message was emitted by the backend.");
});

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});

// Start server

app.listen(process.env.PORT, () => {
    console.log(`Express is listening on port ${process.env.PORT}.`);
});