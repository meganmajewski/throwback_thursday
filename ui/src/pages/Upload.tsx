import React, { ChangeEvent, FormEvent, useState } from "react";
import useAxios from "axios-hooks";

export default function Upload() {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [{ data, loading, error }, uploadImage] = useAxios(
    {
      baseURL: process.env.SERVER_URL || "http://localhost:5000",
      url: "/uploadImage",
      method: "post"
    },
    { manual: true }
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageToUpload) {
      const formData = new FormData();
      formData.append("image", imageToUpload);
      uploadImage({
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).catch(error => {
        console.log("Error Uploading Image: ", error);
      });
    }
  };

  const getImageForUpload = ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    if (files && files?.length > 1) {
      console.log("too many images selected");
    } else if (files) {
      setImageToUpload(files[0]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) return <p> Thanks for submitting your image!</p>;

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
