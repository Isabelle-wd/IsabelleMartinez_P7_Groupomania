import { createContext, useState } from 'react';

export const AuthContext = createContext("");

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    const getUser = localStorage.getItem('user')
    if (getUser) {
      const user = JSON.parse(getUser).user
      return user
    }
  })

  return <AuthContext.Provider value={[user, setUser]}>{children}</AuthContext.Provider>
}


