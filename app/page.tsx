'use client'

import { MetricCard } from "@/src/components/common/MetricCard";
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between h-[38px]">
        <h1 className="text-[22px] font-medium leading-5 text-[#101828] tracking-[-0.1504px]">
          Dashboard
        </h1>
        <Link href="/members" className="bg-white border border-[#e5e7eb] h-[38px] rounded-lg px-4 flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Plus size={16} className="text-[#364153]" />
          <span className="text-[#364153] text-sm font-medium leading-5 tracking-[-0.1504px]">
            Add members
          </span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="flex gap-4">
        <MetricCard
          title="Total Members"
          value="1,247"
          change={12.5}
          subtitle="vs. last year"
        />
        <MetricCard
          title="New Members YTD"
          value="324"
          change={28.3}
          subtitle="Year-to-date growth"
        />
        <MetricCard
          title="Revenue YTD"
          value="$149,680"
          change={15.7}
          subtitle="Total membership revenue"
        />
      </div>
    </div>
  );
}
