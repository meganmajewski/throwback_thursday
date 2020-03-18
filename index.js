global.XMLHttpRequest = require("xhr2");
const express = require("express");
const cors = require("cors");
const upload = require("multer");
const firebase = require("firebase");
require("firebase/storage");
const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");
const firebaseutils = require("./firebase/firebaseutils");
const databaseutils = require("./database/databaseutils");
const textParser = bodyParser.text();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://urhjxxuoesyhas:d6e8432d46daae1ac134b13305c03a6983bd412a488b0cd3b4de4c86a6af4ca6@ec2-34-192-30-15.compute-1.amazonaws.com:5432/d59ff6vdh8e19b",
  ssl: true
});

firebase.initializeApp(firebaseutils.config());

express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build/")))
  .get("/", (_, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .get("/allImages", async (_, res) => {
    try {
      const results = await databaseutils.allImages(pool);
      if (results) {
        res.json(results);
      } else {
        throw "no results";
      }
    } catch (err) {
      console.log(err);
      res.send("Error" + err);
    }
  })
  .post("/uploadImage", upload().single("image"), async (req, res) => {
    try {
      const url = await firebaseutils.uploadToFirebase(req.file, firebase);
      if (url) {
        try {
          await databaseutils.uploadToDb(url, req.body.cdsid, pool);
        } catch (e) {
          throw ("error uploading to database, ", e);
        }
        res.send("Image uploaded");
      } else {
        throw "image url is undefined, cannot upload to database";
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send("Failure");
    }
  })
  .get("/currentImage", async (_, res) => {
    try {
      const results = await databaseutils.getCurrentImage(pool);
      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500);
      res.send("Error" + err);
    }
  })
  .post("/vote", textParser, async (req, res) => {
    try {
      const client = await pool.connect();
      //get current throwback id
      const result = await client.query(
        "SELECT current_id  FROM current_throwback"
      );
      const { current_id } = result.rows[0];
      console.log(req.body);
      //submit to db vote with that id
      const vote = await client.query(
        "INSERT INTO votes(image_id, vote) values(" +
          current_id +
          ",'" +
          req.body +
          "')"
      );
      client.release();
      res.send("voted");
    } catch (e) {
      console.log("error", e);
    }
  })
  .get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM test_table ORDER BY revealed"
      );
      const results = { results: result ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.log(err);
      res.send("Error" + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
