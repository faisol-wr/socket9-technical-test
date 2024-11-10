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
  initYear = 1900;

  calculateDay(year, month, date) {
    const checkDate = this.checkDateCorrect(year, month, date);
    if (checkDate.isCorrect) {
      const dayFromSimple = this.simpleGetDay(year, month, date);
      const day = this.getDay(year, month, date);
      return {
        status: "success",
        data: {
          day,
          dayFromSimple,
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

  getDay(year, month, date) {
    const totalDays = this.getTotalDays(year, month, date);
    const weekdayIndex = totalDays % this.WEEKDAYS.length;
    return this.WEEKDAYS[weekdayIndex];
  }

  checkDateCorrect(year, month, date) {
    year = Number(year);
    month = Number(month);
    date = Number(date);

    if (year < this.initYear) {
      return {
        isCorrect: false,
        error: {
          message: `year is incorrect or year less than ${this.initYear}`,
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

    if (date < 1 || date > this.getDaysInMonth(month, year)) {
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

  getTotalDays(year, month, date) {
    let totalDays = 0;

    const yearsPassed = year - this.initYear;

    const leapYears =
      Math.floor(yearsPassed / 4) -
      Math.floor(yearsPassed / 100) +
      Math.floor(yearsPassed / 400);

    totalDays = yearsPassed * 365 + leapYears;

    for (let m = 1; m < month; m++) {
      totalDays += this.getDaysInMonth(m, year);
    }

    totalDays += date - 1;

    return totalDays;
  }

  getDaysInMonth(month, year) {
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
