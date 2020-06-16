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
};
