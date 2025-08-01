import DB from "../db/db.mjs";

//create task
export const createTask = async (req, res) => {
  try {
    const { title, details, priority, status, due_date, userId } = req.body;

    if (!title || !details || !priority || !status || !due_date || !userId) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    // Check if user exists
    const user = await DB.User.findUnique({
      where: { User_Id: userId },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create the task
    const task = await DB.Task.create({
      data: {
        Title: title,
        Details: details,
        Priority: priority,
        Status: status,
        Due_Date: new Date(due_date),
        User_Id: userId,
      },
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

//update task
export const updateTask = async (req, res)=>{
    
}