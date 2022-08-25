import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState()

  useEffect(() => {
    const getTheme = () => {
      if (window.matchMedia('(prefers-color-scheme: dark')) {
        setTheme('dark')
      } else if (window.matchMedia('(prefers-color-scheme: light')) {
        setTheme('light')
      }
    }
    getTheme()
  }, [])

  const page = document.querySelector('html')
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      page.setAttribute('data-theme', 'light')
    } else if (theme === 'light') {
      setTheme('dark')
      page.setAttribute('data-theme', 'dark')
    }
  }

  return (
    <div role="button" className="switcher contrast" onClick={toggleTheme}>
      <FontAwesomeIcon icon={faCircleHalfStroke} />
    </div>
  )
}
export default ThemeSwitch
