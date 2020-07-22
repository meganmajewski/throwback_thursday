import React from "react";
import useAxios from "axios-hooks";
import ErrorMessage from "./Error";
export default function LastWeeksThrowback(props: {
  url: string;
  cdsid: string;
  id: string;
}) {
  const [{ data, error }, getVotes] = useAxios(
    {
      url: "/voteResultsByImageid",
      method: "get",
    },
    { manual: true }
  );
  function showVotes() {
    if (data) {
      return data.results.map((obj: { vote: string; count: string }) => {
        return (
          <div className="votes">
            <b>{obj.vote}</b>: {obj.count}
          </div>
        );
      });
    }
  }

  const errorMessage = (
    <ErrorMessage message="Error fetching last week's results"></ErrorMessage>
  );

  if (error) return errorMessage;

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
          {data ? showVotes() : ""}
          <button
            className="button pink"
            onClick={() =>
              getVotes({
                params: { image_id: props.id },
              })
            }
          >
            See Votes
          </button>
        </div>
      </div>
    </div>
  );
}
