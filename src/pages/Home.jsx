import React, { useEffect, useState, useRef } from 'react';
import fbImage from '../assets/footer_assets/face.png';
import ghImage from '../assets/footer_assets/gh.png';
import igImage from '../assets/footer_assets/ig.png';
import xImage from '../assets/footer_assets/x.png';
import visualize from '../assets/visualize.png';
import tutorialVideo from '../assets/tutorial.mp4';
import { motion, useInView } from 'framer-motion';
import './Home.css';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const visualiveRef = useRef(null);
  const isInView = useInView(visualiveRef, { once: true, amount: 0.5 });

  // Use refs for independent elements
  const toolkitRef = useRef(null);
  const toolkitInView = useInView(toolkitRef, { once: true, amount: 0.5 });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.3) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`h-container ${scrolled ? 'scrolled-bg' : ''}`} >
      <h1 className="h-title">codease</h1>
      <h1 className="h2-title" >start your journey.</h1>

      {/* Framer Motion for visualive-container with scroll-triggered animation */}
      <motion.div
        ref={visualiveRef}
        className="visualive-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        id='about'
      >
        <h1>visualize it.</h1>
        <p>Welcome to our website, where beginners use simple visual "codes" to learn the basics of programming. It's an easy and fun way to grasp foundational coding concepts.</p>
        <img src={visualize} alt="Visual representation" className="visualive-image" />
      </motion.div>

      <div className="tp-wrapper">
        {/* Framer Motion for toolkit-container with scroll-triggered animation */}
        <motion.div
          ref={toolkitRef}
          className="toolkit-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={toolkitInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1>toolkit.</h1>
          <p>The functions container offers a selection of pre-built functions you can drag and drop to start building your code.</p>
        </motion.div>

        {/* Framer Motion for process-container with scroll-triggered animation */}
        <motion.div
          ref={processRef}
          className="process-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={processInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1>see the process.</h1>
          <p>Our code process container lets you see your code in action, providing real-time feedback as it runs.</p>
        </motion.div>
      </div>

      <div className='tutorial-container' id='tutorial-container'>
        <p className='first-tutorial'>you can do it.</p>
        <p className='second-tutorial watch'><b>WATCH</b></p>
        <p className='second-tutorial learn'><b>LEARN</b></p>
        <p className='second-tutorial apply'><b>APPLY</b></p>
        <p className='third-tutorial'>This tutorial helps beginners grasp programming basics through intuitive visual blocks. It provides an engaging and straightforward approach to learning core coding principles.</p>
        <div className='video-container'>
          <video controls>
            <source src={tutorialVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className='footer-container'>
        <div class="item line"></div>
        <div class="item item-1">
          <img src={fbImage} alt="Item1"></img>
        </div>
        <div class="item item-2">
          <img src={xImage} alt="Item1"></img>
        </div>
        <div class="item item-3">
          <img src={ghImage} alt="Item1"></img>
        </div>
        <div class="item item-4">
          <img src={igImage} alt="Item1"></img>
        </div>
        <div class="item line"></div>
      </div>

      <div className='footer-container second'>
        <p className='footer_title'>codease</p>
        <p className='footer_copyright'>© 2024 Codease. All rights reserved. Unauthorized use or reproduction of this content is strictly prohibited.
        </p>
      </div>
    </div>
  );
}
