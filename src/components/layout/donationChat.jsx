import { useState } from "react";
import Donations from "../stripe/donations";
import Chat from "../twitch/chat";
import Payments from "../stripe/payments";

const DonationChat = () => {
  const [showing, setShowing] = useState(false);
  return (
    <div className="w-screen md:flex">
      <Donations setShowing={setShowing} />
      <Chat />
      {showing && <Payments setShowing={setShowing} />}
    </div>
  );
};

export default DonationChat;
