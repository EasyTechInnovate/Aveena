import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking, getPropertyById } from '../services';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();
  
  const urlParams = new URLSearchParams(location.search);
  const bookingState = location.state || {};
  
  const bookingData = useMemo(() => {
    const checkIn = urlParams.get('checkIn') || bookingState.checkIn || '';
    const checkOut = urlParams.get('checkOut') || bookingState.checkOut || '';
    const adults = parseInt(urlParams.get('adults')) || bookingState.adults || 2;
    const childrens = parseInt(urlParams.get('childrens')) || bookingState.childrens || 0;
    const rooms = parseInt(urlParams.get('rooms')) || bookingState.rooms || 1;
    const propertyId = urlParams.get('propertyId') || bookingState.propertyId || '';
    
    let nights = bookingState.nights;
    if (!nights && checkIn && checkOut) {
      nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    } else if (!nights) {
      nights = 1;
    }
    
    return {
      propertyId,
      property: bookingState.property || null,
      propertyName: bookingState.propertyName || '',
      propertyLocation: bookingState.propertyLocation || '',
      propertyImage: bookingState.propertyImage || '',
      checkIn,
      checkOut,
      adults,
      childrens,
      rooms,
      nights
    };
  }, [location.search, location.state]);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [pricing, setPricing] = useState({
    base: 0,
    taxes: 0,
    discount: 0,
    total: 0
  });
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
      return;
    }

    // Check if profile is complete
    if (user && !user.isProfileComplete) {
      alert('Please complete your profile before proceeding with checkout. You will be redirected to your account page.');
      navigate('/account');
      return;
    }

    if (!bookingData.propertyId || !bookingData.checkIn || !bookingData.checkOut) {
      navigate('/search');
      return;
    }
    
    const calculatePricing = (prop) => {
      if (!prop || !bookingData.nights) return;
      
      const basePrice = prop.basePrice || 0;
      const base = basePrice * bookingData.nights * (bookingData.rooms || 1);
      const taxes = base * 0.18;
      const total = base + taxes;
      
      setPricing({
        base,
        taxes,
        discount: 0,
        total
      });
    };

    if (bookingData.property) {
      const fullPropertyData = bookingData.property;
      const prop = fullPropertyData.property || fullPropertyData;
      setProperty(fullPropertyData);
      calculatePricing(prop);
    } else if (bookingData.propertyId) {
      getPropertyById(bookingData.propertyId)
        .then(response => {
          if (response.data?.success) {
            const fullData = response.data.data;
            setProperty(fullData);
            const prop = fullData.property || fullData;
            calculatePricing(prop);
          }
        })
        .catch(err => {
          console.error('Error fetching property:', err);
          setCouponError('Failed to load property details');
        });
    }
  }, [isAuth, bookingData, navigate]);

  const handleContinue = async () => {
    if (!termsAccepted) return;

    setIsProcessing(true);
    setCouponError('');
    
    try {
      const bookingPayload = {
        propertyId: bookingData.propertyId,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        adults: bookingData.adults || 2,
        childrens: bookingData.childrens || 0,
        noOfRooms: bookingData.rooms || 1
      };

      // Include coupon code if provided
      if (couponCode.trim()) {
        bookingPayload.couponCode = couponCode.trim().toUpperCase();
      }

      let response;
      try {
        response = await createBooking(bookingPayload);
      } catch (err) {
        // Handle 404 - booking endpoint not found (server might be down or route doesn't exist)
        if (err.response?.status === 404) {
          throw new Error('Booking service is currently unavailable. Please try again later.');
        }
        
        // If error is related to coupon and coupon was provided, retry without coupon
        if (couponCode.trim() && (err.response?.data?.message?.toLowerCase().includes('route') || 
            err.response?.data?.message?.toLowerCase().includes('coupon') ||
            err.response?.data?.message?.toLowerCase().includes('not found') ||
            err.response?.status === 404)) {
          // Remove coupon and retry
          delete bookingPayload.couponCode;
          setCouponError('Coupon code could not be applied. Proceeding without coupon.');
          try {
            response = await createBooking(bookingPayload);
          } catch (retryErr) {
            // If retry also fails with 404, it's a server issue
            if (retryErr.response?.status === 404) {
              throw new Error('Booking service is currently unavailable. Please try again later.');
            }
            throw retryErr;
          }
        } else {
          throw err;
        }
      }
      
      if (response.data?.success) {
        const { payuUrl, params } = response.data.data;
        
        // Create and submit form to PayU payment gateway
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = payuUrl;
        
        Object.keys(params).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error(response.data?.message || 'Failed to create booking');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to complete booking';
      setCouponError(errorMessage);
      setIsProcessing(false);
    }
  };

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
                      {bookingData.propertyName || 'UDS Villa - Next to VFS, Walking to Connaught Place'}
                    </h1>
                    <p className="text-gray-600 text-sm mb-4">{bookingData.propertyLocation || 'New Delhi'}</p>


                  </div>

                  <div>
                    <div className='flex items-center justify-between py-4'>
                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check in</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>{bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}</h3>
                            <h5>(From 02:00 PM)</h5>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center bg-darkGreen px-4 py-2 rounded-xl text-sm text-white">
                        <h5>{bookingData.nights ? `For ${bookingData.nights} Night${bookingData.nights > 1 ? 's' : ''}` : 'For 1 Night'}</h5>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check out</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>{bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}</h3>
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
                        <h3 className='font-semibold'>{bookingData.rooms || 1} Room{(bookingData.rooms || 1) > 1 ? 's' : ''}</h3>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        Guests
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/guests.svg" alt="room" className="w-10" />
                        <div>
                          <h3 className='font-semibold'>{((bookingData.adults || 2) + (bookingData.childrens || 0))} Guest{((bookingData.adults || 2) + (bookingData.childrens || 0)) > 1 ? 's' : ''}</h3>
                          <p className='text-sm text-darkGray'>({bookingData.adults || 2} Adult{(bookingData.adults || 2) > 1 ? 's' : ''}{bookingData.childrens ? `, ${bookingData.childrens} Child${bookingData.childrens > 1 ? 'ren' : ''}` : ''})</p>
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
                    src={bookingData.propertyImage || "/assets/checkout/Outdoors.png"}
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
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
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
                    <span className="font-medium">₹{pricing.base.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST <span className="text-sm text-darkGray">(As per government guidelines)</span></span>
                    <span className="font-medium">₹{pricing.taxes.toLocaleString('en-IN')}</span>
                  </div>
                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-green">
                      <span>Discount {couponCode && `(${couponCode})`}</span>
                      <span className="font-medium">-₹{pricing.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="border mx-4 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/assets/checkout/offer.svg" alt="coupon" className="w-10" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          disabled={isProcessing}
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green disabled:opacity-50"
                        />
                        {couponError && (
                          <p className="text-red-500 text-xs mt-1">{couponError}</p>
                        )}
                      </div>
                    </div>
                    {couponCode && (
                      <p className="text-xs text-gray-600">Coupon will be applied during booking</p>
                    )}
                  </div>
                </div>
                <a href="#" className="block text-center mx-4 mb-6 text-blue text-sm mt-2 hover:underline">
                  View more coupons/ Apply Future Stay Voucher
                </a>
                {/* Total Payable */}
                <div className="bg-[#2F80ED1A] rounded-br-xl rounded-bl-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Payable</span>
                    <span className="text-2xl font-bold">₹{(Math.round((pricing.base + pricing.taxes - pricing.discount) * 100) / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Final amount will be calculated by server</p>
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
                disabled={!termsAccepted || isProcessing}
                onClick={handleContinue}
                className={`w-full py-4 px-6 rounded-xl font-semibold cursor-pointer text-lg transition-colors ${termsAccepted && !isProcessing
                  ? 'bg-green hover:bg-darkGreen text-white'
                  : 'bg-gray-300 cursor-not-allowed'
                  }`}
                whileHover={termsAccepted && !isProcessing ? { scale: 1.02 } : {}}
                whileTap={termsAccepted && !isProcessing ? { scale: 0.98 } : {}}
              >
                {isProcessing ? 'Processing...' : 'Continue'}
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
                      src={bookingData.propertyImage || "/assets/checkout/Outdoors.png"}
                      alt="Villa"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Property Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {bookingData.propertyName || 'UDS Villa - Next to VFS, Walking to Connaught Place'}
                    </h3>
                    <p className="text-sm text-darkGray mb-4">{bookingData.propertyLocation || 'New Delhi'}</p>


                  </div>
                </div>

                <div className=''>
                    <div className='flex items-center justify-between py-4'>
                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check in</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>{bookingData.checkIn ? new Date(bookingData.checkIn).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}</h3>
                            <h5>(From 02:00 PM)</h5>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center bg-darkGreen px-4 py-2 rounded-xl text-sm text-white">
                        <h5>{bookingData.nights ? `For ${bookingData.nights} Night${bookingData.nights > 1 ? 's' : ''}` : 'For 1 Night'}</h5>
                      </div>

                      <div className='flex flex-col gap-2'>
                        <h4 className='font-medium'>Check out</h4>
                        <div className='flex items-center gap-2'>
                          <img src="/assets/checkout/date.svg" alt="calendar" className="w-10" />
                          <div className='flex flex-col'>
                            <h3>{bookingData.checkOut ? new Date(bookingData.checkOut).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}</h3>
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
                        <h3 className='font-semibold'>{bookingData.rooms || 1} Room{(bookingData.rooms || 1) > 1 ? 's' : ''}</h3>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h4 className='font-medium'>
                        Guests
                      </h4>
                      <div className='flex items-center gap-2'>
                        <img src="/assets/checkout/guests.svg" alt="room" className="w-10" />
                        <div>
                          <h3 className='font-semibold'>{((bookingData.adults || 2) + (bookingData.childrens || 0))} Guest{((bookingData.adults || 2) + (bookingData.childrens || 0)) > 1 ? 's' : ''}</h3>
                          <p className='text-sm text-darkGray'>({bookingData.adults || 2} Adult{(bookingData.adults || 2) > 1 ? 's' : ''}{bookingData.childrens ? `, ${bookingData.childrens} Child${bookingData.childrens > 1 ? 'ren' : ''}` : ''})</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>



              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate('/trips-bookings');
                  }}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Booking
                </motion.button>
                <motion.button
                  onClick={() => {
                    setShowConfirmation(false);
                    navigate('/');
                  }}
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
