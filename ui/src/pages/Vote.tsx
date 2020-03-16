import React, { FormEvent, useState } from "react";
import useAxios from "axios-hooks";

export default function Vote() {
  const [{ data, loading, error }] = useAxios({
    url: "/currentImage",
    method: "get"
  });

  const [cdsid, setCDSID] = useState<string>("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cdsid);
    // vote({
    //   data: cdsid,
    //   headers: {}
    // });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  else if (data)
    return (
      <div>
        <img
          data-testid="baby-image"
          src={data.results[0].url}
          alt="baby picture of the week"
        ></img>
        <form onSubmit={submit}>
          <label>Who do you think this baby is?</label>
          <input
            name="cdsid"
            type="text"
            onChange={({ target: { value } }) => setCDSID(value)}
          ></input>
          <input data-testid="vote-input" type="submit" value="Vote!"></input>
        </form>
      </div>
    );
}
