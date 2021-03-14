import { useState, useContext } from "react";
import { EventContext } from "../../App";

import EventDateTime from "./eventDateTime";
import EventTitle from "./eventTitle";
import EventArtists from "./eventArtists";
import EventDescription from "./eventDescription";
import EventCredits from "./eventCredits";
import DonateBtnLg from "./donateBtnLg";
import Payments from "../stripe/payments";

const EventInfo = () => {
  const event = useContext(EventContext);

  const [showing, setShowing] = useState(false);
  const { title, subtitle, dates } = event;
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
      <DonateBtnLg setShowing={setShowing} />
      <EventDescription />
      <EventCredits />
      {showing && <Payments setShowing={setShowing} />}
    </section>
  );
};

export default EventInfo;
