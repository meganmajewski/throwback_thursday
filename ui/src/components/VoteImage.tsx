import React, { useState } from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "./Error";
export default function VoteImage() {
  const [vpnError, setVPNError] = useState<boolean>(false);
  const [{ data, loading, error }] = useAxios({
    url: "/currentImage",
    method: "get",
  });

  if (loading) return <p>Loading...</p>;
  if (vpnError)
    return (
      <ErrorMessage message="Seems like you might be on VPN! Please disconnect so you can see this week's image." />
    );
  if (error)
    return (
      <ErrorMessage
        message="Something happened while trying to get this week's throwback
  picture."
      />
    );
  if (data.results && data.results.length)
    return (
      <img
        className="image"
        data-testid="baby-image"
        src={data.results[0].url}
        onError={() => {
          setVPNError(true);
        }}
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
