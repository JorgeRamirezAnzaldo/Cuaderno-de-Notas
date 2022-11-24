const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
const {v4: uuidv4} = require("uuid");

const FileRead = util.promisify(fs.readFile);
const FileReadAdd = (text, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const array = JSON.parse(data);
        array.push(text);
        const str = JSON.stringify(array, null, 4);
        fs.writeFile(file, str, (err) =>
         err ? console.error(err) : console.info(`\nData written to ${file}`));
      }
    });
  };

const FileReadDelete = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const array2 = JSON.parse(data);
      const arraux = array2;
      for (var i = 0; i < array2.length; i++){
        if (arraux[i].id == id){
          arraux.splice(i, 1);
        }
      }
      const newstr = JSON.stringify(arraux, null, 4);
      fs.writeFile(file, newstr, (err) =>
       err ? console.error(err) : console.info(`\nData written to ${file}`));
    }
  });
};

notes.get("/", (req, res) => {
    FileRead("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
      console.log(newNote);
      FileReadAdd(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

  notes.delete('/:id', (req, res) => {
    console.log(req.params.id);
    if (req.params.id) {
      const idDelete = req.params.id;
      console.log(idDelete);
      FileReadDelete(idDelete, './db/db.json');
      res.json(`Note deleted successfully`);
    } else {
      res.error('Error in deleting note');
    }
  });




module.exports = notes;