import StarBG from './StarBG';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-screen">
      <StarBG />

      <div className="absolute inset-0 bg-gradient-to-b from-teal-500 via-teal-400 to-blue-500 h-full"></div>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <section className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-4">
          <Link src="/" className="flex items-center text-9xl font-semibold text-white">
            <img className="w-32 h-32 mr-2" src="./logo.svg" alt="logo" />
            Stud<span style={{ color: "#FF7D7D" }}>.AI</span>
          </Link>
          <p className="text-4xl font-semibold text-gray-900 dark:text-white mt-2">
            The best way to study, using AI.
          </p>
        </div>

        <Link to="/login" className="text-3xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 px-8 rounded-full focus:ring-4 focus:outline-none focus:ring-purple-300 mt-5">
          Begin
        </Link>
      </section>
    </div>
  );
};

export default Home;