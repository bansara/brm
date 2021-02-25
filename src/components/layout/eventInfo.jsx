import React, { useContext } from "react";
import EventDateTime from "./eventDateTime";
import EventTitle from "./eventTitle";
import EventArtists from "./eventArtists";

import { EventContext } from "../../App";

const EventInfo = () => {
  const event = useContext(EventContext);
  const { title, subtitle, dates } = event;
  console.log(event);
  return (
    <section>
      <EventTitle title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        {dates.map((date) => (
          <div key={date.date} className="flex flex-col">
            <EventDateTime date={date.date} time={date.time} />
            <EventArtists performerCategories={date.performerCategories} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventInfo;
