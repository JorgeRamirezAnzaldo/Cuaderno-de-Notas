//Import express and create router
const notes = require("express").Router();
//Import fs module
const fs = require("fs");
//Import util module
const util = require("util");
//Import uuid package
const {v4: uuidv4} = require("uuid");

//Read File with promise
const FileRead = util.promisify(fs.readFile);

//Function to read the data from the JSON file, add a note to the data
//and then write the complete data to the JSON file
const FileReadAdd = (text, file) => {
    //Read the data from the JSON file
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const array = JSON.parse(data); //Parse the string data and place it into an array
        array.push(text); //Add the new note to the data array
        const str = JSON.stringify(array, null, 4); //Convert the complete array with the new note to a string
        //Write the complete data with the new note to the JSON file
        fs.writeFile(file, str, (err) => 
         err ? console.error(err) : console.info(`\nData written to ${file}`));
      }
    });
  };

//Function to read the data from the JSON file, identify a note, delete it from the data
//and then write the complete data to the JSON file
const FileReadDelete = (id, file) => {
  //Read the data from the JSON file
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const array2 = JSON.parse(data); //Parse the string data and place it into an array
      const arraux = array2; //Move the data array to an auxiliary array
      //Loop over the data array to identify the note to delete
      for (var i = 0; i < array2.length; i++){
        if (arraux[i].id == id){ //If the array element id matches the id to be deleted
          arraux.splice(i, 1); //Remove the array element from the auxiliary data array
        }
      }
      const newstr = JSON.stringify(arraux, null, 4); //Convert the complete array with the new note to a string
      //Write the complete data without the deleted note to the JSON file
      fs.writeFile(file, newstr, (err) =>
       err ? console.error(err) : console.info(`\nData written to ${file}`));
    }
  });
};

//GET route to read the db.json file and return all the saved notes as JSON
notes.get("/", (req, res) => {
  FileRead("./db/db.json").then((data) => res.json(JSON.parse(data))); //Read the file and return the data
});

//POST route to read the db.json file, add a note to the data and write the new complete data to the JSON file
notes.post('/', (req, res) => {
  const { title, text } = req.body; //Desconstruct the request body to get the title and text of the note
    
  if (req.body) { //If a body was sent for the request
    const newNote = { //Create new note using title, text and random identifier
      title,
      text,
      id: uuidv4(), //Create random identifier using uuid npm package
    };
    FileReadAdd(newNote, './db/db.json'); //Call function to add new note to the JSON file
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

//Delete route to read the db.json file, remove a note with specfic id from the data and
//write the new complete data to the JSON file
notes.delete('/:id', (req, res) => {
  //If there is an id in the request parameters
  if (req.params.id) {
    const idDelete = req.params.id; //Save the id to be deleted 
    FileReadDelete(idDelete, './db/db.json'); //Call function to delete note with idDelete and write again the JSON file
    res.json(`Note deleted successfully`);
  } else {
    res.error('Error in deleting note');
  }
});

//Export notes
module.exports = notes;