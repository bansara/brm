import React from "react";
import EventArtist from "./eventArtist";

const EventArtists = ({ performerCategories }) => {
  return (
    <div className="border-b-2 border-gray pb-12 flex-1 mt-0">
      {performerCategories.map((category) => (
        <div key={category.name}>
          <h4 className="font-sans uppercase text-base font-bold mb-4">
            {category.name}
          </h4>
          {category.artists.map((artist) => (
            <EventArtist
              photoURL={artist.photoURL}
              name={artist.name}
              key={artist.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventArtists;
