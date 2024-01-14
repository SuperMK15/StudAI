import StarBG from './StarBG';
import { motion } from 'framer-motion';
import UnsuccessfulLoginPopup from './UnsuccessfulLoginPopup';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import usePersist from '../hooks/usePersist';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => setPersist((prev) => !prev);

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
  };

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  const canLogin = username && password;

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500 via-teal-400 to-blue-500 h-full z-0"></div>
      <div className="absolute inset-0 bg-black opacity-25 z-0"></div>

      {isError ? <div className="relative z-10"><UnsuccessfulLoginPopup /></div> : null}
      <section className="relative z-5">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-8 text-5xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="./logo.svg" alt="logo" />
            Stud<span style={{ color: '#FF7D7D' }}>.AI</span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border bord
					
					
					er-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <motion.button
                  className="w-full text-white bg-gradient-to-r from-pink-500 to-teal-500 hover:to-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={!canLogin}
                >
                  Sign In
                </motion.button>
              </form>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
