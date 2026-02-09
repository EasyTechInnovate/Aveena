import { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import React from "react";
import OfferComponent from "../../components/admin/Offer";

const Offer = () => {

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/coupons?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const jsonResponse = await response.json();
        console.log("Coupons Data:", jsonResponse);

        // Later you can map like:
        // if (jsonResponse.success) {
        //   setCoupons(jsonResponse.data.coupons)
        //   setPagination(jsonResponse.data.pagination)
        // }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="w-full flex mt-20 justify-between relative">
      <Sidebar />

      <div className="w-full p-4 bg-[#F8FAFC]">
        <OfferComponent />
      </div>
    </div>
  );
};

export default Offer;
