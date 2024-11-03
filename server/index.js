const express = require("express");
const dateRouter = require("./routes/dateRouter");

const app = express();

app.get("/", (req, res) => {
  res.send("server on");
});

app.use(dateRouter);

app.listen(8080, () => {
  console.log(`start server in port 8080`);
});
