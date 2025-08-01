import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../Controller/NoteController.js";

const noteRouter = Router();

noteRouter.post("/create-note", createNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);
noteRouter.get("/user/:id", getAllNotes);
noteRouter.get("/user/:userId/note/:noteId", getNoteById);



export default noteRouter