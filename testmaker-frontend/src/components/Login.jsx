import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

import usePersist from '../hooks/usePersist'

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleToggle = () => setPersist(prev => !prev);

	const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);
	
	useEffect(() => {
		if (isSuccess) navigate('/portal');
	}, [isSuccess, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername('');
			setPassword('');
		} catch (err) {
			if (!err.status) setErrMsg('No server response');
			else if (err.status === 400) setErrMsg('Missing username or password');
			else if (err.status === 401) setErrMsg('Invalid username or password');
			else setErrMsg(err.data?.message);
			errRef.current.focus();
		}
	}

	if (isLoading) return <p>Loading...</p>

	const canLogin = username && password;

	const content = (
		<section>
			<header>
				<Link to="/"><img id="logo-link" src="./images/logo.png" alt="CCYC Logo" width="200"/></Link>
              		<h2 id = "title-login">Parent and Teacher Portal</h2>
			</header>
			<div class = "whitespace"></div>
			<main>
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

				<form onSubmit={handleLogin}>
					<div class = "login-container">
						<div class = "username-hi">
							<label htmlFor="username">Username:   </label>
							<input
								type="text"
								id="username"
								name="username"
								ref={userRef}
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</div>

						<div class = "username-hi">
							<label htmlFor="password">Password:   </label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<button type="submit" disabled={!canLogin}>Login</button>
					</div>
				</form>
			</main>
			<div class = "whitespace"></div>

			<footer>
				<p>Don't have an account? Signup <Link to="/register">here</Link>!</p>
			</footer>
		</section>
	)

	return (
		<div className="Login">
			{content}
		</div>
	)
}

export default Login