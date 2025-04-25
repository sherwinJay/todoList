'use client'

import { cn } from '@/lib/utils'
import { ThemeContext } from '@/providers/ThemeProvider'
import { MoonStar, SunMedium } from 'lucide-react'
import { FC, useContext } from 'react'

interface ThemeSwitchProps {

}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ }) => {

  const { theme, setTheme } = useContext(ThemeContext)


  return (
    <div>
      <input type="checkbox" className="checkbox" id="checkbox" />
      <label
        htmlFor="checkbox"
        className="checkbox-label bg-orange-200 dark:bg-[#f39c16]"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >

        <MoonStar width={18} height={18} />
        <SunMedium width={19} height={19} />
        {/* <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i> */}
        <span className={
          cn("ball bg-gray-700 transition duration-[0.2s] linear",
            theme === 'dark' ? 'translate-x-[25px]' : 'translate-x-0'
          )}
        />
      </label>
    </div>
  )
}

export default ThemeSwitch