import React from "react";
export default function LastWeeksThrowback(props: {
  url: string;
  cdsid: string;
  id: string;
}) {
  function getVotes(id: string) {
    return "";
  }
  return (
    <div className="last-week-container">
      <div className="flex">
        <img
          className="last-week-image"
          src={props.url}
          alt={`${props.cdsid}'s throwback`}
        />
        <div className="column">
          <h2>Last Week's throwback:</h2>
          <p className="cdsid">{props.cdsid}</p>
          <button onClick={() => getVotes(props.id)}>See Votes</button>
        </div>
      </div>
    </div>
  );
}
