// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      return res.redirect("/dash");
    }

    return res.render("auth-signup", { title: "signup" });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      return res.redirect("/dash");
    }

    return res.render("auth-login", { title: "login" });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dash", isAuthenticated, (req, res) => {
    userID = req.user.id;
    // let hbsObj = {
    //   arrays: [
    //     {
    //       title: "Page Title",
    //       projects: [ { id: ##, title: ## }],
    //       stories: [ { id: ##, title: ##, projectID: ##, projectTitle: ##, daysRem: ## } ]
    //     }
    //   ]
    // };
    const hbsObj = { array: [{ title: "Dashboard", project: [], story: [] }] };
    db.Project.findAll({
      attributes: ["id", "title"],
      where: {
        owner: userID
      }
    }).then(data => {
      hbsObj.array[0].project = data.map(x => {
        return { id: x.id, title: x.title };
      });
      db.Story.findAll({
        attributes: ["id", "title", "project", "estimate"],
        where: {
          assignee: userID
        }
      }).then(data => {
        hbsObj.array[0].story = data.map(x => {
          return {
            id: x.id,
            title: x.title,
            projectID: x.project,
            daysRem: x.estimate
          };
        });
        res.render("dash", hbsObj);
      });
    });
  });

  app.get("/add", isAuthenticated, (req, res) => {
    res.render("add", { title: "add" });
  });

  app.get("/search", isAuthenticated, (req, res) => {
    res.render("search", { title: "search" });
  });

  app.get("/story/id/:id", isAuthenticated, (req, res) => {
    if (req.params.id || !isNaN(parseInt(req.params.id))) {
      const storyID = parseInt(req.params.id);
      db.Story.findOne({
        where: { id: storyID }
      }).then(data => {
        console.log("data", data);
      });
    }
    res.render("story", { title: "story" });
  });

  // generic project page for testing (remove this after testing)
  app.get("/project/:id/", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const projectID = parseInt(req.params.id);
      console.log(`Project - ${projectID}`);
      res.render("project", { title: `Project - ${projectID}` });
    }
  });

  // generic story page for testing (remove this after testing)
  app.get("/story", isAuthenticated, (req, res) => {
    res.render("story", { title: "story" });
  });

  // const crypto = require("crypto");

  // require("dotenv").config();

  // const nodemailer = require("nodemailer");
  // app.post("/forgotPassword", (req, res) => {
  //   if (req.body.email === "") {
  //     res.status(400).send("email required");
  //   }
  //   console.error(req.body.email);
  //   db.User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then(user => {
  //     if (user === null) {
  //       console.error("email not in database");
  //       res.status(403).send("email not in db");
  //     } else {
  //       const token = crypto.randomBytes(20).toString("hex");
  //       user.update({
  //         resetPasswordToken: token,
  //         resetPasswordExpires: Date.now() + 3600000
  //       });

  //       const transporter = nodemailer.createTransport({
  //         service: "gmail",
  //         auth: {
  //           user: `${process.env.EMAIL_ADDRESS}`,
  //           pass: `${process.env.EMAIL_PASSWORD}`
  //         }
  //       });

  //       const mailOptions = {
  //         from: "example@gmail.com",
  //         to: `${user.email}`,
  //         subject: "Link To Reset Password",
  //         text:
  //           "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
  //           "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
  //           `http://localhost:3031/reset/${token}\n\n` +
  //           "If you did not request this, please ignore this email and your password will remain unchanged.\n"
  //       };

  //       console.log("sending mail");

  //       transporter.sendMail(mailOptions, (err, response) => {
  //         if (err) {
  //           console.error("there was an error: ", err);
  //         } else {
  //           console.log("here is the res: ", response);
  //           res.status(200).json("recovery email sent");
  //         }
  //       });
  //     }
  //   });
  // });
};
