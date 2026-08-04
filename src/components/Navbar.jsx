import { useEffect, useRef, useState } from "react"
import { Menu, X, Home, Info, FolderOpen, Mail, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { assets } from '../assets/assets'
import { Link, useLocation } from "react-router-dom"
import { CONTACT, enquiryMessage, whatsappUrl } from '../utils/listings'



function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const { pathname } = useLocation()

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

  // Move focus into the menu when it opens, close on Escape.
  // Focus needs two frames of deferral: the panel's visibility transition
  // (from the `invisible` class) still computes as hidden on the first frame,
  // and hidden elements silently ignore focus().
  useEffect(() => {
    if (!showMobileMenu) return
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => closeButtonRef.current?.focus())
    })
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [showMobileMenu])

  const closeMenu = () => {
    setShowMobileMenu(false)
    menuButtonRef.current?.focus()
  }

  const menuItems = [
    { label: "HOME", icon: Home, link: "/" },
    { label: "ABOUT US", icon: Info, link: "/about" },
    { label: "PROPERTIES", icon: FolderOpen, link: "/properties" },
    { label: "CONTACT US", icon: Mail, href: "#Contacts", },
  ]

  const isActive = (item) =>
    item.link && (item.link === '/' ? pathname === '/' : pathname.startsWith(item.link))

  const handleMenuItemClick = () => {
    setShowMobileMenu(false)
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-white shadow-lg">
      {/* Bar height is invariant: 48+2*8=64px (base), 56+2*4=64px (sm), 64+2*4=72px (lg).
          The logo asset is tightly cropped, so the box height IS the visible art height. */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 sm:py-1 lg:px-8">
        <Link to="/"><img src={assets.logoPrimary} alt="Murray Investments Co. Ltd. logo" width="399" height="320" className="h-12 w-auto object-contain sm:h-14 lg:h-16" /></Link>
        {/* Desktop Menu */}
        <nav aria-label="Main" className="hidden md:block">
        <ul className="flex gap-7 text-gray-900 font-bold">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.link ? (
                <Link
                  to={item.link}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={`cursor-pointer whitespace-nowrap underline-animation transition duration-200 ${
                    isActive(item) ? 'text-brand-500' : 'hover:text-brand-500'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="cursor-pointer whitespace-nowrap underline-animation hover:text-brand-500 transition duration-200"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        </nav>

        {/* Full phone number only where it fits; icon-only link on tablet */}
        <a href={CONTACT.phoneHref} className="hidden lg:flex items-center gap-2 whitespace-nowrap text-gray-900 font-semibold px-2 py-2 hover:underline">
          <Phone className='w-5 h-5 text-brand-500' aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
        <a href={CONTACT.phoneHref} aria-label="Call Murray Investments Co. Ltd." className="hidden md:flex lg:hidden items-center justify-center rounded-full border border-gray-200 p-2.5 text-brand-500 hover:bg-brand-50 transition">
          <Phone className='w-5 h-5' aria-hidden="true" />
        </a>

        {/* Mobile Menu Toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setShowMobileMenu(true)}
          aria-label="Open navigation menu"
          aria-expanded={showMobileMenu}
          aria-controls="mobile-menu"
          className="md:hidden p-2 -m-2 hover:opacity-75 transition duration-200"
        >
          <Menu className="w-7 h-7" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!showMobileMenu}
        className={`md:hidden fixed top-0 ${showMobileMenu ? "right-0" : "right-[-100%] invisible"} w-3/4 max-w-sm h-full bg-white z-40 transition-all duration-300 ease-in-out shadow-2xl overflow-y-auto`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6 border-b border-gray-100">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full p-2.5 -m-1.5 transition duration-200"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Menu Items */}
        <nav aria-label="Mobile" className="flex flex-col mt-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            return item.link ? (
              <Link
                key={index}
                to={item.link}
                onClick={handleMenuItemClick}
                aria-current={isActive(item) ? 'page' : undefined}
                className={`flex items-center gap-4 px-6 py-4 transition duration-200 border-b border-gray-50 last:border-b-0 ${
                  isActive(item)
                    ? 'text-brand-500 bg-brand-50'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-500'
                }`}
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
                <span className="text-lg font-medium">{item.label}</span>
              </Link>
            ) : (
              <a
                key={index}
                onClick={handleMenuItemClick}
                href={item.href}
                className="flex items-center gap-4 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-brand-500 transition duration-200 border-b border-gray-50 last:border-b-0"
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
                <span className="text-lg font-medium">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Quick contact */}
        <div className="mt-6 border-t border-gray-100 px-6 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Quick contact</p>
          <div className="flex gap-3">
            <a
              href={CONTACT.phoneHref}
              onClick={handleMenuItemClick}
              className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-brand-500 px-4 py-2.5 text-sm font-medium text-brand-600 transition hover:bg-brand-500 hover:text-white"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Us
            </a>
            <a
              href={whatsappUrl(enquiryMessage(null))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMenuItemClick}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <FaWhatsapp className="text-base" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Branding */}
        <div className="mt-10 px-6 pb-8">
          <div className="text-center text-sm text-gray-500">
            <img
              src={assets.logoPrimary}
              alt="Murray Investments Co. Ltd. logo"
              className="w-20 mx-auto mb-2"
            />
            <p>© {new Date().getFullYear()} Murray Investments Co. Ltd.</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
