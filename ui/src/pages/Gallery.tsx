import React from "react";
import useAxios from "axios-hooks";
import "../styles/gallery.scss";
import ErrorMessage from "../components/Error";

export default function Gallery() {
  document.body.classList.remove("vote");
  document.body.classList.add("gallery");
  const [{ data, loading, error }] = useAxios({
    url: "/allImages",
    method: "get"
  });

  const printAllImages = () => {
    return data.results.map(
      (
        src: { id: string; url: string; revealed: boolean; cdsid: string },
        index: string
      ) => {
        return (
          src.url && (
            <div
              className={src.revealed ? "image revealed" : "image not-revealed"}
              key={index}
            >
              {src.revealed && (
                <div className="cdsid-container">
                  <span className="cdsid">{src.cdsid}</span>
                </div>
              )}
              <img src={src.url}></img>
            </div>
          )
        );
      }
    );
  };
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <ErrorMessage message="Error getting images for the gallery"></ErrorMessage>
    );
  if (data.results)
    return (
      <div className="image-container">
        <div className="image-grid">{printAllImages()}</div>
      </div>
    );
  else
    return (
      <ErrorMessage message="Error getting images for the gallery"></ErrorMessage>
    );
}
