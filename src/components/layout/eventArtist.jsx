import { useState } from "react";
import { storage } from "../../App";

const EventArtist = ({ photoURL, name }) => {
  const [url, setUrl] = useState("");
  const nameSplit = name.split(",");
  storage
    .refFromURL(photoURL)
    .getDownloadURL()
    .then((path) => setUrl(path));
  return (
    <div className="flex items-center">
      <img
        src={url}
        alt={name}
        width="81"
        height="80"
        className="rounded-full mr-2 my-4"
        loading="lazy"
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
