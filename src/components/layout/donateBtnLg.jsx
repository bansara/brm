const DonateBtnLg = ({ setShowing }) => {
  return (
    <div className="m-16">
      <button
        className="py-4 px-16 rounded bg-gold hover:bg-red hover:shadow-md hover:text-white transition-all text-xl text-black mx-auto block"
        onClick={() => setShowing(true)}
      >
        Donate
      </button>
    </div>
  );
};

export default DonateBtnLg;
