//Import express
const express = require("express");
//Import path
const path = require("path");
//Import the index.js with the routes
const api = require("./routes/index.js");
//Define PORT 3001
const PORT = 3001;
//Initialize app variable
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Make the app use the routes in api
app.use("/api", api);
//Allow static assets usage
app.use(express.static("public"));

//GET request to return the notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
}
);

//GET request to return the index.html file
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
}
    
);

//Make the application to listen in PORT 3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);