import React, { ChangeEvent, FormEvent, useState } from "react";
import useAxios from "axios-hooks";
import axios from "axios";

export default function Upload() {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [{ data, loading, error }, uploadImage] = useAxios({
    url: "/uploadImage",
    method: "post"
  });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    uploadImage({
      data: imageToUpload
    });
  }

  function getImageForUpload({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) {
    if (files && files?.length > 1) {
      console.log("too many images selected");
    } else if (files) {
      // axios.post("/uploadImage");
      setImageToUpload(files[0]);
    }
  }

  return (
    <div>
      <h1>Upload a picture</h1>
      <form data-testid="form" onSubmit={submit}>
        <input
          data-testid="upload-image"
          onChange={getImageForUpload}
          type="file"
          required
        ></input>
        <label>Upload your best baby picture</label>
        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
