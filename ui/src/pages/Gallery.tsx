import React from "react";
import useAxios from "axios-hooks";

export default function Gallery() {
  const [{ data, loading, error }] = useAxios({
    url: "/allImages",
    method: "get"
  });

  const printAllImages = () => {
    return data.results.map((src: { id: string; url: string }) => {
      return <img src={src.url}></img>;
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data)
    return (
      <div>
        {printAllImages()}
        Thanks for submitting your image! {JSON.stringify(data)}
      </div>
    );
}
