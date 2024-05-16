import React, { useState, useEffect } from "react";
import "./Tracking.css";
import { TiTick } from "react-icons/ti";

const TrackingComponent = ({ currentStepNumber, type }) => {
  let steps = [];
  if (type === "pickup") {
    steps = [
      "Request sent",
      "Picked up",
      "Under Extraction",
      "Reward Generated",
      "Ticket Closed",
    ];
  } else if (type === "drop") {
    steps = [
      "Request sent",
      "Dropped",
      "Under Extraction",
      "Reward Generated",
      "Ticket Closed",
    ];
  }

  const [currentStep, setCurrentStep] = useState(currentStepNumber);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setCurrentStep(currentStepNumber);
  }, [currentStepNumber]);

  return (
    <>
      <div className="flex justify-between h-max">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrackingComponent;
