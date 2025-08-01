import DB from "../db/db.mjs";

export const createNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    const newNote = await DB.Note.create({
      data: {
        Title: title,
        Content: content,
        User_Id: userId, // assuming you are passing userId in request
      },
    });

    res.status(201).json({
      message: "Note created successfully.",
      note: {
        id: newNote.Note_Id,
        title: newNote.Title,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Server error!", error: e.message });
  }
};

export const updateNote = async (req, res) => {
  try {

    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    const updatedNote = await DB.Note.update({
      where: { Note_Id: Number(noteId) },
      data: {
        ...(title && { Title: title }),
        ...(content && { Content: content }),
      },
    });

    res.status(200).json({
      message: "Note updated successfully.",
      note: updatedNote,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error!", error: e.message });
  }
};

export const deleteNote = async(req, res)=>{
    try {
        const noteId = parseInt(req.params.id);

       await DB.Note.findFirst({
            where:{
                Note_Id:noteId
            }
        })

        res.status(200).json({ message: "Note deleted successfully." });

    } catch (e) {
        res.status(500).json({'message':"Server error " , error:e.message})
    }
    
}

export const getAllNotes = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const notes = await DB.Note.findMany({
      where: {
        User_Id: userId,
      },
      orderBy: {
        Created_At: 'desc', // newest notes first
      },
    });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getNoteById = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const noteId = parseInt(req.params.noteId);

  if (!noteId || !userId) {
    return res.status(400).json({ message: "Note ID and User ID are required" });
  }

  try {
    const note = await DB.Note.findFirst({
      where: {
        Note_Id: noteId,
        User_Id: userId, // ensures user is the owner of the note
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note fetched successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
