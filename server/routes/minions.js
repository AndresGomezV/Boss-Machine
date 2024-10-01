const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

// app.use("/api/minions", minionsRouter); segun GPT esta no va aca*********

//GET /api/minions to get an array of all minions.
minionsRouter.get("/", (req, res, next) => {
  const allMinions = getAllFromDatabase("minions");
  if (!allMinions) {
    return res.status(404).send("No minions found");
  } 
    res.status(200).send(allMinions);
  
});

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res, next) => {
  const { name, title, salary } = req.body;
  if (!name || !title || !salary || isNaN(Number(salary))) {
    return res.status(400).send("Incomplete data for Minion");
  }
  const minion = { name, title, salary };
  const minionToAdd = addToDatabase("minions", minion);
  res.status(201).send(minionToAdd);
});

//GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const minion = getFromDatabaseById("minions", minionId);
  if (!minion) {
    return res.status(404).send("Minion not found");
  }
  res.status(200).send(minion);
});

//PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put("/:minionId", (req, res, next) => {
const { name, title, salary } = req.body;
if (!name || !title || !salary || isNaN(Number(salary))) {
    return res.status(400).send("Incomplete data for Minion");
}
const minionId = req.params.minionId;
const minion = { id: minionId, name, title, salary };
const minionToUpdate = updateInstanceInDatabase('minions', minion);
if (!minionToUpdate) {
    return res.status(404).send('Minion not found');
}
 res.status(200).send(minionToUpdate)
});

//DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const minionToDelete = deleteFromDatabasebyId("minions", minionId);
  if (!minionToDelete) {
    return res.status(404).send("Minion not found");
  } 
    res.status(204).send();

});

module.exports = minionsRouter;
