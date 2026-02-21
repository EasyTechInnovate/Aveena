import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Search, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Trash2, Edit } from 'lucide-react'

// Generate property owner data for pagination
const generatePropertyOwnerData = () => {
  const data = []
  const names = [
    'Leslie Alexander',
    'Robert Fox',
    'John Smith',
    'Emily Johnson',
    'Michael Brown',
    'Sarah Davis',
    'David Wilson',
    'Jessica Martinez',
    'Christopher Anderson',
    'Amanda Taylor',
  ]
  const emails = [
    'tim.jennings@example.com',
    'robert.fox@example.com',
    'john.smith@example.com',
    'emily.johnson@example.com',
    'michael.brown@example.com',
    'sarah.davis@example.com',
    'david.wilson@example.com',
    'jessica.martinez@example.com',
    'christopher.anderson@example.com',
    'amanda.taylor@example.com',
  ]
  const phones = [
    '+91 123 436 5647',
    '+91 234 5678 901',
    '+91 345 6789 012',
    '+91 456 7890 123',
    '+91 567 8901 234',
    '+91 678 9012 345',
    '+91 789 0123 456',
    '+91 890 1234 567',
    '+91 901 2345 678',
    '+91 012 3456 789',
  ]
  const addresses = [
    'Delhi, India',
    'Mumbai, India',
    'Bangalore, India',
    'Chennai, India',
    'Kolkata, India',
    'Hyderabad, India',
    'Pune, India',
    'Ahmedabad, India',
    'Jaipur, India',
    'Surat, India',
  ]

  for (let i = 1; i <= 150; i++) {
    const index = (i - 1) % 10
    data.push({
      id: i,
      ownerName: names[index],
      email: emails[index],
      phone: phones[index],
      address: addresses[index],
      totalProperties: String(Math.floor(Math.random() * 20) + 1).padStart(2, '0'),
    })
  }
  return data
}

const AllPropertyOwners = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [allPropertyOwners, setAllPropertyOwners] = useState(generatePropertyOwnerData())
  const itemsPerPage = 12

  useEffect(() => {
      const allPropertyOwners = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/property-owners?page=1&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          );
  
          const jsonResponse = await response.json();
  
          console.log("All Property Owners Data:", jsonResponse);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
  
      allPropertyOwners();
    }, []);

  // Filter property owners based on search term
  const filteredPropertyOwners = allPropertyOwners.filter((owner) =>
    owner.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.phone.includes(searchTerm) ||
    owner.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredPropertyOwners.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPropertyOwners = filteredPropertyOwners.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleMarkAsInactive = (ownerId) => {
    // TODO: Implement mark as inactive functionality
    console.log('Marking property owner as inactive:', ownerId)
    // You can update the state here to mark the owner as inactive
  }

  const handleEdit = (ownerId) => {
    navigate(`/dashboard/admin/property-owners/edit/${ownerId}`)
  }

  const handleDelete = (ownerId) => {
    if (window.confirm(`Are you sure you want to delete this property owner?`)) {
      setAllPropertyOwners((prev) => {
        const updated = prev.filter((owner) => owner.id !== ownerId)
        // Adjust page if current page becomes empty after deletion
        const newFiltered = updated.filter((owner) =>
          owner.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.phone.includes(searchTerm) ||
          owner.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
        const newTotalPages = Math.ceil(newFiltered.length / itemsPerPage)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        } else if (newTotalPages === 0) {
          setCurrentPage(1)
        }
        return updated
      })
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Property Owners</h1>
          
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Property Owner"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green w-64"
              />
            </div>

            {/* Filters Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Filters
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Owner Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Email Address</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Phone Number</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Address</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap">Total Properties</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPropertyOwners.length > 0 ? (
                currentPropertyOwners.map((owner, index) => (
                  <TableRow key={`${owner.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.ownerName}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.email}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.phone}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.address}</TableCell>
                    <TableCell className="text-gray-700 whitespace-nowrap">{owner.totalProperties}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            onClick={() => handleMarkAsInactive(owner.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Mark As a In-active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(owner.id)}
                            className="cursor-pointer py-2 text-sm text-gray-700"
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(owner.id)}
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
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No property owners found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          {pages.map((page, index) =>
            page === '...' ? (
              <span key={index} className="text-gray-500 px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${
                  currentPage === page
                    ? 'bg-green text-white border-green'
                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllPropertyOwners

