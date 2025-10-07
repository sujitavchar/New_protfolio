import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import axios from 'axios';
import { motion } from 'framer-motion';

export const Page2 = () => {
  const [githubData, setGithubData] = useState({
    repos: [],
    userInfo: null,
    loading: true,
    error: null
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchGithubData = async () => {
    setGithubData(prev => ({ ...prev, loading: true, error: null }));

    try {
      const userResponse = await axios.get("https://api.github.com/users/sujitavchar");
      const reposResponse = await axios.get("https://api.github.com/users/sujitavchar/repos");

      setGithubData({
        repos: reposResponse.data,
        userInfo: userResponse.data,
        loading: false,
        error: null
      });
    } catch (error) {
      setGithubData(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || "Failed to fetch GitHub data"
      }));
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-screen min-h-screen py-8 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 w-full max-w-[1400px] mx-auto"
      >
        <Heading Heading="About Me" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div className="w-full p-8 bg-black/30 backdrop-blur-lg rounded-lg border border-gray-800 flex flex-col h-full">
            <p className="text-lg text-gray-300 mb-6">
            Worked as a SWE Intern at WallMag, contributing to scalable solutions for creator event hosting and management. Creator of OrganizeIt, a productivity tool that has simplified file organization for about 1,000 users. Pursuing a B.Tech in Computer Engineering , with a strong focus on backend development, system software, and algorithms, driven by a passion for real-world problem-solving and innovation.            </p>
            <h3 className="text-white font-semibold text-lg mt-4 mb-2"> Currently Building</h3>
            <ul className="text-gray-300 list-disc pl-5">
              <li><a href="https://github.com/sujitavchar/Interviwer" className="text-blue-400"> Software Solutoins</a> </li>
            </ul>

            <h3 className="text-white font-semibold text-lg mt-4 mb-2">Latest Projects</h3>
            <ul className="text-gray-300 list-disc pl-5">
              <li><a href="https://organizeitinc.netlify.app/" className="text-blue-400">OrganizeIt</a> A desktop application to automate file management</li>
              <li><a href="https://blogbook-saprojects.netlify.app/" className="text-blue-400">BlogBook</a> A blog posting platform</li>
              <li><a href="https://ospfprotocolvisualizer.netlify.app/" className="text-blue-400">OSPF Protocol Visualizer</a> </li>
            </ul>

            <h3 className="text-white font-semibold text-lg mt-4 mb-2">Certifications</h3>
            <ul className="text-gray-300 list-disc pl-5">
              <li><a href="https://drive.google.com/file/d/1Czv-G0fuZzukK-zKKWudm8OpZF9WWGXT/view" className="text-blue-400">Advance C++ Training -</a> IIT Bombay</li>
              <li><a href="https://drive.google.com/file/d/13SW6DgVPLZk_H0S5NTIiHamCMkfDw6HH/view" className="text-blue-400">Python -</a> IIT Bombay</li>
              <li><a href="https://drive.google.com/file/d/1lrV4_BS1TtD_4zVfU9zmunK0J9UzVHXV/view" className="text-blue-400">Java -</a> IIT Bombay</li>
              <li><a href="https://drive.google.com/file/d/1fbzuds0-pBkK9z66argHo-QOXg-6xEOP/view?usp=drive_link" className="text-blue-400">Cloud Computing Job Simualtion -</a> Verizon</li>

            </ul>
          </motion.div>

          <motion.div className="w-full bg-black/30 backdrop-blur-lg rounded-lg border border-gray-800 overflow-hidden">
            {isMobile ? (
              <div className="flex flex-col items-center justify-center p-8 h-full">
                <p className="text-gray-300 text-center mb-4">
                  For better viewing experience, please download the resume
                </p>
                <a
                  href="https://drive.google.com/file/d/19oiiPOR1lvDtHUI8uGf3-1FNRU0B2tIq/view?usp=sharing"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  View Resume
                </a>
              </div>
            ) : (
              <div className="h-[800px]">
                <iframe
                  src="/Resume/SujitAvchar_Resume.pdf"
                  className="w-full h-full"
                  title="Resume PDF"
                ></iframe>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page2;
