import React from 'react'
import Card from '../components/Card'
import Heading from '../components/Heading'
import { motion } from 'framer-motion'

export const Page6 = () => {
    const buttonText = ["Click Here", "Checkout  Here"]
    const projectList = [
        {
            title: "NETWRK - Networking platform for professionals",
            description: "NETWRK is a modern, open-source professional networking platform built to empower users with smart tools and secure access. Designed to simplify content creation and enhance engagement, NETWRK integrates cutting-edge AI features with robust authentication systems, making it a standout tool for professionals and content creators alike.",
            path: "/Project_Pics/netwrk.png",
            link: "https://netwrk-frontend.vercel.app/",
            btnText: buttonText[1]
        },
        {
            title: "OrganizeIt",
            description: "Streamline your digital workspace with OrganizeIt, the ultimate desktop app for effortless file organization...",
            path: "/Project_Pics/organizeit.png",
            link: "https://organizeitinc.netlify.app/",
            tech_stack: ["Python ", "Inno Setup", "PyInstaller", "Shutli"],
            btnText: buttonText[1]
        },
        {
            title: "BlogBook - Your ideas on the cloud",
            description: "BlogBook is an online platform where you can create, edit and update your notes/blogs...",
            path: "/Project_Pics/blogbook.png",
            link: "https://blogbook-saprojects.netlify.app/",
            btnText: buttonText[1]
        },
        {
            title: "OSPF Protocol Visualizer",
            description: "Designed and implemented a React.js-based web application to simulate and visualize the Open Shortest Path First (OSPF) protocol...",
            path: "/Project_Pics/ospf.png",
            link: "https://ospfprotocolvisualizer.netlify.app/",
            btnText: buttonText[0]
        }
    ];
    
    return (
        <div className="container mx-auto -mt-[10rem] sm:-mt-[32rem] md:-mt-[10rem] lg:-mt-[15rem] px-4 flex flex-col items-center">
            <div className="mb-8">
                <Heading Heading="Projects " />
            </div>
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projectList.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex justify-center w-full"
                        >
                            <Card
                                title={project.title}
                                description={project.description}  
                                link={project.link}
                                btnText={project.btnText}
                                path={project.path}
                                className="w-full aspect-[3/4] min-h-[400px] max-w-[320px]"
                            />

                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page6;