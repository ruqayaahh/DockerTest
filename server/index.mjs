import express from "express";
import path from "path";
import dashboardApis from "./routes/index.mjs";
import { createNewUser, loginUser } from "./controllers/index.mjs";
import { fileURLToPath } from "url";
// The fileURLToPath method returns the fully-resolved, platform-specific Node.js file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Hello World");
//   res.status(200).json("Hello World");
// });
// statically serve everything in the build folder on the route '/build'
app.get("/", express.static(path.join(__dirname, "../build")));

// serve index.html on the route '/'
app.use("/index", (req, res) => {
  console.log("Hello World-2");
  return res.status(200).sendFile(path.join(__dirname, "../build/index.html"));
});

// create a user
app.post("/signup", createNewUser, (req, res) =>
  res.status(200).json(res.locals.user)
);
// login
app.post("/login", loginUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

app.use("/dashboard", dashboardApis);

// global error handler
app.use((err, req, res, next) => {
  const defaultErrObject = {
    log: "Error caught in unknown middleware",
    status: 400,
    message: { err: "An error occurred" },
  };

  const errObj = Object.assign({}, defaultErrObject, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, (req, res) => console.log(`Listening at ${PORT}`));
