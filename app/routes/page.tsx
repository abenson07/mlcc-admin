'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Search } from 'lucide-react'
import { createClient } from '@/src/lib/supabase'

interface Route {
  id: string
  route_name: string
  route_type: string
  leaflet_count: number
  primary_deliverer_email: string | null
  primary_deliverer_id: string | null
  is_skipped: boolean
  created_at: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export default function Routes() {
  const [allRoutes, setAllRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRoutes, setTotalRoutes] = useState<number>(0)
  const [activeRoutes, setActiveRoutes] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchRoutes() {
      try {
        setLoading(true)
        setError(null)
        const supabase = createClient()

        // Count total routes
        const { count: routesCount, error: countError } = await supabase
          .from('routes')
          .select('*', { count: 'exact', head: true })

        if (countError) throw countError
        setTotalRoutes(routesCount || 0)

        // Count active routes (not skipped)
        const { count: activeCount, error: activeError } = await supabase
          .from('routes')
          .select('*', { count: 'exact', head: true })
          .eq('is_skipped', false)

        if (activeError) throw activeError
        setActiveRoutes(activeCount || 0)

        // Fetch all routes
        const { data: routesData, error: routesError } = await supabase
          .from('routes')
          .select('id, route_name, route_type, leaflet_count, primary_deliverer_email, primary_deliverer_id, is_skipped, created_at')
          .order('route_name', { ascending: true })

        if (routesError) throw routesError

        setAllRoutes(routesData || [])
      } catch (err) {
        console.error('Error fetching routes:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch routes')
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
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

  const filteredRoutes = allRoutes.filter(route =>
    route.route_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.route_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (route.primary_deliverer_email && route.primary_deliverer_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    route.leaflet_count.toString().includes(searchTerm)
  )

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US')
  }

  const stats = [
    {
      label: 'Total Routes',
      value: formatNumber(totalRoutes),
    },
    {
      label: 'Active Routes',
      value: formatNumber(activeRoutes),
    },
  ]

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#101828]">All routes</h1>
        <button className="bg-white border border-[#e5e7eb] h-10 rounded-lg px-3 sm:px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
          <Plus size={18} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium">Add route</span>
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

      {/* All Routes Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">All Routes</h2>
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
                placeholder="Search routes..."
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
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Route Name</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden md:table-cell">Type</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden lg:table-cell">Leaflets</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Primary Deliverer</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden xl:table-cell">Created</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6] h-fit">
                  {filteredRoutes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-3 sm:px-6 py-8 text-center text-[#6a7282]">
                        {searchTerm ? 'No routes match your search' : 'No routes found'}
                      </td>
                    </tr>
                  ) : (
                    filteredRoutes.map((route) => (
                      <tr key={route.id} className="hover:bg-gray-50 transition-colors h-fit">
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">
                          {route.route_name}
                        </td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden md:table-cell">{route.route_type}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden lg:table-cell">{formatNumber(route.leaflet_count)}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">
                          {route.primary_deliverer_email || 'N/A'}
                        </td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden xl:table-cell">{formatDate(route.created_at)}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            route.is_skipped ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                          }`}>
                            {route.is_skipped ? 'Skipped' : 'Active'}
                          </span>
                        </td>
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
