import React from "react";

const EventDateTime = ({ date, time }) => {
  return (
    <time className="block mt-8 mb-4">
      <p className="uppercase">{date}</p>
      <p className="uppercase">{time}</p>
    </time>
  );
};

export default EventDateTime;
