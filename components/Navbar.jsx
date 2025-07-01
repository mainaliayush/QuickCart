"use client"
import React from "react";
import { assets, BagIcon, CartIcon, HomeIcon, BoxIcon,} from "@/assets/assets";
import companyLogo from "@/assets/company_logo.png";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  // const { isSeller, router, user } = useAppContext();
  // const { openSignIn } = useClerk();

  const { isSeller, router, getCartCount } = useAppContext();
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();


  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 h-20 border-b border-gray-200 bg-white text-gray-800 shadow-sm">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={companyLogo}
        alt="logo"
      />
  
      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-6">
        <Link href="/" className="uppercase text-sm font-medium hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/all-products" className="uppercase text-sm font-medium hover:text-blue-600 transition">
          Shop
        </Link>
        <Link href="https://vanguardid.com/company-history" className="uppercase text-sm font-medium hover:text-blue-600 transition">
          About Us
        </Link>
        <Link href="https://vanguardid.com/contact-us" className="uppercase text-sm font-medium hover:text-blue-600 transition">
          Contact
        </Link>
  
        {isSignedIn && isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-sm px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Admin Dashboard
          </button>
        )}
      </div>
  
      {/* Right-side Icons + Auth */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
  
        {isSignedIn ? (
          <>
            <Link href="/cart" className="relative">
              <div className="cursor-pointer">
                <CartIcon />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.7">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </Link>
            {/* <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.7"> */}

            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/orders')} />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>
  
      {/* Mobile view */}
      <div className="flex items-center lg:hidden gap-3">
        {isSignedIn && isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border px-3 py-1.5 rounded-md text-blue-600 border-blue-600"
          >
            Seller
          </button>
        )}
        {isSignedIn ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
  
};

export default Navbar;