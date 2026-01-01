import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import proj1 from "./proj1.png";
import proj2 from "./proj2.jpg";
import proj3 from "./proj3.png";
import proj4 from "./proj4.png";
import ajith from './ajithimg.jpg'
import cv from "./Ajithkvcv.pdf";

export interface ProjectItem {
  name: string;
  img: string;
  description: string;
  link: string;
}

export interface Cards {
  title: string;
  copy?: string;
}

export const img = {
  img1,
  img2,
  img3,
  img4,
  proj1,
  proj2,
  proj3,
  proj4,
  ajith,
  cv,
};

export const projects: ProjectItem[] = [
  {
    name: "VestidoClub",
    description:
      "A modern full-stack Fashion E-Commerce application built using the MERN stack...",
    img: proj1,
    link: "https://github.com/Ajith66310/VestidoClub-Ecommerce",
  },
  {
    name: "Movie App with Clerk and OpenAI Integration",
    description:
      "A MERN movie application that allows users to view popular movies...",
    img: proj2,
    link: "https://github.com/Ajith66310/react-movieapp",
  },
  {
    name: "Lakshmi distributors",
    description:
      "This is a full-featured E-Commerce application built with the MERN Stack...",
    img: proj3,
    link: "https://github.com/Ajith66310/CollegeProject-Ecommerce",
  },
  {
    name: "Smartcors",
    description:
      "A smart, environment-aware CORS wrapper for Express applications...",
    img: proj4,
    link: "https://github.com/Ajith66310/smartcors",
  },
];

export const cards: Cards[] = [
  {
    title: "#Summary",
    copy: "MERN Stack Developer specializes in building production-ready web applications with modern UX, authentication systems, real-time features, analytics dashboards, and optimized backend APIs. Passionate about clean UI, performance, and automation.",
  },
{
  title: "#Education",
  copy: "• BCA — Srinivas University (2022–2025)\n<br/>• Higher Secondary — St George's HSS (2020–2022)"
},
  {
    title: "#Tools",
    copy: "Skilled with React 19, Redux Toolkit, Typescript, Tailwind CSS, GSAP, Framer Motion, Node.js, Express, MongoDB, JWT, Razorpay, Cloudinary, Redis, Clerk, Mailjet,Oauth and deployment platforms like Vercel & Render.",
  },
 {
  title: "#Social",
  copy: `
    <div class="social-links">
      <a href="https://github.com/Ajith66310" target="_blank" rel="noopener noreferrer">
       • GitHub
      </a><br/>
      <a href="https://www.linkedin.com/in/ajith-k-v-23121b232/" target="_blank" rel="noopener noreferrer">
        • LinkedIn
      </a>
     <br/>
       <a href="https://www.instagram.com/withaythkv?igsh=djZqc2JyMWo3eWF4" target="_blank" rel="noopener noreferrer">
       • Instagram
      </a>
    </div>
  `
}
];


export default img;
