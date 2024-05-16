import React from "react";
import Accordion from "./Accordian";

const AccordianRender = () => {
  const accordionData = [
    {
      title: "Section 1",
      content: "Content for Section 1",
    },
    {
      title: "Section 2",
      content: "Content for Section 2",
    },
    {
      title: "Section 3",
      content: "Content for Section 3",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <Accordion data={accordionData} />
    </div>
  );
};

export default AccordianRender;
