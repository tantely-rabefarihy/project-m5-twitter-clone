import React, { useState } from "react";

export const useInput = (initialValue) => {
  const [statusData, setStatusData] = useState(initialValue);

  return {
    statusData,
    setStatusData,
    reset: () => setStatusData(""),
    bind: {
      statusData,
      onChange: (event) => {
        setStatusData(event.target.value);
      },
    },
  };
};
