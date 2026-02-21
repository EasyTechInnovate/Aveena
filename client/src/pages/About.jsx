import CtaJoin from "../components/landingPage/CtaJoin";
import React from "react";
import { Star } from "lucide-react";

const values = [
  {
    icon: "/assets/about/auth.svg",
    title: "Customer First",
    desc: "We start with our customers' needs and work backwards, building everything around earning and keeping their trust.",
  },
  {
    icon: "/assets/about/tool.svg",
    title: "True Ownership",
    desc: "We think and act like owners, prioritizing long-term success over short-term gains, and never saying 'that's not my job.'",
  },
  {
    icon: "/assets/about/man.svg",
    title: "Invent & Streamline",
    desc: "We think and act like owners, prioritizing long-term success over short-term gains, and never saying 'that's not my job.'",
  },
  {
    icon: "/assets/about/auth.svg",
    title: "Customer First",
    desc: "We start with our customers' needs and work backwards, building everything around earning and keeping their trust.",
  },
  {
    icon: "/assets/about/tool.svg",
    title: "True Ownership",
    desc: "We think and act like owners, prioritizing long-term success over short-term gains, and never saying 'that's not my job.'",
  },
  {
    icon: "/assets/about/man.svg",
    title: "Invent & Streamline",
    desc: "We think and act like owners, prioritizing long-term success over short-term gains, and never saying 'that's not my job.'",
  },
];

const About = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="bg-light min-h-[calc(100vh-80px)] lg:min-h-screen mx-auto flex flex-row relative bg-[url('/assets/about/aboutBG.png')] bg-no-repeat bg-center bg-cover pt-0 overflow-hidden">
          <div className="mt-5 flex-1 relative">
            <img
              src="/assets/about/heroLeft.png"
              alt="heroleft"
              className="w-20 sm:w-40 xl:w-65 absolute top-20 left-2 sm:left-10 xl:left-40 object-contain"
            />
          </div>

          <div className="flex-[2] my-auto px-2 sm:px-6 z-10 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-darkBlue leading-tight">
              Transforming Property <br className="hidden sm:block" />{" "}
              Management <br className="hidden sm:block" /> with Avenaa
            </h1>
            <p className="text-center mt-4 text-xs sm:text-base text-gray-700 max-w-2xl mx-auto">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis{" "}
              <br className="hidden sm:block" /> facilisis conv allis nisl nec
              tempor. Donec consectetur dapibus ultricies.{" "}
              <br className="hidden sm:block" /> Fusce luctus lobo.
            </p>
          </div>

          <div className="flex-1 relative">
            <img
              src="/assets/about/heroRight.png"
              alt="heroright"
              className="w-20 sm:w-40 xl:w-65 absolute bottom-10 -left-4 sm:left-0 object-contain"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row my-10 mx-4 lg:mx-auto shadow-sm border border-gray-100 lg:border-none">
          <div className="w-full lg:w-1/2 h-64 lg:h-auto">
            <img
              src="/assets/about/img1.png"
              alt="villa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 lg:p-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-darkBlue mb-4">
              UDS Villa - Next to VFS, Walking to Connaught Place
            </h1>
            <p className="text-sm lg:text-base mb-4 text-gray-600">
              In this agreement "aveenas" refers to the corporate entity Casa2
              Stays Private Limited as well as its website www.aveenas.com and
              mobile application and other services as the context
              provides.{" "}
            </p>
            <p className="text-sm lg:text-base text-gray-600">
              This agreement - together with all updates, additional terms,
              software licenses, and all of aveenas rules and policies including
              but not limited to privacy policy, cancellation and refund policy
              - collectively constitute the "Agreement" between you and aveenas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 py-6">
              <div className="flex-1">
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/about/tick.svg"
                    alt=""
                    className="w-5 h-5 shrink-0"
                  />
                  <h3 className="font-semibold text-base lg:text-lg">
                    100% genuine & verified places
                  </h3>
                </div>

                <p className="text-sm lg:text-base mt-2 text-gray-500">
                  This agreement - together with all updates, additional terms,
                  software licenses, and all of aveenas rules.
                </p>
              </div>
              <div className="flex-1">
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/about/tick.svg"
                    alt=""
                    className="w-5 h-5 shrink-0"
                  />
                  <h3 className="font-semibold text-base lg:text-lg">
                    100% genuine & verified places
                  </h3>
                </div>

                <p className="text-sm lg:text-base mt-2 text-gray-500">
                  Fivamus vel risus et Quisque nisi felis, tincidunt curss. Duis
                  vel interdum elit.
                </p>
              </div>
            </div>

            <button className="w-full sm:w-auto mt-2 py-3 px-8 text-base font-semibold cursor-pointer bg-green hover:bg-darkGreen transition-colors text-white rounded-md">
              View All Listing
            </button>
          </div>
        </div>

        <div className="py-10 bg-light px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl text-darkBlue mb-4 text-center font-bold">
              Previous Years Development
            </h1>
            <p className="text-center text-[#1E1E1E] text-sm lg:text-base max-w-3xl mx-auto">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
              facilisis conv allis nisl nec tempor.{" "}
              <br className="hidden sm:block" /> Donec consectetur dapibus
              ultricies. Fusce luctus lobo.
            </p>

            <div className="grid grid-cols-2 lg:flex lg:justify-between items-center gap-8 pt-10 lg:pt-16 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green">
                  40K
                </h1>
                <h5 className="text-darkBlue font-medium text-sm sm:text-base">
                  Happy <br />
                  Clients
                </h5>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green">
                  4.50
                </h1>
                <h5 className="text-darkBlue font-medium text-sm sm:text-base">
                  Customer <br />
                  Ratings
                </h5>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green">
                  18K
                </h1>
                <h5 className="text-darkBlue font-medium text-sm sm:text-base">
                  Business <br />
                  Category
                </h5>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green">
                  7.8
                </h1>
                <h5 className="text-darkBlue font-medium text-sm sm:text-base">
                  Growth Rate
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-darkBlue">Our values</h1>
          <p className="text-gray-600 mt-2 max-w-2xl text-sm lg:text-base">
            Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
            facilisis conv allis nisl nec tempor.{" "}
            <br className="hidden sm:block" /> Donec consectetur dapibus
            ultricies. Fusce luctus lobo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 py-10">
            {values.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img src={item.icon} alt={item.title} className="w-10 h-10" />
                <h3 className="font-semibold text-darkBlue text-lg">
                  {item.title}
                </h3>
                <p className="text-[#1E1E1E] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 max-w-7xl mx-4 lg:mx-auto rounded-2xl overflow-hidden relative group">
          <div className="relative h-64 sm:h-80 lg:h-auto">
            <img
              src="/assets/about/bed.png"
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute left-0 bottom-0 w-full h-full sm:h-40 bg-black/40 sm:bg-gradient-to-t sm:from-black sm:via-black/50 sm:to-transparent"></div>
          </div>

          <div className="flex text-nowrap text-center items-center gap-10 absolute bottom-0 left-0 py-6 sm:py-10 w-full overflow-hidden">
            <div className="flex gap-6 sm:gap-10 animate-scroll">
              {[1, 2].map((dup) => (
                <div
                  key={dup}
                  className="flex text-nowrap text-center items-center gap-6 sm:gap-10"
                >
                  {[...Array(3)].map((_, i) => (
                    <React.Fragment key={i}>
                      <div>
                        <h1 className="text-white font-semibold text-xl sm:text-3xl">
                          Luxury room
                        </h1>
                        <h5 className="text-white font-medium text-sm sm:text-base">
                          View More info
                        </h5>
                      </div>
                      <div className="bg-white h-0.5 min-w-[100px] sm:min-w-[200px]"></div>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>

            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                display: flex;
                width: max-content;
                animation: scroll 30s linear infinite;
              }
            `}</style>
          </div>
        </div>

        <div className="py-6 bg-light my-10 px-4 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-darkBlue">
              Trusted by Travelers Worldwide
            </h1>

            <p className="text-sm sm:text-base text-[#1E1E1E]">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
              facilisis conv allis nisl nec tempor.{" "}
              <br className="hidden sm:block" /> Donec consectetur dapibus
              ultricies. Fusce luctus lobo.
            </p>
          </div>

          <div className="relative overflow-hidden mt-10 mb-4">
            <div className="flex gap-4 sm:gap-8 w-fit animate-scroll">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="py-4 px-4 sm:px-6 rounded-3xl bg-white flex flex-col sm:flex-row gap-4 w-[280px] sm:w-[450px] shrink-0 border border-gray-100 shadow-sm">
                    <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-darkBlue overflow-hidden flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 items-center justify-center sm:justify-start mb-2 sm:mb-0">
                        <h1 className="font-bold text-sm sm:text-md text-darkBlue">
                          Savannah Nguyen
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        We do furniture and design for many different
                        environments. At home, public spaces, professional
                        spaces
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-4 sm:px-6 rounded-3xl bg-white flex flex-col sm:flex-row gap-4 w-[280px] sm:w-[450px] shrink-0 border border-gray-100 shadow-sm">
                    <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-darkBlue overflow-hidden flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 items-center justify-center sm:justify-start mb-2 sm:mb-0">
                        <h1 className="font-bold text-sm sm:text-md text-darkBlue">
                          Cameron Williamson
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Their attention to detail and quality of service truly
                        set them apart.
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-8 sm:w-32 h-full bg-gradient-to-r from-light to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 sm:w-32 h-full bg-gradient-to-l from-light to-transparent pointer-events-none"></div>
          </div>

          <div className="relative overflow-hidden mb-4">
            {/* Second reverse scroll row */}
            <div className="flex gap-4 sm:gap-8 w-fit animate-scroll-reverse">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="py-4 px-4 sm:px-6 rounded-3xl bg-white flex flex-col sm:flex-row gap-4 w-[280px] sm:w-[450px] shrink-0 border border-gray-100 shadow-sm">
                    <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-darkBlue overflow-hidden flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 items-center justify-center sm:justify-start mb-2 sm:mb-0">
                        <h1 className="font-bold text-sm sm:text-md text-darkBlue">
                          Brooklyn Simmons
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Outstanding design sense and smooth communication
                        throughout.
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-4 sm:px-6 rounded-3xl bg-white flex flex-col sm:flex-row gap-4 w-[280px] sm:w-[450px] shrink-0 border border-gray-100 shadow-sm">
                    <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-darkBlue overflow-hidden flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 items-center justify-center sm:justify-start mb-2 sm:mb-0">
                        <h1 className="font-bold text-sm sm:text-md text-darkBlue">
                          Esther Howard
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Loved the creativity and consistency across all design
                        pieces.
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-8 sm:w-32 h-full bg-gradient-to-r from-light to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 sm:w-32 h-full bg-gradient-to-l from-light to-transparent pointer-events-none"></div>

            <style jsx>{`
              @keyframes scroll-reverse {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
              .animate-scroll-reverse {
                display: flex;
                animation: scroll-reverse 25s linear infinite;
                width: max-content;
              }
            `}</style>
          </div>
        </div>

        <CtaJoin />
      </div>
    </>
  );
};

export default About;
