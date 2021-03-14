import { useContext } from "react";
import { EventContext } from "../../App";

const EventDescription = () => {
  const event = useContext(EventContext);
  const { description } = event;
  return (
    <section className="max-w-lg mx-auto mb-12">
      {description.map((paragraph, i) => (
        <p key={i} className="my-6">
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default EventDescription;
