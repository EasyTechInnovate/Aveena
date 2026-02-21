import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import { motion } from "framer-motion";

const Career = () => {
  return (
    <>
      <div className="relative pt-20">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
          <img
            src="/assets/career/hero.png"
            alt="hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-0 left-0 h-full w-full flex flex-col bg-black/30 justify-end items-center text-white gap-2 sm:gap-3 pb-20 px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Build Your Future With Us
          </h1>
          <p className="text-sm sm:text-base max-w-2xl">
            Join a team of innovators, creators, and problem-solvers shaping the
            future. Explore opportunities where your talent makes a real impact.
          </p>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-7xl">
          {/* Main Heading and Introduction */}
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-darkBlue mb-4">
              Why Work With Us
            </h2>
            <p className="text-base sm:text-lg text-darkGray max-w-3xl mx-auto sm:mx-0">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
              facilisis convallis nisl nec tempor. Donec consectetur dapibus
              ultricies. Fusce luctus lobo.
            </p>
          </div>

          {/* Feature Blocks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Growth & Learning */}
            <div className="text-center sm:text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 mx-auto sm:mx-0 bg-blue-50 rounded-full sm:bg-transparent sm:rounded-none">
                <img
                  src="/assets/career/growth.svg"
                  alt=""
                  className="w-8 h-8 sm:w-auto sm:h-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Growth & Learning
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Continuous training, mentorship, and career advancement
                opportunities.
              </p>
            </div>

            {/* Collaborative Culture */}
            <div className="text-center sm:text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 mx-auto sm:mx-0 bg-blue-50 rounded-full sm:bg-transparent sm:rounded-none">
                <img
                  src="/assets/career/collab.svg"
                  alt=""
                  className="w-8 h-8 sm:w-auto sm:h-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Collaborative Culture
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Work with passionate, supportive teammates.
              </p>
            </div>

            {/* Global Impact */}
            <div className="text-center sm:text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 mx-auto sm:mx-0 bg-blue-50 rounded-full sm:bg-transparent sm:rounded-none">
                <img
                  src="/assets/career/global.svg"
                  alt=""
                  className="w-8 h-8 sm:w-auto sm:h-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Global Impact
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Be part of projects that reach millions worldwide.
              </p>
            </div>

            {/* Flexible Work */}
            <div className="text-center sm:text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 mx-auto sm:mx-0 bg-blue-50 rounded-full sm:bg-transparent sm:rounded-none">
                <img
                  src="/assets/career/growth.svg"
                  alt=""
                  className="w-8 h-8 sm:w-auto sm:h-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Flexible Work
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Hybrid/remote options with work-life balance.
              </p>
            </div>

            {/* Perks & Benefits */}
            <div className="text-center sm:text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 mx-auto sm:mx-0 bg-blue-50 rounded-full sm:bg-transparent sm:rounded-none">
                <img
                  src="/assets/career/collab.svg"
                  alt=""
                  className="w-8 h-8 sm:w-auto sm:h-auto"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Perks & Benefits
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                Competitive pay, health insurance, wellness programs, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 overflow-hidden">
        <div className="text-center mb-10 flex flex-col gap-2 max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-darkBlue">
            Life at Aveena
          </h1>
          <p className="text-darkGray text-sm sm:text-base max-w-3xl mx-auto">
            We believe people do their best work when they feel inspired,
            supported, and valued. That's why we{" "}
            <br className="hidden sm:block" /> nurture creativity, celebrate
            achievements, and encourage individuality.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-2"
        >
          <CarouselContent className="gap-2 -ml-2 sm:ml-0">
            <CarouselItem className="basis-full pl-2 sm:pl-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 h-auto sm:h-[350px] lg:h-[420px] overflow-visible"
              >
                {/* Left large image (2 cols) - Full width on mobile */}
                <div className="col-span-2 sm:col-span-2 overflow-hidden h-[200px] sm:h-full rounded-lg sm:rounded-none">
                  <img
                    src="/assets/career/01.png"
                    alt="life"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stacked 2 images (1 col) - Hidden on very small screens or adaptable */}
                <div className="col-span-1 sm:col-span-1 grid grid-rows-2 gap-2 overflow-hidden h-[200px] sm:h-full">
                  <div className="overflow-hidden rounded-lg sm:rounded-none">
                    <img
                      src="/assets/career/02.png"
                      alt="life"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg sm:rounded-none">
                    <img
                      src="/assets/career/03.png"
                      alt="life"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Center large image (2 cols) */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 overflow-hidden h-[200px] sm:h-full rounded-lg sm:rounded-none">
                  <img
                    src="/assets/career/04.png"
                    alt="life"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stacked 2 images (1 col) - Hidden on mobile, visible on lg */}
                <div className="hidden lg:grid col-span-1 grid-rows-2 gap-2 overflow-hidden h-full">
                  <div className="overflow-hidden">
                    <img
                      src="/assets/career/05.png"
                      alt="life"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="/assets/career/06.png"
                      alt="life"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right large image (overflows outside screen) - Hidden on mobile/tablet */}
                <div className="hidden lg:block col-span-1 relative overflow-visible">
                  <img
                    src="/assets/career/07.png"
                    alt="life"
                    className="absolute top-0 w-[140%] h-full object-cover"
                  />
                </div>
              </motion.div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div className="bg-light py-10 px-4">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-darkBlue">
              Find Your Next Role
            </h1>
            <p className="text-darkGray text-sm sm:text-base max-w-2xl mx-auto">
              We’re looking for talented individuals to join us. Explore roles
              that match your skills and <br className="hidden sm:block" />{" "}
              aspirations.
            </p>
          </div>
        </div>

        {/* Job Application Form */}
        <div className="max-w-5xl my-10 mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
            <form className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Leslie Alexander"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Leslie Alexander"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone, Category and Role Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="Leslie Alexander"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Select Category */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">
                    Select Category
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white">
                      <option value="looking-for-job">Looking For Job</option>
                      <option value="hiring">Hiring</option>
                      <option value="partnership">Partnership</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Select Role */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">
                    Select Role
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white">
                      <option value="">Select Role</option>
                      <option value="frontend-developer">
                        Frontend Developer
                      </option>
                      <option value="backend-developer">
                        Backend Developer
                      </option>
                      <option value="fullstack-developer">
                        Full Stack Developer
                      </option>
                      <option value="ui-designer">UI Designer</option>
                      <option value="product-manager">Product Manager</option>
                      <option value="marketing-specialist">
                        Marketing Specialist
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-medium text-darkGray mb-2">
                  Upload Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 sm:p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center space-y-3">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-darkGray"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div>
                      <p className="text-darkGray font-medium text-sm sm:text-base">
                        Click to Drag to Upload Resume
                      </p>
                      <p className="text-xs sm:text-sm text-darkGray mt-1">
                        JPG, JPEG or PNG, Max 47 MB each
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green hover:bg-darkGreen text-white font-semibold py-3 px-8 rounded-md transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
