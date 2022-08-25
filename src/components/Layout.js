import { Outlet } from 'react-router-dom'
import ThemeSwitch from './ThemeSwitch'

const Layout = () => {
  return (
    
    <main className='container'>
      <Outlet />
      <ThemeSwitch />
    </main>
  )
}
export default Layout
