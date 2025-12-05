import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/common/Nav";
// import PartnerNav from "./components/common/PartnerNav";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Partner from "./pages/Partner";
import Tour from "./pages/Tour";
import Visa from "./pages/Visa";
import Search from "./pages/Search";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cancellation from "./pages/Cancellation";
import About from "./pages/About";
import BookingPage from "./pages/BookingPage";
import Faq from "./pages/Faq";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Career from "./pages/Career";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import SecurityPage from "./pages/Security";
import IdentityVerificationPage from "./pages/IdentityVerification";
import CustomerSupportPage from "./pages/CustomerSupport";
import HelpCentre from "./pages/HelpCentre";
import Feedback from "./pages/Feedback";
import RewardsWallet from "./pages/RewardsWallet";
import PaymentMethods from "./pages/PaymentMethods";
import TripsBookings from "./pages/TripsBookings";
import SavedLists from "./pages/SavedLists";
import MyReviews from "./pages/MyReviews";
// import ComingSoon from "./pages/ComingSoon";
import Dashboard from "./pages/partnerDashboard/partnerDashboard";
import MyProperty from "./pages/partnerDashboard/MyProperty";
import ViewProperty from "./pages/partnerDashboard/ViewProperty";
import BookingDetailsPage from "./pages/partnerDashboard/BookingDetails";
import KycDoc from "./pages/partnerDashboard/KycDoc";
import SignPatronDoc from "./pages/partnerDashboard/SignPatronDoc";
import MyBookings from "./pages/partnerDashboard/MyBookings";
import Revenue from "./pages/partnerDashboard/Revenue";
import AdminDashboard from "./pages/adminDashboard/Dashboard";
import AdminAnalytics from "./pages/adminDashboard/Analytics";
import AdminHelpCenter from "./pages/adminDashboard/HelpCenter";
import AdminTicketDetail from "./pages/adminDashboard/TicketDetail";
import AdminAllBookings from "./pages/adminDashboard/AllBookings";
import AdminAllCustomers from "./pages/adminDashboard/AllCustomers";
import AdminAllProperty from "./pages/adminDashboard/AllProperty";
import EditProperty from "./pages/adminDashboard/EditProperty";
import AllPropertyOwners from "./pages/adminDashboard/AllPropertyOwners";
import EditPropertyOwner from "./pages/adminDashboard/EditPropertyOwner";
import AdminOffer from "./pages/adminDashboard/Offer";
import AdminTeamManagement from "./pages/adminDashboard/TeamManagement";
import AdminProfile from "./pages/adminDashboard/Profile";
import AdminSettings from "./pages/adminDashboard/Settings";
import Test from "./pages/Test";
// Wrapper to handle conditional nav
const Layout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
 <AuthProvider>
  <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/visa" element={<Visa />} />
        <Route path="/search" element={<Search />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/career" element={<Career />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/identity-verification" element={<IdentityVerificationPage />} />
        <Route path="/customer-support" element={<CustomerSupportPage />} />
        <Route path="/help-centre" element={<HelpCentre />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/rewards-wallet" element={<RewardsWallet />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/trips-bookings" element={<TripsBookings />} />
        <Route path="/saved-lists" element={<SavedLists />} />
        <Route path="/my-reviews" element={<MyReviews />} />


        
        <Route path="/dashboard/partner" element={<Dashboard />} />
        <Route path="/dashboard/property" element={<MyProperty />} />
        <Route path="/dashboard/partner/view-property/:id" element={<ViewProperty />} />
        <Route path="/dashboard/partner/booking-details/:id" element={<BookingDetailsPage />} />
        <Route path="/dashboard/kyc" element={<KycDoc />} />
        <Route path="/dashboard/sign" element={<SignPatronDoc />} />
        <Route path="/dashboard/bookings" element={<MyBookings />} />
        <Route path="/dashboard/revenue" element={<Revenue />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/dashboard/admin/help" element={<AdminHelpCenter />} />
        <Route path="/dashboard/admin/help/ticket/:id" element={<AdminTicketDetail />} />
        <Route path="/dashboard/admin/bookings" element={<AdminAllBookings />} />
        <Route path="/dashboard/admin/customers" element={<AdminAllCustomers />} />
        <Route path="/dashboard/admin/property" element={<AdminAllProperty />} />
        <Route path="/dashboard/admin/property/edit/:id" element={<EditProperty />} />
        <Route path="/dashboard/admin/property-owners" element={<AllPropertyOwners />} />
        <Route path="/dashboard/admin/property-owners/edit/:id" element={<EditPropertyOwner />} />
        <Route path="/dashboard/admin/offer" element={<AdminOffer />} />
        <Route path="/dashboard/admin/team" element={<AdminTeamManagement />} />
        <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
        <Route path="/dashboard/admin/settings" element={<AdminSettings />} />


        <Route path="/test" element={<Test />} />




      </Routes>

      {!isDashboardRoute && <Footer />}
 </AuthProvider>
    </>
  );
};

const App = () => {
  return (
    <div id="main" className="bg-white w-full h-full">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
