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
    enum: ["exercise", "work", "sleep", "study"]
  },
  time: {
    type: Number,
    required: true
  },
  color: {
    type: String
  },
  notes: {
    type: String
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
