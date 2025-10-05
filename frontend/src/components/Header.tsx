import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Compass, Home, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Label } from 'react-aria-components'
import ZusNavbar from '@/assets/img/zus-navbar.jpg'
import i18n from '@/i18n'

export default function Header() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="flex items-center relative min-h-[60px]">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute p-2 hover:bg-primary hover:text-white rounded-lg transition-colors my-auto left-10"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <img
          src={ZusNavbar}
          className="w-full hidden lg:block"
          alt="zus-navbar"
        />
        <div className="absolute right-10">
          <Label htmlFor="language-select" className="sr-only">
            Language
          </Label>
          <select
            id="language-select"
            className="py-2 pl-2 pr-2 rounded-lg border border-none bg-input text-black font-bold"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <option value="pl">🇵🇱 PL</option>
            <option value="en">🇬🇧 EN</option>
            <option value="ua">🇺🇦 UA</option>
          </select>
        </div>
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
                'flex items-center gap-3 p-3 rounded-lg bg-input hover:bg-input transition-colors mb-2',
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
                'flex items-center gap-3 p-3 rounded-lg bg-input hover:bg-input transition-colors mb-2',
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
