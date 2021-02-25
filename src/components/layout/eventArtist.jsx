import React from "react";

const EventArtist = ({ photoURL, name }) => {
  return (
    <div className="flex items-center">
      <img
        src={photoURL}
        alt={name}
        width="82"
        height="82"
        className="rounded-full mr-2 my-4"
      />
      <p className="font-sans text-base">{name}</p>
    </div>
  );
};

export default EventArtist;
