'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Search } from 'lucide-react'
import { createClient } from '@/src/lib/supabase'

interface Neighbor {
  id: string
  full_name: string
  email: string
  address: string | null
  phone: string | null
  created_at: string | null
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export default function Neighbors() {
  const [allNeighbors, setAllNeighbors] = useState<Neighbor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalNeighbors, setTotalNeighbors] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchNeighbors() {
      try {
        setLoading(true)
        setError(null)
        const supabase = createClient()

        // Count total neighbors
        const { count: neighborsCount, error: countError } = await supabase
          .from('people')
          .select('*', { count: 'exact', head: true })

        if (countError) throw countError
        setTotalNeighbors(neighborsCount || 0)

        // Fetch all neighbors
        const { data: neighborsData, error: neighborsError } = await supabase
          .from('people')
          .select('id, full_name, email, address, phone, created_at')
          .order('full_name', { ascending: true })

        if (neighborsError) throw neighborsError

        setAllNeighbors(neighborsData || [])
      } catch (err) {
        console.error('Error fetching neighbors:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch neighbors')
      } finally {
        setLoading(false)
      }
    }

    fetchNeighbors()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Cmd+A / Ctrl+A (select all)
    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.currentTarget.select()
      return
    }
    // Escape clears the search
    if (e.key === 'Escape') {
      setSearchTerm('')
      e.currentTarget.blur()
    }
  }

  const filteredNeighbors = allNeighbors.filter(neighbor =>
    neighbor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    neighbor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (neighbor.address && neighbor.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (neighbor.phone && neighbor.phone.includes(searchTerm))
  )

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US')
  }

  const stats = [
    {
      label: 'Total Neighbors',
      value: formatNumber(totalNeighbors),
    },
  ]

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#101828]">All neighbors</h1>
        <button className="bg-white border border-[#e5e7eb] h-10 rounded-lg px-3 sm:px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
          <Plus size={18} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium">Add neighbor</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white pt-4 pb-4 px-4 sm:px-6 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col gap-1">
            <p className="text-sm text-[#4a5565] mb-2">{stat.label}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* All Neighbors Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">All Neighbors</h2>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          <div className="p-3 sm:p-4 border-b border-[#e5e7eb] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex gap-2 flex-wrap">
              <button className="h-10 px-3 sm:px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all flex-1 sm:flex-initial">
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]" size={18} />
              <input
                type="text"
                placeholder="Search neighbors..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className="w-full h-10 pl-10 pr-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-[#6a7282]">Loading...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">Error: {error}</div>
            ) : (
              <table className="w-full text-left min-w-[640px]">
                <thead className="pt-4 pb-4 h-fit">
                  <tr className="border-b border-[#e5e7eb] bg-gray-50/50 mt-4 mb-4 pt-4 pb-4 h-fit">
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Name</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden md:table-cell">Email</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden lg:table-cell">Address</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden xl:table-cell">Phone</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6] h-fit">
                  {filteredNeighbors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 sm:px-6 py-8 text-center text-[#6a7282]">
                        {searchTerm ? 'No neighbors match your search' : 'No neighbors found'}
                      </td>
                    </tr>
                  ) : (
                    filteredNeighbors.map((neighbor) => (
                      <tr key={neighbor.id} className="hover:bg-gray-50 transition-colors h-fit">
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">
                          <div className="flex flex-col">
                            <span>{neighbor.full_name}</span>
                            <span className="text-xs text-[#6a7282] md:hidden">{neighbor.email}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden md:table-cell">{neighbor.email}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden lg:table-cell">{neighbor.address || 'N/A'}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden xl:table-cell">{neighbor.phone || 'N/A'}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">{formatDate(neighbor.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
