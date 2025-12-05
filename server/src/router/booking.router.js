import { Router } from 'express';
import bookingController from '../controller/Booking/booking.controller.js';
import validator from '../middleware/validator.js';
import { createBookingSchema, paymentSuccessSchema, paymentFailureSchema } from '../schemas/booking.schema.js';
import authentication from '../middleware/authentication.js';

const router = Router();

router.post('/payment-success', validator(paymentSuccessSchema, "body"), bookingController.paymentSuccess);
router.post('/payment-failure', validator(paymentFailureSchema, "body"), bookingController.paymentFailure);
router.get('/already-booked-dates/:propertyId', bookingController.getBookedDatesForaProperty);

router.use(authentication);

router.post('/', validator(createBookingSchema, "body"), bookingController.createBooking);
router.get('/my-bookings', bookingController.getMyBookings);

export default router;
