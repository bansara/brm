import Donations from "../stripe/donations";
import Chat from "../twitch/chat";
const DonationChat = ({ setShowing }) => {
  return (
    <div className="w-screen md:flex">
      <Donations setShowing={setShowing} />
      <Chat />
    </div>
  );
};

export default DonationChat;
