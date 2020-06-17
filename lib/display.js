const display = {
  // date function for calculating due date
  addDays: function(dateObj, days) {
    const date = new Date(dateObj);
    date.setDate(date.getDate() + days);
    return date;
  },
  // function to calculate days remaining
  daysLeft: function(dateOld, dateNew) {
    return parseFloat(((dateNew - dateOld) / 86400000).toFixed(1));
  },
  // function to return formatted date string
  displayDate: function(dateObj) {
    let month = (dateObj.getMonth() + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    let days = dateObj.getDate().toString();
    if (days.length === 1) {
      days = `0${days}`;
    }
    let hours = dateObj.getHours();
    if (hours.toString().length === 1) {
      hours = `0${hours}`;
    }
    let minutes = dateObj.getMinutes();
    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }
    return `${month}/${days} ${hours}:${minutes}`;
  },
  // function that returns color class for days left
  colorClass: function(num) {
    if (num <= 1) {
      return "red";
    }
    if (num <= 3) {
      return "yellow";
    }
    return "green";
  },
  // compare function used to sort by days left
  compare: function(a, b) {
    if (a.daysRem < b.daysRem) {
      return -1;
    }
    return 1;
  }
};

module.exports = display;
