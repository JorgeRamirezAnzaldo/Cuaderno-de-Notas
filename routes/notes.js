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

module.exports = notes;