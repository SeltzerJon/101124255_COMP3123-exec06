const express = require("express")
const NoteModel = require("../models/Notes")
const routes = express.Router()

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post("/notes", async(req, res) => {
    try {
        const newNote = new NoteModel(req.body)
        await newNote.save()
        res.status(201).send(newNote)
    } catch (error) {
        res.status(500).send({message: "Error while inserting new note"})
    }

})

// Find notes
//http://mongoosejs.com/docs/api.html#find_find
routes.get('/notes', async (req, res) => {
    try {
        const notes = await NoteModel.find(); // Find all notes in the database
        res.status(200).json(notes); // Use .json() to send the found notes as a JSON response
    } catch (error) {
        res.status(500).send({ message: "Error while fetching notes" });
    }
});



//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get('/note/:noteId', async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found"
            });
        }

        res.status(200).send(note);
    } catch (err) {
        res.status(500).send(err);
    }
});


//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.patch("/note/:noteid", async (req, res) => {
    try {
        console.log(req.body)
        const updatedNote = await NoteModel.findByIdAndUpdate(req.params.noteid, req.body)
        const nb = await updatedNote.save()
        res.status(202).send(nb)
      } catch (err) {
        res.status(500).send(err)
      }
})


//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete("/note/:noteid", async (req, res) => {
    //res.send({message: "Delete Book By ID"})
    try {
        const note = await NoteModel.findOneAndDelete(req.params.id)
    
        if (!note) { 
            res.status(200).send("No Note found")
        }else{
            res.status(200).send(note)
        }
    }catch (err) {
        res.status(500).send(err)
    }
})

module.exports = routes