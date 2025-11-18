import React from "react";

const Profile = () => {
  return (
    <div className="border rounded-2xl p-6 flex-1 max-h-fit">
      <div className="flex gap-6">
        <div className="relative">
          <img
            src="/assets/account/user.png"
            alt="user"
            className="w-16 aspect-square"
          />
          <div className="bg-green p-2 rounded-full aspect-square w-fit flex items-center cursor-pointer justify-center absolute bottom-0 -right-3">
            <img src="/assets/account/pencil.svg" alt="edit" className="w-3" />
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-xl">Personal details</h1>
          <p className="text-sm text-darkGray">
            Update your info and find out how it's used.
          </p>
        </div>
      </div>
      <hr className="my-4" />

     <div className="flex flex-col gap-4">

 <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Name</h4>

          <input
            type="text"
            className="p-4 border rounded-xl outline-none w-full"
            placeholder="Jone Deo"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Email address</h4>

          <input
            type="text"
            className="p-4 border rounded-xl outline-none w-full"
            placeholder="business@gmail.com"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Phone number</h4>

          <input
            type="text"
            className="p-4 border rounded-xl outline-none w-full"
            placeholder="+987654321"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Date of birth</h4>

          <input
            type="date"
            className="p-4 border rounded-xl outline-none w-full"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Nationality</h4>

          <div className="relative">
            <select className="p-4 border rounded-xl outline-none w-full appearance-none bg-white">
              <option value="">Select Nationality</option>
              <option value="american">American</option>
              <option value="british">British</option>
              <option value="canadian">Canadian</option>
              <option value="australian">Australian</option>
              <option value="indian">Indian</option>
              <option value="german">German</option>
              <option value="french">French</option>
              <option value="japanese">Japanese</option>
              <option value="chinese">Chinese</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h4 className="text-sm font-semibold text-darkGray">Gender</h4>

          <div className="relative">
            <select className="p-4 border rounded-xl outline-none w-full appearance-none bg-white">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-darkGray">Address</h4>
        
        {/* First row of address fields */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <div className="relative">
              <select className="p-4 border rounded-xl outline-none w-full appearance-none bg-white">
                <option value="">Select Country</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="india">India</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="p-4 border rounded-xl outline-none w-full"
              placeholder="Address"
            />
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="p-4 border rounded-xl outline-none w-full"
              placeholder="Apt. Suite, Floor"
            />
          </div>
        </div>

        {/* Second row of address fields */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <div className="relative">
              <select className="p-4 border rounded-xl outline-none w-full appearance-none bg-white">
                <option value="">City</option>
                <option value="new-york">New York</option>
                <option value="london">London</option>
                <option value="toronto">Toronto</option>
                <option value="sydney">Sydney</option>
                <option value="mumbai">Mumbai</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <div className="relative">
              <select className="p-4 border rounded-xl outline-none w-full appearance-none bg-white">
                <option value="">State</option>
                <option value="california">California</option>
                <option value="texas">Texas</option>
                <option value="florida">Florida</option>
                <option value="new-york">New York</option>
                <option value="illinois">Illinois</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="p-4 border rounded-xl outline-none w-full"
              placeholder="Postal Code"
            />
          </div>
        </div>
      </div>

     </div>

     {/* Save Button - Right Aligned */}
     <div className="flex justify-end mt-6">
       <button className="p-4 bg-green rounded-xl text-white">
         Save Details
       </button>
     </div>



    </div>
  );
};

export default Profile;
