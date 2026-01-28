import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
// ! ( Mini Rental amoount ) is not comming with api with response

// const recentProperties = [
//   { name: 'UDS Villa', type: 'Villa', income: '₹19,824', status: 'Pending' },
// ]


const RecentProperty = ({ recentProperties }) => {
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
            <TableHead>Property Name</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentProperties.map((property, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell className="text-gray-700">
                {property.name}
              </TableCell>

              <TableCell className="text-gray-700 capitalize">
                {property.type}
              </TableCell>

              <TableCell>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                  ${property.kycVerified === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {property.kycVerified}
                </span>
              </TableCell>

              <TableCell>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                  ${property.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}>
                  {property.isActive ? 'Active' : 'Inactive'}
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
