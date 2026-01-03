import React from "react";

export const Loading = (isLoading) => {
  if (!isLoading) return null;
  return (
    <>
      <div>
        <p className="text-center font-bold text-3xl">Loading.........</p>;
      </div>
    </>
  );
};
