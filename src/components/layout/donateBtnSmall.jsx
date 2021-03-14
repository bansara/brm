const DonateBtnSm = ({ setShowing }) => {
  return (
    <div className="px-4">
      <button
        className="py-2 px-8 rounded bg-gold hover:bg-red hover:shadow-md hover:text-white transition-all text-black text-base block"
        onClick={() => setShowing(true)}
      >
        Donate
      </button>
    </div>
  );
};

export default DonateBtnSm;
