import React from "react";

const Cancellation = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto my-6 pt-20">
        <h1 className="text-darkBlue text-4xl font-medium mb-2">
          Cancellation Policy
        </h1>
        <h5 className="text-sm mb-4">Last revised: 04-07-2025</h5>

        <p className="text-md my-4">
          You can cancel your booking by calling our Customer Support helpline on 7042424242
        </p>
        <p>
            For reservations with fewer than 10 room-nights, if a cancellation occurs, the applicable fee is specified in the corresponding booking details section/booking voucher.

        </p>

        <h4>
            If a booking having at least 10 room-nights is cancelled:
        </h4>

        <ul>
            <li>
                More than 7 days before check-in date: FREE CANCELLATION
            </li>
            <li>
                0-7days before check-in date: 1 night cost will be charged as cancellation fee.
            </li>
            <li>
                In case of no show: Entire booking cost will be charged as cancellation fee.
            </li>
        </ul>


        <p>
            In case of no show entire booking amount will be charged as cancellation fee
        </p>

        <p>
            Refund shall be initiated within 48 hours of receiving the request and the payment would be credited within 5-7 working days via the same mode as used while making the booking.
        </p>
      </div>
    </>
  );
};

export default Cancellation;
