import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate('/linkpage')
  }
  return (
    <section>
      <article>
        <h1>Home</h1>
        <h3>You're logged in!</h3>
        <div className="grid">
          <Link to="/editor">Go to the Editor page</Link>
          <Link to="/admin">Go to the Admin page</Link>
          <Link to="/lounge">Go to the All Access page</Link>
          <Link to="/linkpage">Go to the Link page</Link>
        </div>
        <footer>
          <button className="secondary" onClick={signOut}>
            Sign Out
          </button>
        </footer>
      </article>
    </section>
  )
}
export default Home
