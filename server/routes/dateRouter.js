const express = require("express");
const DateService = require("../services/dateService");

const router = express.Router();

const prefixApi = "date";

const dateService = new DateService();

router.post(`/${prefixApi}/calculateDay`, express.json(), (req, res) => {
  const { year, month, date } = req.body;
  const result = dateService.calculateDay(year, month, date);
  switch (result.status) {
    case "success": {
      res.status(200).json(result.data);
      break;
    }
    case "input_incorrect": {
      res.status(400).json(result.error);
      break;
    }
    default: {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

module.exports = router;
