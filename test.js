const { spawn } = require("child_process");
const request = require("request");
const test = require("tape");

// Start the app
const env = Object.assign({}, process.env, { PORT: 50001 });
const child = spawn("node", ["index.js"], { env });

test("responds to requests", t => {
  t.plan(4);

  // Wait until the server is ready
  child.stdout.on("data", _ => {
    // Make a request to our app
    request("http://localhost:5000", (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      console.log("response", response);
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(
        body.indexOf("<title>Node.js Getting Started on Heroku</title>"),
        -1
      );
      t.notEqual(body.indexOf("Getting Started on Heroku with Node.js"), -1);
    });
  });
});
