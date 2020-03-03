import express from "express";
import cors from "cors";
import upload from "multer";
import firebase from "firebase";
import "@firebase/storage"; //needed for initialization
import XMLHttpRequest from "xmlhttprequest";
global.XMLHttpRequest = XMLHttpRequest.XMLHttpRequest;
import Pool from "pg";
import path from "path";

const FILENAME =
  typeof __filename !== "undefined"
    ? __filename
    : (/^ +at (?:file:\/*(?=\/)|)(.*?):\d+:\d+$/m.exec(Error().stack) || "")[1];
const DIRNAME =
  typeof __dirname !== "undefined"
    ? __dirname
    : FILENAME.replace(/[\/\\].*?$/, "");

const PORT = process.env.PORT || 5000;
const pool = new Pool.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
let storage;
const initFirebase = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyAHjWMqYnREX0BjrPZc1GpniN3ykSNuPpg",
    authDomain: "throwback-thursday-15e79.firebaseapp.com",
    databaseURL: "https://throwback-thursday-15e79.firebaseio.com",
    projectId: "throwback-thursday-15e79",
    storageBucket: "throwback-thursday-15e79.appspot.com",
    messagingSenderId: "740383031846",
    appId: "1:740383031846:web:1ff2742fa5d7eb5b6bdce7"
  };
  firebase.initializeApp(firebaseConfig);

  storage = firebase.storage();
};
initFirebase();

express()
  .use(cors())
  .use(express.static(path.join(DIRNAME, "ui/build")))
  .get("/", (req, res) =>
    res.sendFile(path.join(DIRNAME, "ui/build/index.html"))
  )
  .post("/uploadImage", upload().single("image"), (req, res) => {
    try {
      console.log("file", req.file);
      const storageRef = storage.ref();
      const imageRef = storageRef.child("images/file.png");
      const fileArray = new Uint8Array(req.file.buffer);
      console.log("filearray", fileArray);
      imageRef
        .put(fileArray)
        .then(
          snapshot => {
            console.log("hello world", snapshot.downloadURL);
            return snapshot.downloadURL;
          },
          error => {
            console.log("error", error);
          }
        )
        .catch(url => {
          console.log("url", url);
        });
    } catch (err) {
      console.log("err", err);
    }
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
      console.log("error getting db", err);
      res.send("Error" + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on this port: ${PORT}`));
