const Navbar = () => {
  return (
    <nav className="h-12 flex items-center justify-between font-serif w-screen px-4">
      <a
        href="https://brooklynragamassive.org"
        target="_blank"
        rel="noreferrer"
        className="text-base md:text-2xl"
      >
        Brooklyn Raga Massive
      </a>
      <p className="text-base md:text-2xl font-sans">LIVE</p>
      <p className="text-base md:text-2xl hidden md:block">WRM Festival 2021</p>
    </nav>
  );
};

export default Navbar;
