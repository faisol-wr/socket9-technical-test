class dateService {
  WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  calculateDay(year, month, date) {
    const checkDate = this.checkDateCorrect(year, month, date);
    if (checkDate.isCorrect) {
      const day = this.simpleGetDay(year, month, date);
      return {
        status: "success",
        data: {
          day,
          selectedDate: { year, month, date },
        },
      };
    } else {
      return {
        status: "input_incorrect",
        error: checkDate.error,
      };
    }
  }

  simpleGetDay(year, month, date) {
    const dateValue = new Date(year, month - 1, date);
    return dateValue.toLocaleString("en-US", { weekday: "long" });
  }

  checkDateCorrect(year, month, date) {
    year = Number(year);
    month = Number(month);
    date = Number(date);

    if (year < 1) {
      return {
        isCorrect: false,
        error: {
          message: "year is incorrect",
        },
      };
    }

    if (month < 1 || month > 12) {
      return {
        isCorrect: false,
        error: {
          message: "month is incorrect",
        },
      };
    }

    if (date < 1 || date > this.getDateInMonth(month, year)) {
      return {
        isCorrect: false,
        error: {
          message: "date is incorrect",
        },
      };
    }

    return {
      isCorrect: true,
    };
  }

  getDateInMonth(month, year) {
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return this.DAYS_IN_MONTH[month - 1];
  }

  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}

module.exports = dateService;
