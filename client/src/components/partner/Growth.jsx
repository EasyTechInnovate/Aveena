import React from "react";

const growthData = [
  {
    name: "Minimum Rent",
    icon: "/assets/rent.svg",
    description:
      "Boost earnings by up to 200% with our proven distribution network.",
  },
  {
    name: "60% revenue sharing",
    icon: "/assets/revenue.svg",
    description:
      "Instant credibility with travelers through our nationally recognized brand.",
  },
  {
    name: "Damage Replacement Policy",
    icon: "/assets/policy.svg",
    description:
      "Streamline operations with our proprietary booking and management system.",
  },
  {
    name: "Track guest details via app",
    icon: "/assets/track.svg",
    description:
      "Enhance guest experience while reducing costs through standardized processes.",
  },
  {
    name: "Property Managed by Avenaa",
    icon: "/assets/manage.svg",
    description:
      "Gain visibility through our multi-channel campaigns and corporate partnerships.",
  },
  {
    name: "Bills Paid by Avenaa",
    icon: "/assets/bills.svg",
    description:
      "Receive personalized guidance from your dedicated relationship manager.",
  },
];

const Growth = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 md:pt-30 pt-20 mb-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <h1 className="font-semibold text-4xl mb-16">
          Everything you need to maximise your earnings & <br />
          <span className="text-green-600 text-5xl font-[Caveat]">
            business growth.
          </span>
        </h1>


        <div className="flex justify-center items-center">
          <img src="/assets/partner/property_owner.png" className="h-70 md:h-140 w-auto rounded-2xl border-2 border-green" />
        </div>

        <div className="mt-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {growthData.map((growth, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
                <img src={growth.icon} alt={growth.name} className="w-7" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {growth.name}
                </h2>

              <p className="text-gray-600">{growth.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Growth;
