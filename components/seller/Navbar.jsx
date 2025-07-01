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
      <button onClick={() => router.push('/')} className='bg-gray-300 text-gray-600 px-5 py-2 sm:px-7 sm:py-2 rounded-lg text-xs sm:text-sm'>Return to Home</button>
    </div>
  )
}

export default Navbar