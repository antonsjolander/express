const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));

const port = 3000;

const printHeader = (req, res, next) => {
  console.log(req.headers);
  next();
};

const printMethod = (req, res, next) => {
  console.log(req.method);
  next();
};

const isAuthorized = (req, res, next) => {
  if (req.headers.authorization) {
    next();
    return;
  }

  res.status(401).end();
};

const handleGet = (req, res) => {
  res.send("Hello World!");
};

app.use(isAuthorized);
app.use(printHeader);
app.use(printMethod);

app.get("/", handleGet);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
