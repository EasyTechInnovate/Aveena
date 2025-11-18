import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

// Recent Property data
const recentProperties = [
  { name: 'UDS Villa - Next to.....', type: 'Villa', income: '₹19,824', status: 'Pending' },
  { name: 'UDS Villa - Next to.....', type: 'Villa', income: '₹19,824', status: 'Pending' },
  { name: 'UDS Villa - Next to.....', type: 'Villa', income: '₹19,824', status: 'Pending' },
  { name: 'UDS Villa - Next to.....', type: 'Villa', income: '₹19,824', status: 'Pending' },
  { name: 'UDS Villa - Next to.....', type: 'Villa', income: '₹19,824', status: 'Pending' },
]

const RecentProperty = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Property</h3>
        <button className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-darkGreen transition-colors">
          View All
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="font-semibold text-gray-800">Property Name</TableHead>
            <TableHead className="font-semibold text-gray-800">Property Type</TableHead>
            <TableHead className="font-semibold text-gray-800">Min. Rental Income</TableHead>
            <TableHead className="font-semibold text-gray-800">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentProperties.map((property, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-700">{property.name}</TableCell>
              <TableCell className="text-gray-700">{property.type}</TableCell>
              <TableCell className="text-gray-700">{property.income}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-gray-800">
                  {property.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentProperty

