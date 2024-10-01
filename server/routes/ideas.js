const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res, next) => {
  const allIdeas = getAllFromDatabase("ideas");
  if (!allIdeas) {
    return res.status(404).send("No ideas found");
  }
  res.status(200).send(allIdeas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post("/", (req, res, next) => {
  const { name, description, numWeeks, weeklyRevenue } = req.body;
  if (
    (!name ||
      !description ||
      !numWeeks ||
      isNaN(Number(numWeeks)) ||
      !weeklyRevenue ||
    isNaN(Number(weeklyRevenue)))
  ) {
    return res.status(400).send("Incomplete data for the idea");
  }
  const idea = { name, description, numWeeks, weeklyRevenue };
  const ideaToAdd = addToDatabase("ideas", idea);
  res.status(201).send(ideaToAdd);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const idea = getFromDatabaseById("ideas", ideaId);
  if (!idea) {
    return res.status(404).send("No idea found");
  }
  res.status(200).send(idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put("/:ideaId", (req, res, next) => {
  const { name, description, numWeeks, weeklyRevenue } = req.body;
  if (
    (!name ||
      !description ||
      !numWeeks ||
      isNaN(Number(numWeeks)) ||
      !weeklyRevenue,
    isNaN(Number(weeklyRevenue)))
  ) {
    return res.status(400).send("Incomplete data for the idea");
  }
  const ideaId = req.params.ideaId;
  const idea = { id: ideaId, name, description, numWeeks, weeklyRevenue }
  const ideaToUpdate = updateInstanceInDatabase("ideas", idea);
  if (!ideaToUpdate) {
    return res.status(404).send("No idea found");
  }
  res.status(200).send(ideaToUpdate);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const ideaToDelete = deleteFromDatabasebyId('ideas', ideaId);
    if (!ideaToDelete) {
        return res.status(404).send('No idea found');
    }
    res.status(204).send();
});

module.exports = ideasRouter;
