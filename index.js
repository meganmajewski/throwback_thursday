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
  connectionString: process.env.DATABASE_URL,
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
function uploadToFirebase(file) {
  const storageRefForImage = firebase
    .storage()
    .ref()
    .child("images/" + file.originalname);

  storageRefForImage.put(Uint8Array.from(file.buffer)).then(
    async snapshot => {
      //not sure what to do here on success?
      downloadURL = await snapshot.ref.getDownloadURL();
    },
    error => {
      throw ("Error uploading file", error);
    }
  );
}
express()
  .use(cors())
  .use(express.static(path.join(__dirname, "ui/build")))
  .get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "ui/build/index.html"))
  )
  .post("/uploadImage", upload().single("image"), (req, res) => {
    try {
      uploadToFirebase(req.file);
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
