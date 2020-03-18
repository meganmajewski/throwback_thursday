import React, { FormEvent, useState } from "react";
import useAxios from "axios-hooks";
export default function VoteImage() {
  const [{ data, loading, error }] = useAxios({
    url: "/currentImage",
    method: "get"
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);
  if (data.results.length)
    return (
      <img
        className="image"
        data-testid="baby-image"
        src={data.results[0].url}
        alt="throw back of the week"
      ></img>
    );
  else
    return (
      <div className="vote-image-error">
        <p>
          Oops!
          <br />
          <br /> Something happened while trying to get this week's throwback
          picture.
        </p>
      </div>
    );
}
