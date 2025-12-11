import { useGSAP } from "@gsap/react";
import "./project.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projects } from "../assets/assest";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface ProjectItem {
  name: string;
  img: string;
  description: string;
  link:string;
}

const Project = () => {
  useGSAP(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const workContainer = document.querySelector(".work");
    if (!workContainer) return;

    const createWorkItem = (project: ProjectItem) => {
      const workItem = document.createElement("div");
      workItem.className = "work-item";

      workItem.innerHTML = `
        <div class="work-item-img">
          <img src="${project.img}" alt="${project.name}" />
        </div>
        <div class="work-item-copy">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank" class="view-btn">
            Know More..
          </a>
        </div>
      `;

      return workItem;
    };

for (let i = 0; i < projects.length; i += 2) {
  const row = document.createElement("div");
  row.className = "row";

  // LEFT ITEM
  row.appendChild(createWorkItem(projects[i]));

  // RIGHT ITEM (only if exists)
  if (i + 1 < projects.length) {
    row.appendChild(createWorkItem(projects[i + 1]));
  }

  workContainer.appendChild(row);
}

    gsap.set(".work-item",{
      y:1000,
    })

    document.querySelectorAll(".row").forEach((row)=>{
      
      const workItems = row.querySelectorAll(".work-item");

      workItems.forEach((item, itemIndex)=>{
      const isLeftProjectItem = itemIndex === 0;

      gsap.set(item,{
        rotation:isLeftProjectItem ? -60 : 60,
        transformOrigin:"center center",
      })
      })
      ScrollTrigger.create({
        trigger:row,
        start:"top 60%",
        onEnter:()=>{
          gsap.to(workItems,{
            y:0,
            rotation:0,
            duration:1,
            ease:"power4.Out",
            stagger:0.25,
          })
        }
      })
    })

  }, []);

  return (
    <>
      <header>
        <h1 >Featured Work</h1>
      </header>

      <section className="work selection:bg-black selection:text-white "></section>


      <footer>
        <p>Developed by Ajith k v</p>
        <p>All rights reserved © 2026</p>
      </footer>
    </>
  );
};

export default Project;
