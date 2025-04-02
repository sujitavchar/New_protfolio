// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Page1 } from './pages/Page1/Page1';
import { Page2 } from './pages/Page2/Page2';
import Timeline from './pages/Page3/Page3';
import { Page4 } from './pages/Page4/Page4';
//import { Page5 } from './pages/Page5/Page5';
import { Page6 } from './pages/Page6/Page6';
import { Page7 } from './pages/Page7/Page7';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }

      timeoutId = window.requestAnimationFrame(() => {
        if (window.matchMedia('(pointer: fine)').matches) {
          setCursorPosition({ x: e.clientX, y: e.clientY });
        }
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };

    fetchData();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-x-hidden cursor-none"
      style={{
        background: `
          repeating-linear-gradient(0deg, rgb(41, 41, 41) 0px, rgb(41, 41, 41) 1px, transparent 1px, transparent 21px),
          repeating-linear-gradient(90deg, rgb(41, 41, 41) 0px, rgb(41, 41, 41) 1px, transparent 1px, transparent 21px),
          linear-gradient(90deg, hsl(87,0%,9%), hsl(87,0%,9%))
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: '21px 21px, 21px 21px, 100% 100%',
      }}
    >

      <div className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center pb-4 px-4">
        <Navbar />
      </div>

      

      <div className="flex flex-col space-y-4 md:space-y-8 relative z-10">
        <section id="homepage" className="flex justify-center items-center min-h-screen p-4">
          <Page1 />
        </section>

        <section id="aboutme" className="mb-96 flex justify-center items-center 
        sm:min-h-[1000px] lg:min-h-[800px] min-h-[1200px] p-4">
          <Page2 />
        </section>

        <section id="edu" className="flex justify-center items-center min-h-[1100px] sm:min-h-[1400px] md:min-h-[1600px] lg:min-h-[1100px] p-4">

          <Timeline />
        </section>
        <section id="skills" className="flex justify-center items-center min-h-[800px] sm:min-h-[1000px] md:min-h-[700px] lg:min-h-[600px] p-4">
          <Page4 />
        </section>

        

       

        <section id="projects" className="flex justify-center items-center min-h-[2000px] md:min-h-[1800px] lg:min-h-[1500px] p-4">
          <Page6 />
        </section>


        <section id="contact" className="flex justify-center items-center min-h-[1000px] md:min-h-[1200px] lg:min-h-[1000px] p-4">
          <Page7 />
        </section>
      </div>
    </div>
  );
}

export default App;
