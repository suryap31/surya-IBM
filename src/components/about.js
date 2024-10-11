import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about">
      <header>
     <h3>About Us</h3>
      </header>
      <body>
        <div class="location">
      <h2>LOCATION</h2>
      <p>New Delhi ,</p>
      <p> dosa street ,</p>
      <p> pizza corner,opposite to taj mahal</p>
      </div>
      <h2>Our Team</h2>
      <ul class="team">
       <li>CEO:SURYA</li>
       <li>CFO:VEENA</li>
       <li> CHEFS:  AVANTHI,SRI</li>
       <li>MANAGER:SAHAANA</li>
       <li>STAFFS:SAHA,JOHN,ARUN</li>
       </ul>
       <h2>Our Story</h2>
      <p1><b>Founded in 2005, The Tasty Bites was born out of a passion for  fresh ingredients, authentic flavors.
         Our journey began with a simple goal: to create a warm and inviting space where friends and family could gather 
         and enjoy delicious meals made with love and care.At The Tasty Bites, our mission is to provide an unforgettable dining experience by combining high-quality ingredients with exceptional culinary skills.</b></p1>
    
    </body>
     </div>
);
}

export default About;
