import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { MoreVertical, Send, Bold, Italic, Underline, AtSign } from 'lucide-react'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

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
  const [ticket, setTicket] = useState(null)
  const [messages, setMessages] = useState([])
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  // GET /help-center/:ticketId
  const fetchTicket = async () => {
    const url = `${import.meta.env.VITE_API_URL}/help-center/${id}`
    console.log('[GET] Fetch Ticket Detail:', url)
    try {
      const response = await fetch(url, { headers: authHeaders() })
      const json = await response.json()
      console.log('[GET] Fetch Ticket Detail Response:', json)
      if (json.success && json.data) {
        setTicket(json.data.ticket || json.data)
      }
    } catch (err) {
      console.error('[GET] Fetch Ticket Detail Error:', err)
    }
  }

  // GET /help-center/:ticketId/messages
  const fetchMessages = async () => {
    const url = `${import.meta.env.VITE_API_URL}/help-center/${id}/messages?page=1&limit=50`
    console.log('[GET] Fetch Ticket Messages:', url)
    try {
      const response = await fetch(url, { headers: authHeaders() })
      const json = await response.json()
      console.log('[GET] Fetch Ticket Messages Response:', json)
      if (json.success && json.data) {
        setMessages(json.data.messages || json.data || [])
      }
    } catch (err) {
      console.error('[GET] Fetch Ticket Messages Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchTicket()
      fetchMessages()
    }
  }, [id])

  // PATCH /help-center/:ticketId/close
  const handleMarkAsClose = async () => {
    const url = `${import.meta.env.VITE_API_URL}/help-center/${id}/close`
    console.log('[PATCH] Close Ticket:', url)
    try {
      const response = await fetch(url, { method: 'PATCH', headers: authHeaders() })
      const json = await response.json()
      console.log('[PATCH] Close Ticket Response:', json)
      fetchTicket()
    } catch (err) {
      console.error('[PATCH] Close Ticket Error:', err)
    }
  }

  // POST /help-center/:ticketId/reply
  const handleSendReply = async () => {
    if (!replyText.trim()) return
    setSending(true)
    const url = `${import.meta.env.VITE_API_URL}/help-center/${id}/reply`
    const payload = { message: replyText, mediaUrls: [] }
    console.log('[POST] Send Reply:', url, payload)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      })
      const json = await response.json()
      console.log('[POST] Send Reply Response:', json)
      setReplyText('')
      fetchMessages()
    } catch (err) {
      console.error('[POST] Send Reply Error:', err)
    } finally {
      setSending(false)
    }
  }

  const getMenuItems = () => [
    {
      label: 'View at Help Center',
      onClick: () => navigate('/dashboard/admin/help'),
      className: 'cursor-pointer py-2 text-sm text-gray-700',
    },
  ]

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTimestamp = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-gray-500">Loading ticket...</p>
      </div>
    )
  }

  // Normalise ticket fields
  const ticketId = ticket?.ticketId || ticket?._id || `#${id}`
  const displayId = ticketId.startsWith('#') ? ticketId : `#${ticketId}`
  const subject = ticket?.subject || '—'
  const status = ticket?.status || 'open'
  const customerName = ticket?.user?.name || ticket?.user?.firstName || ticket?.customerName || '—'
  const email = ticket?.user?.email || ticket?.email || '—'
  const phone = ticket?.user?.phone?.number
    ? `${ticket.user.phone.countryCode || ''} ${ticket.user.phone.number}`.trim()
    : ticket?.phone || '—'
  const createdAt = formatDate(ticket?.createdAt)
  const updatedAt = formatDate(ticket?.updatedAt)
  const files = ticket?.mediaUrls?.map((url) => ({ name: url.split('/').pop(), url })) || []

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      {/* Top green strip */}
      <div className="w-full bg-light p-4">
        <div className="text-sm text-right text-gray-600 mt-4 mx-4">
          <button onClick={() => navigate('/dashboard/admin/help')} className="text-green hover:underline font-medium">
            Help Center
          </button>{' '}
          <span className="text-gray-400">&gt;</span>{' '}
          <span className="text-gray-800 font-medium">{displayId}</span>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Left Panel - Main Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm h-fit">
          {/* Ticket Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {displayId} ({subject})
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
            {/* Initial ticket message */}
            {ticket?.message && (
              <div className="flex gap-4 justify-start">
                <div className="shrink-0">
                  <img src="/assets/account/user.png" alt={customerName} className="w-10 h-10 rounded-full" onError={(e) => { e.target.src = '/assets/account/user.png' }} />
                </div>
                <div className="flex flex-col max-w-[70%] items-start">
                  <div className="mb-1">
                    <span className="font-semibold text-gray-800 text-sm block">{customerName}</span>
                    <span className="text-gray-500 text-xs">{formatTimestamp(ticket.createdAt)}</span>
                  </div>
                  <div className="inline-block px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800">
                    <p className="text-sm leading-relaxed">{ticket.message}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Thread messages */}
            {messages.map((message, idx) => {
              const isSupport = message.senderType === 'admin' || message.senderType === 'support' || message.sender === 'admin'
              const senderName = isSupport ? 'Support Team' : (message.senderName || customerName)
              return (
                <div key={message._id || idx} className={`flex gap-4 ${isSupport ? 'justify-end' : 'justify-start'}`}>
                  {!isSupport && (
                    <div className="shrink-0">
                      <img src="/assets/account/user.png" alt={senderName} className="w-10 h-10 rounded-full" onError={(e) => { e.target.src = '/assets/account/user.png' }} />
                    </div>
                  )}
                  <div className={`flex flex-col max-w-[70%] ${isSupport ? 'items-end' : 'items-start'}`}>
                    {!isSupport && (
                      <div className="mb-1">
                        <span className="font-semibold text-gray-800 text-sm block">{senderName}</span>
                        <span className="text-gray-500 text-xs">{formatTimestamp(message.createdAt)}</span>
                      </div>
                    )}
                    <div className={`inline-block px-4 py-3 rounded-lg ${isSupport ? 'bg-green-100 text-gray-800' : 'bg-white border border-gray-200 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed">{message.message || message.content}</p>
                    </div>
                    {isSupport && <span className="text-gray-500 text-xs mt-1">{formatTimestamp(message.createdAt)}</span>}
                  </div>
                  {isSupport && (
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center text-white font-semibold text-xs">ST</div>
                    </div>
                  )}
                </div>
              )
            })}
            {messages.length === 0 && !ticket?.message && (
              <p className="text-center text-gray-400 text-sm">No messages yet.</p>
            )}
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
                disabled={sending}
                className="p-2 bg-green text-white rounded-lg hover:bg-darkGreen transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Sidebar */}
        <div className="w-80 shrink-0 space-y-6">
          {/* Support Ticket Details */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Support Ticket Details
            </h2>
              <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
                </span>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Ticket Id</label>
                <p className="text-sm text-gray-800">{displayId}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Customer</label>
                <p className="text-sm text-gray-800">{customerName}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Email</label>
                <p className="text-sm text-gray-800">{email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Phone Number</label>
                <p className="text-sm text-gray-800">{phone}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Created Date</label>
                <p className="text-sm text-gray-800">{createdAt}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Last Update Date</label>
                <p className="text-sm text-gray-800">{updatedAt}</p>
              </div>
            </div>
          </div>

          {/* File Shared */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              File Shared
            </h2>
            <div className="space-y-3">
              {files.length === 0 && <p className="text-sm text-gray-400">No files shared</p>}
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="shrink-0">
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
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    {file.url && <a href={file.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">View</a>}
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

