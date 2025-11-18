import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LogoutModal from './LogoutModal'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleNavigation = (path) => {
    if (path === '/dashboard/admin/logout') {
      setShowLogoutModal(true)
    } else {
      navigate(path)
    }
  }

  const handleLogoutConfirm = () => {
    logout()
    setShowLogoutModal(false)
    navigate('/')
  }

  const MenuItem = ({ path, label, isRed = false }) => {
    const active = isActive(path)
    const isActiveState = active && !isRed
    
    return (
      <div
        className={`flex items-center gap-4 px-6 py-4 w-full rounded cursor-pointer transition-colors ${
          isActiveState
            ? 'bg-light text-green'
            : isRed
            ? 'text-[#E94235] hover:bg-gray-50'
            : 'text-darkGray hover:bg-light'
        }`}
        onClick={() => handleNavigation(path)}
      >
        <img
          src={
            isRed
              ? '/assets/partnerDashboard/reduser.svg'
              : isActiveState
              ? '/assets/partnerDashboard/greenuser.svg'
              : '/assets/partnerDashboard/user.svg'
          }
          alt="user"
          className="w-5 h-5"
        />
        <h3 className="flex-1">{label}</h3>
        {!isRed && (
          <img
            src={
              isActiveState
                ? '/assets/account/greenArrow.svg'
                : '/assets/account/blueArrow.svg'
            }
            alt="arrow"
            className="w-4 h-4"
          />
        )}
      </div>
    )
  }

  const Section = ({ title, children }) => {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-darkGray uppercase text-sm font-semibold px-6">
          {title}
        </h2>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-4 py-6 border-r-2 bg-white w-md">
      {/* MAIN Section */}
      <Section title="MAIN">
        <MenuItem path="/dashboard/admin" label="Dashboard" />
        <MenuItem path="/dashboard/admin/analytics" label="Analytics" />
        <MenuItem path="/dashboard/admin/bookings" label="All Bookings" />
        <MenuItem path="/dashboard/admin/customers" label="All Customers" />
      </Section>

      {/* Partners Section */}
      <div className="mt-8">
        <Section title="Partners">
          <MenuItem path="/dashboard/admin/property" label="All Property" />
          <MenuItem path="/dashboard/admin/property-owners" label="Property Owners" />
          <MenuItem
            path="/dashboard/admin/pending-kyc"
            label="Pending KYC Verification"
          />
        </Section>
      </div>

      {/* Others Section */}
      <div className="mt-8">
        <Section title="Others">
          <MenuItem path="/dashboard/admin/offer" label="Offer" />
          <MenuItem path="/dashboard/admin/team" label="Team Management" />
          <MenuItem path="/dashboard/admin/help" label="Help Center" />
          <MenuItem path="/dashboard/admin/profile" label="Profile" />
        </Section>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4 mt-auto pt-8">
        <MenuItem path="/dashboard/admin/settings" label="Settings" />
        <MenuItem path="/dashboard/admin/logout" label="Logout" isRed={true} />
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  )
}

export default Sidebar