'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Globe} from 'lucide-react'
import {Button} from "@/components/ui/button";

export function LocaleSwitcherToggle() {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<string>('en')

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/)
    setCurrentLocale(match?.[1] || 'en')
  }, [])

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ur' : 'en'
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`
    setCurrentLocale(newLocale)
    router.refresh()
  }

  return (
    <Button variant={'ghost'}
            size={"icon"}
            onClick={toggleLocale}
            aria-label="Toggle language"
            className="group relative hover:scale-105 transition-all min-w-8 flex justify-center items-center  md:border overflow-hidden"
    >
      {/* Globe icon (visible by default, hidden on hover) */}
      <span className="block group-hover:hidden">
		    <Globe className="h-[1.1rem] w-[1.1rem]"/>
		  </span>

      {/* Locale text (hidden by default, visible on hover) */}
      <span className="hidden group-hover:block text-xs font-semibold uppercase">
		    {currentLocale === 'en' ? 'UR' : 'EN'}
		  </span>

      <span className="sr-only">
		    Toggle locale to {currentLocale === 'en' ? 'Urdu' : 'English'}
		  </span>
    </Button>

  )
}