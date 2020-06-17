// importing models
const db = require("../models");
// authentication middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
// import library functions
const display = require("../lib/display");
// html routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    // if the user already has an account send them to the dashboard page
    if (req.user) {
      return res.redirect("/dash");
    }
    // else send user to signup page
    return res.render("auth-signup", { title: "signup" });
  });
  app.get("/login", (req, res) => {
    // if the user already has an account send them to the dashboard page
    if (req.user) {
      return res.redirect("/dash");
    }
    // else send user to login page
    return res.render("auth-login", { title: "login" });
  });
  // dashboard route
  app.get("/dash", isAuthenticated, (req, res) => {
    userID = req.user.id;
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
  // search route
  app.get("/search", isAuthenticated, (req, res) => {
    res.render("search", { title: "search" });
  });
  // view project route
  app.get("/project/view/:id/", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const projectID = parseInt(req.params.id);
      const userID = parseInt(req.user.id);
      const hbsObj = { array: [{ user: [], project: [], story: [] }] };
      db.User.findAll({
        attributes: ["id", "name"]
      }).then(data => {
        hbsObj.array[0].user = data.map(x => {
          let bool = false;
          if (x.id === userID) {
            bool = true;
          }
          return { id: x.id, name: x.name, active: bool };
        });
        db.Project.findOne({
          attributes: ["id", "title", "description", "createdAt"],
          where: {
            id: projectID
          }
        }).then(data => {
          hbsObj.array[0].project[0] = {
            id: data.id,
            title: data.title,
            description: data.description,
            createdAt: data.createdAt
          };
          db.Story.findAll({
            attributes: ["id", "title"],
            where: {
              project: projectID
            }
          }).then(data => {
            hbsObj.array[0].story = data.map(x => {
              return { id: x.id, title: x.title };
            });
            console.log(hbsObj.array[0].story);
            hbsObj.array[0].title = `Project ${projectID} - ${hbsObj.array[0].project[0].title}`;
            hbsObj.array[0].id = projectID;
            res.render("project", hbsObj);
          });
        });
      });
    }
  });
  // add story route
  app.get("/project/add/:id", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const projectID = parseInt(req.params.id);
      const hbsObj = {
        array: [{ id: projectID, title: "", user: [], status: [] }]
      };
      db.User.findAll({
        attributes: ["id", "name"]
      }).then(data => {
        hbsObj.array[0].user = data.map(x => {
          return { id: x.id, name: x.name };
        });
        db.Status.findAll({}).then(data => {
          console.log(data);
          Status.rawAttributes.states.values;
          hbsObj.array[0].status = data.map(x => {
            return { states: x.states };
          });
          hbsObj.array[0].title = `Project ${projectID} - Add Story`;
          res.render("project-add-story", hbsObj);
        });
      });
    }
  });
  // edit story route
  app.get("/project/edit/:id", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const projectID = parseInt(req.params.id);
      const hbsObj = {
        array: [{ id: projectID, title: "", user: [], status: [] }]
      };
      db.User.findAll({
        attributes: ["id", "name"]
      }).then(data => {
        hbsObj.array[0].user = data.map(x => {
          return { id: x.id, name: x.name };
        });
        db.Status.findAll({
          attributes: ["states"]
        }).then(data => {
          hbsObj.array[0].status = data.map(x => {
            return { states: x.states };
          });
          hbsObj.array[0].title = `Project ${projectID} - Edit Story`;
          res.render("project-edit-story", hbsObj);
        });
      });
    }
  });
  // view story route
  app.get("/story/view/:id", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const storyID = parseInt(req.params.id);
      const hbsObj = {
        array: [{ id: storyID, title: "", story: [], task: [], status: [] }]
      };
      db.Story.findOne({
        where: {
          id: storyID
        }
      }).then(data => {
        const timeNow = new Date();
        const timeStart = new Date(data.createdAt);
        console.log(timeNow);
        hbsObj.array[0].story.push({
          id: data.id,
          title: data.title,
          description: data.description,
          status: data.status,
          project: data.project,
          assignee: data.assignee,
          reporter: data.reporter,
          estimate: data.estimate,
          createdAt: display.displayDate(new Date(data.createdAt)),
          due: display.displayDate(display.addDays(timeStart, data.estimate)),
          days: display.daysLeft(
            timeNow,
            display.addDays(timeStart, data.estimate)
          ),
          colorClass: display.colorClass(
            display.daysLeft(timeNow, display.addDays(timeStart, data.estimate))
          )
        });
        console.log(hbsObj.array[0].story[0]);
        hbsObj.array[0].title = `Project ${hbsObj.array[0].story[0].project} - Story ${storyID}`;
        db.Task.findAll({
          where: {
            story: storyID
          }
        }).then(data => {
          hbsObj.array[0].task = [...data];
          db.Status.findAll({}).then(data => {
            hbsObj.array[0].status = [...data];
            res.render("story", hbsObj);
          });
        });
      });
    }
  });
  // add task route
  app.get("/story/add/:id", isAuthenticated, (req, res) => {
    const storyID = parseInt(req.params.id);
    hbsObj = {
      storyID: storyID
    };
    res.render("story-add", hbsObj);
  });

  // add project route
  app.get("/add/", isAuthenticated, (req, res) => {
    hbsObj = {
      array: [
        {
          title: "",
          user: []
        }
      ]
    };
    db.User.findAll({}).then(data => {
      hbsObj.array[0].user = data.map(x => {
        return { id: x.id, name: x.name };
      });
      hbsObj.array[0].title = "Add a Project";
      res.render("add", hbsObj);
    });
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
