import { useState } from "react";
import { storage } from "../../App";

const Footer = () => {
  const [url, setUrl] = useState("");

  storage
    .refFromURL("gs://brm-live-portal.appspot.com/brm logo .png")
    .getDownloadURL()
    .then((path) => setUrl(path));
  return (
    <>
      <section className="max-w-lg mx-auto my-16">
        <div className="flex justify-center my-8">
          <div className="rounded-br-full	rounded-tr-full bg-blue w-16 h-16 m-8"></div>
          <div className="rounded-br-full	rounded-tr-full	bg-pink w-16 h-16 m-8"></div>
          <div className="rounded-br-full	rounded-tr-full	bg-gold w-16 h-16 m-8"></div>
        </div>
      </section>
      <footer className="bg-pink p-8 w-screen lg:flex lg:justify-between lg:items-center">
        <a
          href="https://brooklynragamassive.org"
          target="_blank"
          rel="noreferrer"
          className="block h-20 mx-auto"
        >
          <img
            src={url}
            alt="Brooklyn Raga Massive Logo"
            width="195"
            height="80"
          />
        </a>
        <p className="text-center my-8">
          © {new Date().getFullYear()} Brooklyn Raga Massive. All Rights
          Reserved.
        </p>
        <div className="mx-auto grid-cols-1 grid-rows-5 justify-center grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-6">
          <a
            href="https://www.brooklynragamassive.org/about/our-team"
            target="_blank"
            rel="noreferrer"
            className="text-center hover:underline"
          >
            About Us
          </a>
          <a
            href="https://www.brooklynragamassive.org/music/performance"
            target="_blank"
            rel="noreferrer"
            className="text-center hover:underline"
          >
            Music
          </a>
          <a
            href="https://www.brooklynragamassive.org/education"
            target="_blank"
            rel="noreferrer"
            className="text-center hover:underline"
          >
            Education
          </a>
          <a
            href="https://www.brooklynragamassive.org/events"
            target="_blank"
            rel="noreferrer"
            className="text-center hover:underline"
          >
            Events
          </a>
          <a
            href="https://www.brooklynragamassive.org/support-us"
            target="_blank"
            rel="noreferrer"
            className="text-center hover:underline"
          >
            Support Us
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
