"use client"

import { useEffect, useState } from "react"
import { Menu, X, User, FolderOpen, MessageSquare, Mail } from "lucide-react"
import { assets } from '../assets/assets'


function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showMobileMenu])

  const menuItems = [
    { href: "#About", label: "About", icon: User },
    { href: "#Projects", label: "Projects", icon: FolderOpen },
    { href: "#Testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "#Contacts", label: "Contact Us", icon: Mail },
  ]

  const handleMenuItemClick = () => {
    setShowMobileMenu(false)
  }

  return (
    <div className="fixed left-0 right-0 top-4 z-10 bg-transparent shadow-lg -mb-10 -mt-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo1} alt="Logo" className="h-24 w-25" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-gray-900 font-bold">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="cursor-pointer hover:text-gray-400 underline-animation transition duration-200">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

          <a href='tel:+233 (0) 554061972' className=" hidden md:flex items-center gap-2 text-white font-semibold px-4 py-2 hover:underline ">
                <img  className='w-6 h-6' src={assets.phone} alt="" />
                +233 (0) 244718186
            </a>

        {/* Mobile Menu Toggle */}
        <Menu
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden w-7 h-7 text-orange cursor-pointer hover:opacity-75 transition duration-200"
        />
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setShowMobileMenu(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 ${showMobileMenu ? "right-0" : "right-[-100%]"} w-3/4 max-w-sm h-full bg-white z-40 transition-all duration-300 ease-in-out shadow-2xl`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6 border-b border-gray-100">
          <X
            onClick={() => setShowMobileMenu(false)}
            className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition duration-200"
          />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col mt-8">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <a
                key={index}
                onClick={handleMenuItemClick}
                href={item.href}
                className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition duration-200 border-b border-gray-50 last:border-b-0"
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-lg font-medium">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Optional: Add some branding or additional info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center text-sm text-gray-500">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-16 mx-auto mb-2 opacity-50"
            />
            <p>© 2025 Murray Investment Company</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
