const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/mail", require("./routes/api/mails"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
