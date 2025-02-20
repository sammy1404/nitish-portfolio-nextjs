"use client"

import React from 'react';
import './about.css'; // Add your styles here
import BadgeGallery from '../components/skills';
const About = () => {
  return (
    <section id='about'>
        <div className="aboutContent">
        <h1 className='title aboutTitle'>About Me</h1>
        <div className='aboutFlex'>
        <p className='abt'>
            Hello! I'm Srinitish Srinivasan, a passionate researcher and innovator in the field of Artificial Intelligence 
            and Mathematics. My skills involve Linear Algebra, Statistics, Calculus, Machine and Deep Learning apart from 
            being proficient in several programming languages and development frameworks such as Python, C, C++, Javascript, 
            PyTorch, Tensorflow, Flask and Django. My current research interests lie within the domain of Graph Theory and 
            Graph Neural Networks especially Dynamic Graphs. I love reading new research, connecting with different people 
            and exchanging new ideas. If I am not working on some deep learning model, I am either listening to K-Pop or 
            watching a K-Drama : ))
        </p>
        <img src='profilePic.jpg' className='dp'></img>

        
        </div>

        <div className='center'>
            <h2>Here are some of the tools and frameworks I'm most familiar with!</h2>
            <BadgeGallery/>
        </div>
        
            



            
        </div>
    </section>
  );
};

export default About;
