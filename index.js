//imports
require("dotenv").config();
const express = require("express");
const app = express();
//const { connection } = require("./configs/db");
const cors = require("cors");
const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

mongoose.connect(process.env.dbURL)
.then(() => {
  console.log("Connected MongoDB");
})
.catch((err) => {
  console.error("Connection error", err);
  process.exit();
});

//port
const PORT = process.env.port || 8080;

//routes imports
const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");
const scratchRouter = require("./routes/Scratch.Route");
const scratch2Router = require("./routes/Scratch2.Route");
const scratch3Router = require("./routes/Scratch3.Route");
const lessonRouter = require("./routes/Lesson.Route");
const lessonxRouter = require("./routes/Lessonx.Route");
const contentRouter = require("./routes/Content.Route");
const content2Router = require("./routes/Content2.Route");
const content3Router = require("./routes/Content3.Route");
const assignmentRouter = require("./routes/Assignment.Route");
const testRouter = require("./routes/Test.Route");
const DoubtRouter = require("./routes/Doubt.Route");
const Doubt2Router = require("./routes/Doubt2.Route");
const Doubt3Router = require("./routes/Doubt3.Route");
const DashboardRouter = require("./routes/Dashboard.Route");
const TestResultRouter = require("./routes/TestResult.Route");
// const quiz = require('./routes/quiz')

app.use(express.text());
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://lms-studee-client-production.up.railway.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

//routes
app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/scratch", scratchRouter);
app.use("/scratch2", scratch2Router);
app.use("/scratch3", scratch3Router);
app.use("/lesson", lessonRouter);
app.use("/lessonx", lessonxRouter);
app.use("/content", contentRouter);
app.use("/content2", content2Router);
app.use("/content3", content3Router);
app.use("/assignment", assignmentRouter);
app.use("/test", testRouter);
app.use("/doubt", DoubtRouter);
app.use("/doubt2", Doubt2Router);
app.use("/doubt3", Doubt3Router);
app.use("/dashboard", DashboardRouter);
app.use("/test-result", TestResultRouter);
// app.use(quiz)

//app listening
app.listen(PORT, async () => {
  console.log(`Listening at port ${PORT}`);
});
