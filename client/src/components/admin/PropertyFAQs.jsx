import React, { useState } from 'react'
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react'

const PropertyFAQs = ({ propertyId, onCancel, onContinue }) => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?',
      answer: 'In this agreement "FabHotels" refers to the corporate entity Brise Hospitality Management Opc Pvt Ltd as well as its website www.fabhotels.com and mobile application and other services as the context provides.',
      expanded: true,
      editing: false,
    },
    {
      id: 2,
      question: 'Should users be able to filter hotels (by price, location, star rating, amenities, etc.)?',
      answer: 'In this agreement "FabHotels" refers to the corporate entity Brise Hospitality Management Opc Pvt Ltd as well as its website www.fabhotels.com and mobile application and other services as the context provides.',
      expanded: false,
      editing: false,
    },
  ])

  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [editingFaq, setEditingFaq] = useState(null)
  const [editQuestion, setEditQuestion] = useState('')
  const [editAnswer, setEditAnswer] = useState('')

  const toggleFaq = (id) => {
    setFaqs((prev) =>
      prev.map((faq) =>
        faq.id === id ? { ...faq, expanded: !faq.expanded, editing: false } : { ...faq, editing: false }
      )
    )
    setEditingFaq(null)
  }

  const handleDeleteFaq = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== id))
    }
  }

  const handleEditFaq = (faq) => {
    setEditingFaq(faq.id)
    setEditQuestion(faq.question)
    setEditAnswer(faq.answer)
    setFaqs((prev) =>
      prev.map((f) => (f.id === faq.id ? { ...f, expanded: true, editing: true } : f))
    )
  }

  const handleUpdateFaq = (id) => {
    if (editQuestion.trim() && editAnswer.trim()) {
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === id
            ? {
                ...faq,
                question: editQuestion,
                answer: editAnswer,
                editing: false,
              }
            : faq
        )
      )
      setEditingFaq(null)
      setEditQuestion('')
      setEditAnswer('')
    }
  }

  const handleCancelEdit = (id) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, editing: false } : faq))
    )
    setEditingFaq(null)
    setEditQuestion('')
    setEditAnswer('')
  }

  const handleAddFaq = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFaqs((prev) => [
        ...prev,
        {
          id: Date.now(),
          question: newQuestion.trim(),
          answer: newAnswer.trim(),
          expanded: false,
          editing: false,
        },
      ])
      setNewQuestion('')
      setNewAnswer('')
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Property FAQ's</h1>
          <p className="text-gray-600 text-sm">Please fill below details and upload your property.</p>
        </div>
        <button className="text-blue hover:text-blue-800 text-sm font-medium">
          Add New FAQ
        </button>
      </div>

      {/* FAQ Items */}
      <div className="mb-8 space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-4">
              {/* Drag Handle */}
              <div className="pt-1">
                <GripVertical size={20} className="text-gray-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-800 flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={`p-1.5 rounded-full ${
                      faq.expanded
                        ? 'bg-green text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {faq.expanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>

                {/* Answer (shown when expanded) */}
                {faq.expanded && (
                  <>
                    {editingFaq === faq.id ? (
                      // Edit Mode
                      <div className="space-y-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question
                          </label>
                          <input
                            type="text"
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Answer
                          </label>
                          <textarea
                            value={editAnswer}
                            onChange={(e) => setEditAnswer(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green resize-none"
                          />
                        </div>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => handleCancelEdit(faq.id)}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Cancle
                          </button>
                          <button
                            onClick={() => handleUpdateFaq(faq.id)}
                            className="text-sm text-blue hover:text-blue-700 font-medium"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <p className="text-sm text-gray-700 mb-4">{faq.answer}</p>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Cancle
                          </button>
                          <button
                            onClick={() => handleEditFaq(faq)}
                            className="text-sm text-blue hover:text-blue-700 font-medium"
                          >
                            Update
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New FAQ Form */}
      <div className="mb-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add New FAQ</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter here"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answer
            </label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Leslie Alexander"
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green focus:border-green resize-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setNewQuestion('')
                setNewAnswer('')
              }}
              className="text-sm text-gray-600 hover:text-gray-700 font-medium"
            >
              Cancle
            </button>
            <button
              onClick={handleAddFaq}
              className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="text-sm text-gray-600 hover:text-gray-700 font-medium"
        >
          Cancle
        </button>
        <button
          onClick={onContinue}
          className="px-6 py-2.5 bg-green text-white rounded-lg font-medium hover:bg-darkGreen transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default PropertyFAQs

