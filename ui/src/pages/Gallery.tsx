import React from "react";
import useAxios from "axios-hooks";
import "../styles/gallery.scss";

export default function Gallery() {
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
  if (error) return <p>Error!</p>;
  if (data)
    return (
      <div className="image-container">
        <div className="image-grid">{printAllImages()}</div>
      </div>
    );
}
