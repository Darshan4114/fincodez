import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-primary border-solid h-16 w-16"></div>
    </div>
  );
};

export default Spinner;
