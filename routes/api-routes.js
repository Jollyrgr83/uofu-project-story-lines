const db = require("../models");
const passport = require("../config/passport");
const crypto = require("crypto");
const emailer = require("../lib/emailer");

module.exports = function(app) {
  // login route
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user !== false) {
        req.logIn(user, err => {
          if (err) {
            return next(err);
          }
          return res.json({
            id: user.id,
            email: user.email,
            message: info.message,
            success: true
          });
        });
      } else {
        return res.json({
          message: info.message,
          success: false
        });
      }
    })(req, res, next);
  });
  // signup route
  app.post("/api/signup", (req, res) => {
    const token = crypto.randomBytes(20).toString("hex");
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role,
      active: 0,
      token: token
    })
      .then(data => {
        emailer.sendMail(
          {
            from: "Story Lines",
            to: req.body.email,
            subject:
              "Thank you for signing up " +
              req.body.name +
              ", please activate your account",
            html: `Hello ${req.body.name}, <br/> Please click on the link below to activate your account.<br/>
            <a href="https://peaceful-scrubland-88128.herokuapp.com/activate/${data.id}/${token}">ACTIVATE NOW!</a>`
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // logout route
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Adds project
  app.post("/api/add", (req, res) => {
    const newDate = new Date();
    db.Project.create({
      owner: req.body.owner,
      title: req.body.title,
      description: req.body.description,
      createdAt: newDate,
      updatedAt: newDate
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // updates project
  app.put("/api/edit/project", (req, res) => {
    db.Project.update(
      {
        title: req.body.title,
        description: req.body.description,
        owner: req.body.ownerID
      },
      { where: { id: req.body.projectID } }
    ).then(data => {
      res.json(data);
    });
  });
  // adds new story to project
  app.post("/api/add/story", (req, res) => {
    db.Story.create({
      project: req.body.projectID,
      title: req.body.title,
      description: req.body.description,
      reporter: req.body.reporter,
      assignee: req.body.assignee,
      estimate: req.body.estimate,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    }).then(data => {
      res.json(data);
    });
  });
  // updates story
  app.put("/api/edit/story", (req, res) => {
    db.Story.update(
      {
        title: req.body.title,
        description: req.body.description,
        reporter: req.body.reporter,
        assignee: req.body.assignee,
        estimate: req.body.estimate,
        status: req.body.status
      },
      { where: { id: req.body.id } }
    ).then(data => {
      res.json(data);
    });
  });
  // updates task
  app.put("/api/edit/task", (req, res) => {
    db.Task.update(
      { status: req.body.status },
      { where: { id: req.body.id } }
    ).then(data => {
      res.json(data);
    });
  });
  // adds new task to story
  app.post("/api/add/task", (req, res) => {
    db.Task.create({
      story: req.body.storyID,
      title: req.body.title,
      owner: req.body.owner,
      time: req.body.time,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    }).then(data => {
      res.json(data);
    });
  });
  //reset password
  app.put("/api/reset/send", (req, res) => {
    const token = crypto.randomBytes(20).toString("hex");
    db.User.findOne({ where: { email: req.body.email.trim() } })
      .then(data => {
        db.User.update(
          {
            token: token
          },
          { where: { id: data.id } }
        );
        emailer.sendMail(
          {
            from: "Story Lines",
            to: data.email,
            subject:
              "Your reset password form " +
              data.name +
              ", this is your reset password form",
            html: `Hello ${data.name}, <br/> Please click on the link below to reset your password.<br/>
            <a href="https://peaceful-scrubland-88128.herokuapp.com/reset/${data.id}/${token}">RESET NOW!</a>`
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        res.json(data);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.put("/api/reset/password", (req, res) => {
    db.User.findOne({ where: { id: Number(req.body.id) } })
      .then(data => {
        if (req.body.token === data.token) {
          db.User.update(
            {
              password: req.body.password,
              token: null
            },
            { where: { id: data.id } }
          );
          return res.json(true);
        }
        return res.json(false);
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });
};
