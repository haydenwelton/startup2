const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DB = require("./database.js");
const { PeerProxy } = require("./peerProxy.js");

const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    console.log("CREATE USER");
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
  console.log("LOGIN");
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get("/user/:email", async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: "Unknown" });
});

// secureApiRouter verifies credentials for endpoints
const isAuthenticated = async (req, res, next) => {
  console.log("SECUREAPIROUTER");
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// GetBurgers
apiRouter.get("/community/burgers", isAuthenticated, async (req, res) => {
  const burgers = await DB.getAllBurgers();
  res.send(burgers);
});

// SubmitBurger
apiRouter.post("/burger", isAuthenticated, async (req, res) => {
  console.log("HIT");
  try {
    const burgerData = req.body;
    await DB.addBurger(burgerData);
    res.status(201).send({ msg: "Burger added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

apiRouter.get("/burgers/myburgers", isAuthenticated, async (req, res) => {
  try {
    console.log("user", req.user);
    const allBurgers = await DB.getUserBurgers(req.user.email);
    res.status(200).send(allBurgers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
