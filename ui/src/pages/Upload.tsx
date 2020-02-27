import React, { ChangeEvent, FormEvent } from "react";
import useAxios from "axios-hooks";
import axios from "axios";

export default function Upload() {
  const [{ data, loading, error }, uploadImage] = useAxios({
    url: "/uploadImage",
    method: "post"
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    uploadImage();
    console.log("hi");
  }

  function getImageForUpload({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) {
    if (files && files?.length > 1) {
      console.log("too many images selected");
    } else {
      axios.post("/uploadImage");
    }
  }

  return (
    <div>
      <h1>Upload a picture</h1>
      <form data-testid="form" onSubmit={submit}>
        <input onChange={getImageForUpload} type="file" required></input>
        <label>Upload your best baby picture</label>
        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
