import React, { useState } from 'react';
import '../styles/Home.css';
import { RiHome2Line } from 'react-icons/ri';
import { RiPencilLine } from 'react-icons/ri';
import { RiCamera3Line } from 'react-icons/ri';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="banner">
        <div className="banner__content">
          <div className="banner__text">
            <h1>Stud.ai</h1>
          </div>
          <div className="button__content">
            <button className="home" type="button">
              <RiHome2Line className="icon" />
            </button>
            <button className="pencil" type="button">
              <RiPencilLine className="icon" />
            </button>
            <button className="camera" type="button">
              <RiCamera3Line className="icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="banner2">
        <div className="banner2__content">
          <div className="banner2__text">
          </div>
        </div>
      </div>

      <div className="main__logo">
        <h1>Stud.ai</h1>
      </div>
      <div className="text__stuff">
        <h1>The one-stop solution for extra practice material</h1>
      </div>

      <div className="card">
        <button1 onClick={() => setCount((count) => count + 1)}>
          Sign-Up
        </button1>
      </div>
      <p className="read-the-docs">
        Already have an account?
      </p>
      <div className='card2'>
        <button2>
          Login
        </button2>
      </div>
      
    </>
  );
}

export default Home;