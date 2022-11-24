//Import express
const express = require("express");
//Import routes in notes.js
const notesRouter = require("./notes");
//Initialize app variable
const app = express();
//Make the app use the routes in notesRouter
app.use("/notes", notesRouter);
//Export app
module.exports = app;