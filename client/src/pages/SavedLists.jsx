import React from "react";
import UserDashboardLayout from "../components/account/UserDashboardLayout";

const SavedCard = () => (
  <div className="rounded-2xl border overflow-hidden">
    <div className="relative">
      <img src="/assets/booking/room.png" className="w-full h-40 object-cover" />
      <button className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center"><img src="/assets/account/likered.svg" className="w-full h-full" /></button>
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-sm">UDS Villa - Next to VFS, Walking to Connaught Place</h3>
      <div className="flex items-center justify-between">
      <div className="text-[12px] text-darkGray">New Delhi</div>
      <div className="mt-2 flex items-center gap-3 text-[12px]">
        <span className="flex items-center gap-1"><img src="/assets/booking/star.svg" className="w-4 h-4" /> <span className="font-semibold">4.6</span> <span className="text-gray-500">/5</span></span>
        <a className="text-blue underline" href="#">63 Reviews</a>
      </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-darkGray">
        <span className="flex items-center gap-1"><img src="/assets/booking/meal.svg" className="w-4 h-4" /> Breakfast included</span>
        <span className="flex items-center gap-1"><img src="/assets/booking/pool.svg" className="w-4 h-4" /> Private Pool</span>
        <span className="flex items-center gap-1"><img src="/assets/booking/lawn.svg" className="w-4 h-4" /> Lawn</span>
        <span className="flex items-center gap-1"><img src="/assets/booking/wifi.svg" className="w-4 h-4" /> WiFi</span>
        <span className="flex items-center gap-1"><img src="/assets/booking/bar.svg" className="w-4 h-4" /> Bar</span>
        <span className="flex items-center gap-1"><img src="/assets/booking/dining.svg" className="w-4 h-4" /> Alfresco Dining</span>
      </div>
      <a href="#" className="text-blue underline text-[12px] mt-1 inline-block">+21 Amenities</a>
      <div className="mt-2 flex items-center justify-between">
        <div className="bg-green text-white px-2 py-1 rounded text-[12px]">We have 5 left at 21% off at</div>
        <div className="text-green text-[12px]">Fully refundable</div>
      </div>
      <div className="mt-2">
        <div className="flex items-end gap-2">
          <div className="text-xl font-semibold">₹6,688</div>
          <div className="text-darkGray line-through text-sm">₹7200</div>
        </div>
        <div className="text-[12px] text-darkGray"><span className="font-semibold">₹12,471</span> Total includes taxes & fees</div>
      </div>
    </div>
  </div>
);

const SavedLists = () => {
  const chips = [
    'All','Destinations','Experiences','Guides','Insights','Journeys','Adventures','Getaways','Discoveries','Stories','Explorations'
  ];

  return (
    <UserDashboardLayout>
      <div className="flex-1">
        <div className="border rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Saved lists</h1>
          <p className="text-darkGray text-sm">Easily access and manage your favorite items anytime in one place.</p>

          <div className="mt-4 flex items-center">
            <div className="flex items-center flex-1 border rounded-xl px-3 py-3 text-darkGray">
              <img src="/assets/account/search-normal.svg" className="w-5 h-5 mr-2" />
              <input className="w-full outline-none" placeholder="Search Saved items......" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <button key={i} className={`px-3 py-1 rounded-full border text-sm ${i===0 ? 'bg-green text-white border-green' : 'text-darkGray hover:bg-light'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <SavedCard />
          <SavedCard />
          <SavedCard />
          <SavedCard />
          <SavedCard />
          <SavedCard />
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default SavedLists;

