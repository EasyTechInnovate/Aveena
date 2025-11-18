import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreVertical, Send, Bold, Italic, Underline, AtSign } from 'lucide-react'

// Mock ticket data - in real app, this would come from an API
const getTicketData = (ticketId) => {
  const formattedId = ticketId ? `#${ticketId}` : '#1234'
  return {
    id: formattedId,
    subject: 'Payment Is not Refund',
    status: 'In Progress',
    customer: 'Kathryn Murphy',
    email: 'customer@gmail.com',
    phone: '+91 123 3464 664',
    created: 'Jun 10, 2016',
    updated: 'Jun 10, 2016',
    messages: [
      {
        id: 1,
        sender: 'Kathryn Murphy',
        senderType: 'customer',
        avatar: '/assets/account/user.png',
        timestamp: 'Jun 10, 2016 at 8:00 am',
        content: "I'm facing an issue with logging into my account. Every time I try, it shows an error message saying 'Invalid Credentials,' even though I'm sure the details are correct. Please look into this.",
      },
      {
        id: 2,
        sender: 'Support Team',
        senderType: 'support',
        timestamp: 'Jun 10, 2016 at 8:00 am',
        content: "I'm facing an issue with logging into my account. Every time I try, it shows an error message saying 'Invalid Credentials,' even though I'm sure the details are correct. Please look into this.",
      },
    ],
    files: [
      { name: 'Patron Agreement.PDF', date: 'Jun 10, 2016' },
      { name: 'Patron Agreement.PDF', date: 'Jun 10, 2016' },
      { name: 'Patron Agreement.PDF', date: 'Jun 10, 2016' },
      { name: 'Patron Agreement.PDF', date: 'Jun 10, 2016' },
    ],
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'On Hold':
      return 'bg-yellow-200 text-yellow-900'
    case 'In Progress':
      return 'bg-orange-100 text-orange-800'
    case 'Resolved':
      return 'bg-green-200 text-green-900'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = getTicketData(id)
  const [replyText, setReplyText] = useState('')

  const handleMarkAsClose = () => {
    // TODO: Implement mark as close functionality
    console.log('Marking ticket as closed:', ticket.id)
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      // TODO: Implement send reply functionality
      console.log('Sending reply:', replyText)
      setReplyText('')
    }
  }

  const getMenuItems = () => {
    return [
      {
        label: 'Edit',
        onClick: () => console.log('Edit ticket'),
        className: 'cursor-pointer py-2 text-sm text-gray-700',
      },
      {
        label: 'Delete',
        onClick: () => console.log('Delete ticket'),
        className: 'cursor-pointer py-2 text-sm text-red-600',
        variant: 'destructive',
      },
    ]
  }

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Top green strip */}
      <div className="w-full bg-light p-4">
      <div className="text-sm text-right text-gray-600 mt-4 mx-4">
          <button
            onClick={() => navigate('/dashboard/admin/help')}
            className="text-green hover:underline font-medium"
          >
            Help Center
          </button>{' '}
          <span className="text-gray-400">&gt;</span>{' '}
          <span className="text-gray-800 font-medium">{ticket.id}</span>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Left Panel - Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm h-fit">
          {/* Ticket Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {ticket.id} ({ticket.subject})
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAsClose}
                className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
              >
                Mark as Close
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  {getMenuItems().map((item, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      variant={item.variant}
                      onClick={item.onClick}
                      className={item.className}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-450px)] overflow-y-auto">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.senderType === 'support' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.senderType === 'customer' && (
                  <div className="flex-shrink-0">
                    <img
                      src={message.avatar || '/assets/account/user.png'}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = '/assets/account/user.png'
                      }}
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col max-w-[70%] ${
                    message.senderType === 'support' ? 'items-end' : 'items-start'
                  }`}
                >
                  {message.senderType === 'customer' && (
                    <div className="mb-1">
                      <span className="font-semibold text-gray-800 text-sm block">
                        {message.sender}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {message.timestamp}
                      </span>
                    </div>
                  )}
                  <div
                    className={`inline-block px-4 py-3 rounded-lg ${
                      message.senderType === 'support'
                        ? 'bg-green-100 text-gray-800'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.senderType === 'support' && (
                    <span className="text-gray-500 text-xs mt-1">
                      {message.timestamp}
                    </span>
                  )}
                </div>
                {message.senderType === 'support' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center text-white font-semibold">
                      ST
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reply Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="mb-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write here......"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <AtSign size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <Bold size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <Italic size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                  <Underline size={18} className="text-gray-600" />
                </button>
              </div>
              <button
                onClick={handleSendReply}
                className="p-2 bg-green text-white rounded-lg hover:bg-darkGreen transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-6">
          {/* Support Ticket Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Support Ticket Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Ticket Id
                </label>
                <p className="text-sm text-gray-800">{ticket.id}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Email
                </label>
                <p className="text-sm text-gray-800">{ticket.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Phone Number
                </label>
                <p className="text-sm text-gray-800">{ticket.phone}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Created Date
                </label>
                <p className="text-sm text-gray-800">{ticket.created}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                  Last Update Date
                </label>
                <p className="text-sm text-gray-800">{ticket.updated}</p>
              </div>
            </div>
          </div>

          {/* File Shared */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              File Shared
            </h2>
            <div className="space-y-3">
              {ticket.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/assets/booking/pdf.svg"
                      alt="PDF"
                      className="w-8 h-8"
                      onError={(e) => {
                        e.target.src = '/assets/partnerDashboard/pdf.svg'
                        e.target.onerror = null
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{file.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail

