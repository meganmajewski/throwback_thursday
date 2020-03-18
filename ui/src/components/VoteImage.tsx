import React from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "./Error";
export default function VoteImage() {
  const [{ data, loading, error }] = useAxios({
    url: "/currentImage",
    method: "get"
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <ErrorMessage
        message="Something happened while trying to get this week's throwback
  picture."
      />
    );
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
      <ErrorMessage
        message="Something happened while trying to get this week's throwback
      picture."
      />
    );
}
