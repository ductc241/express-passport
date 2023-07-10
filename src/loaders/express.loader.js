const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const routerConfig = require("../api/routes");

module.exports = () => {
  const app = express();

  // config session
  app.use(
    session({
      secret: "secret key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
    })
  );

  //cookie
  app.use(cookieParser());

  //cors
  app.use(
    cors({
      origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    })
  );

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // template engine
  app.set("view engine", "pug");
  app.set("views", path.join(process.cwd(), "src/views"));

  // api routes
  // routerConfig(app);
  app.use("/api", routerConfig);

  app.listen(process.env.APP_PORT, () =>
    console.log(`Server is running on port ${process.env.APP_PORT}`)
  );

  return app;
};
