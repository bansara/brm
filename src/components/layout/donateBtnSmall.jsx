import React from "react";

const DonateBtnSm = ({ setShowing }) => {
  return (
    <div className="px-4">
      <button
        className="py-2 px-8 rounded bg-gold text-white text-base block"
        onClick={() => setShowing(true)}
      >
        Donate
      </button>
    </div>
  );
};

export default DonateBtnSm;
