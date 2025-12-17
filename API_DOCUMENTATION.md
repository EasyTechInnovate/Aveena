# Aveena API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## 🔐 Authentication Summary

### Public APIs (No Auth Required)
These endpoints work without any authentication token:
- ✅ All Property GET endpoints (`/properties`, `/properties/random`, `/properties/:id`)
- ✅ All Location endpoints (`/locations/popular`, `/locations/search`)
- ✅ Booking date check (`/booking/already-booked-dates/:propertyId`)
- ✅ Payment callbacks (`/booking/payment-success`, `/booking/payment-failure`)
- ✅ Auth OTP endpoints (`/auth/send-otp`, `/auth/verify-otp`)

### Protected APIs (Auth Required)
These endpoints require `Authorization: Bearer <accessToken>` header:
- 🔒 Property management (POST, PUT, PATCH `/properties/*`)
- 🔒 Booking creation (`POST /booking`)
- 🔒 User bookings (`GET /booking/my-bookings`)
- 🔒 All Coupon endpoints (`/coupons/*`)
- 🔒 Profile completion (`POST /auth/complete-profile`)
- 🔒 Get profile (`GET /auth/profile`)

**Note:** The frontend axios instance automatically adds the Authorization header if a token exists in localStorage. Public APIs will work fine without a token, and protected APIs will automatically include the token when available.

## Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "statusCode": 200,
  "request": {
    "ip": "127.0.0.1",
    "method": "GET",
    "url": "/api/v1/properties"
  },
  "message": "Success message",
  "data": { ... }
}
```

---

## 🔓 PUBLIC APIs (No Authentication Required)

### 1. Property APIs

#### GET /properties
Get list of properties with filters and pagination.

**Query Parameters:**
- `whereTo` (string, required) - Location/Destination
- `checkIn` (string, required) - Check-in date (YYYY-MM-DD)
- `checkOut` (string, required) - Check-out date (YYYY-MM-DD)
- `adults` (number, default: 1) - Number of adults
- `childrens` (number, default: 0) - Number of children
- `rooms` (number, default: 1) - Number of rooms
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `sortBy` (string, optional) - Sort option: `price_low_to_high`, `price_high_to_low`, `recommended`
- `search` (string, optional) - Search by property name

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "properties": [
      {
        "_id": "property_id",
        "name": "Property Name",
        "type": "villa|hotel|apartment",
        "address": {
          "fullAddress": "Full address string",
          "city": "City name",
          "state": "State name",
          "country": "Country name"
        },
        "basePrice": 37000,
        "coverImage": "image_url",
        "images": ["url1", "url2"],
        "capacity": {
          "adults": 15,
          "childrens": 5
        },
        "noOfRooms": 6,
        "noOfBaths": 6,
        "amenities": ["amenity1", "amenity2"],
        "rating": 4.6,
        "isActive": true,
        "totalUnits": 10,
        "availableUnits": 8
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

#### GET /properties/random
Get random properties for recommendations.

**Query Parameters:**
- `limit` (number, default: 5) - Number of properties to return

**Response:** Same structure as GET /properties

#### GET /properties/:id
Get property details by ID.

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "property": {
      "_id": "property_id",
      "name": "Property Name",
      "type": "villa",
      "address": { ... },
      "basePrice": 37000,
      "coverImage": "image_url",
      "images": ["url1", "url2"],
      "capacity": { "adults": 15, "childrens": 5 },
      "noOfRooms": 6,
      "noOfBaths": 6,
      "amenities": ["amenity1", "amenity2"],
      "rating": 4.6,
      "description": "Property description",
      "isActive": true
    },
    "propertyDetails": {
      "propertyId": "property_id",
      "villaLocationDescription": "Location description",
      // ... other property details
    },
    "rooms": [
      {
        "_id": "room_id",
        "propertyId": "property_id",
        "roomNumber": "101",
        "type": "deluxe",
        "price": 5000,
        "amenities": ["wifi", "ac"]
      }
    ]
  }
}
```

---

### 2. Location APIs

#### GET /locations/popular
Get popular locations.

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "_id": "location_id",
      "name": "Delhi"
    },
    {
      "_id": "location_id",
      "name": "Mumbai"
    }
  ]
}
```

#### GET /locations/search
Search locations by query.

**Query Parameters:**
- `query` (string, required) - Search query (e.g., "delhi", "mumbai")

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "_id": "location_id",
      "name": "New Delhi",
      "type": "city",
      "locationId": "location_id"
    }
  ]
}
```

---

### 3. Booking APIs (Public)

#### GET /booking/already-booked-dates/:propertyId
Get already booked dates for a property.

**Query Parameters:**
- `startDate` (string, required) - Start date (YYYY-MM-DD)
- `endDate` (string, required) - End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "bookedDates": ["2025-12-15", "2025-12-16", "2025-12-17"]
  }
}
```

#### POST /booking/payment-success
Handle payment success callback from PayU.

**Body:**
```json
{
  "txnid": "PAYU_1234567890",
  "mode": "CC"
}
```

#### POST /booking/payment-failure
Handle payment failure callback from PayU.

**Body:**
```json
{
  "txnid": "PAYU_1234567890"
}
```

---

### 4. Auth APIs (Public)

#### POST /auth/send-otp
Send OTP via email or phone.

**Body (Email):**
```json
{
  "email": "user@example.com"
}
```

**Body (Phone):**
```json
{
  "phone": {
    "countryCode": "+91",
    "number": "1234567890"
  }
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OTP sent successfully",
  "data": null
}
```

#### POST /auth/verify-otp
Verify OTP and get access token.

**Body (Email):**
```json
{
  "email": "user@example.com",
  "verificationCode": "123456"
}
```

**Body (Phone):**
```json
{
  "phone": {
    "countryCode": "+91",
    "number": "1234567890"
  },
  "verificationCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OTP verified successfully",
  "data": {
    "accessToken": "jwt_token_here",
    "isProfileComplete": false
  }
}
```

---

## 🔒 PROTECTED APIs (Authentication Required)

All protected APIs require `Authorization: Bearer <accessToken>` header.

### 1. Property APIs (Protected)

#### POST /properties
Create a new property (Partner/Admin only).

#### PUT /properties
Update property (Partner/Admin only).

#### PUT /properties/details
Update property details (Partner/Admin only).

#### PATCH /properties/toggle-active
Toggle property active status (Partner/Admin only).

---

### 2. Booking APIs (Protected)

#### POST /booking
Create a new booking.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Body:**
```json
{
  "propertyId": "property_id_here",
  "checkInDate": "2025-12-15",
  "checkOutDate": "2025-12-20",
  "adults": 2,
  "childrens": 1,
  "noOfRooms": 1,
  "couponCode": "SAVE20" // optional
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "payuUrl": "https://secure.payu.in/_payment",
    "params": {
      "key": "merchant_key",
      "txnid": "PAYU_1234567890",
      "amount": 50000,
      "productinfo": "{\"propertyId\":\"...\",\"bookingId\":\"...\",\"transactionId\":\"...\"}",
      "firstname": "John",
      "email": "user@example.com",
      "phone": "1234567890",
      "surl": "success_url",
      "furl": "failure_url",
      "hash": "hash_string"
    }
  }
}
```

#### GET /booking/my-bookings
Get user's bookings.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "bookings": [
      {
        "_id": "booking_id",
        "bookingId": "BOOK_123456",
        "userId": "user_id",
        "propertyId": {
          "_id": "property_id",
          "name": "Property Name",
          "coverImage": "image_url",
          "address": "Address"
        },
        "checkIn": "2025-12-15T00:00:00.000Z",
        "checkOut": "2025-12-20T00:00:00.000Z",
        "nights": 5,
        "guests": {
          "adults": 2,
          "childrens": 1
        },
        "priceBreakdown": {
          "base": 185000,
          "taxes": 33300,
          "discount": 0,
          "total": 218300
        },
        "status": "confirmed|pending|cancelled",
        "couponCode": "SAVE20",
        "createdAt": "2025-12-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 10,
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

---

### 3. Coupon APIs (Protected)

#### POST /coupons/apply
Apply a coupon code.

**Body:**
```json
{
  "code": "SAVE20",
  "propertyId": "property_id_here",
  "bookingAmount": 5000
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "couponCode": "SAVE20",
    "discountType": "percentage",
    "discountValue": 20,
    "discountAmount": 1000,
    "originalAmount": 5000,
    "finalAmount": 4000
  }
}
```

#### GET /coupons
Get all coupons.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `isActive` (boolean, optional) - Filter by active status

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {
    "coupons": [
      {
        "_id": "coupon_id",
        "code": "SAVE20",
        "description": "Get 20% off",
        "discountType": "percentage",
        "discountValue": 20,
        "minBookingAmount": 1000,
        "maxDiscountAmount": 500,
        "validFrom": "2025-12-01T00:00:00.000Z",
        "validUntil": "2025-12-31T00:00:00.000Z",
        "isActive": true,
        "usageLimit": 100,
        "usageCount": 50,
        "userUsageLimit": 1,
        "applicableFor": "all"
      }
    ],
    "pagination": { ... }
  }
}
```

#### POST /coupons
Create a new coupon (Admin/Partner only).

#### PATCH /coupons/toggle-status
Toggle coupon status (Admin/Partner only).

---

### 4. Auth APIs (Protected)

#### POST /auth/complete-profile
Complete user profile after OTP verification.

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": {
    "countryCode": "+91",
    "number": "1234567890"
  },
  "dateOfBirth": "1990-01-15",
  "nationality": "Indian",
  "gender": "male",
  "address": {
    "country": "India",
    "city": "Mumbai",
    "state": "Maharashtra",
    "aptorsuiteorfloor": "Apt 123",
    "fullAddress": "123 Main Street",
    "zipCode": "400053"
  }
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile completed successfully",
  "data": {
    "accessToken": "new_jwt_token_here"
  }
}
```

#### GET /auth/profile
Get user profile.

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": {
      "countryCode": "+91",
      "number": "1234567890"
    },
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "nationality": "Indian",
    "gender": "male",
    "address": {
      "country": "India",
      "city": "Mumbai",
      "state": "Maharashtra",
      "fullAddress": "123 Main Street",
      "zipCode": "400053"
    },
    "isProfileComplete": true,
    "isIdentityVerified": false,
    "role": "user"
  }
}
```

---

## Authentication

### How it works:
1. User sends OTP request → `/auth/send-otp`
2. User verifies OTP → `/auth/verify-otp` → Receives `accessToken`
3. User completes profile → `/auth/complete-profile` → Receives new `accessToken`
4. For protected APIs, include header: `Authorization: Bearer <accessToken>`

### Token Refresh:
- If API returns 401, frontend should attempt token refresh
- Refresh endpoint: `/auth/refresh-token` (if available)

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "data": null
}
```

Common status codes:
- `400` - Bad Request (Invalid parameters)
- `401` - Unauthorized (Missing/Invalid token)
- `404` - Not Found
- `500` - Internal Server Error

