'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { latestCurrentSessionSession } from '@/utils/auth'

const publicRoutes = ['/login', '/signup'] // Routes accessible without login

export default function ProtectedWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = latestCurrentSessionSession()

    if (!session) {
      // Not logged in or session expired
      if (!publicRoutes.includes(pathname)) {
        router.replace('/login')
      }
    } else {
      // Logged in
      if (publicRoutes.includes(pathname)) {
        router.replace('/dashboard')
      }
    }

    setLoading(false)
  }, [pathname, router])

  if (loading) return null // or a spinner

  return <>{children}</>
}
