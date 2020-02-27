const express = require("express");
const cors = require("cors");
const upload = require("multer");
const { Pool } = require("pg");
const path = require("path");
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build")))
  .get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "ui/build/index.html"))
  )
  .post("/uploadImage", upload().single("image"), (req, res) => {
    console.log(req.file);
    res.send("Success");
  })
  .get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      const results = { results: result ? result.rows : null };
      res.json(results);
      client.release();
    } catch (err) {
      console.log(err);
      res.send("Error" + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
