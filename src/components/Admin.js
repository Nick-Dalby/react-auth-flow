import { Link } from 'react-router-dom'
import Users from './Users'

const Admin = () => {
  return (
    <section>
      <article>
        <h1>Admin Page</h1>
        <p>This page is only accessible by admins.</p>
        <Users />
        <footer>
          <Link to="/">Home</Link>
        </footer>
      </article>
    </section>
  )
}

export default Admin
