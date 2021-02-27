import React, { useContext, useRef, useLayoutEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore, EventContext } from "../../App";
import DonateBtnSm from "../layout/donateBtnSmall";

const Donations = ({ setShowing }) => {
  const event = useContext(EventContext);
  const donationContainer = useRef();
  // get donations
  const donationsRef = firestore.collection("donations");
  const query = donationsRef
    .where("eventId", "==", event.uid)
    .orderBy("createdAt");
  const [donations] = useCollectionData(query, {
    idField: "id",
  });
  // scroll on new donation
  useLayoutEffect(() => {
    const containerBoundary = donationContainer.current.getBoundingClientRect();
    donationContainer.current.scrollTo({
      top: containerBoundary.bottom,
      left: 0,
      behavior: "smooth",
    });
  }, [donations]);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-between border-r-2 border-champagne">
      <div className="bg-blue px-4 py-2">
        <span className="text-white">DONATIONS</span>
      </div>
      <div
        className="overflow-y-scroll h-48 max-h-48 bg-white"
        ref={donationContainer}
      >
        {donations &&
          donations.map((donationObj, i) => (
            <div
              className="flex justify-between my-2 px-4 text-sm sm:text-base"
              key={donationObj.id}
            >
              <span className="text-grayDark">
                {`${new Date(donationObj.createdAt.seconds * 1000)
                  .toDateString()
                  .slice(0, 3)} ${new Date(donationObj.createdAt.seconds * 1000)
                  .toLocaleTimeString()
                  .slice(0, -6)} ${new Date(
                  donationObj.createdAt.seconds * 1000
                )
                  .toLocaleTimeString()
                  .slice(8)
                  .toLowerCase()}
                  `}
              </span>
              <span className="amount">
                ${donationObj.amount / 100} from {donationObj.name}
              </span>
            </div>
          ))}
        <div></div>
      </div>
      <div className="py-2 bg-white  flex-1">
        <DonateBtnSm setShowing={setShowing} />
      </div>
    </div>
  );
};

export default Donations;
