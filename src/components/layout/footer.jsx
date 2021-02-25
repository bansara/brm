import React from "react";

const Footer = () => {
  return (
    <footer className="max-w-lg mx-auto my-16">
      <p>
        Ragas Live Festival is supported by the{" "}
        <a
          href="https://www.brooklynartscouncil.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue underline"
        >
          Brooklyn Arts Council
        </a>
        .{" "}
        <a
          href="https://www.brooklynartscouncil.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue underline"
        >
          Brooklyn Arts Fund (DCLA)
        </a>{" "}
        is sponsored, in part, by the Greater New York Arts Development Fund of
        the New York City Department of Cultural Affairs, administered by{" "}
        <a
          href="https://www.brooklynartscouncil.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue underline"
        >
          Brooklyn Arts Council (BAC)
        </a>
        .
      </p>
      <div className="flex justify-center my-8">
        <div className="rounded-br-full	rounded-tr-full bg-blue w-16 h-16 m-8"></div>
        <div className="rounded-br-full	rounded-tr-full	bg-pink w-16 h-16 m-8"></div>
        <div className="rounded-br-full	rounded-tr-full	bg-gold w-16 h-16 m-8"></div>
      </div>
    </footer>
  );
};

export default Footer;
