import React, { useRef, useEffect } from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GitHubGraph: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to the right on load to show most recent months
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const githubGreenTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  };

  return (
    <section className="w-full py-12 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header with Nav Buttons for Small Screens */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter text-center sm:text-left">
            Code Contributions
          </h2>
          
          <div className="flex gap-2 lg:hidden">
            <button 
              onClick={() => scroll('left')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <a 
          href="https://github.com/Ajith66310" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div 
            ref={scrollRef}
            className="bg-white p-6 md:p-12 rounded-[30px] shadow-2xl overflow-x-auto no-scrollbar transform lg:scale-110 transition-transform duration-500 origin-center"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="min-w-fit flex justify-center py-2">
              <GitHubCalendar 
                username="Ajith66310"
                blockSize={14} 
                blockMargin={5}
                theme={githubGreenTheme}
                fontSize={14}
                colorScheme="light"
                showWeekdayLabels
                renderBlock={(block, activity) => {
                  const { onAnimationStart, onDrag, onDragEnd, onDragStart, style, ...safeProps } = block.props as any;

                  return (
                    <motion.rect
                      {...safeProps}
                      key={activity.date}
                      // Start at 0.5 scale so blocks are never truly "empty" or invisible
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }} // Trigger faster
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        delay: activity.level * 0.05 
                      }}
                      whileHover={{ scale: 1.5 }}
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

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default GitHubGraph;