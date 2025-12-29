const express = require("express");
const sequelize = require("./config/db");
require("./src/associations")
const cors = require('cors')
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", require("./src/routes/user.route"));
app.use("/api/trainees", require("./src/routes/trainee.route"));
app.use('/api/trainer', require('./src/routes/trainer.route'));
app.use("/api/notes", require("./src/routes/note.route"));
app.use("/api/batch", require("./src/routes/batch.route"));
app.use("/api/task", require("./src/routes/task.route"));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({ alter: true }); 
    console.log("Models synced");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
})();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
