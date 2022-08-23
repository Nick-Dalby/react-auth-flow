import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
          <article>
            <h1>Editors Page</h1>
            <p>You must have been assigned an Editor role.</p>
            <div>
                <Link to="/">Home</Link>
            </div>
          </article>
        </section>
    )
}

export default Editor