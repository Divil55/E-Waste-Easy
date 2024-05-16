import React, { useState } from "react";

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <div
          key={index}
          className="border rounded border-gray-800 my-4 bg-slate-200"
        >
          <button
            className="w-full py-4 px-4 flex justify-center items-center focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg font-medium text-center w-full">
              {item.title}
            </span>
            <svg
              className={`w-6 h-6 transition-transform ${
                activeIndex === index ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          {activeIndex === index && (
            <div className="py-2 px-4">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
