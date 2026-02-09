import React, { useEffect, useState } from "react";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import BookingTablePage from "../../components/partnerDashboard/MyProperty/Table";
import AddNewPropertyForm from "../../components/partnerDashboard/MyProperty/AddNewPropertyForm";

const MyProperty = () => {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  });

  const fetchMyProperties = async (page = 1) => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/property-owner/properties?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const response = await data.json();
      console.log("fetchMyProperties : ",  response);
      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyProperties(1);
  }, []);

  const handlePageChange = (newPage) => {
    fetchMyProperties(newPage);
  };

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-20 max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
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
            <BookingTablePage 
              properties={properties} 
              pagination={pagination} 
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {showForm && <AddNewPropertyForm onCancel={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default MyProperty;