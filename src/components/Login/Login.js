import React, { useState, useEffect, useReducer } from 'react'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const reducerEmail = (prevtate, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.emailValue,
			isValid: action.emailValue.includes('@'),
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: prevtate.value,
			isValid:
				prevtate.value.includes('@') ||
				prevtate.value.trim().length > 6,
		}
	}
	return {
		value: '',
		isValid: false,
	}
}

const reducerPassword = (prevtate, action) => {
	if (action.type === 'USER_PASSWORD') {
		return {
			value: action.passwordValue,
			isValid: action.passwordValue.trim().length > 6,
		}
	}
}

const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(reducerEmail, {
		isValid: undefined,
		value: '',
	})
	const [passwordState, dispatchPassword] = useReducer(reducerPassword, {
		isValid: undefined,
		value: '',
	})
	const [formIsValid, setFormIsValid] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setFormIsValid(
				emailState.value.includes('@') &&
					passwordState.value.trim().length > 6,
			)
		}, 1000)
		return () => {
			clearTimeout(timer)
		}
	}, [emailState, passwordState])

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value })
	}

	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: 'USER_PASSWORD',
			passwordValue: event.target.value,
		})
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}
	const validatePasswordHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	}

	const submitHandler = (event) => {
		event.preventDefault()
		props.onLogin(passwordState.value, emailState.value)
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
