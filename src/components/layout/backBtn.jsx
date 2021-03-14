import { IoChevronBack } from "react-icons/io5";

const BackBtn = () => {
  return (
    <div className="flex items-center">
      <IoChevronBack fontSize="2.5rem" />
      <p className=" mx-2 text-xl">Back</p>
    </div>
  );
};

export default BackBtn;
