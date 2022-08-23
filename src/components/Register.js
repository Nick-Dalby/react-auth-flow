import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from '../api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{4,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = '/register'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // set focus on username input when component loads
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // validate the username
  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  // validate the password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  // reset error message
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }), // { user: user, pwd: pwd } destructured
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(response.data)
      console.log(response.accessToken)
      // console.log(JSON.stringify(response))
      setSuccess(true)
      // clear out the input - fields set the state to empty?
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response...')
      } else if (err.response?.status === 409) {
        setErrMsg('Username taken')
      } else {
        setErrMsg('registration failed :(')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section className="container">
          <p className="offscreen">{errMsg}</p>
          <h1>Success!</h1>
          <p>
            <Link to='/login'>Sign In</Link>

          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <article>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? 'hide' : 'invalid'}
                />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? 'false' : !user ? '' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <p
                id="uidnote"
                className={userFocus && user && !validName ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? 'hide' : 'invalid'}
                />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? 'false' : !pwd ? '' : 'true'}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a special
                character.
                <br />
                Allowed special characters: <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch && validPwd ? 'false' : !matchPwd ? '' : 'true'}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                className="contrast"
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <footer>

            <p>
              Already registered?
              <br />
              <Link to="/login">Sign In</Link>
            </p>
            </footer>
          </article>
        </section>
      )}
    </>
  )
}
export default Register
