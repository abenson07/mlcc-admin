'use client'

import { Plus, Filter, Search } from 'lucide-react'

// Sample data - in production, this would come from your database
const neighbors = [
  { id: '1', name: 'John Doe', address: '123 Main St', status: 'Active' },
  { id: '2', name: 'Jane Smith', address: '456 Oak Ave', status: 'Active' },
  { id: '3', name: 'Bob Johnson', address: '789 Pine Rd', status: 'Pending' },
]

export default function Neighbors() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#101828]">Neighbors</h1>
        <button className="bg-white border border-[#e5e7eb] h-10 rounded-lg px-4 flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <Plus size={18} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium">Add neighbor</span>
        </button>
      </div>

      {/* Neighbors Table */}
      <div className="flex flex-col gap-4">
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          {/* Filter Bar */}
          <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button className="h-10 px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all">
                <Filter size={18} />
                Filters
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]" size={18} />
              <input
                type="text"
                placeholder="Search neighbors..."
                className="w-full h-10 pl-10 pr-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-gray-50/50">
                  <th className="w-12 px-6 py-4">
                    <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider">Address</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {neighbors.map((neighbor, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#101828]">{neighbor.id}</td>
                    <td className="px-6 py-4 text-sm text-[#4a5565]">{neighbor.name}</td>
                    <td className="px-6 py-4 text-sm text-[#4a5565]">{neighbor.address}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        neighbor.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {neighbor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
