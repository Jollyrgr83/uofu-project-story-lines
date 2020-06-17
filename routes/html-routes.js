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
    const userID = req.user.id;
    const userName = req.user.name;
    const hbsObj = {
      array: [
        {
          userID: userID,
          userName: userName,
          title: "Dashboard",
          project: [],
          story: []
        }
      ]
    };
    db.Project.findAll({ where: { owner: userID } }).then(data => {
      hbsObj.array[0].project = data.map(x => {
        return { id: x.id, title: x.title };
      });
      db.Story.findAll({ where: { assignee: userID } }).then(data => {
        hbsObj.array[0].story = data.map(x => {
          const startDate = new Date(x.createdAt);
          const endDate = display.addDays(startDate, x.estimate);
          const nowDate = new Date();
          const daysRem = display.daysLeft(nowDate, endDate);
          return {
            id: x.id,
            title: x.title,
            projectID: x.project,
            daysRem: daysRem,
            colorClass: display.colorClass(daysRem)
          };
        });
        hbsObj.array[0].story.sort(display.compare);
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
      const hbsObj = { array: [{ user: [], project: [], story: [] }] };
      db.User.findAll({}).then(data => {
        hbsObj.array[0].user = [...data];
        db.Project.findOne({ where: { id: projectID } }).then(data => {
          let ownerName = "";
          for (let i = 0; i < hbsObj.array[0].user.length; i++) {
            if (hbsObj.array[0].user[i].id === data.owner) {
              ownerName = hbsObj.array[0].user[i].name;
            }
          }
          hbsObj.array[0].project[0] = {
            id: data.id,
            title: data.title,
            description: data.description,
            ownerName: ownerName,
            createdAt: display.displayDate(data.createdAt)
          };
          db.Story.findAll({ where: { project: projectID } }).then(data => {
            hbsObj.array[0].story = data.map(x => {
              return { id: x.id, title: x.title };
            });
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
      // title, description, status, project, assignee, reporter, estimate,
      // createdAt, updatedAt
      const hbsObj = {
        array: [
          {
            id: projectID,
            title: `Project ${projectID} - Add Story`,
            user: [],
            status: []
          }
        ]
      };
      db.User.findAll({}).then(data => {
        hbsObj.array[0].user = data.map(x => {
          return { id: x.id, name: x.name };
        });
        for (let i = 0; i < db.Status.rawAttributes.states.values.length; i++) {
          hbsObj.array[0].status.push({
            id: i,
            value: db.Status.rawAttributes.states.values[i]
          });
        }
        res.render("project-add-story", hbsObj);
      });
    }
  });
  // edit project route
  app.get("/project/edit/:id", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const projectID = parseInt(req.params.id);
      const hbsObj = {
        array: [{ title: "", project: [], user: [], status: [] }]
      };
      db.Project.findOne({ where: { id: projectID } }).then(data => {
        hbsObj.array[0].project.push({
          id: data.id,
          title: data.title,
          description: data.description,
          owner: data.owner,
          createdAt: display.displayDate(data.createdAt)
        });
        db.User.findAll({}).then(data => {
          hbsObj.array[0].user = data.map(x => {
            let bool = false;
            if (x.id === hbsObj.array[0].project[0].owner) {
              bool = true;
            }
            return { id: x.id, name: x.name, active: bool };
          });
          hbsObj.array[0].status = [...db.Status.rawAttributes.states.values];
          hbsObj.array[0].title = `Edit Project ${projectID} - ${hbsObj.array[0].project[0].title}`;
          res.render("project-edit", hbsObj);
        });
      });
    }
  });
  // view story route
  app.get("/story/view/:id", isAuthenticated, (req, res) => {
    if (req.params.id && !isNaN(parseInt(req.params.id))) {
      const storyID = parseInt(req.params.id);
      // title, description, status, project, assignee, reporter, estimate, createdAt, updatedAt
      const hbsObj = {
        array: [
          { id: storyID, title: "", user: [], story: [], task: [], status: [] }
        ]
      };
      db.User.findAll({}).then(data => {
        hbsObj.array[0].user = [...data];
        for (let i = 0; i < db.Status.rawAttributes.states.values.length; i++) {
          hbsObj.array[0].status.push({
            id: i,
            value: db.Status.rawAttributes.states.values[i]
          });
        }
        db.Story.findOne({ where: { id: storyID } }).then(data => {
          const timeNow = new Date();
          const timeStart = new Date(data.createdAt);
          let reporterName = "";
          let assigneeName = "";
          for (let i = 0; i < hbsObj.array[0].user.length; i++) {
            if (hbsObj.array[0].user[i].id === data.reporter) {
              reporterName = hbsObj.array[0].user[i].name;
            }
            if (hbsObj.array[0].user[i].id === data.assignee) {
              assigneeName = hbsObj.array[0].user[i].name;
            }
          }
          let statusValue = "";
          for (let i = 0; i < hbsObj.array[0].status.length; i++) {
            if (hbsObj.array[0].status[i].id === data.status) {
              statusValue = hbsObj.array[0].status[i].value;
            }
          }
          hbsObj.array[0].story.push({
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            statusValue: statusValue,
            project: data.project,
            assignee: data.assignee,
            reporter: data.reporter,
            assigneeName: assigneeName,
            reporterName: reporterName,
            estimate: data.estimate,
            createdAt: display.displayDate(new Date(data.createdAt)),
            due: display.displayDate(display.addDays(timeStart, data.estimate)),
            days: display.daysLeft(
              timeNow,
              display.addDays(timeStart, data.estimate)
            ),
            colorClass: display.colorClass(
              display.daysLeft(
                timeNow,
                display.addDays(timeStart, data.estimate)
              )
            )
          });
          hbsObj.array[0].title = `Project ${hbsObj.array[0].story[0].project} - ${hbsObj.array[0].story[0].title}`;
          db.Task.findAll({
            where: {
              story: storyID
            }
          }).then(data => {
            hbsObj.array[0].task = data.map(x => {
              const statusArr = [];
              for (let i = 0; i < hbsObj.array[0].status.length; i++) {
                if (x.status === hbsObj.array[0].status[i].id) {
                  statusArr.push({
                    id: hbsObj.array[0].status[i].id,
                    value: hbsObj.array[0].status[i].value,
                    active: true
                  });
                } else {
                  statusArr.push({
                    id: hbsObj.array[0].status[i].id,
                    value: hbsObj.array[0].status[i].value,
                    active: false
                  });
                }
              }
              const timeNow = new Date();
              const timeOld = new Date(x.createdAt);
              const timeDue = display.addDays(timeOld, x.time);
              const daysRem = display.daysLeft(timeNow, timeDue);
              const colorClass = display.colorClass(daysRem);
              return {
                id: x.id,
                title: x.title,
                status: [...statusArr],
                daysRem: daysRem,
                colorClass: colorClass
              };
            });
            res.render("story", hbsObj);
          });
        });
      });
    }
  });
  // edit story route
  app.get("/story/edit/:id", isAuthenticated, (req, res) => {
    const storyID = parseInt(req.params.id);
    hbsObj = { array: [{ title: "", story: [], user: [] }] };
    db.User.findAll({}).then(data => {
      hbsObj.array[0].user = data.map(x => {
        return { id: x.id, name: x.name };
      });
      db.Story.findOne({ where: { id: storyID } }).then(data => {
        const statusArr = [];
        for (let i = 0; i < db.Status.rawAttributes.states.values.length; i++) {
          if (i === data.status) {
            statusArr.push({
              id: i,
              value: db.Status.rawAttributes.states.values[i],
              active: true
            });
          } else {
            statusArr.push({
              id: i,
              value: db.Status.rawAttributes.states.values[i],
              active: false
            });
          }
        }
        const reporterArr = [];
        const assigneeArr = [];
        for (let i = 0; i < hbsObj.array[0].user.length; i++) {
          if (hbsObj.array[0].user[i].id === data.reporter) {
            reporterArr.push({
              id: hbsObj.array[0].user[i].id,
              name: hbsObj.array[0].user[i].name,
              active: true
            });
          } else {
            reporterArr.push({
              id: hbsObj.array[0].user[i].id,
              name: hbsObj.array[0].user[i].name,
              active: false
            });
          }
          if (hbsObj.array[0].user[i].id === data.assignee) {
            assigneeArr.push({
              id: hbsObj.array[0].user[i].id,
              name: hbsObj.array[0].user[i].name,
              active: true
            });
          } else {
            assigneeArr.push({
              id: hbsObj.array[0].user[i].id,
              name: hbsObj.array[0].user[i].name,
              active: false
            });
          }
        }
        hbsObj.array[0].story.push({
          id: data.id,
          title: data.title,
          description: data.description,
          reporter: [...reporterArr],
          assignee: [...assigneeArr],
          project: data.project,
          estimate: data.estimate,
          status: [...statusArr]
        });
        hbsObj.array[0].title = `Edit Project ${hbsObj.array[0].story[0].project} - Story ${storyID}`;
        res.render("story-edit", hbsObj);
      });
    });
  });
  // add task route
  app.get("/story/add/:id", isAuthenticated, (req, res) => {
    const storyID = parseInt(req.params.id);
    hbsObj = {
      array: [
        {
          id: storyID,
          title: `Story ${storyID} - Add Task`,
          user: [],
          status: []
        }
      ]
    };
    db.User.findAll({}).then(data => {
      hbsObj.array[0].user = data.map(x => {
        return { id: x.id, name: x.name };
      });
      for (let i = 0; i < db.Status.rawAttributes.states.values.length; i++) {
        hbsObj.array[0].status.push({
          id: i,
          value: db.Status.rawAttributes.states.values[i]
        });
      }
    });
    res.render("story-add-task", hbsObj);
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

  app.get("/activate/:id/:token", (req, res) => {
    db.User.findOne({ where: { id: Number(req.params.id) } }).then(data => {
      const hbsObj = {
        user: []
      };
      if (data !== null) {
        hbsObj.user.id = data.id;
        hbsObj.user.name = data.name;
        hbsObj.title = "Activate your account";
        if (req.params.token === data.token) {
          db.User.update(
            {
              active: 1,
              token: null
            },
            { where: { id: data.id } }
          );
          hbsObj.message = "Your account was successfuly activated";
        } else {
          hbsObj.message =
            "Something went wrong while activating your account, please check your link";
        }
      } else {
        hbsObj.message =
          "Something went wrong while activating your account, please check your link";
      }
      res.render("activate", hbsObj);
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
