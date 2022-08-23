import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {

    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        })
        const usernames = response.data.map(user => user.username)
        console.log(usernames)
        isMounted && setUsers(usernames)
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <>
      <h4>Users List</h4>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>no users to display</p>
      )}
    </>
  )
}
export default Users
