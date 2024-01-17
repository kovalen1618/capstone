import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // The regex says that only Letters (upper or lower), Numbers, and Spaces are allowed
    validate: /^[A-Za-z0-9 ]*$/
  },
  type: {
    type: String,
    required: true,
    enum: ["Exercise", "Other", "Sleep", "Study", "Work"]
  },
  exercise: {
    type: String
  },
  time: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  color: {
    type: String
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
