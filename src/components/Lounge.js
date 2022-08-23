import { Link } from "react-router-dom"

const Lounge = () => {
return (
    <section>
      <article>
        <h1>All Access Page</h1>
        <p>This page is accessible by all user roles.</p>
        <div>
            <Link to="/">Home</Link>
        </div>
      </article>
    </section>
)
}
export default Lounge

