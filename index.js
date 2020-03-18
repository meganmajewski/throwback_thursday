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
const textParser = bodyParser.text();
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://urhjxxuoesyhas:d6e8432d46daae1ac134b13305c03a6983bd412a488b0cd3b4de4c86a6af4ca6@ec2-34-192-30-15.compute-1.amazonaws.com:5432/d59ff6vdh8e19b",
  ssl: true
});

firebase.initializeApp(firebaseutils.config());

async function uploadToDb(url, cdsid) {
  try {
    const client = await pool.connect();
    client.query(
      "INSERT INTO test_table(url, cdsid) VALUES('" +
        url +
        "', '" +
        cdsid +
        "')",
      (err, res) => {
        console.log("error uploading to db ", err, res);
      }
    );
  } catch (e) {
    console.log("error uploading to postgres", e);
  }
}
express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build/")))
  .get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "ui/build", "index.html"))
  )
  .get("/allImages", async (_, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM test_table ORDER BY revealed, id ASC"
      );
      const results = { results: result ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.log(err);
      res.send("Error" + err);
    }
  })
  .post("/uploadImage", upload().single("image"), async (req, res) => {
    try {
      const url = await firebaseutils.uploadToFirebase(req.file, firebase);
      uploadToDb(url, req.body.cdsid);
      res.send("Image uploaded");
    } catch (e) {
      console.log(e);
      res.statusCode(500);
      res.send("Failure");
    }
  })
  .get("/currentImage", async (_, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "select * from test_table, current_throwback where test_table.id = current_throwback.current_id order by current_throwback.id desc limit 1;"
      );
      const results = { results: result ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.log(err);
      res.send("Error" + err);
    }
  })
  .post("/vote", textParser, async (req, res) => {
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
