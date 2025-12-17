# API Implementation Summary

## Overview
This document summarizes how the frontend integrates with the backend APIs, including authentication requirements and data mapping.

## Authentication Implementation

### Current Setup
The frontend uses a single axios instance (`servicesAxiosInstance`) that:
1. **Automatically adds Authorization header** if `accessToken` exists in localStorage
2. **Works for both public and protected APIs** - Public APIs work without token, protected APIs get token automatically
3. **Handles token refresh** on 401 errors (if refresh endpoint is available)

### Location: `client/src/services/config.js`
```javascript
// Request interceptor adds token if available
servicesAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Public APIs (No Auth Required)

These endpoints work without authentication:

### 1. Property APIs
- ✅ `GET /properties` - Search/filter properties
- ✅ `GET /properties/random` - Get random properties
- ✅ `GET /properties/:id` - Get property details

**Service:** `client/src/services/propertyService.js`
- `getProperties(params)`
- `getRandomProperties(params)`
- `getPropertyById(propertyId)`

**Usage Example:**
```javascript
import { getProperties, getPropertyById } from '../services';

// No auth needed - works without token
const response = await getProperties({
  whereTo: 'Delhi',
  checkIn: '2025-12-01',
  checkOut: '2025-12-05',
  adults: 2,
  rooms: 1
});

// Response structure:
// {
//   success: true,
//   data: {
//     properties: [...],
//     pagination: {...}
//   }
// }
```

### 2. Location APIs
- ✅ `GET /locations/popular` - Get popular locations
- ✅ `GET /locations/search?query=...` - Search locations

**Service:** `client/src/services/locationService.js`
- `getPopularLocations()`
- `searchLocations(query)`

### 3. Booking APIs (Public)
- ✅ `GET /booking/already-booked-dates/:propertyId` - Get booked dates
- ✅ `POST /booking/payment-success` - Payment success callback
- ✅ `POST /booking/payment-failure` - Payment failure callback

**Service:** `client/src/services/bookingService.js`
- `getAlreadyBookedDates(propertyId, dateRange)`
- `handlePaymentSuccess(paymentData)`
- `handlePaymentFailure(paymentData)`

### 4. Auth APIs (Public)
- ✅ `POST /auth/send-otp` - Send OTP
- ✅ `POST /auth/verify-otp` - Verify OTP and get token

**Service:** `client/src/services/authService.js`
- `sendOtp(payload)`
- `verifyOtp(payload)`

## Protected APIs (Auth Required)

These endpoints require authentication token:

### 1. Booking APIs (Protected)
- 🔒 `POST /booking` - Create booking
- 🔒 `GET /booking/my-bookings` - Get user bookings

**Service:** `client/src/services/bookingService.js`
- `createBooking(bookingData)` - Requires auth
- `getMyBookings(params)` - Requires auth

**Usage Example:**
```javascript
import { createBooking } from '../services';

// Requires auth - token automatically added by interceptor
const response = await createBooking({
  propertyId: 'property_id',
  checkInDate: '2025-12-15',
  checkOutDate: '2025-12-20',
  adults: 2,
  childrens: 1,
  noOfRooms: 1,
  couponCode: 'SAVE20' // optional
});

// Response includes PayU payment gateway data:
// {
//   success: true,
//   data: {
//     payuUrl: "https://secure.payu.in/_payment",
//     params: {...}
//   }
// }
```

### 2. Coupon APIs (All Protected)
- 🔒 `POST /coupons/apply` - Apply coupon
- 🔒 `GET /coupons` - Get all coupons
- 🔒 `POST /coupons` - Create coupon (Admin/Partner)
- 🔒 `PATCH /coupons/toggle-status` - Toggle status (Admin/Partner)

**Service:** `client/src/services/couponService.js`
- `applyCoupon(payload)` - Requires auth
- `getAllCoupons(params)` - Requires auth

**Note:** Coupon application is now handled directly in `createBooking` API call, not as a separate step.

### 3. Auth APIs (Protected)
- 🔒 `POST /auth/complete-profile` - Complete user profile
- 🔒 `GET /auth/profile` - Get user profile

**Service:** `client/src/services/authService.js`
- `completeProfile(payload)` - Requires auth
- `getProfile()` - Requires auth

## Data Mapping

### Property Response Structure
```javascript
// GET /properties response
{
  success: true,
  data: {
    properties: [
      {
        _id: "property_id",
        name: "Property Name",
        type: "villa|hotel|apartment",
        address: {
          fullAddress: "Full address",
          city: "City",
          state: "State",
          country: "Country"
        },
        basePrice: 37000,
        coverImage: "image_url",
        images: ["url1", "url2"],
        capacity: {
          adults: 15,
          childrens: 5
        },
        noOfRooms: 6,
        noOfBaths: 6,
        amenities: ["amenity1", "amenity2"],
        rating: 4.6,
        isActive: true
      }
    ],
    pagination: {
      total: 50,
      page: 1,
      limit: 10,
      totalPages: 5
    }
  }
}

// GET /properties/:id response
{
  success: true,
  data: {
    property: {...},      // Property object
    propertyDetails: {...}, // Additional details
    rooms: [...]         // Room details (for hotels)
  }
}
```

### Booking Response Structure
```javascript
// POST /booking response
{
  success: true,
  data: {
    payuUrl: "https://secure.payu.in/_payment",
    params: {
      key: "merchant_key",
      txnid: "PAYU_1234567890",
      amount: 50000,
      productinfo: "{...}",
      firstname: "John",
      email: "user@example.com",
      phone: "1234567890",
      surl: "success_url",
      furl: "failure_url",
      hash: "hash_string"
    }
  }
}

// GET /booking/my-bookings response
{
  success: true,
  data: {
    bookings: [
      {
        _id: "booking_id",
        bookingId: "BOOK_123456",
        propertyId: {
          _id: "property_id",
          name: "Property Name",
          coverImage: "image_url",
          address: "Address"
        },
        checkIn: "2025-12-15T00:00:00.000Z",
        checkOut: "2025-12-20T00:00:00.000Z",
        nights: 5,
        guests: {
          adults: 2,
          childrens: 1
        },
        priceBreakdown: {
          base: 185000,
          taxes: 33300,
          discount: 0,
          total: 218300
        },
        status: "confirmed|pending|cancelled",
        couponCode: "SAVE20"
      }
    ],
    pagination: {...}
  }
}
```

## Frontend Implementation Details

### 1. Search Page (`client/src/pages/Search.jsx`)
- Uses `getFilteredProperties()` - **Public API**
- Maps response: `response.data.data.properties`
- Handles pagination: `response.data.data.pagination`

### 2. Booking Page (`client/src/pages/BookingPage.jsx`)
- Uses `getPropertyById(id)` - **Public API**
- Maps response: `response.data.data.property`
- Also receives: `response.data.data.propertyDetails` and `response.data.data.rooms`

### 3. Checkout Page (`client/src/pages/Checkout.jsx`)
- Uses `createBooking(bookingData)` - **Protected API**
- Receives PayU payment gateway data
- Creates form and submits to PayU URL

### 4. Trips/Bookings Page (`client/src/pages/TripsBookings.jsx`)
- Uses `getMyBookings(params)` - **Protected API**
- Maps response: `response.data.data.bookings`
- Handles pagination: `response.data.data.pagination`

### 5. Recommended Component (`client/src/components/landingPage/Recommended.jsx`)
- Uses `getRandomProperties()` for "All" category - **Public API**
- Uses `getProperties()` for specific categories - **Public API**
- Maps response: `response.data.data.properties`

## Key Points

1. **No Changes Needed for Public APIs**: The current axios interceptor only adds auth headers if a token exists, so public APIs work correctly without authentication.

2. **Automatic Token Handling**: Protected APIs automatically get the Authorization header if user is logged in.

3. **Response Structure**: All APIs return:
   ```javascript
   {
     success: boolean,
     statusCode: number,
     message: string,
     data: {...}
   }
   ```

4. **Error Handling**: All services use try-catch and handle errors appropriately. 401 errors trigger token refresh attempt.

5. **Data Mapping**: Frontend components correctly map API responses:
   - Properties: `response.data.data.properties` or `response.data.data.property`
   - Bookings: `response.data.data.bookings`
   - Pagination: `response.data.data.pagination`

## Testing Public APIs

To test public APIs without authentication:

```bash
# Test popular locations
curl http://localhost:5000/api/v1/locations/popular

# Test property search
curl "http://localhost:5000/api/v1/properties?whereTo=Delhi&checkIn=2025-12-01&checkOut=2025-12-05&adults=2&rooms=1"

# Test property by ID
curl http://localhost:5000/api/v1/properties/property_id_here
```

All these work without any Authorization header.

## Summary

✅ **Public APIs**: Work without authentication - token is optional
✅ **Protected APIs**: Automatically include token if user is logged in
✅ **Data Mapping**: All components correctly map API responses
✅ **Error Handling**: Proper error handling and token refresh logic
✅ **Documentation**: Complete API documentation in `API_DOCUMENTATION.md`

No changes needed to the authentication system - it already handles both public and protected APIs correctly!

