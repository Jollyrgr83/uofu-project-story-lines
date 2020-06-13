// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");

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
    res.render("dash", { title: "dashboard" });
  });

  app.get("/add", isAuthenticated, (req, res) => {
    res.render("add", { title: "add" });
  });

  app.get("/search", isAuthenticated, (req, res) => {
    res.render("search", { title: "search" });
  });

  app.get("/story", isAuthenticated, (req, res) => {
    res.render("story", { title: "story" });
  });

  app.get("/project", isAuthenticated, (req, res) => {
    res.render("project", { title: "project" });
  });
};
