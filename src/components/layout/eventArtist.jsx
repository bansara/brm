import { useState } from "react";
import { storage } from "../../App";

const EventArtist = ({ photoURL, name, link }) => {
  const [url, setUrl] = useState("");
  const nameSplit = name.split(",");
  storage
    .refFromURL(photoURL)
    .getDownloadURL()
    .then((path) => setUrl(path));
  return (
    <div className="flex items-center">
      <a href={link} target="_blank" rel="noreferrer">
        <img
          src={url}
          alt={name}
          width="81"
          height="80"
          className="rounded-full mr-2 my-4"
          loading="lazy"
        />
      </a>
      <a href={link} target="_blank" rel="noreferrer">
        <p className="font-sans text-base hover:underline">
          <span>{nameSplit[0]}</span>
          <span className="font-bold">
            {nameSplit[1] ? `,${nameSplit[1]}` : ""}
          </span>
        </p>
      </a>
    </div>
  );
};

export default EventArtist;
