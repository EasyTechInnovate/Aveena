import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/partnerDashboard/Sidebar";
import PropertyDetailsSidebar from "../../components/partnerDashboard/MyProperty/PropertyDetailsSidebar";
import ViewPropertyInformation from "../../components/partnerDashboard/MyProperty/ViewPropertyInformation";
import ViewPropertyPhotos from "../../components/partnerDashboard/MyProperty/ViewPropertyPhotos";
import ViewPropertyAmenities from "../../components/partnerDashboard/MyProperty/ViewPropertyAmenities";
import ViewPropertyPrice from "../../components/partnerDashboard/MyProperty/ViewPropertyPrice";
import ViewPropertyFAQs from "../../components/partnerDashboard/MyProperty/ViewPropertyFAQs";
import KYCInfoBanner from "../../components/partnerDashboard/MyProperty/KYCInfoBanner";

const ViewProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("property-info");
  const [propertyData, setPropertyData] = useState({});

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const jsonResponse = await response.json();
        const property = jsonResponse.data.property;
        const propertyDetails = jsonResponse.data.propertyDetails;
        console.log("Property By ID Data:", jsonResponse);
        setPropertyData({
          id: property?._id || "123",
          propertyName: property?.name || "Blah Blah Blah",
          propertyType: property?.type,
          country: "India",
          address: `${property?.address?.fullAddress}, ${property?.address?.zipCode}`,
          apt: "Suite 101",
          city: "New Delhi",
          state: "Delhi",
          postalCode: property?.address?.zipCode,
          minRentalIncome: property?.minimumRentalIncome || "N/A",
          salesTarget: property?.saleTarget || "N/A",
          basePrice : property?.basePrice,
          description: property?.description || "",
          amenties: property?.amenties || [],
          propertyMedia: propertyDetails?.propertyMedia || [],
          faqs: propertyDetails?.faqs || [],
        });
      } catch (error) {
        console.error("Error fetching property by ID:", error);
      }
    };

    if (id) {
      fetchPropertyById();
    }
  }, [id]);

  const renderContent = () => {
    switch (activeSection) {
      case "property-info":
        return <ViewPropertyInformation propertyData={propertyData} />;
      case "property-photos":
        return <ViewPropertyPhotos propertyData={propertyData} />;
      case "property-amenities":
        return <ViewPropertyAmenities propertyData={propertyData} />;
      case "property-price":
        return <ViewPropertyPrice propertyData={propertyData} />;
      case "property-faqs":
        return <ViewPropertyFAQs propertyData={propertyData} />;
      default:
        return <ViewPropertyInformation propertyData={propertyData} />;
    }
  };

  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-20 max-w-7xl w-full p-6 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <div className="bg-[#F0F9F4] rounded-lg p-4">
            <div className="text-sm text-right">
              <a
                href="/dashboard/property"
                className="text-green hover:underline font-medium"
              >
                My Property
              </a>{" "}
              <span className="text-gray-800">&gt;</span>{" "}
              <span className="text-gray-800 font-medium">
                {propertyData.propertyName}
              </span>
            </div>
          </div>
        </div>

        {/* KYC Information Banner */}
        <div className="mb-6">
          <KYCInfoBanner />
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6">
          {/* Left Sidebar - Property Details */}
          <div className="shrink-0">
            <PropertyDetailsSidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </div>

          {/* Right Content Area */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;
