// client\src\components\booking\RefundPolicy.jsx
"use client";
import { motion } from "framer-motion";
// 1. Import forwardRef
import { forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 2. Wrap the component in forwardRef
// 3. Add 'ref' as the second argument after props
const RulesAndSpaces = forwardRef(({ propertyDetails = {} }, ref) => {
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(propertyDetails);
  }, [propertyDetails]);

  // API spaces
  const apiSpaces = propertyDetails.spaces || [];

  // Fallback spaces
  const defaultSpaces = [
    {
      id: 1,
      title: "Bedroom 1",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and an attached balcony with a pool view.",
        "It has an attached bathroom equipped with a geyser, towels, basic toiletries and a separate dressing area.",
      ],
    },
    {
      id: 2,
      title: "Bedroom 2",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
        "It has an attached bathroom equipped with a geyser, towels, basic toiletries and a separate dressing area.",
      ],
    },
    {
      id: 3,
      title: "Bedroom 3",
      img: "/assets/booking/room.png",
      label: "King-sized bed",
      desc: [
        "This is an air-conditioned room on the first floor.",
        "The room offers a king-sized bed, WiFi access and a garden view.",
        "It has an attached bathroom equipped with a bathtub, towels and toiletries.",
      ],
    },
  ];

  // Normalize spaces
  const spaces =
    apiSpaces.length > 0
      ? apiSpaces.map((space, index) => ({
          id: space._id || index + 1,
          title: space.title || `Space ${index + 1}`,
          img: space.image || "/assets/booking/room.png",
          label: space.header || "",
          desc: Array.isArray(space.pointers) ? space.pointers : [],
        }))
      : defaultSpaces;

  return (
    <motion.div className="py-6 md:py-8">
      {/* ================= RULES & REFUND ================= */}
      <motion.section className="mb-10">
        <motion.h2
          className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2 border-l-4 border-[#F5959E] pl-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Rules and Refund Policy
        </motion.h2>

        {/* Refund Timeline */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between mb-8 relative gap-6 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="hidden md:block absolute top-5"
            style={{
              left: "32px",
              right: "calc(33.333% - 32px)",
              borderTop: "2px dashed #9ca3af",
            }}
          />

          {[
            {
              icon: "/assets/booking/green.svg",
              title: "100% Future Stay Voucher / Refund",
              subtitle: "Before 12 days",
            },
            {
              icon: "/assets/booking/yellow.svg",
              title: "50% Future Stay Voucher / Refund",
              subtitle: "6 to 12 days",
            },
            {
              icon: "/assets/booking/red.svg",
              title: "No Refund",
              subtitle: "Less than 6 days",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row md:flex-col w-full md:w-1/3 items-center md:items-start gap-4"
            >
              <div className="bg-white rounded-full p-2 shadow-sm border">
                <img src={item.icon} alt="" className="w-7 md:w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {item.title}
                </p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <button
            className="border border-gray-300 rounded-sm px-4 py-2 text-sm bg-light"
            onClick={() => navigate("/refund-policy")}
          >
            Refund Policy
          </button>
          <button
            className="border border-gray-300 rounded-sm px-4 py-2 text-sm bg-light"
            onClick={() => navigate("/refund-policy")}
          >
            Home Rules and Policy
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
            <span>
              Check-in:{" "}
              <span className="font-semibold text-gray-700">2 PM</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span>
              Check-out:{" "}
              <span className="font-semibold text-gray-700">11 AM</span>
            </span>
          </div>
          <span className="italic text-xs block">
            Early check-in and late check-out subject to availability
          </span>
        </div>
      </motion.section>

      {/* ================= SPACES ================= */}
      {/* <motion.section
        // 4. Attach the 'ref' here!
        // This connects this specific section to the spacesRef in the parent
        ref={ref}
        className="mt-14 scroll-mt-36"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-lg md:text-xl font-semibold mb-8 flex items-center gap-2 border-l-4 border-[#F5959E] pl-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Spaces
        </motion.h2>

        <div className="flex flex-col gap-10">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="flex flex-col md:flex-row gap-6 border-b pb-10 last:border-b-0"
            >
              <div className="w-full md:w-1/3 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={space.img}
                  alt={space.title}
                  className="w-full h-56 md:h-48 object-cover"
                />
              </div>

              <div className="w-full md:w-2/3">
                <h3 className="text-base md:text-lg font-semibold mb-1">
                  {space.title}
                </h3>

                {space.label && (
                  <p className="text-sm text-gray-600 mb-3">{space.label}</p>
                )}

                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  {space.desc.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.section> */}
    </motion.div>
  );
});

export default RulesAndSpaces;
