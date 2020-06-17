const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// passport configuration
const passport = require("./config/passport");
// setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// dreating express app and configuring middleware needed for authentication
const app = express();
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// using sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
