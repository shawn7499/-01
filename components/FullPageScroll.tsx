import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../app/transitions.css';

// 全屏分页滚动组件
interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // 向下滚动
        setIsAnimating(true);
        setCurrentSection(prev => prev + 1);
        setTimeout(() => setIsAnimating(false), 1500);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // 向上滚动
        setIsAnimating(true);
        setCurrentSection(prev => prev - 1);
        setTimeout(() => setIsAnimating(false), 1500);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isAnimating, sections.length]);
  
  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
      
      {/* 过渡动画层 - 在切换时显示 */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <TransitionAnimation type={(currentSection % 4) + 1 as 1 | 2 | 3 | 4} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 页面指示器 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSection(index);
                setTimeout(() => setIsAnimating(false), 1500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSection 
                ? 'bg-[#00ff88] w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 过渡动画组件
function TransitionAnimation({ type }: { type: 1 | 2 | 3 | 4 }) {
  return (
    <svg className="w-full h-64" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
      {type === 1 && (
        <>
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 200 120 Q 600 80, 1000 120"
            stroke="#00ff88" 
            strokeWidth="1" 
            fill="none"
            opacity="0.3"
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            d="M 200 120 Q 600 160, 1000 120"
            stroke="#8b5cf6" 
            strokeWidth="1" 
            fill="none"
            opacity="0.2"
          />
        </>
      )}
      
      {type === 2 && (
        <>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 300 120 Q 450 80, 600 120"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 600 120 Q 750 160, 900 120"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="120" r="4"
            fill="#00ff88"
            opacity="0.6"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="120" r="8"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </>
      )}
      
      {type === 3 && (
        <>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 0 120 Q 300 100, 600 120 Q 900 140, 1200 120"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            d="M 0 120 Q 300 140, 600 120 Q 900 100, 1200 120"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </>
      )}
      
      {type === 4 && (
        <>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 400 120 Q 500 90, 600 120"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 600 120 Q 700 150, 800 120"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="120" r="5"
            fill="#8b5cf6"
            opacity="0.6"
          />
        </>
      )}
    </svg>
  );
}
