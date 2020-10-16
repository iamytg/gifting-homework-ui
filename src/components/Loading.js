import React from "react";
import { ClipLoader } from "react-spinners";

const _ = ({ show = false }) => {
  return (
    <div
      className={`w-100 h-100 d-flex justify-content-center align-items-center position-fixed loading${
        show ? " in" : ""
      }`}
    >
      <ClipLoader />
    </div>
  );
};

export default _;
