import React from 'react'
import { assets } from '../../assets/assets'
import companyLogo from "@/assets/company_logo.png";
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 justify-between border-b'>
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={companyLogo}
        alt="logo"
      />
      <button onClick={() => router.push('/')} className="text-sm px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">Return to Home</button>
    </div>
  )
}

export default Navbar