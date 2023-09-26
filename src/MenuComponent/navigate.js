import React from "react";

import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const NavigateBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one step in the history
  };
  return (
    <span style={{ cursor: "pointer", textAlign: "left" }} onClick={goBack}>
      &lt; Back
    </span>
  );
};

export default NavigateBack;
