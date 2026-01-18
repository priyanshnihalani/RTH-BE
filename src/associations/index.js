const User = require("../models/User");
const Registration = require("../models/Registration");
const Batch = require("../models/Batch");
const BatchTrainer = require("../models/BatchTrainer");
const BatchTrainee = require("../models/BatchTrainee");
const Task = require("../models/Task");
const TrainerNote = require("../models/Note");
const TaskMessage = require("../models/TaskMessage")
const PaymentLog = require("../models/PaymentLog")

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
  otherKey: "trainer_id",
  targetKey: "user_id",
  constraints: false
});

User.belongsToMany(Batch, {
  through: BatchTrainer,
  as: "TrainerBatches",
  foreignKey: "trainer_id",
  otherKey: "batch_id",
  sourceKey: "user_id",
  constraints: false
});


/* ===============================
   Batch ↔ Trainee (Many-to-Many)
================================ */
Batch.belongsToMany(User, {
  through: BatchTrainee,
  as: "Trainees",
  foreignKey: "batch_id",
  otherKey: "trainee_id",
  targetKey: "user_id",
  constraints: false
});

User.belongsToMany(Batch, {
  through: BatchTrainee,
  as: "TraineeBatches",
  foreignKey: "trainee_id",
  otherKey: "batch_id",
  sourceKey: "user_id",
  constraints: false
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
  foreignKey: "trainer_id",
  as: "AssignedTasks"
});
Task.belongsTo(User, {
  foreignKey: "trainer_id",
  as: "Trainer"
});

/* ===============================
   Trainee ↔ Task (Assigned To)
================================ */
User.hasMany(Task, {
  foreignKey: "trainee_id",
  as: "MyTasks"
});

Task.belongsTo(User, {
  foreignKey: "trainee_id",
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


Task.hasMany(TaskMessage, {
  foreignKey: "taskId"
});

TaskMessage.belongsTo(Task, {
  foreignKey: "taskId"
});

/* ===============================
   BatchTrainee ↔ PaymentLog (1:N)
================================ */

BatchTrainee.hasMany(PaymentLog, {
  foreignKey: "batch_trainee_id",
  as: "PaymentLogs"
});

PaymentLog.belongsTo(BatchTrainee, {
  foreignKey: "batch_trainee_id",
  as: "BatchTrainee"
});

/* ===============================
   BatchTrainee ↔ User (Direct)
================================ */
BatchTrainee.belongsTo(User, {
  as: "trainee",
  foreignKey: "trainee_id",
  targetKey: "user_id"
});

User.hasMany(BatchTrainee, {
  as: "TraineeLinks",
  foreignKey: "trainee_id",
  sourceKey: "user_id"
});

/* ===============================
   BatchTrainee ↔ Batch (Direct)
================================ */
BatchTrainee.belongsTo(Batch, {
  as: "batch",
  foreignKey: "batch_id"
});

Batch.hasMany(BatchTrainee, {
  as: "BatchTraineeLinks",
  foreignKey: "batch_id"
});


module.exports = {
  User,
  Registration,
  Batch,
  BatchTrainer,
  BatchTrainee,
  Task,
  TrainerNote,
  TaskMessage
};
