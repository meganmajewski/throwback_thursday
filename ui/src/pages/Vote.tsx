import React, { FormEvent, useState } from "react";
import useAxios from "axios-hooks";
import "../styles/vote.scss";

export default function Vote() {
  document.body.classList.remove("gallery");
  document.body.classList.add("vote");
  const [{ data, loading, error }] = useAxios({
    url: "/currentImage",
    method: "get"
  });

  const [cdsid, setCDSID] = useState<string>("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cdsid);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  else if (data)
    return (
      <div>
        <div className="form-container">
          <form onSubmit={submit}>
            <label>
              <h2>Vote on this week's throwback!</h2>
            </label>
            <input
              name="cdsid"
              type="text"
              className="cdsid-input"
              onChange={({ target: { value } }) => setCDSID(value)}
            ></input>
            <input data-testid="vote-input" type="submit" value="Vote!"></input>
          </form>
        </div>
        <img
          className="image"
          data-testid="baby-image"
          src={data.results[0].url}
          alt="baby picture of the week"
        ></img>
      </div>
    );
}
