import TwitchChat from "./twitchChat";

const Chat = () => {
  return (
    <div className="w-full my-4 md:w-1/2 md:my-0">
      <div className="bg-pink px-4 py-2">
        <span className="text-white">CHAT</span>
      </div>
      <TwitchChat />
    </div>
  );
};

export default Chat;
