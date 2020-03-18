import React from "react";
import { prependOnceListener } from "cluster";
export default function ErrorMessage(props: { message: string }) {
  return (
    <div className="error">
      <p>
        Oops! <br />
        <br />
        {props.message}
      </p>
    </div>
  );
}
