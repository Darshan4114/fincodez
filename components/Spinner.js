import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-10 w-10 p-4">
      <div className="animate-spin rounded-full border-t-4 border-white border-solid h-10 w-10"></div>
    </div>
  );
};

export default Spinner;
