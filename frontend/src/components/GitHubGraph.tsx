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
          <div className="bg-white p-8 md:p-16 rounded-[40px] flex flex-col items-center overflow-x-auto">
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
                  // Destructure props safely
                  const { onAnimationStart, onDrag, onDragEnd, onDragStart, style, ...safeProps } = block.props as any;

                  return (
                    <motion.rect
                      {...safeProps}
                      key={activity.date}
                      // 1. Start invisible and small
                      initial={{ scale: 0, opacity: 0 }}
                      // 2. Animate ONLY when the section comes into view
                      whileInView={{ scale: 1, opacity: 1 }}
                      // 3. Ensure it only happens once
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        // Stagger by activity level + a small random offset for a "natural" feel
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