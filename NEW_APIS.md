# New APIs — Profile Screen Features

These endpoints were added to support the missing profile screen features.
All routes require `Authorization: Bearer <token>` unless noted.

---

## User Routes (`/v1/user/...`)

### Security Settings

#### Change Password
```
POST /v1/user/change-password
```
Body:
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456"
}
```
- Only works for accounts that have a password set (not Google/OTP-only users)
- Returns `400` if current password is wrong or no password is set

---

#### Update Contact (Email or Phone)
```
POST /v1/user/update-contact
```
**Flow:**
1. Call `POST /v1/auth/send-otp` with the user's **current** email/phone to get an OTP
2. Submit this endpoint with the OTP code + new email or phone

Body (update email):
```json
{
  "verificationCode": "123456",
  "email": "newemail@example.com"
}
```
Body (update phone):
```json
{
  "verificationCode": "123456",
  "phone": {
    "countryCode": "+91",
    "number": "9876543210"
  }
}
```
- Returns `409` if email/phone already in use by another account
- Returns `400` if OTP is expired or invalid

---

### Identity Verification

#### Upload Identity Document
```
POST /v1/user/identity/upload
```
Body:
```json
{
  "documentType": "passport",
  "documentUrl": "https://cdn.example.com/uploads/doc.jpg"
}
```
`documentType` options:
| Value | Document |
|---|---|
| `aadhaar` | Aadhaar Card |
| `pan` | PAN Card |
| `passport` | Passport |
| `drivingLicence` | Driving Licence |

- Upload the file via `POST /v1/media` first to get the URL, then pass it here
- Each call uploads one document type — call multiple times for multiple docs
- After upload, `status` becomes `pending` until admin approves

---

#### Get Identity Verification Status
```
GET /v1/user/identity/status
```
Response:
```json
{
  "documents": {
    "aadhaar": null,
    "pan": null,
    "passport": "https://cdn.example.com/uploads/doc.jpg",
    "drivingLicence": null
  },
  "isVerified": false,
  "status": "pending"
}
```
`status` values:
- `not_submitted` — no documents uploaded yet
- `pending` — at least one document uploaded, awaiting admin review
- `verified` — admin has approved

---

### Share Feedback

#### Submit Feedback
```
POST /v1/user/feedback
```
Body:
```json
{
  "type": "suggestion",
  "message": "It would be great to have a dark mode option."
}
```
`type` options: `bug` | `suggestion` | `complaint` | `other`
- `message` must be between 10–1000 characters

---

### My Reviews

#### Get My Reviews
```
GET /v1/user/my-reviews?page=1&limit=10
```
Response:
```json
{
  "reviews": [
    {
      "_id": "...",
      "rating": 4,
      "review": "Great stay!",
      "images": [],
      "highlightedPoints": ["Clean", "Good location"],
      "createdAt": "2025-01-10T12:00:00.000Z",
      "propertyId": {
        "_id": "...",
        "name": "Sea View Villa",
        "coverImage": "https://...",
        "address": { "city": "Goa", "state": "Goa" }
      }
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false
  }
}
```

---

## Admin Routes (`/v1/admin/...`)

All admin routes require an admin or team member token.

### Identity Verification

#### Approve Identity
```
POST /v1/admin/identity/:userId/approve
```
- Sets `isIdentityVerified: true` for the user
- Returns `400` if user has no submitted documents

#### Reject Identity
```
POST /v1/admin/identity/:userId/reject
```
- Clears all submitted documents and sets `isIdentityVerified: false`
- User will need to re-upload documents

---

### Feedbacks

#### Get All Feedbacks
```
GET /v1/admin/feedbacks?page=1&limit=10&type=suggestion
```
Query params:
- `page` — default `1`
- `limit` — default `10`
- `type` *(optional)* — filter by `bug` | `suggestion` | `complaint` | `other`

Response:
```json
{
  "feedbacks": [
    {
      "_id": "...",
      "type": "suggestion",
      "message": "Add dark mode please.",
      "createdAt": "2025-01-10T12:00:00.000Z",
      "userId": {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "profilePicture": "https://..."
      }
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "hasNextPage": true
  }
}
```

---

## Model Change — User

The `aadhaarCard` field on the User model has been replaced with `identityDocuments`:

```js
// Before
aadhaarCard: String

// After
identityDocuments: {
  aadhaar: String | null,
  pan: String | null,
  passport: String | null,
  drivingLicence: String | null
}
```

If your code referenced `user.aadhaarCard`, update it to `user.identityDocuments.aadhaar`.

---

## Rewards & Wallet

### Get My Wallet
```
GET /v1/wallet?page=1&limit=10
```
Response:
```json
{
  "balance": 750.00,
  "transactions": [
    {
      "_id": "...",
      "amount": 500,
      "type": "credit",
      "reason": "Welcome bonus",
      "bookingId": null,
      "balanceAfter": 500,
      "createdAt": "2025-01-10T12:00:00.000Z"
    },
    {
      "_id": "...",
      "amount": 250,
      "type": "debit",
      "reason": "Booking payment (partial wallet)",
      "bookingId": "...",
      "balanceAfter": 250,
      "createdAt": "2025-01-12T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false
  }
}
```

---

### Using Wallet at Checkout (Booking)

Pass `useWallet: true` in the `POST /v1/bookings` body:

```json
{
  "propertyId": "...",
  "checkInDate": "2025-02-01",
  "checkOutDate": "2025-02-05",
  "adults": 2,
  "noOfRooms": 1,
  "useWallet": true
}
```

**How it works:**
- System checks wallet balance
- Deducts `min(walletBalance, totalAmount)` from the booking total
- Remaining amount (if any) goes to PayU for card/UPI payment
- Wallet is only debited after payment succeeds — never before
- If wallet covers 100% of the amount, PayU is skipped entirely and booking is confirmed immediately

**Response when wallet covers full amount:**
```json
{
  "bookingId": "...",
  "walletAmountUsed": 1200,
  "totalPaid": 0,
  "paidVia": "wallet"
}
```

**Response when wallet partially covers (rest goes to PayU):**
```json
{
  "payuUrl": "https://...",
  "params": { ... }
}
```
The `priceBreakdown` on the booking will include `walletDiscount` showing how much was covered by wallet.

**Refunds:** If PayU payment fails, any wallet amount that was pre-allocated is automatically refunded back to the wallet.

---

### Admin — Credit Wallet (Rewards)
```
POST /v1/admin/wallet/credit
```
Body:
```json
{
  "userId": "...",
  "amount": 500,
  "reason": "Welcome bonus"
}
```
- Max single credit: ₹1,00,000
- Reason is required (min 3 characters)

---

## Booking Model Change

`priceBreakdown` now includes `walletDiscount`:
```json
{
  "base": 10000,
  "taxes": 1800,
  "discount": 200,
  "walletDiscount": 500,
  "total": 11100
}
```
Also added top-level `walletAmountUsed` field on booking for easy reference.
