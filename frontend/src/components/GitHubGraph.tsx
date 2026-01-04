import React from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubGraph: React.FC = () => {
  const githubGreenTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center tracking-tighter">
          Code Contributions
        </h2>
        
        <a 
          href="https://github.com/Ajith66310" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <div className="bg-white p-8 md:p-16 rounded-[40px] flex flex-col items-center overflow-x-auto transform lg:scale-125 origin-center transition-all duration-300">
            <div className="min-w-fit py-4">
              <GitHubCalendar 
                username="Ajith66310"
                blockSize={14} 
                blockMargin={5}
                theme={githubGreenTheme}
                fontSize={16}
                colorScheme="light"
                showWeekdayLabels
                renderBlock={(block, activity) => {
                  const { onAnimationStart, onDrag, onDragEnd, onDragStart, style, ...safeProps } = block.props as any;

                  return (
                    <motion.rect
                      {...safeProps}
                      key={activity.date}
                      // 1. Start at 0.1 scale instead of 0. 
                      // Some mobile browsers fail to render/calculate SVGs starting at 0.
                      initial={{ scale: 0.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      // 2. Add 'amount: 0.1'. This triggers the animation as soon as 
                      // 10% of the block is in view, which is vital for mobile scrolling.
                      viewport={{ once: true, margin: "-10px", amount: 0.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        delay: (activity.level * 0.1) + (Math.random() * 0.2)
                      }}
                      whileHover={{ 
                        scale: 1.5,
                        stroke: '#000',
                        strokeWidth: 1,
                      }}
                      style={{ 
                        ...style, 
                        transformOrigin: 'center', 
                        transformBox: 'fill-box' 
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default GitHubGraph;