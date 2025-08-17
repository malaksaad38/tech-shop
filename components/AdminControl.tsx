'use client'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

type AdminControlProps = {
  children: React.ReactNode
}

// Static password (for testing only!)
const ADMIN_PASSWORD = 'supersecret'

// Precomputed hash of the static password
const ADMIN_HASH = CryptoJS.SHA256(ADMIN_PASSWORD).toString()

const COOKIE_KEY = 'admin_auth'

const AdminControl: React.FC<AdminControlProps> = ({children}) => {
  const [isAuthed, setIsAuthed] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    const savedHash = Cookies.get(COOKIE_KEY)
    if (savedHash && savedHash === ADMIN_HASH) {
      setIsAuthed(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const enteredHash = CryptoJS.SHA256(password).toString()
    if (enteredHash === ADMIN_HASH) {
      Cookies.set(COOKIE_KEY, enteredHash, {expires: 1}) // save for 1 day
      setIsAuthed(true)
    } else {
      alert('Invalid password')
    }
  }

  if (!isAuthed) {
    return (
      <div className="flex items-center justify-center h-[50vh] ">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded shadow-md space-y-4 w-80"
        >
          <h2 className="text-xl font-semibold text-center">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  // If authenticated → render protected content
  return <>{children}</>
}

export default AdminControl
