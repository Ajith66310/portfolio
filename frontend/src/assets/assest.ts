import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import proj1 from "./proj1.png";
import proj2 from "./proj2.jpg";
import proj3 from "./proj3.png";
import proj4 from "./proj4.png";

export interface ProjectItem {
  name: string;
  img: string;
  description: string;
  link:string;
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
};

export const projects: ProjectItem[] = [
  {
    name: "VestidoClub",
    description: "A modern full-stack Fashion E-Commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless shopping experience with Google Authentication, User Profiles, Wishlist, Cart, Secure Payments, and a powerful Admin Dashboard for management and analytics.",
    img: proj1,
    link:"https://github.com/Ajith66310/VestidoClub-Ecommerce"
  },
  {
    name: "Movie App with Clerk and OpenAI Integration",
    description: "A MERN movie application that allows users to view popular movies, search for movie descriptions and ratings using OpenAI, and manage authentication with Clerk.",
    img: proj2,
    link:"https://github.com/Ajith66310/react-movieapp"
  },
  {
    name: "Lakshmi distributors",
    description: "This is a full-featured E-Commerce application built with the MERN Stack (MongoDB, Express.js, React, Node.js). It includes user authentication, product management, cart, checkout, admin panel, and analytics features.",
    img: proj3,
    link:"https://github.com/Ajith66310/CollegeProject-Ecommerce"
  },
  {
    name: "Smartcors",
    description: "A smart, environment-aware CORS wrapper for Express applications. It extends the official cors library with wildcards, regex support, auto localhost whitelisting, environment-based origin management, and dynamic production origin detection — making CORS configuration easier, safer, and fully plug-and-play.",
    img: proj4,
    link:"https://github.com/Ajith66310/smartcors"
  },
 ];

export default img;
