import React, { useState, useEffect, useRef } from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import { motion } from 'framer-motion';

const GitHubGraph: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // On mobile, auto-scroll to the right so user sees recent months first
      if (mobile && scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

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
          {/* FIXED SCALING & SCROLLING:
            - Removed global scale on mobile so blocks stay large (blockSize 14).
            - overflow-x-auto: Allows swiping through all months on mobile.
            - lg:scale-125: Restores your original desktop zoom.
            - lg:overflow-visible: Ensures hover effects aren't clipped on desktop.
          */}
          <div 
            ref={scrollContainerRef}
            className="bg-white p-6 md:p-16 rounded-[40px] flex flex-col items-center overflow-x-auto no-scrollbar lg:overflow-visible transform lg:scale-125 origin-center transition-all duration-300"
          >
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
                      // Keep animations for lg-screens, disable for mobile stability
                      initial={isMobile ? { scale: 1, opacity: 1 } : { scale: 0.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-10px", amount: 0.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        delay: isMobile ? 0 : (activity.level * 0.1) + (Math.random() * 0.2)
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
          
          {/* Mobile Hint */}
          <p className="text-gray-400 text-center text-xs mt-6 lg:hidden opacity-50">
            Swipe to view full history
          </p>
        </a>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default GitHubGraph;