'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Users, MapPin, Briefcase, Route, LogOut } from 'lucide-react'
import { createClient } from '@/src/lib/supabase'

const navigation = [
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Neighbors', href: '/neighbors', icon: MapPin, badge: 10 },
  { name: 'Businesses', href: '/businesses', icon: Briefcase },
  { name: 'Routes', href: '/routes', icon: Route },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  
  const isActive = (href: string) => {
    // Handle basePath /admin
    const normalizedPathname = pathname.startsWith('/admin') ? pathname.slice(6) : pathname
    return normalizedPathname === href || (normalizedPathname === '' && href === '/members') || (normalizedPathname === '/' && href === '/members')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[240px] bg-white h-full shrink-0 flex-col border-r border-gray-100">
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
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 h-11 px-3 rounded-lg transition-all duration-200 text-[#4a5565] hover:bg-gray-50 hover:text-[#101828] w-full"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-16 px-2 pb-2">
          {navigation.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-lg transition-all duration-200 relative',
                  active
                    ? 'text-[#101828]'
                    : 'text-[#4a5565]'
                )}
              >
                <div className="relative">
                  <Icon
                    size={20}
                    className={clsx(
                      active ? 'text-[#101828]' : 'text-inherit'
                    )}
                  />
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 bg-[#fb2c36] h-4 min-w-[16px] rounded-full px-1 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>
                <span
                  className={clsx(
                    'text-[10px] font-medium',
                    active ? 'text-[#101828]' : 'text-inherit'
                  )}
                >
                  {item.name}
                </span>
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#101828] rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
