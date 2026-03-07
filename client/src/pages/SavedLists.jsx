import React, { useState, useEffect } from "react";
import UserDashboardLayout from "../components/account/UserDashboardLayout";

const SavedCard = ({ property, onRemove }) => {
  const name = property?.name || property?.propertyName || "Property";
  const address = property?.address?.fullAddress || property?.address || "";
  const image = property?.coverImage || property?.images?.[0] || "/assets/booking/room.png";
  const price = property?.basePrice || 0;
  const rating = property?.rating || null;
  const amenities = property?.amenities || property?.amenties || [];
  const id = property?._id;

  return (
    <div className="rounded-2xl border overflow-hidden">
      <div className="relative">
        <img src={image} className="w-full h-40 object-cover" alt={name} onError={(e) => { e.target.src = "/assets/booking/room.png" }} />
        <button
          onClick={() => onRemove(id)}
          className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <img src="/assets/account/likered.svg" className="w-full h-full" alt="unlike" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm">{name}</h3>
        <div className="flex items-center justify-between">
          <div className="text-[12px] text-darkGray">{address}</div>
          {rating && (
            <div className="mt-2 flex items-center gap-3 text-[12px]">
              <span className="flex items-center gap-1">
                <img src="/assets/booking/star.svg" className="w-4 h-4" alt="star" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-gray-500">/5</span>
              </span>
            </div>
          )}
        </div>
        {amenities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-darkGray">
            {amenities.slice(0, 4).map((a, i) => (
              <span key={i} className="flex items-center gap-1">
                <img src="/assets/booking/meal.svg" className="w-4 h-4" alt={a} />
                {typeof a === "string" ? a : "Amenity"}
              </span>
            ))}
            {amenities.length > 4 && <a href="#" className="text-blue underline">+{amenities.length - 4} more</a>}
          </div>
        )}
        {price > 0 && (
          <div className="mt-2">
            <div className="flex items-end gap-2">
              <div className="text-xl font-semibold">₹{price.toLocaleString("en-IN")}</div>
            </div>
            <div className="text-[12px] text-darkGray">per night</div>
          </div>
        )}
      </div>
    </div>
  );
};

const SavedLists = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // GET /user/wishlist
  const fetchWishlist = async () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/user/wishlist?page=1&limit=50`;
    console.log("[GET] Fetch Wishlist:", url);
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const json = await response.json();
      console.log("[GET] Fetch Wishlist Response:", json);
      if (json.success && json.data) {
        setWishlist(json.data.wishlist || json.data.properties || json.data || []);
      }
    } catch (err) {
      console.error("[GET] Fetch Wishlist Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  // PATCH /user/wishlist/toggle/:propertyId — remove from wishlist
  const handleRemove = async (propertyId) => {
    const url = `${import.meta.env.VITE_API_URL}/user/wishlist/toggle/${propertyId}`;
    console.log("[PATCH] Toggle Wishlist (remove):", url);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const json = await response.json();
      console.log("[PATCH] Toggle Wishlist Response:", json);
      fetchWishlist();
    } catch (err) {
      console.error("[PATCH] Toggle Wishlist Error:", err);
    }
  };

  const filtered = wishlist.filter((p) => {
    const term = searchQuery.toLowerCase();
    return (
      !term ||
      (p.name || "").toLowerCase().includes(term) ||
      (p.address?.fullAddress || p.address || "").toLowerCase().includes(term)
    );
  });

  return (
    <UserDashboardLayout>
      <div className="flex-1">
        <div className="border rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Saved lists</h1>
          <p className="text-darkGray text-sm">Easily access and manage your favorite items anytime in one place.</p>

          <div className="mt-4 flex items-center">
            <div className="flex items-center flex-1 border rounded-xl px-3 py-3 text-darkGray">
              <img src="/assets/account/search-normal.svg" className="w-5 h-5 mr-2" alt="search" />
              <input
                className="w-full outline-none"
                placeholder="Search Saved items......"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading saved items...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No saved properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filtered.map((property) => (
              <SavedCard key={property._id} property={property} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </div>
    </UserDashboardLayout>
  );
};

export default SavedLists;

