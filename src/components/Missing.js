import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <article>
      <h1>Uh oh!</h1>
      <p>Page Not Found</p>
      <div>
        <Link to="/">Head back to the homepage</Link>
      </div>
    </article>
  )
}

export default Missing
