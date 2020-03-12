import React from "react";
import useAxios from "axios-hooks";
import "../styles/gallery.scss";

export default function Gallery() {
  const [{ data, loading, error }] = useAxios({
    url: "/allImages",
    method: "get"
  });

  const printAllImages = () => {
    return data.results.map((src: { id: string; url: string }) => {
      return (
        <div className="image">
          <img src={src.url}></img>
        </div>
      );
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data)
    return (
      <div className="image-container">
        Thanks for submitting your image!
        <div className="image-grid">{printAllImages()}</div>
      </div>
    );
}
