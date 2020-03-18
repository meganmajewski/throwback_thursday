module.exports = {
  config: () => {
    return {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: "throwback-thursday-b1cf0.appspot.com",
      messagingSenderId: process.env.SENDER_ID,
      appId: process.env.APP_ID
    };
  },
  uploadToFirebase: async (file, firebase) => {
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
};
