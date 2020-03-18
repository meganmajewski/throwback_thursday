import React, { ChangeEvent, FormEvent, useState } from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "../components/Error";

export default function Upload() {
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [cdsid, setCDSID] = useState<string>("");
  const [{ data, loading, error }, uploadImage] = useAxios(
    {
      url: "/uploadImage",
      method: "post"
    },
    { manual: true }
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageToUpload) {
      const formData = new FormData();
      formData.append("cdsid", cdsid);
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
  if (error)
    return <ErrorMessage message="There was an error uploading your image" />;
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
        <label>Add your CDSID</label>
        <input
          data-testid="cdsid"
          required
          type="text"
          name="cdsid"
          maxLength={8}
          onChange={({ target: { value } }) => setCDSID(value)}
        ></input>
        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
