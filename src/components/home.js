import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/signup');
  };

  const handleLogInClick = () => {
    navigate('/login');
  };
  return (
    <div className="App">
      <header>
      <h4>THE DAILY BYTES</h4>
      </header>
 
    <body>
      <center>
      <h2>Experience the taste of perfection!!!</h2>
      <p>Oh no!Don't have a account yet?</p>
      <button1 onClick={handleJoinUsClick}>Sign Up</button1>
          <h5>OR</h5>
          <button2 onClick={handleLogInClick}>Log In</button2>
        </center>
      <footer>
        <br></br><br></br><p><b>Contact us if you have any queries related our food</b></p>
        <p2><b>CONTACTCT : 123456 // </b></p2>
        <p3><b>  GMAIL : dailybites@gmail.com </b></p3>
        <p4><b> //  SOCIAL MEDIA : daily_bites</b></p4> 
      </footer>
      </body>

    </div>
  );
}

export default Home;