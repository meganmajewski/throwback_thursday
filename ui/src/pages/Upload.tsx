import React, { ChangeEvent, FormEvent, useState, createRef } from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "../components/Error";
import "../styles/upload.scss";
export default function Upload() {
  const fileInput = createRef<HTMLInputElement>();
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [cdsid, setCDSID] = useState<string>("");
  const [imgurl, setImageUrl] = useState<string>("");
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
      setImageUrl(files[0].name);
      setImageToUpload(files[0]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return <ErrorMessage message="There was an error uploading your image" />;
  if (data) return <p> Thanks for submitting your image!</p>;

  return (
    <div className="upload-content-container">
      <h1>Upload Image</h1>
      <form data-testid="form" onSubmit={submit}>
        <div className="cdsid-input-container">
          <label className="upload-instructions">
            Enter your CDSID and upload your baby picture to be featured in a
            future Throwback Thursday post!
          </label>
          <input
            data-testid="cdsid"
            required
            type="text"
            name="cdsid"
            className="cdsid-input"
            maxLength={8}
            placeholder="Enter your CDSID"
            onChange={({ target: { value } }) => setCDSID(value)}
          ></input>
        </div>
        <p className="file-instructions"> Choose a file</p>
        <div className="file-input-container">
          <p className="text-input">{imgurl}</p>
          <input
            ref={fileInput}
            data-testid="upload-image"
            onChange={getImageForUpload}
            type="file"
            required
            className="file-input-button"
          ></input>
          <label
            className="file-input-label"
            onClick={() => fileInput.current?.click()}
          >
            Choose File
          </label>
          <br />
        </div>

        <input
          className="upload-submit"
          type="submit"
          alt="submit"
          value="Submit"
        ></input>
      </form>
    </div>
  );
}
