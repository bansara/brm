import React from "react";

const EventArtist = ({ photoURL, name }) => {
  const nameSplit = name.split(",");
  return (
    <div className="flex items-center">
      <img
        src={photoURL}
        alt={name}
        width="82"
        height="82"
        className="rounded-full mr-2 my-4"
      />
      <p className="font-sans text-base">
        <span>{nameSplit[0]}</span>
        <span className="font-bold">
          {nameSplit[1] ? `,${nameSplit[1]}` : ""}
        </span>
      </p>
    </div>
  );
};

export default EventArtist;
