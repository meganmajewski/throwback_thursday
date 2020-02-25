import React, { useState } from "react";

export default function Upload() {
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  function submit() {
    console.log("hi");
  }

  function getImageForUpload(e: FileList) {
    if (e.length > 1) {
      console.log("error");
    } else {
      setSubmitSuccess(false);
      console.log("image");
    }
  }

  return (
    <div>
      <h1>Upload a picture</h1>
      <form data-testid="form" onSubmit={submit}>
        <input
          onChange={e => getImageForUpload(e.target.files!)}
          type="file"
          required
        ></input>
        <label>Upload your best baby picture</label>
        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
