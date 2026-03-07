import React, { useState, useEffect } from "react";
import UserDashboardLayout from "../components/account/UserDashboardLayout";

const ReviewRow = ({ review }) => {
  const property = review?.property || {};
  const name = property.name || property.propertyName || "Property";
  const address = property.address?.fullAddress || property.address || "";
  const image = property.coverImage || property.images?.[0] || "/assets/booking/room.png";
  const rating = review?.rating;
  const reviewText = review?.review || review?.comment || "";
  const createdAt = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="rounded-2xl border p-3 flex gap-4 items-start">
      <img
        src={image}
        className="w-60 h-36 object-cover rounded-xl shrink-0"
        alt={name}
        onError={(e) => { e.target.src = "/assets/booking/room.png"; }}
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            {address && <div className="text-darkGray text-sm">{address}</div>}
          </div>
          <div className="flex items-center gap-3">
            {rating && (
              <span className="flex items-center gap-1 text-sm">
                <img src="/assets/booking/star.svg" className="w-4 h-4" alt="star" />
                <span className="font-semibold">{rating}/5</span>
              </span>
            )}
            <span className="bg-green text-white text-xs px-3 py-1 rounded-full">Review Posted</span>
          </div>
        </div>
        <div className="mt-3 border rounded-xl p-4 text-darkGray text-sm">
          {reviewText || "No review text."}
        </div>
        {createdAt && <div className="text-right text-[12px] text-darkGray mt-2">{createdAt}</div>}
      </div>
    </div>
  );
};

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET /reviews?page=1&limit=20
  useEffect(() => {
    const fetchReviews = async () => {
      const url = `${import.meta.env.VITE_API_URL}/reviews?page=1&limit=20`;
      console.log("[GET] Fetch My Reviews:", url);
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        const json = await response.json();
        console.log("[GET] Fetch My Reviews Response:", json);
        if (json.success && json.data) {
          setReviews(json.data.reviews || json.data || []);
        }
      } catch (err) {
        console.error("[GET] Fetch My Reviews Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <UserDashboardLayout>
      <div className="flex-1 border rounded-2xl p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">My reviews</h1>
          <p className="text-darkGray text-sm">View and manage all the feedback you've shared in one place.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reviews posted yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <ReviewRow key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default MyReviews;
