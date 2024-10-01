const express = require("express");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });

// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res, next) => {
  const allIdeas = getAllFromDatabase("ideas");
  if (!allIdeas) {
    return res.status(404).send("No ideas found");
  }
  res.status(200).send(allIdeas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
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
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedInstance);
  });

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaToDelete = deleteFromDatabasebyId("ideas", ideaId);
  if (!ideaToDelete) {
    return res.status(404).send("No idea found");
  }
  res.status(204).send();
});

module.exports = ideasRouter;
