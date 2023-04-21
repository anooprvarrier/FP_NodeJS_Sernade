const express = require("express");
const fs = require("fs");
const Promise = require("bluebird");

const app = express();

Promise.promisifyAll(fs);

app.get("/users", function (req, res) {
  fs.readFileAsync("./user.json", "utf8")
    .then((data) => {
      try {
        data = JSON.parse(data);
        res.send(data);
      } catch (e) {
        console.error("invalid json file");
      }
    })
    .catch((error) => {
      console.error("unable to read file");
    });
});
app.listen(3000, function () {
  console.log("listening on port 3000");
});
