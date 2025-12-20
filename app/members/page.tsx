'use client'

import { Plus, Filter, Search, TrendingUp } from 'lucide-react'

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

const recentMembers = [
  { name: 'Sarah Johnson', email: 'sarah.j@email.com', joinDate: 'Nov 15, 2024', status: 'Active', revenue: '$120' },
  { name: 'Michael Chen', email: 'm.chen@email.com', joinDate: 'Nov 8, 2024', status: 'Active', revenue: '$120' },
  { name: 'Emma Williams', email: 'emma.w@email.com', joinDate: 'Oct 28, 2024', status: 'Active', revenue: '$120' },
  { name: 'James Rodriguez', email: 'j.rodriguez@email.com', joinDate: 'Oct 22, 2024', status: 'Pending', revenue: '$0' },
  { name: 'Olivia Brown', email: 'olivia.b@email.com', joinDate: 'Oct 15, 2024', status: 'Active', revenue: '$120' },
]

const allMembers = [
  ...recentMembers,
  { name: 'David Martinez', email: 'd.martinez@email.com', joinDate: 'Oct 10, 2024', status: 'Active', revenue: '$120' },
  { name: 'Sophia Lee', email: 'sophia.lee@email.com', joinDate: 'Oct 5, 2024', status: 'Active', revenue: '$120' },
  { name: 'Ryan Thompson', email: 'ryan.t@email.com', joinDate: 'Sep 28, 2024', status: 'Active', revenue: '$120' },
  { name: 'Isabella Garcia', email: 'isabella.g@email.com', joinDate: 'Sep 20, 2024', status: 'Active', revenue: '$120' },
  { name: 'Alex Kumar', email: 'alex.k@email.com', joinDate: 'Sep 15, 2024', status: 'Expired', revenue: '$0' },
  { name: 'Jessica White', email: 'jessica.w@email.com', joinDate: 'Sep 8, 2024', status: 'Active', revenue: '$120' },
  { name: 'Daniel Park', email: 'daniel.p@email.com', joinDate: 'Aug 30, 2024', status: 'Active', revenue: '$120' },
]

export default function Members() {
  return (
    <div className="flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#101828]">All members</h1>
        <button className="bg-white border border-[#e5e7eb] h-10 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <Plus size={18} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium">Add members</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white pt-4 pb-4 px-6 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col gap-1">
            <p className="text-sm text-[#4a5565] mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-[#101828]">{stat.value}</h3>
              <div className="flex items-center gap-0.5 text-[#12b76a] text-sm font-medium">
                <TrendingUp size={16} />
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-xs text-[#6a7282] mt-1">{stat.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Recent Members Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">Recent members (joined in last 3 months)</h2>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="pt-4 pb-4 h-fit">
                <tr className="border-b border-[#e5e7eb] bg-gray-50/50 mt-4 mb-4 pt-4 pb-4 h-fit">
                  <th className="w-12 px-6 pt-4 pb-4 h-fit">
                    <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Join Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6] h-fit">
                {recentMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors h-fit">
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                      <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                    </td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">{member.name}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">{member.email}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">{member.joinDate}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">{member.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* All Members Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-[#4a5565]">All Members</h2>
        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button className="h-10 px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all">
                <Filter size={18} />
                Filters
              </button>
              <button className="h-10 px-4 border border-[#e5e7eb] rounded-lg flex items-center gap-2 text-sm font-medium text-[#364153] hover:bg-gray-50 transition-all">
                <Filter size={18} />
                Filters
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a7282]" size={18} />
              <input
                type="text"
                placeholder="Search members..."
                className="w-full h-10 pl-10 pr-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="pt-4 pb-4 h-fit">
                <tr className="border-b border-[#e5e7eb] bg-gray-50/50 mt-4 mb-4 pt-4 pb-4 h-fit">
                  <th className="w-12 px-6 pt-4 pb-4 h-fit">
                    <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Email</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Join Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#6a7282] uppercase tracking-wider mt-4 mb-4 h-full">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6] h-fit">
                {allMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors h-fit">
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                      <div className="w-4 h-4 border border-[#d0d5dd] rounded bg-white" />
                    </td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">{member.name}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">{member.email}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm text-[#4a5565]">{member.joinDate}</td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-green-50 text-green-700' :
                        member.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 pt-4 pb-4 mt-4 mb-4 h-fit text-sm font-medium text-[#101828]">{member.revenue}</td>
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
