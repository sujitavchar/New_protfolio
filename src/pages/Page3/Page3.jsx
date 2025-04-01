/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import Heading from '../components/Heading';

const TimelineCard = ({ data, index }) => {
    const cardRef = useRef(null);
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

    return (
        <div className="relative flex w-full items-center justify-center">
            <motion.div
                ref={cardRef}
                style={{ y, opacity }}
                className={`w-full md:w-[40%] ${isEven ? 'md:text-right md:mr-auto' : 'md:ml-auto'}`}
            >
                <div className="relative rounded-lg border border-blue-500/20 bg-white/5 p-6 backdrop-blur-sm
                            hover:border-blue-500/40 transition-all duration-300">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 
                                bg-blue-500/10 px-4 py-1 backdrop-blur-md">
                        <span className="text-blue-200 font-semibold">{data.year}</span>
                        <data.icon size={16} className="text-blue-200" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {data.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/70">
                        {data.description}
                    </p>

                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
                        <div
                            key={position}
                            className={`absolute w-6 h-6 border-2 border-blue-500/20
                                      ${position.includes('top') ? 'top-0' : 'bottom-0'}
                                      ${position.includes('left') ? 'left-0' : 'right-0'}`}
                            style={{
                                borderTop: position.includes('top') ? undefined : 'none',
                                borderBottom: position.includes('bottom') ? undefined : 'none',
                                borderLeft: position.includes('left') ? undefined : 'none',
                                borderRight: position.includes('right') ? undefined : 'none',
                                borderRadius: '0.5rem',
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                <div className="w-4 h-4 rounded-full bg-blue-500/50 border-2 border-blue-400 
                            shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
            </div>
        </div>
    );
};

const Timeline = () => {
    const timelineData = [
        {
            year: "Jan 2025 - April 2025" , 
            title: "Software Engineer Intern @ WallMag",
            description: "Contributed to the full automation process via n8n, JavaScript and Python, reducing the time spent on manual processes by 75%.  Developed automated systems to send interview questions, to 100+ creators via email, SMS, and WhatsApp using Novu services.  Developed a forms application with FastAPI, enhancing creator data collection and processing speed by 60%.",
            icon: BookOpen
        },
        {
            year: "Nov 2022 - June 2026",
            title: "Graduation : BE Computer Engineer",
            description: "Coursework: Data Structures and Algorithms, Object Oriented Programming, Database Management Systems, Computer Networks",
            icon: GraduationCap
        }
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="min-h-screen w-full py-20">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                     <Heading Heading="About Me" />
                </motion.div>

                <div ref={containerRef} className="relative">
                    <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 hidden md:block">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-16">
                        {timelineData.map((data, index) => (
                            <TimelineCard
                                key={data.year}
                                data={data}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;