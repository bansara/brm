const TwitchPlayer = () => {
  return (
    <div id="twitch-embed" className="w-screen h-90">
      <iframe
        src="https://player.twitch.tv/?channel=brooklynragamassive&parent=brm-live-portal.web.app&parent=events.brooklynragamassive.org"
        height="100%"
        width="100%"
        allowFullScreen="<allowfullscreen>"
        title="twitch player"
      ></iframe>
    </div>
  );
};

export default TwitchPlayer;
