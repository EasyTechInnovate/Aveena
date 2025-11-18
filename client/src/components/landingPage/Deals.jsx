import React from "react";
import Hotels from "../common/Hotels";

const hotels = [
  {
    name: "Pranaam",
    address: "Alibaug, Maharashtra",
    image: "/assets/hotels/Pranaam.png",
    maxGuests: "15",
    category: "Lonavala",
    rooms: "6",
    baths: "6",
    perNight: "43,660",
    rating: "4.6",
  },
  {
    name: "Gardenéa",
    address: "Alibaug, Maharashtra",
    image: "/assets/hotels/Gardenea.png",
    maxGuests: "26",
    category: "Alibaug",
    rooms: "7",
    baths: "6",
    perNight: "45,701",
    rating: "4.7",
  },
  {
    name: "Vista Serene",
    address: "Karjat, Maharashtra",
    image: "/assets/hotels/VistaSerene.png",
    maxGuests: "10",
    category: "Karjat",
    rooms: "3",
    baths: "3",
    perNight: "11,276",
    rating: "4.5",
  },
  {
    name: "Princess Vista - Pawna",
    address: "Lonavala, Maharashtra",
    image: "/assets/hotels/PrincessVista.png",
    maxGuests: "9",
    category: "Lonavala",
    rooms: "3",
    baths: "4",
    perNight: "50,740",
    rating: "4.8",
  },
];

const Deals = () => {
  return (
    <div className="max-w-7xl mx-auto rounded-3xl relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <img
          src="/assets/deal-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
<div
  className="w-full h-full relative z-2 px-6 py-16"
  style={{
    background: 'linear-gradient(357.04deg, #073536 1.9%, rgba(20, 153, 156, 0) 161.23%)',
  }}
>
  <h2 className="text-4xl font-semibold text-white">Last-minute weekend deals</h2>
  <p className="text-xl font-normal text-white mt-2 mb-10">Based on your most recently viewed property</p>
  <Hotels hotels={hotels} />
</div>

    </div>
  );
};

export default Deals;
