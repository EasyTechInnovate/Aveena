import Sidebar from "../../components/partnerDashboard/Sidebar";
import React from "react";
import UploadKycDocuments from "../../components/partnerDashboard/MyProperty/UploadKycDocuments";

const KycDoc = () => {
  return (
    <div className="w-full flex justify-between relative">
      <Sidebar />
      <div className="ml-[280px] mt-[80px] max-w-7xl w-full p-4 bg-[#F8FAFC] min-h-[calc(100vh-80px)]">
        <UploadKycDocuments />
      </div>
    </div>
  );
};

export default KycDoc;
