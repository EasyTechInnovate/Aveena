import React, { useState } from 'react'
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
import { Search, ChevronDown, MoreVertical, Trash2, ChevronLeft, ChevronRight, Edit, Check } from 'lucide-react'

// Generate more ticket data for pagination
const generateTicketData = () => {
  const data = []
  const statuses = ['On Hold', 'In Progress', 'Resolved']
  for (let i = 1; i <= 150; i++) {
    data.push({
      id: `#${String(i).padStart(3, '0')}`,
      customer: 'Kathryn Murphy',
      subject: 'Payment Is not Refund',
      status: statuses[i % 3],
      created: 'Jun 10, 2016',
      updated: 'Jun 10, 2016',
    })
  }
  return data
}

const getStatusColor = (status) => {
  switch (status) {
    case 'On Hold':
      return 'bg-yellow-200 text-yellow-900'
    case 'In Progress':
      return 'bg-orange-200 text-orange-900'
    case 'Resolved':
      return 'bg-green-200 text-green-900'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const HelpCenter = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [allTickets, setAllTickets] = useState(generateTicketData())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  // Filter tickets based on search term
  const filteredTickets = allTickets.filter((ticket) =>
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTickets = filteredTickets.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && typeof page === 'number') {
      setCurrentPage(page)
    }
  }

  const handleDelete = (ticketId) => {
    if (window.confirm(`Are you sure you want to delete ticket ${ticketId}?`)) {
      setAllTickets((prev) => {
        const updated = prev.filter((ticket) => ticket.id !== ticketId)
        // Adjust page if current page becomes empty after deletion
        const newFiltered = updated.filter((ticket) =>
          ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleStatusChange = (ticketId, newStatus) => {
    setAllTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, updated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
          : ticket
      )
    )
  }

  const handleMarkAsResolved = (ticketId) => {
    handleStatusChange(ticketId, 'Resolved')
  }

  const handleMarkAsApproved = (ticketId) => {
    // For resolved tickets, we can mark them as approved
    // This could be a separate status or just a confirmation
    console.log('Marking ticket as approved:', ticketId)
    // You can add additional logic here if needed
  }

  const handleEdit = (ticketId) => {
    navigate(`/dashboard/admin/help/ticket/${ticketId.replace('#', '')}`)
  }

  // Get menu items based on ticket status
  const getMenuItems = (ticket) => {
    const items = []

    if (ticket.status !== 'Resolved') {
      // For tickets that are not resolved
      items.push({
        label: 'Mark as Resolved',
        icon: Check,
        onClick: () => handleMarkAsResolved(ticket.id),
        className: 'cursor-pointer py-2 text-sm text-gray-700',
      })
    } else {
      // For resolved tickets
      items.push({
        label: 'Approved',
        icon: Check,
        onClick: () => handleMarkAsApproved(ticket.id),
        className: 'cursor-pointer py-2 text-sm text-gray-700',
      })
    }

    // Edit option (always available)
    items.push({
      label: 'Edit',
      icon: Edit,
      onClick: () => handleEdit(ticket.id),
      className: 'cursor-pointer py-2 text-sm text-gray-700',
    })

    // Delete option (always available)
    items.push({
      label: 'Delete',
      icon: Trash2,
      onClick: () => handleDelete(ticket.id),
      className: 'cursor-pointer py-2 text-sm text-red-600',
      variant: 'destructive',
    })

    return items
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
          <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
          
          <div className="flex gap-3 items-center">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Ticket"
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

            {/* Three Dots Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem className="cursor-pointer py-2 text-sm text-gray-700">
                  Options
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Ticket Id</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Customer Name</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Subject</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Status</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Created Date</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm">Last Update</TableHead>
                <TableHead className="font-semibold text-gray-800 whitespace-nowrap text-sm"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTickets.length > 0 ? (
                currentTickets.map((ticket, index) => (
                  <TableRow 
                    key={`${ticket.id}-${startIndex + index}`} 
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/admin/help/ticket/${ticket.id.replace('#', '')}`)}
                  >
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">{ticket.id}</TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">{ticket.customer}</TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">{ticket.subject}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">{ticket.created}</TableCell>
                    <TableCell className="text-sm text-gray-700 whitespace-nowrap">{ticket.updated}</TableCell>
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {getMenuItems(ticket).map((item, idx) => {
                            const IconComponent = item.icon
                            return (
                              <DropdownMenuItem
                                key={idx}
                                variant={item.variant}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  item.onClick()
                                }}
                                className={item.className}
                              >
                                <IconComponent className="mr-2 h-4 w-4" />
                                {item.label}
                              </DropdownMenuItem>
                            )
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No tickets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </div>
  )
}

export default HelpCenter

