import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const category = [
  "Destination",
  "Experiences",
  "Guides",
  "Insights",
  "Journeys",
  "Adventures",
  "Getaways",
  "Discoveries",
  "Stories",
  "Explorations",
];

const blogPosts = [
  {
    id: 1,
    img: "/assets/blog/blog01.png",
    categories: ["Brand Guidelines", "Creative", "Website Design"],
    title: "Brand Guidelines Creative Design.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....",
    link: "#",
  },
  {
    id: 2,
    img: "/assets/blog/blog01.png",
    categories: ["UX Design", "Innovation", "Interface"],
    title: "UX Design Principles for Better Usability.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....",
    link: "#",
  },
  {
    id: 3,
    img: "/assets/blog/blog01.png",
    categories: ["Strategy", "Branding", "Marketing"],
    title: "Building Strong Brands Through Strategy.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.....",
    link: "#",
  },
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 15;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const pages = [1, 2, 3, 4, 5, "...", totalPages];

  return (
    <>
      <div className="bg-light py-20 pt-30">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-darkBlue text-3xl font-bold mb-4">Blog</h1>
          <p className="text-md">
            Welcome to our blog where we dive deep into the philosophy of
            simplicity in an increasingly <br /> complex world
          </p>

          {/* Search Bar */}
          <div className="mx-auto my-10 bg-white border border-[#DFE0E4] flex items-center gap-4 rounded-2xl p-4 max-w-md">
            <Search className="text-[#1E1E1E]" />
            <input
              type="text"
              placeholder="Search Blog....."
              className="outline-none w-full"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="py-2 px-6 font-semibold text-white bg-green border rounded-full cursor-pointer">
              All
            </div>
            {category.map((item, index) => (
              <div
                key={index}
                className="py-2 px-6 border rounded-full cursor-pointer hover:bg-green hover:text-white transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border-2 rounded-2xl overflow-hidden">
              <div>
                <img src={post.img} alt={post.title} className="w-full h-full" />
              </div>
              <div className="p-6">
                <span className="text-md flex gap-2 flex-wrap">
                  {post.categories.map((cat, index) => (
                    <span key={index} className="flex gap-2 items-center">
                      <h3>{cat}</h3>
                      {index !== post.categories.length - 1 && (
                        <span className="text-[#1E1E1E40]">//</span>
                      )}
                    </span>
                  ))}
                </span>

                <div className="mt-2">
                  <h1 className="text-darkBlue font-semibold text-2xl ">
                    {post.title}
                  </h1>
                  <p>{post.description}</p>
                </div>

                <button className="flex gap-2 items-center text-[#1E1E1E] pt-6 text-xl hover:border-b-2 cursor-pointer border-[#1E1E1E]">
                  Visit Post <img src="/assets/blog/arrow.svg" alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 py-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          {pages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition
                  ${
                    currentPage === page
                      ? "bg-green-500 text-white border-green-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;
