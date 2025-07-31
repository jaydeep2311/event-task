'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { latestCurrentSessionSession, clearSession } from '@/utils/auth'
import {  Box } from '@mui/material'

const publicRoutes = ['/login', '/signup']

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const userSession = latestCurrentSessionSession()

    if (!userSession) {
      if (!publicRoutes.includes(pathname)) {
        router.replace('/login')
      }
    } else {
      setSession(userSession)
      if (publicRoutes.includes(pathname)) {
        router.replace('/dashboard')
      }
    }

    setLoading(false)
  }, [pathname, router])

  

  if (loading) return null // Or a spinner

  return (
    <>
      {/* Show header only if user is logged in */}
      

      {/* Page Content */}
      <Box sx={{ mt: session ? 2 : 0 }}>{children}</Box>
    </>
  )
}
