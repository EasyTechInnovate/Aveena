import React from "react";

const BannerApp = () => {
  return (
    <div className="p-4 bg-light rounded-2xl flex md:flex-row flex-col gap-2 items-center max-w-7xl mx-auto">
      <img
        src="/assets/logo-app-banner.png"
        alt="app logo banner"
        className="max-w-40"
      />
      <div className="w-full p-4 flex-col flex gap-1.5">
        <h1 className="text-2xl font-bold text-center md:text-left">Download Avenaa App</h1>
        <p className="text-md font-light text-center md:text-left">
          Save on select hotels and earn double points when you book on <br /> the app.
          Our app deals help you to save on trips so you can <br /> travel more and
          manage it all on the go.
        </p>
        <h5 className="text-md font-semibold text-center md:text-left">Scan the QR code with your device camera and download our app</h5>
      </div>
      {/* <img src="/assets/qr-app.png" alt="download app" className="max-w-30" /> */}

      <div className="flex flex-col gap-2 p-4">
        <img src="/assets/playstore.png" alt=""  className="max-w-40"/>
        <img src="/assets/applestore.png" alt="" className="max-w-40" />
      </div>
    </div>
  );
};

export default BannerApp;
