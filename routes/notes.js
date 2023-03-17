// import { v4 as uuidv4 } from 'uuid';
// uuidv4(); 
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid'); //imports the uuid package/module in Node.js...provides a way to generate universally unique identifiers (UUIDs).


//This code imports three functions (readFromFile, readAndAppend, and writeToFile) from a module called fsUt located in a parent directory (../helpers).
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUt');  // object destructuring syntax...code assigns the imported functions to constants with the same names

// GET Route for retrieving all typed notes....
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});  //fulfilling the readFromFile promise and sets the response content type to the JSON and sends the parsed data back to the client as the response body.

// GET Route for a specific note
{/* <this code is filtering a JSON array based on a specific condition and 
sending the result as a JSON response to the client, depending on 
 whether there are any matching items in the array.*/}
notes.get('/:title_id', (req, res) => {
  const titleId = req.params.title_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.title_id === titleId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that title');
    });
}); 
{/* this code sets up a route handler function for an HTTP DELETE request 
on the notes resource, extracts the title_id parameter from the request, 
reads the contents of a JSON file asynchronously, and parses the contents into a JavaScript object.*/}
notes.delete('/:title_id', (req, res) => {
  const titleId = req.params.title_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the title provided in the URL
      const result = json.filter((note) => note.title_id !== titleId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${titleId} has been deleted 🗑️`);
    });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title,text } = req.body;

  if (req.body) {
    const newNote = {
     title,
     text,
     title_id: uuidv4(),
     };
     {/*a custom utility function that reads
     the contents of a JSON file, appends the 
    new newNote object to the JSON array, and 
    writes the updated array back to the file. */}

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

module.exports = notes;
