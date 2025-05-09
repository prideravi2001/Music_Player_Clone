import React from 'react';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
function AboutMe() {


    return (
        <div className="container mx-auto px-4 py-8 text-white">
            
            <h2 className="text-3xl font-bold text-center mb-4">About Me</h2>
            <div className=" mt-4">
                <h3 className="text-2xl font-semibold mb-2">Professional Summary</h3>
                <p>
                    I'm a passionate ReactJS Developer with a strong foundation in JavaScript and modern web technologies. I specialize in building scalable, user-friendly web applications. My expertise includes frontend development. I'm always eager to learn new tools and techniques to stay up-to-date with industry trends.
                </p>
            </div>

            <div className="flex flex-col sd:flex-row justify-between">
                <div className="md:w-1/2 my-5">
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <ul className="list-disc space-y-2">
                        <li>Name: Ravi Kant</li>
                        <li>Email: ravikant4101707@gmail.com</li>
                        <li>Phone: +91 12345 67890</li>
                        <li>Location: Banglore, Karnataka</li>
                    </ul>
                </div>
                <div className="md:w-1/2 my-5">
                    <h3 className="text-xl font-semibold mb-2">Skills</h3>
                    <ul className="list-disc space-y-2">
                        <li>ReactJS</li>
                        <li>TailwindCSS</li>
                        <li>JavaScript</li>
                        <li>HTML/CSS</li>
                        <li>Redux</li>
                        {/* Add more skills as needed */}
                    </ul>
                </div>
            </div>
            <div className="text-center mt-4">
                <h3 className="text-2xl font-semibold mb-2">Connect with Me</h3>
                <div className="flex justify-center m-4">
                    <a href="https://www.linkedin.com/in/ravi-2001" target="_blank" rel="noopener noreferrer"
                        className=' border-white border-2 p-2 rounded-lg mx-3'>
                        {/* <img src="path/to/linkedin-logo.png" alt="LinkedIn" className="h-10 w-10" /> */}
                        <FiLinkedin className='w-10 h-auto ' />
                    </a>
                    <a href="https://github.com/prideravi2001" target="_blank" rel="noopener noreferrer"
                        className=' border-white border-2 p-2 rounded-lg mx-3'>
                        {/* <img src="path/to/github-logo.png" alt="GitHub" className="h-10 w-10" /> */}
                        <FiGithub className='w-10 h-auto' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;