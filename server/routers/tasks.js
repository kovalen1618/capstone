import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

// GET
router.get("/", async (request, response) => {
  try {
    const query = request.query;
    const data = await Task.find(query);

    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

router.get("/:id", async (request, response) => {
  try {
    const data = await Task.findById(request.params.id);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// POST
router.post("/", async (request, response) => {
  try {
    const newTask = new Task(request.body);
    const data = await newTask.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// DELETE
router.delete("/:id", async (request, response) => {
  try {
    const data = await Task.findByIdAndRemove(request.params.id, {});

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// PUT
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;

    const data = await Task.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          title: body.title,
          type: body.type,
          time: body.time,
          color: body.color,
          notes: body.notes
        }
      },
      {
        new: true
      }
    );

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
