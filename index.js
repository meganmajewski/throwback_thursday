global.XMLHttpRequest = require("xhr2");
const express = require("express");
const cors = require("cors");
const upload = require("multer");
const firebase = require("firebase");
require("firebase/storage");
const { Pool } = require("pg");
const path = require("path");
const PORT = process.env.PORT || 5000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL + "sslmode=require",
  ssl: true
});

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: "throwback-thursday-b1cf0.appspot.com",
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

async function uploadToFirebase(file) {
  try {
    const storageRefForImage = firebase
      .storage()
      .ref()
      .child("images/" + file.originalname);

    let snapshot = await storageRefForImage.put(Uint8Array.from(file.buffer));
    let url = await snapshot.ref.getDownloadURL();
    return Promise.resolve(url);
  } catch (e) {
    Promise.reject("error uploading to firebase", e);
  }
}
async function uploadImageURLToDb(url) {
  try {
    const client = await pool.connect();
    client.query(
      "INSERT INTO test_table(name) VALUES(4,'" + url + "')",
      (err, res) => {
        console.log("error uploading to db ", err, res);
        pool.end();
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
      const result = await client.query("SELECT * FROM test_table");
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
      const url = await uploadToFirebase(req.file);
      uploadImageURLToDb(url);
      res.send("Image uploaded");
    } catch (e) {
      console.log(e);
      res.statusCode(500);
      res.send("Failure");
    }
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
