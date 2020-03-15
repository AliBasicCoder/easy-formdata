const m = require("./index");
const express = require("express");
const app = express();

app.use(m.expressParser());

app.post("/api", (req, res) => {
  res.send(req.body);
})

app.listen(4000, () => console.log("server started"));
