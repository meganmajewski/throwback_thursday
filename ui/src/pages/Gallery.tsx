import React from "react";
import useAxios from "axios-hooks";

export default function Gallery() {
  const [{ data, loading, error }, uploadImage] = useAxios({
    baseURL: "http://localhost:5000",
    url: "/allImages",
    method: "get"
  });

  const printAllImages = () => {
    console.log("data", data);
    return data.map((src: string, key: string) => {
      return <img key={key} src={src}></img>;
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

  // return <div>everything returned {JSON.stringify(data)}</div>;
}
