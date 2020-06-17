const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // login route
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
  // signup route
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role
    })
      .then(() => {
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

  app.post("/api/add", (req, res) => {
    db.Project.create({
      title: "test",
      description: req.body.description,
      owner: "me"
    })
      .then(() => {
        res.redirect(307, "/api/dash");
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
  app.post("/api/edit/story", (req, res) => {
    console.log(req);
    console.log(res);
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
};
