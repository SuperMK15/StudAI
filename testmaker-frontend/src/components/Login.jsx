import StarBG from './StarBG'
import { motion } from 'framer-motion'
import UnsuccessfulLoginPopup from './UnsuccessfulLoginPopup'
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

import usePersist from '../hooks/usePersist'


const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleToggle = () => setPersist(prev => !prev);

	const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

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
		}
	}

	if (isLoading) return <p>Loading...</p>

	const canLogin = username && password;

	return (
		<div>
			{isError ?
				<UnsuccessfulLoginPopup /> : null
			}

			<StarBG />
			<section className="">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<Link to="/" className="flex items-center mb-6 text-5xl font-semibold text-gray-900 dark:text-white">
						<img className="w-8 h-8 mr-2" src="./logo.svg" alt="logo" />
						Stud<span style={{ color: "#FF7D7D" }}>.AI</span>
					</Link>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Log in to your account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
									<input type="text"
										name="username"
										id="username"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Username"
										value={username}
										onChange={e => setUsername(e.target.value)}
									/>
								</div>
								<div>
									<label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										value={password}
										onChange={e => setPassword(e.target.value)} />
								</div>


								<motion.button
									className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									type='submit'
									disabled={!canLogin}
								>
									Sign In
								</motion.button>
							</form>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>


	)
};

export default Login