import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header with Breadcrumbs */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm text-blue">
            <span>Home</span>
         <span className="mx-2 text-darkGray">&gt;</span>
<span>Villas in Alibaug</span>
<span className="mx-2 text-darkGray">&gt;</span>
<span>Pranaam Villa in Alibaug</span>
<span className="mx-2 text-darkGray">&gt;</span>
<span className="text-gray-900 font-medium">Payment</span>

          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Information */}
            <div className="border rounded-lg p-6 ">
              <div className="flex gap-6">
                <div>
                  <div className="flex-1 border-b-2 h-fit">
                    <h1 className="text-xl font-semibold mb-2">
                      UDS Villa - Next to VFS, Walking to Connaught Place
                    </h1>
                    <p className="text-gray-600 text-sm mb-4">New Delhi</p>


                  </div>

                  <div>
                    <div className='flex items-center justify-between py-4'>
                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check in</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>Wed 3 Sep 2025</h3>
                            <h5>(From 02:00 PM)</h5>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center bg-darkGreen px-4 py-2 rounded-xl text-sm text-white">
                        <h5>For 1 Night</h5>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check out</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>Thu 4 Sep 2025</h3>
                            <h5>(Until 11:00 AM)</h5>
                          </div>
                        </div>
                      </div>



                    </div>
                  </div>

                  <div className='flex items-center gap-8 mt-4'>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        No. of Rooms
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/rooms.svg" alt="room" className="w-10" />
                        <h3 className='font-semibold'>2 Rooms</h3>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        Guests
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/guests.svg" alt="room" className="w-10" />
                        <div>
                          <h3 className='font-semibold'>2 Guests</h3>
                          <p className='text-sm text-darkGray'>(2 Adults )</p>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

                <div className="">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <img src="/assets/booking/guestFav_left_leaf.svg" alt="rating" className="h-5" />
                      <span className="font-bold text-nowrap text-md">Like a 5*</span>
                      <img src="/assets/booking/guestFav_right_leaf.svg" alt="rating" className="h-5" />
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/assets/booking/star.svg" alt="star" className="w-4" />
                      <span className="font-semibold">4.6</span>
                      <span className="text-gray-500">/5</span>
                    </div>
                    <a href="#" className="text-blue text-nowrap underline font-semibold text-sm">
                      63 Reviews
                    </a>
                  </div>
                  <img
                    src="/assets/checkout/Outdoors.png"
                    alt="Villa"
                    className="w-[210px] ml-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>


            {/* Important Information */}
            <div className="rounded-lg p-6 border">
              <h2 className="text-lg font-semibold mb-3">Important information</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                This property offers transfers from the airport. Guests must contact the property with arrival details before travel, using the contact information on the booking confirmation. To make arrangements for check-in please contact the property at least 24 hours before arrival using the information on the booking confirmation. Guests must contact the property in advance for check-in instructions. Front desk staff will greet guests on arrival at the property. Please note that Expedia and the hotel will not issue a tax invoice. You will receive a commercial receipt for the purpose of the transaction.
              </p>
            </div>

            {/* Booking & Cancellation Policy */}
            <div className="rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Booking & Cancellation policy</h2>
              <div className="mb-4">
                <div className="">
                  <img src="/assets/checkout/cancelation.svg" alt="refund" className="w-10 mb-4" />
                </div>
                <div>
                  <p className="font-medium
                 text-darkBlue
                 ">No Refund</p>
                  <p className="text-sm text-darkGray">On your selected dates</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 text-darkBlue border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Refund Policy
                </button>
                <button className="px-4 py-2 text-darkBlue border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Home Rules and Policy
                </button>
              </div>
            </div>

            {/* Assistance Section */}
            <div className="bg-[linear-gradient(275.02deg,#9ccdfb33_0%,#fcc99233_100%),linear-gradient(107.22deg,#17ff581c_1.46%,#016c6e1c_99.96%)] rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Any issue to complete your booking?</p>
                <button className="text-darkGray border border-darkGray rounded-lg px-4 py-2 font-medium cursor-pointer">
                  Click here
                </button>
              </div>
            </div>

            {/* Special Requests */}
            <div className="rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Any special requests?</h2>
              <textarea
                placeholder="Write here......"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Column - Price Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">

              <div className='border rounded-xl'>

                {/* Zero Convenience Fees Message */}
                <div className="mb-6 mx-4 pt-4 border-b pb-3">
                  <h2 className="text-lg font-semibold mb-4">Price details</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-darkGreen font-normal text-nowrap text-sm">
                      You pay zero convenience fees on your booking!
                    </p>
                    <img src="/assets/checkout/info-circle.svg" alt="convinience" className="w-5" />
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 mb-6 px-4">
                  <div className="flex justify-between">
                    <span>Rental Charges</span>
                    <span className="font-medium">₹16,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST <span className="text-sm text-darkGray">(As per government guidelines)</span></span>
                    <span className="font-medium">₹3,024</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="border flex justify-between mx-4 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <img src="/assets/checkout/offer.svg" alt="coupon" className="w-10" />
                    <div>
                      <span className="font-semibold">ESCAPE5</span>
                      <p className="text-sm text-green">Apply to save upto ₹1,500</p>
                    </div>
                  </div>
                  <button className="text-blue text-sm cursor-pointer">
                    Apply
                  </button>

                </div>
                <a href="#" className="block text-center mx-4 mb-6 text-blue text-sm mt-2 hover:underline">
                  View more coupons/ Apply Future Stay Voucher
                </a>
                {/* Total Payable */}
                <div className="bg-[#2F80ED1A] rounded-br-xl rounded-bl-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Payable</span>
                    <span className="text-2xl font-bold">₹19,824</span>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="my-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-8 h-8 text-green border border-darkGreen rounded focus:ring-green"
                  />
                  <span className="text-xs text-darkGray leading-relaxed">
                    I have read and accepted the{' '}
                    <a href="/terms" className="underline">Terms & Conditions</a>,{' '}
                    <a href="/privacy" className="underline">Privacy Policies</a>,{' '}
                    <a href="/cancellation" className="underline">Cancellation Policy</a>{' '}
                    and{' '}
                    <a href="#" className="underline">Indemnity Form</a>
                  </span>
                </label>
              </div>

              {/* Continue Button */}
              <motion.button
                disabled={!termsAccepted}
                onClick={() => setShowConfirmation(true)}
                className={`w-full py-4 px-6 rounded-xl font-semibold cursor-pointer text-lg transition-colors ${termsAccepted
                  ? 'bg-green hover:bg-darkGreen text-white'
                  : 'bg-gray-300 cursor-not-allowed'
                  }`}
                whileHover={termsAccepted ? { scale: 1.02 } : {}}
                whileTap={termsAccepted ? { scale: 0.98 } : {}}
              >
                Continue
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/assets/checkout/conf.svg" alt="success" className="w-full h-full" />
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Your booking is confirmed!
                </h2>
                <p className="text-sm text-darkGray leading-relaxed">
                  Thank you for choosing [Hotel Name]. A confirmation email with your booking details has been sent to you. We look forward to welcoming you soon!
                </p>
              </div>

              {/* Property Details Card */}
              <div className="rounded-xl p-4 border my-4">
                <div className="flex gap-6 pb-4 border-b mb-4">
                  {/* Property Image */}
                  <div className="w-48 aspect-video  flex-shrink-0">
                    <img
                      src="/assets/checkout/Outdoors.png"
                      alt="Villa"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Property Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      UDS Villa - Next to VFS, Walking to Connaught Place
                    </h3>
                    <p className="text-sm text-darkGray mb-4">New Delhi</p>


                  </div>
                </div>

                <div className=''>
                    <div className='flex items-center justify-between py-4'>
                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check in</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>Wed 3 Sep 2025</h3>
                            <h5>(From 02:00 PM)</h5>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center bg-darkGreen px-4 py-2 rounded-xl text-sm text-white">
                        <h5>For 1 Night</h5>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check out</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>Thu 4 Sep 2025</h3>
                            <h5>(Until 11:00 AM)</h5>
                          </div>
                        </div>
                      </div>



                    </div>
                    <div className='flex items-center gap-16'>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        No. of Rooms
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/rooms.svg" alt="room" className="w-10" />
                        <h3 className='font-semibold'>2 Rooms</h3>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        Guests
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/guests.svg" alt="room" className="w-10" />
                        <div>
                          <h3 className='font-semibold'>2 Guests</h3>
                          <p className='text-sm text-darkGray'>(2 Adults )</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>



              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Booking
                </motion.button>
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
