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
import { MoreVertical, Calendar } from 'lucide-react'
import RightDrawer from '../common/RightDrawer'

// Sample offer data matching the UI
const generateOfferData = () => {
  return [
    {
      id: 1,
      promocodeName: 'Biggest Festival',
      promoCode: 'DIWALI0025',
      value: '10%',
      activeDate: 'Wed 3 Sep 2025',
      endDate: 'Wed 3 Sep 2025',
      used: '2',
      limitUser: '50',
      status: 'Active',
    },
    {
      id: 2,
      promocodeName: 'Biggest Festival',
      promoCode: 'DIWALI0025',
      value: '10%',
      activeDate: 'Wed 3 Sep 2025',
      endDate: 'Wed 3 Sep 2025',
      used: '2',
      limitUser: '50',
      status: 'Active',
    },
    {
      id: 3,
      promocodeName: 'Biggest Festival',
      promoCode: 'DIWALI0025',
      value: '10%',
      activeDate: 'Wed 3 Sep 2025',
      endDate: 'Wed 3 Sep 2025',
      used: '2',
      limitUser: '50',
      status: 'Active',
    },
    {
      id: 4,
      promocodeName: 'Biggest Festival',
      promoCode: 'DIWALI0025',
      value: '10%',
      activeDate: 'Wed 3 Sep 2025',
      endDate: 'Wed 3 Sep 2025',
      used: '2',
      limitUser: '50',
      status: 'Active',
    },
    {
      id: 5,
      promocodeName: 'Biggest Festival',
      promoCode: 'DIWALI0025',
      value: '10%',
      activeDate: 'Wed 3 Sep 2025',
      endDate: 'Wed 3 Sep 2025',
      used: '50',
      limitUser: '50',
      status: 'Expired',
    },
  ]
}

const Offer = () => {
  const [offers, setOffers] = useState(generateOfferData())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    offerName: 'Biggest Festival',
    promocodeName: 'DIWALI0025',
    discountValue: '10',
    startingDate: 'Wed 3 Sep 2025',
    endDate: 'Wed 3 Sep 2025',
    limitUser: '50',
  })

  const handleDelete = (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers((prev) => prev.filter((offer) => offer.id !== offerId))
    }
  }

  const handleEdit = (offerId) => {
    // TODO: Implement edit functionality
    console.log('Edit offer:', offerId)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving offer:', formData)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Offer</h1>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
          >
            Add New Offer
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Promocode Name
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Promo Code
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Value(%)
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Active Date
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  End Date
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Used
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm text-center">
                  Limit User
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.length > 0 ? (
                offers.map((offer) => (
                  <TableRow
                    key={offer.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {offer.promocodeName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-50 border border-green-300 text-green-800">
                        {offer.promoCode}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                      {offer.value}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {offer.activeDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">
                      {offer.endDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                      {offer.used}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap text-center">
                      {offer.limitUser}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                          offer.status === 'Active'
                            ? 'bg-green-400 text-green-800'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {offer.status}
                      </span>
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
                            onClick={() => handleEdit(offer.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(offer.id)}
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
                  <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                    No offers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Offer Drawer */}
      <RightDrawer
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Create a offer"
        subtitle="Create or Delete offer for users"
      >
        <div className="p-8">
          {/* Form Fields */}
          <div className="space-y-6">
            {/* First Row - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offer Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Offer Name
                </label>
                <input
                  type="text"
                  name="offerName"
                  value={formData.offerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              {/* Promocode Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Promocode Name
                </label>
                <input
                  type="text"
                  name="promocodeName"
                  value={formData.promocodeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Second Row - Discount Value on left, Dates stacked on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discount Value - Left Column */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value(%)
                </label>
                <input
                  type="text"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              {/* Dates - Right Column (Stacked) */}
              <div className="flex flex-col gap-6">
                {/* Starting Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Starting Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="startingDate"
                      value={formData.startingDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row - Limit User (Full Width) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Limit User
              </label>
              <input
                type="text"
                name="limitUser"
                value={formData.limitUser}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
              />
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
    </div>
  )
}

export default Offer

