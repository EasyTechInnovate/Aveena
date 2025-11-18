import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreVertical, Eye, EyeOff, UserX, Check } from 'lucide-react'
import RightDrawer from '../common/RightDrawer'

// Sample team member data matching the UI
const generateTeamData = () => {
  return [
    {
      id: 1,
      memberId: '#123',
      name: 'Robert Fox',
      email: 'sara.cruz@example.com',
      password: '5hGahZxq',
      role: 'Content Department',
      status: 'Active',
      lastUpdate: 'Wed 3 Sep 2025',
    },
    {
      id: 2,
      memberId: '#123',
      name: 'Jane Cooper',
      email: 'willie.jennings@example.com',
      password: 'KbJZGLrhx',
      role: 'Account',
      status: 'In Active',
      lastUpdate: 'Wed 3 Sep 2025',
    },
    {
      id: 3,
      memberId: '#123',
      name: 'Ralph Edwards',
      email: 'alma.lawson@example.com',
      password: 'pJPHHEsz',
      role: 'Verification Department',
      status: 'Active',
      lastUpdate: 'Wed 3 Sep 2025',
    },
    {
      id: 4,
      memberId: '#123',
      name: 'Kathryn Murphy',
      email: 'jessica.hanson@example.com',
      password: 'ZB0mLzLH7CU',
      role: 'Account',
      status: 'Active',
      lastUpdate: 'Wed 3 Sep 2025',
    },
    {
      id: 5,
      memberId: '#123',
      name: 'Esther Howard',
      email: 'tanya.hill@example.com',
      password: 'IEt15UdUvlm',
      role: 'Account',
      status: 'Active',
      lastUpdate: 'Wed 3 Sep 2025',
    },
  ]
}

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState(generateTeamData())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [passwordVisibility, setPasswordVisibility] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [permissions, setPermissions] = useState({
    dashboard: { read: false, edit: false },
    analytics: { read: false, edit: false },
    allBookings: { read: false, edit: false },
    allCustomers: { read: false, edit: false },
    allProperty: { read: false, edit: false },
    propertyOwner: { read: false, edit: false },
    pendingKyc: { read: false, edit: false },
    offer: { read: false, edit: false },
    teamManagement: { read: false, edit: false },
    helpCenter: { read: false, edit: false },
    profile: { read: false, edit: false },
  })

  const togglePasswordVisibility = (memberId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))
  }

  const handleDelete = (memberId) => {
    setMemberToDelete(memberId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== memberToDelete))
      setIsDeleteModalOpen(false)
      setMemberToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setMemberToDelete(null)
  }

  const handleToggleStatus = (memberId) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status: member.status === 'Active' ? 'In Active' : 'Active',
            }
          : member
      )
    )
  }

  const handleEdit = (memberId) => {
    // TODO: Implement edit functionality
    console.log('Edit team member:', memberId)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePermissionChange = (section, type) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: !prev[section][type],
      },
    }))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving team member:', formData, permissions)
    setIsModalOpen(false)
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
    setPermissions({
      dashboard: { read: false, edit: false },
      analytics: { read: false, edit: false },
      allBookings: { read: false, edit: false },
      allCustomers: { read: false, edit: false },
      allProperty: { read: false, edit: false },
      propertyOwner: { read: false, edit: false },
      pendingKyc: { read: false, edit: false },
      offer: { read: false, edit: false },
      teamManagement: { read: false, edit: false },
      helpCenter: { read: false, edit: false },
      profile: { read: false, edit: false },
    })
    setShowPassword(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
    setPermissions({
      dashboard: { read: false, edit: false },
      analytics: { read: false, edit: false },
      allBookings: { read: false, edit: false },
      allCustomers: { read: false, edit: false },
      allProperty: { read: false, edit: false },
      propertyOwner: { read: false, edit: false },
      pendingKyc: { read: false, edit: false },
      offer: { read: false, edit: false },
      teamManagement: { read: false, edit: false },
      helpCenter: { read: false, edit: false },
      profile: { read: false, edit: false },
    })
    setShowPassword(false)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Team Management</h1>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
          >
            Add New Member
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Password
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  last Update
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {member.memberId}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {member.email}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>
                          {passwordVisibility[member.id]
                            ? member.password
                            : '•'.repeat(member.password.length)}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(member.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label="Toggle password visibility"
                        >
                          {passwordVisibility[member.id] ? (
                            <EyeOff size={16} className="text-gray-600" />
                          ) : (
                            <Eye size={16} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {member.role}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
                          member.status === 'Active'
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'Active'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        ></span>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {member.lastUpdate}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(member.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Mark As a In-active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(member.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(member.id)}
                            className="cursor-pointer py-2 text-sm text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    No team members found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Team Member Drawer */}
      <RightDrawer
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Add Team Member"
        subtitle="Create or Delete new users for this account"
      >
        <div className="p-8">
          {/* Personal Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
            <div className="space-y-6">
              {/* First Row - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-600" />
                    ) : (
                      <Eye size={20} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Permissions Section */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">User Permissions</h3>
              <p className="text-sm text-gray-600">Select what a user can see or edit</p>
            </div>
            
            {/* Permissions Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Section Name
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">
                      Read
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { key: 'dashboard', label: 'Dashboard' },
                    { key: 'analytics', label: 'Analytics' },
                    { key: 'allBookings', label: 'All Bookings' },
                    { key: 'allCustomers', label: 'All Customers' },
                    { key: 'allProperty', label: 'All Property' },
                    { key: 'propertyOwner', label: 'Property Owner' },
                    { key: 'pendingKyc', label: 'Pending KYC' },
                    { key: 'offer', label: 'Offer' },
                    { key: 'teamManagement', label: 'Team Management' },
                    { key: 'helpCenter', label: 'Help Center' },
                    { key: 'profile', label: 'Profile' },
                  ].map((section) => (
                    <tr key={section.key} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {section.label}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handlePermissionChange(section.key, 'read')}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            permissions[section.key].read
                              ? 'bg-green border-green'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                        >
                          {permissions[section.key].read && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handlePermissionChange(section.key, 'edit')}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            permissions[section.key].edit
                              ? 'bg-green border-green'
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                        >
                          {permissions[section.key].edit && (
                            <Check size={14} className="text-white" strokeWidth={3} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </RightDrawer>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8">
            {/* Delete Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <UserX size={40} className="text-red-600" strokeWidth={2} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">×</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Delete This Member?
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-center mb-8 text-sm">
              Are you sure you want to proceed? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Please Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagement

