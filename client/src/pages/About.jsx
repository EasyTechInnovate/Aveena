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
      <div className="">
        <div className="bg-light min-h-screen mx-auto flex relative bg-[url('/assets/about/aboutBG.png')] bg-no-repeat bg-center bg-cover pt-20">
          <div className="flex-1 relative">
            <img
              src="/assets/about/heroLeft.png"
              alt="heroleft"
              className="w-65 absolute top-10 left-40"
            />
          </div>

          <div className="flex-2 my-auto">
            <h1 className="text-5xl font-bold text-center text-darkBlue">
              Transforming Property <br /> Management <br /> with Avenaa
            </h1>
            <p className="text-center mt-4">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis{" "}
              <br /> facilisis conv allis nisl nec tempor. Donec consectetur
              dapibus ultricies. <br /> Fusce luctus lobo.
            </p>
          </div>

          <div className="flex-1 relative">
            <img
              src="/assets/about/heroRight.png"
              alt="heroleft"
              className="w-65 absolute bottom-10 left-0"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-2xl overflow-hidden flex my-10">
          <div>
            <img src="/assets/about/img1.png" alt="" />
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-bold text-darkBlue mb-2">
              UDS Villa - Next to VFS, Walking to Connaught Place
            </h1>
            <p className="text-md mb-2">
              In this agreement "aveenas" refers to the corporate entity Casa2
              Stays Private Limited as well as its website www.aveenas.com and
              mobile application and other services as the context provides.{" "}
            </p>
            <p>
              This agreement - together with all updates, additional terms,
              software licenses, and all of aveenas rules and policies
              including but not limited to privacy policy, cancellation and
              refund policy - collectively constitute the "Agreement" between
              you and aveenas.
            </p>

            <div className="flex gap-6 py-6">
              <div>
                <div className="flex flex-1 gap-2 items-center">
                  <img
                    src="/assets/about/tick.svg"
                    alt=""
                    className="w-5 h-5"
                  />
                  <h3 className="font-semibold text-md">
                    {" "}
                    100% genuine & verified places
                  </h3>
                </div>

                <p className="text-md flex-1 mt-4">
                  This agreement - together with all updates, additional terms,
                  software licenses, and all of aveenas rules.
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/about/tick.svg"
                    alt=""
                    className="w-5 h-5"
                  />
                  <h3 className="font-semibold text-md">
                    {" "}
                    100% genuine & verified places
                  </h3>
                </div>

                <p className="text-md mt-4">
                  Fivamus vel risus et Quisque nisi felis, tincidunt curss. Duis
                  vel interdum elit.
                </p>
              </div>
            </div>

            <button className="mt-4 py-4 px-8 text-md font-semibold cursor-pointer bg-green text-white rounded-md">
              View All Listing
            </button>
          </div>
        </div>

        <div className="py-10 bg-light">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl text-darkBlue mb-4 text-center font-bold">
              Previous Years Development
            </h1>
            <p className="text-center text-[#1E1E1E] text-md">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
              facilisis conv allis nisl nec tempor. <br /> Donec consectetur
              dapibus ultricies. Fusce luctus lobo.
            </p>

            <div className="flex justify-between items-center pt-8">
              <div className="flex items-center gap-4">
                <h1 className="text-6xl font-bold text-green">40K</h1>
                <h5 className="text-darkBlue">
                  Happy <br />
                  Clients
                </h5>
              </div>

              <div className="flex items-center gap-4">
                <h1 className="text-6xl font-bold text-green">4.50</h1>
                <h5 className="text-darkBlue">
                  Customer <br />
                  Ratings
                </h5>
              </div>

              <div className="flex items-center gap-4">
                <h1 className="text-6xl font-bold text-green">18K</h1>
                <h5 className="text-darkBlue">
                  Business <br />
                  Category
                </h5>
              </div>

              <div className="flex items-center gap-4">
                <h1 className="text-6xl font-bold text-green">7.8</h1>
                <h5 className="text-darkBlue">Growth Rate</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-darkBlue">Our values</h1>
          <p>
            Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
            facilisis conv allis nisl nec tempor. <br /> Donec consectetur
            dapibus ultricies. Fusce luctus lobo.
          </p>

          <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {values.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <img src={item.icon} alt={item.title} className="w-10 h-10" />
                <h3 className="font-semibold text-darkBlue text-lg">
                  {item.title}
                </h3>
                <p className="text-[#1E1E1E] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 max-w-7xl mx-auto rounded-2xl overflow-hidden relative">
          <div className="relative">
            <img src="/assets/about/bed.png" alt="" className="w-full" />

            {/* Black fade mask at bottom */}
            <div className="absolute left-0 bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>

          <div className="flex text-nowrap text-center items-center gap-10 absolute bottom-0 left-0 py-10">
            <div className="flex gap-10 animate-scroll">
              {/* Duplicate content twice for infinite loop */}
              {[1, 2].map((dup) => (
                <div
                  key={dup}
                  className="flex text-nowrap text-center items-center gap-10"
                >
                  <div>
                    <h1 className="text-white font-semibold text-3xl">
                      Luxury room
                    </h1>
                    <h5 className="text-white font-semibold">View More info</h5>
                  </div>

                  <div className="bg-white h-0.5 min-w-[200px]"></div>

                  <div>
                    <h1 className="text-white font-semibold text-3xl">
                      Luxury room
                    </h1>
                    <h5 className="text-white font-semibold">View More info</h5>
                  </div>

                  <div className="bg-white h-0.5 min-w-[200px]"></div>

                  <div>
                    <h1 className="text-white font-semibold text-3xl">
                      Luxury room
                    </h1>
                    <h5 className="text-white font-semibold">View More info</h5>
                  </div>

                  <div className="bg-white h-0.5 min-w-[200px]"></div>

                  <div>
                    <h1 className="text-white font-semibold text-3xl">
                      Luxury room
                    </h1>
                    <h5 className="text-white font-semibold">View More info</h5>
                  </div>
                  <div className="bg-white h-0.5 min-w-[200px]"></div>
                </div>
              ))}
            </div>

            {/* CSS for scrolling animation */}
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

        <div className="py-6 bg-light my-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-darkBlue">
              Trusted by Travelers Worldwide
            </h1>

            <p className="text-md text-[#1E1E1E]">
              Maecenas at quam egestas, vestibulum odio id, consequat ex. Duis
              facilisis conv allis nisl nec tempor. <br /> Donec consectetur
              dapibus ultricies. Fusce luctus lobo.
            </p>
          </div>

          <div className="relative overflow-hidden mt-10 mb-4">
            <div className="flex gap-8 w-fit animate-scroll">
              {/* Repeat testimonials for smooth looping */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Savannah Nguyen
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        We do furniture and design for many different
                        environments. At <br /> home, public spaces,
                        professional spaces
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Cameron Williamson
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        Their attention to detail and quality of service truly
                        set them apart.
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Courtney Henry
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        We do furniture and design for many different environments. At home, public spaces, professional spaces
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Gradient fade edges for nice visual effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

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
                animation: scroll 25s linear infinite;
                width: max-content;
              }
            `}</style>
          </div>

          <div className="relative overflow-hidden mb-4">
            <div className="flex gap-8 w-fit animate-scroll-reverse">
              {/* Repeat testimonials for continuous sliding */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Brooklyn Simmons
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        Outstanding design sense and smooth communication
                        throughout.
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Esther Howard
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        Loved the creativity and consistency across all design
                        pieces.
                      </p>
                    </div>
                  </div>

                  <div className="py-4 px-6 rounded-full bg-white flex gap-4 w-fit shrink-0">
                    <div className="rounded-full w-16 h-16 bg-darkBlue overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/about/user1.png"
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-6 items-center">
                        <h1 className="font-bold text-md text-darkBlue">
                          Ralph Edwards
                        </h1>
                        <span className="flex gap-1 items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-[#F2994A] fill-[#F2994A]"
                            />
                          ))}
                        </span>
                      </div>
                      <p>
                        The result exceeded our expectations — definitely coming
                        back again!
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Gradient fade edges for polish */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

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
