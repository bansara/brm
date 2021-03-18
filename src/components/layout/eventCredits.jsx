import { useContext } from "react";
import { EventContext } from "../../App";

const EventCredits = () => {
  const event = useContext(EventContext);
  const { credits } = event;
  return (
    <section className="text-center max-w-lg mx-auto">
      <h3 className="font-serif text-3xl">Credits</h3>
      {credits.map((credit, i) => (
        <div className="my-8" key={`${credit.category}${i}`}>
          <p className="text-grayDark">{credit.category}</p>
          {credit.people.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </div>
      ))}
      <p>
        This program is supported, in part, by public funds from the New York
        City Department of Cultural Affairs in partnership with the City
        Council.
      </p>
    </section>
  );
};

export default EventCredits;
