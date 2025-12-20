'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Search, TrendingUp } from 'lucide-react'
import { createClient } from '@/src/lib/supabase'

const stats = [
  {
    label: 'Total Members',
    value: '1,247',
    change: '12.5%',
    trend: 'up',
    sublabel: 'vs. last year',
  },
  {
    label: 'New Members YTD',
    value: '324',
    change: '28.3%',
    trend: 'up',
    sublabel: 'Year-to-date growth',
  },
  {
    label: 'Revenue YTD',
    value: '$149,680',
    change: '15.7%',
    trend: 'up',
    sublabel: 'Total membership revenue',
  },
]

interface Member {
  full_name: string
  email: string
  tier: string
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

export default function Members() {
  const [allMembers, setAllMembers] = useState<Member[]>([])
  const [recentMembers, setRecentMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // #region agent log
  const [searchTerm, setSearchTerm] = useState('')
  fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/members/page.tsx:52',message:'Component render - searchTerm state initialized',data:{searchTerm},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true)
        setError(null)
        const supabase = createClient()

        // Fetch all active members
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        // Fetch all active members
        // Query from people table and join memberships (people.membership_id -> memberships.id)
        const { data: allMembersData, error: allMembersError } = await supabase
          .from('people')
          .select(`
            full_name,
            email,
            memberships!inner(
              tier,
              created_at,
              status
            )
          `)
          .eq('memberships.status', 'Active')

        if (allMembersError) throw allMembersError

        // Transform the data to flatten the structure
        // Handle both array and object responses from Supabase
        const transformedAllMembers: Member[] = (allMembersData || [])
          .map((person: any) => {
            const membership = Array.isArray(person.memberships) 
              ? person.memberships[0] 
              : person.memberships
            if (!membership) return null
            return {
              full_name: person.full_name,
              email: person.email,
              tier: membership.tier,
              created_at: membership.created_at,
            }
          })
          .filter((member: Member | null): member is Member => member !== null)

        setAllMembers(transformedAllMembers)

        // Fetch recent members (last 3 months, limit 5)
        const { data: recentMembersData, error: recentMembersError } = await supabase
          .from('people')
          .select(`
            full_name,
            email,
            memberships!inner(
              tier,
              created_at,
              status
            )
          `)
          .eq('memberships.status', 'Active')
          .gte('memberships.created_at', threeMonthsAgo.toISOString())
          .order('created_at', { foreignTable: 'memberships', ascending: false })
          .limit(5)

        if (recentMembersError) throw recentMembersError

        // Transform the data to flatten the structure
        const transformedRecentMembers: Member[] = (recentMembersData || [])
          .map((person: any) => {
            const membership = Array.isArray(person.memberships) 
              ? person.memberships[0] 
              : person.memberships
            if (!membership) return null
            return {
              full_name: person.full_name,
              email: person.email,
              tier: membership.tier,
              created_at: membership.created_at,
            }
          })
          .filter((member: Member | null): member is Member => member !== null)

        setRecentMembers(transformedRecentMembers)
      } catch (err) {
        console.error('Error fetching members:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch members')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  // #region agent log
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/members/page.tsx:148',message:'onChange handler called',data:{newValue,oldValue:searchTerm},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    setSearchTerm(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow Cmd+A / Ctrl+A to work (select all) - don't prevent default
    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      // Let the browser handle select all - don't prevent default
      return
    }
    // Escape clears the search
    if (e.key === 'Escape') {
      fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/members/page.tsx:160',message:'Escape key pressed - clearing search',data:{searchTerm},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      setSearchTerm('')
      e.currentTarget.blur()
    }
  }

  const filteredAllMembers = allMembers.filter(member => {
    const matches = member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.tier.toLowerCase().includes(searchTerm.toLowerCase())
    fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/members/page.tsx:155',message:'Filtering members',data:{searchTerm,totalMembers:allMembers.length,matches},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    return matches
  })
  fetch('http://127.0.0.1:7243/ingest/360b22a7-0c2d-4c5c-a82f-2bf8b2f66ab9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/members/page.tsx:160',message:'Filtered results computed',data:{searchTerm,filteredCount:filteredAllMembers.length,totalCount:allMembers.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#101828]">All members</h1>
        <button className="bg-white border border-[#e5e7eb] h-10 rounded-lg px-3 sm:px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto">
          <Plus size={18} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium">Add members</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white pt-4 pb-4 px-4 sm:px-6 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col gap-1">
            <p className="text-sm text-[#4a5565] mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-[#101828]">{stat.value}</h3>
              <div className="flex items-center gap-0.5 text-[#12b76a] text-sm font-medium">
                <TrendingUp size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-xs text-[#6a7282] mt-1">{stat.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Recent Members Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">Recent members (joined in last 3 months)</h2>
        {loading ? (
          <div className="p-8 text-center text-[#6a7282] bg-white border border-[#e5e7eb] rounded-xl shadow-sm">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 bg-white border border-[#e5e7eb] rounded-xl shadow-sm">Error: {error}</div>
        ) : recentMembers.length === 0 ? (
          <div className="p-8 text-center text-[#6a7282] bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
            No recent members found
          </div>
        ) : (
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3 min-w-max">
              {recentMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-3 min-w-[180px] max-w-[180px] flex flex-col gap-2 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-[#101828] truncate">
                      {member.full_name}
                    </h3>
                    <p className="text-xs text-[#6a7282] truncate">
                      {member.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1.5 border-t border-[#f3f4f6]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6a7282]">Joined</span>
                      <span className="text-xs font-medium text-[#4a5565]">
                        {formatDate(member.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6a7282]">Tier</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                        {member.tier || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All Members Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">All Members</h2>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          <div className="p-3 sm:p-4 border-b border-[#e5e7eb] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex gap-2 flex-wrap">
              <button className="h-10 px-3 sm:px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all flex-1 sm:flex-initial">
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button className="h-10 px-3 sm:px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all flex-1 sm:flex-initial">
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]" size={18} />
              <input
                type="text"
                placeholder="Search members..."
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
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Member</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden md:table-cell">Email</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full hidden lg:table-cell">Join Date</th>
                    <th className="px-3 sm:px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Membership Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6] h-fit">
                  {filteredAllMembers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 sm:px-6 py-8 text-center text-[#6a7282]">
                        {searchTerm ? 'No members match your search' : 'No members found'}
                      </td>
                    </tr>
                  ) : (
                    filteredAllMembers.map((member, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors h-fit">
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">
                          <div className="flex flex-col">
                            <span>{member.full_name}</span>
                            <span className="text-xs text-[#6a7282] md:hidden">{member.email}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden md:table-cell">{member.email}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565] hidden lg:table-cell">{formatDate(member.created_at)}</td>
                        <td className="px-3 sm:px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                            {member.tier || 'N/A'}
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
