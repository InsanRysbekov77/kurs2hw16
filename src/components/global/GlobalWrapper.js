import React, { useState, useEffect } from 'react'
import Login from '../Login/Login'
import Home from '../Home/Home'
import MainHeader from '../MainHeader/MainHeader'
import AuthContext from '../../store/authContext'
import { useContext } from 'react'
import './GlobalWrapper.css'

const GlobalWrapper = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { darkMode, setDarkMode } = useContext(AuthContext)
	console.log(darkMode)

	useEffect(() => {
		const storedUserInfo = localStorage.getItem('isLoggedIn')
		if (storedUserInfo === '1') {
			setIsLoggedIn(true)
		}
	}, [])
	const loginHandler = async (email, password) => {
		localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true)
	}

	const handleThem = () => {
		setDarkMode(!darkMode)
	}
	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}
	return (
		<React.Fragment>
			<AuthContext.Provider
				value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
			>
				<div className={darkMode ? 'dark-mode' : 'light-mode'}>
					<MainHeader />
					<div className='container'>
						<span style={{ color: darkMode ? 'grey' : 'yellow' }}>
							☀︎
						</span>
						<div className='switch-checkbox'>
							<label className='switch'>
								<input type='checkbox' onChange={handleThem} />
								<span className='slider round'></span>
							</label>
						</div>
						<span
							style={{
								color: darkMode ? '#c96dfd' : 'grey',
								marginBottom: '15px',
							}}
						>
							☽
						</span>
					</div>
					<main>
						{!isLoggedIn && <Login onLogin={loginHandler} />}
						{isLoggedIn && <Home onLogout={logoutHandler} />}
					</main>
				</div>
			</AuthContext.Provider>
		</React.Fragment>
	)
}

export default GlobalWrapper
