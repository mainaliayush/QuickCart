'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from './Loading'

const PageWrapper = ({ children }) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500) 

    return () => clearTimeout(timeout)
  }, [pathname])

  return loading ? (
    <div className="p-4">
      {/* <SkeletonCard />
      <SkeletonCard /> */}
      <Loading/>
    </div>
  ) : (
    children
  )
}

export default PageWrapper
