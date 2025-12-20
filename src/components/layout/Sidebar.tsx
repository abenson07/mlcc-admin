'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Users, MapPin, Briefcase, Route } from 'lucide-react'

const navigation = [
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Neighbors', href: '/neighbors', icon: MapPin, badge: 10 },
  { name: 'Businesses', href: '/businesses', icon: Briefcase },
  { name: 'Routes', href: '/routes', icon: Route },
]

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => {
    // Handle basePath /admin
    const normalizedPathname = pathname.startsWith('/admin') ? pathname.slice(6) : pathname
    return normalizedPathname === href || (normalizedPathname === '' && href === '/members') || (normalizedPathname === '/' && href === '/members')
  }

  return (
    <div className="w-[240px] bg-white h-full shrink-0 flex flex-col border-r border-gray-100">
      <div className="pt-10 px-6 pb-8">
        <h2 className="text-xl font-bold text-[#101828] tracking-tight">
          Dashboard
        </h2>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center justify-between h-11 px-3 rounded-lg transition-all duration-200',
                active
                  ? 'bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] ring-1 ring-black/5'
                  : 'text-[#4a5565] hover:bg-gray-50 hover:text-[#101828]'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={clsx(
                    active ? 'text-[#101828]' : 'text-inherit'
                  )}
                />
                <span
                  className={clsx(
                    'text-sm font-semibold',
                    active ? 'text-[#101828]' : 'text-inherit'
                  )}
                >
                  {item.name}
                </span>
              </div>
              {item.badge && (
                <div className="bg-[#fb2c36] h-5 min-w-[20px] rounded-full px-1.5 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
