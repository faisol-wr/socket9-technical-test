const express = require("express");

const router = express.Router();

const prefixApi = "date";

router.get(`/${prefixApi}/calculateDay`, (req, res) => {
  const { year, month, date } = req.query;
  console.log(year, month, date);
  res.json({
    day: "mon",
    year,
    month,
    date,
  });
});

module.exports = router;
