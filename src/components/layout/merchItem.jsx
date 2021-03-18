import { useState } from "react";
import { storage } from "../../App";
import { BiChevronRight } from "react-icons/bi";

const MerchItem = ({ item }) => {
  const [url, setUrl] = useState("");
  const { name, price, photoURL } = item;
  storage
    .refFromURL(photoURL)
    .getDownloadURL()
    .then((path) => setUrl(path));
  return (
    <div className="flex flex-col items-center my-4">
      <a
        href="https://brooklynragamassive.bandcamp.com/merch"
        target="_blank"
        rel="noreferrer"
      >
        <img src={url} width="300" height="300" loading="lazy" alt={name} />
        <div>
          <p className="font-bold text-sm my-2">{name}</p>
          <p className="text-sm my-2">${price} USD</p>
          <p className="flex items-center my-2">
            Buy Now <BiChevronRight size="1.5rem" />
          </p>
        </div>
      </a>
    </div>
  );
};

export default MerchItem;
