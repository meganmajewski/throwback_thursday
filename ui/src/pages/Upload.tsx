import React from "react";

export default function Upload() {
  return (
    <div>
      <h1>Upload a picture</h1>
      <form>
        <input type="file" required></input>
        <label>Upload your best baby picture</label>
        <input type="submit" alt="submit" value="Submit"></input>
      </form>
    </div>
  );
}
