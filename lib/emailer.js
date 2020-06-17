const nodemailer = require("nodemailer");
const emailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "story.lines.agile@gmail.com",
    pass: "Abcd!234"
  }
});

module.exports = emailer;
