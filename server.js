const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", api);
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    console.log("Notas");
    res.sendFile(path.join(__dirname, "/public/notes.html"));
}
);

app.get("*", (req, res) =>{
    console.log("Principal");
    res.sendFile(path.join(__dirname, "/public/index.html"));
}
    
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);