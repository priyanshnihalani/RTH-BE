const User = require("../models/User");
const Registration = require("../models/Registration");
const Batch = require("../models/Batch");
const BatchTrainer = require("../models/BatchTrainer");
const BatchTrainee = require("../models/BatchTrainee");
const Task = require("../models/Task");
const TrainerNote = require("../models/Note");

/* ===============================
   User ↔ Registration (1:1)
================================ */
User.hasOne(Registration, {
  foreignKey: "user_id",
  as: "registration"
});
Registration.belongsTo(User, {
  foreignKey: "user_id",
  as: "User"
});

/* ===============================
   Batch ↔ Trainer (Many-to-Many)
================================ */
Batch.belongsToMany(User, {
  through: BatchTrainer,
  as: "Trainers",
  foreignKey: "batch_id",
  otherKey: "trainer_id"
});

User.belongsToMany(Batch, {
  through: BatchTrainer,
  as: "TrainerBatches",
  foreignKey: "trainer_id",
  otherKey: "batch_id"
});

/* ===============================
   Batch ↔ Trainee (Many-to-Many)
================================ */
Batch.belongsToMany(User, {
  through: BatchTrainee,
  as: "Trainees",
  foreignKey: "batch_id",
  otherKey: "trainee_id"
});

User.belongsToMany(Batch, {
  through: BatchTrainee,
  as: "TraineeBatches",
  foreignKey: "trainee_id",
  otherKey: "batch_id"
});

/* ===============================
   Batch ↔ Task (1:N)
================================ */
Batch.hasMany(Task, {
  foreignKey: "batch_id",
  as: "Tasks"
});
Task.belongsTo(Batch, {
  foreignKey: "batch_id",
  as: "Batch"
});

/* ===============================
   Trainer ↔ Task (Assigned By)
================================ */
User.hasMany(Task, {
  foreignKey: "assigned_by",
  as: "AssignedTasks"
});
Task.belongsTo(User, {
  foreignKey: "assigned_by",
  as: "Trainer"
});

/* ===============================
   Trainee ↔ Task (Assigned To)
================================ */
User.hasMany(Task, {
  foreignKey: "traineeId",  
  as: "MyTasks"
});

Task.belongsTo(User, {
  foreignKey: "traineeId",   
  as: "Trainee"
});


/* ===============================
   Trainer ↔ Trainer Notes (1:N)
================================ */
User.hasMany(TrainerNote, {
  foreignKey: "trainer_id",
  as: "TrainerNotes"
});
TrainerNote.belongsTo(User, {
  foreignKey: "trainer_id",
  as: "Trainer"
});

module.exports = {
  User,
  Registration,
  Batch,
  BatchTrainer,
  BatchTrainee,
  Task,
  TrainerNote
};
