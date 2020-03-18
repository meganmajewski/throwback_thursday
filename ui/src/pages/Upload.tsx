import React, { ChangeEvent, FormEvent, useState } from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "../components/Error";
import "../styles/upload.scss";
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
    <div className="upload-content-container">
      <h1>Upload a picture</h1>
      <form data-testid="form" onSubmit={submit}>
        <div className="file-input-container">
          <input
            data-testid="upload-image"
            onChange={getImageForUpload}
            type="file"
            required
            className="file-input-button"
          ></input>
          <label className="file-input-label">Choose File</label>
          <br />
        </div>
        <div className="cdsid-input-container">
          <label>Add your CDSID</label>
          <input
            data-testid="cdsid"
            required
            type="text"
            name="cdsid"
            maxLength={8}
            onChange={({ target: { value } }) => setCDSID(value)}
          ></input>
        </div>

        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
