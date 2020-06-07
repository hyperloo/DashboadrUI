import React from "react";

const Loader = ({ size }) => {
  return (
    <span className="loader">
      {size === "sm" ? <div className="sm"></div> : <div className="lg"></div>}
    </span>
  );
};

export default Loader;
