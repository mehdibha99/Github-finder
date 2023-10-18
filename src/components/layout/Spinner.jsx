import React from "react";
import spinner from "./assets/Spinner.gif";

function Spinner() {
  return (
    <div className="mt-20 w-100">
      <img
        src={spinner}
        alt="Loading..."
        className="text-center mx-auto"
        width={100}
      />
    </div>
  );
}

export default Spinner;
