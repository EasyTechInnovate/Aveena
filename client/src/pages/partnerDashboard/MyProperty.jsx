import React, { useState } from "react";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import BookingTablePage from "../../components/partnerDashboard/MyProperty/Table";
import AddNewPropertyForm from "../../components/partnerDashboard/MyProperty/AddNewPropertyForm";

const MyProperty = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
            {!showForm && (
        <div className="border-2 border-[#DFE0E480] bg-white p-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">My Property</h1>
              <button
                className="bg-green px-6 py-2 rounded-lg text-white"
                onClick={() => setShowForm(true)}
              >
                Add New Property
              </button>
          </div>
            <BookingTablePage />
        </div>
            )}

         {showForm && (
            <AddNewPropertyForm onCancel={() => setShowForm(false)} />
          )}
      </div>
    </div>
  );
};

export default MyProperty;
