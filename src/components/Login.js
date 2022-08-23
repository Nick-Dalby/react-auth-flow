import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useInput from '../hooks/useInput'
import useToggle from '../hooks/useToggle'

import axios from '../api/axios'
const LOGIN_URL = '/auth'

const Login = () => {
  // const { setAuth, persist, setPersist } = useAuth()
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()

  const [user, resetUser, userAttributes] = useInput('user', '') //useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const [check, toggleCheck] = useToggle('persist', false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      console.log(JSON.stringify(response?.data))
      // console.log(JSON.stringify(response))
      const accessToken = response?.data?.accessToken
      setAuth({ user, accessToken })
      // setUser('')
      resetUser()
      setPwd('')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response...')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed :(')
      }
      errRef.current.focus()
    }
  }

  // const togglePersist = () => {
  //   setPersist((prev) => !prev)
  // }

  // useEffect(() => {
  //   localStorage.setItem('persist', persist)
  // }, [persist])

  return (
    <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <article>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            {...userAttributes}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button className="contrast">Sign In</button>

          <div>
            <input
              type="checkbox"
              role="switch"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist">stay signed in</label>
          </div>
        </form>
        <footer>
          <p>
            Need an account?
            <br />
            <Link to="/register">Sign Up</Link>
            <br />
            <small>
              To test the admin/editor pages
              <br />
              username: testing
              <br />
              pass: P4$$w0rd
            </small>
          </p>
        </footer>
      </article>
    </section>
  )
}
export default Login
