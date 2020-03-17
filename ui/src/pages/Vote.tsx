import React, { FormEvent, useState } from "react";
import useAxios from "axios-hooks";
import "../styles/vote.scss";
import VoteImage from "../components/VoteImage";

export default function Vote() {
  document.body.classList.remove("gallery");
  document.body.classList.add("vote");

  const [{ data, loading, error }, vote] = useAxios(
    {
      url: "/vote",
      method: "post"
    },
    { manual: true }
  );

  const [cdsid, setCDSID] = useState<string>("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cdsid) {
      vote({
        data: cdsid,
        headers: {
          "Content-Type": "text/plain"
        }
      });
    }
    console.log(cdsid);
  };

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
            className="vote-input"
            data-testid="vote-input"
            required
            minLength={8}
            onChange={({ target: { value } }) => setCDSID(value)}
          ></input>
          <input data-testid="vote-submit" type="submit" value="Vote!"></input>
        </form>
      </div>
      <VoteImage></VoteImage>
    </div>
  );
}
