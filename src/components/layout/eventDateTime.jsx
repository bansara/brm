import React from "react";

const EventDateTime = ({ date, time }) => {
  return (
    <time className="block my-8">
      <p className="uppercase">{date}</p>
      <p className="uppercase">{time}</p>
    </time>
  );
};

export default EventDateTime;
