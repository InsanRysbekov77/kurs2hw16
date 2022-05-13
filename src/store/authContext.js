import React from 'react'
import { useState } from 'react'

const AuthContext = React.createContext({
	isLoggedIn: true,
	onLogout: () => {},
})
export const AuthProvider = (props) => {
	const [darkMode, setDarkMode] = useState(false)
	return (
		<AuthContext.Provider value={{ darkMode, setDarkMode }}>
			{props.children}
		</AuthContext.Provider>
	)
}
export default AuthContext
