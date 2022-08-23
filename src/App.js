import { Route, Routes } from 'react-router-dom'
import Admin from './components/Admin.js'
import Editor from './components/Editor'
import Home from './components/Home'
import Layout from './components/Layout'
import LinkPage from './components/LinkPage'
import Login from './components/Login'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import PersistLogin from './components/PersistLogin.js'
import Register from './components/Register'
import RequireAuth from './components/RequireAuth'
import Unauthorized from './components/Unauthorized'

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
