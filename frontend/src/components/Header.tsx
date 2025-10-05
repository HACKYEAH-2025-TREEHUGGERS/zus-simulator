import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Compass, Home, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ZusNavbar from '@/assets/img/zus-navbar.jpg'

export default function Header() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="flex items-center relative">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute p-2 hover:bg-primary hover:text-white rounded-lg transition-colors my-auto left-10"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <img src={ZusNavbar} className="w-full" />
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white text-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary hover:text-white rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/form"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-background transition-colors mb-2',
            }}
          >
            <Compass size={20} />
            <span className="font-medium">{t('step1.title')}</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-background transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">{t('dashboard.title')}</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
