import { Link } from 'react-router-dom'

const LinkPage = () => {
  return (
    <section>
      <article>
        <h1>Links</h1>

        <div className="grid">
          <h4>Public</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        </article>
        <article>
        <div className="grid">
          <h4>Private</h4>
          <Link to="/">Home</Link>
          <Link to="/editor">Editors Page</Link>
          <Link to="/admin">Admin Page</Link>
        </div>
      </article>
    </section>
  )
}
export default LinkPage
