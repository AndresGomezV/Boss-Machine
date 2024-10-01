const express = require("express");
const minionsRouter = express.Router();
const workRouter = express.Router({ mergeParams: true });
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

minionsRouter.use('/:minionId/work', workRouter);

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
      req.minion = minion;
      next();
    } else {
      res.status(404).send();
    }
  });

//GET /api/minions to get an array of all minions.
minionsRouter.get("/", (req, res, next) => {
  const allMinions = getAllFromDatabase("minions");
  if (!allMinions) {
    return res.status(404).send("No minions found");
  }
  res.status(200).send(allMinions);
});

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
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
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
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

workRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work && work.minionId === req.minion.id) {
    req.work = work;
    next();
  } else {
    res.status(400).send();
  }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minion.
workRouter.get('/', (req, res, next) => {
  const allWork = getAllFromDatabase('work');
  const minionWork = allWork.filter(work => work.minionId === req.minion.id);
  res.status(200).send(minionWork);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/', (req, res, next) => {
 const newWork = addToDatabase('work', req.body);
 res.status(201).send(newWork)
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:workId', (req, res, next) => {
  const updatedWork = updateInstanceInDatabase('work', req.body)
  res.status(200).send(updatedWork)
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workRouter.delete('/:workId', (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId('work', req.work.id);
  if (!deletedWork) {
    return res.status(500).send();
  }
  res.status(204).send();
});

module.exports = minionsRouter;
