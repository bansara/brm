const TwitchChat = () => {
  return (
    <div id="twitch-embed" className="w-full h-64">
      <iframe
        src="https://www.twitch.tv/embed/brooklynragamassive/chat?parent=brm-live-portal.web.app&parent=events.brooklynragamassive.org"
        height="100%"
        width="100%"
        title="twitch chat"
      ></iframe>
    </div>
  );
};

export default TwitchChat;
