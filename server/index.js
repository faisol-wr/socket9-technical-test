const express = require("express");
const dateRouter = require("./routes/dateRouter");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200, 
  })
);

app.get("/", (req, res) => {
  res.send("server on");
});

app.use(dateRouter);

app.listen(8080, () => {
  console.log(`start server in port 8080`);
});
