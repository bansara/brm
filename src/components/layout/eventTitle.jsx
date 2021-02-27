import React from "react";

const EventTitle = ({ title, subtitle }) => {
  return (
    <header className="py-24 border-b-2 border-gray">
      <h1 className="text-3xl font-bold font-serif text-center">{title}</h1>
      <h2 className="text-xl font-serif text-center">{subtitle}</h2>
    </header>
  );
};

export default EventTitle;
