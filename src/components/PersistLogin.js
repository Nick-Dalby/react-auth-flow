import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import useRefreshToken from '../hooks/useRefreshToken'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  // const { auth, persist } = useAuth()
  const { auth } = useAuth()
  const [persist] = useLocalStorage('persist', false)

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [auth, refresh])

  useEffect(() => {
    console.log(`isloading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [auth, isLoading])

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <article aria-busy="true"></article>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default PersistLogin
