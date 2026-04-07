import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../app/transitions.css';

// 全屏分页滚动组件
interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  
  // 鼠标滚轮事件
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // 向下滚动
        setDirection('down');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev + 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // 向上滚动
        setDirection('up');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev - 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      }
    };
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [currentSection, isAnimating, sections.length]);
  
  // 触摸事件（手机端）
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      
      touchEndY.current = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY.current;
      
      // 滑动距离超过 50px 才触发
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sections.length - 1) {
          // 向上滑动（下一页）
          setDirection('down');
          setIsAnimating(true);
          setTimeout(() => setCurrentSection(prev => prev + 1), 400);
          setTimeout(() => setIsAnimating(false), 1800);
        } else if (diff < 0 && currentSection > 0) {
          // 向下滑动（上一页）
          setDirection('up');
          setIsAnimating(true);
          setTimeout(() => setCurrentSection(prev => prev - 1), 400);
          setTimeout(() => setIsAnimating(false), 1800);
        }
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isAnimating, sections.length]);
  
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* 当前页面 - 只渲染当前这一页 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: direction === 'down' ? 0.95 : 1.05,
            y: direction === 'down' ? -50 : 50
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
      
      {/* 过渡动画层 - 在切换时全屏显示 */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-black/50"
          >
            <TransitionAnimation 
              type={((currentSection + (direction === 'down' ? 1 : 0)) % 4) + 1 as 1 | 2 | 3 | 4} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 页面指示器 */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentSection) {
                setDirection(index > currentSection ? 'down' : 'up');
                setIsAnimating(true);
                setTimeout(() => setCurrentSection(index), 400);
                setTimeout(() => setIsAnimating(false), 1800);
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

// 过渡动画组件 - 更大、更明显
function TransitionAnimation({ type }: { type: 1 | 2 | 3 | 4 }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      {type === 1 && (
        <>
          {/* 极简弧线 - 放大版 */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 200 400 Q 600 300, 1000 400"
            stroke="#00ff88" 
            strokeWidth="2" 
            fill="none"
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            d="M 200 400 Q 600 500, 1000 400"
            stroke="#8b5cf6" 
            strokeWidth="2" 
            fill="none"
          />
        </>
      )}
      
      {type === 2 && (
        <>
          {/* 对称弧线 + 圆球 - 放大版 */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 300 400 Q 450 300, 600 400"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 600 400 Q 750 500, 900 400"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="400" r="8"
            fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="400" r="16"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
          />
        </>
      )}
      
      {type === 3 && (
        <>
          {/* 平缓波浪 - 放大版 */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 0 400 Q 300 350, 600 400 Q 900 450, 1200 400"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            d="M 0 400 Q 300 450, 600 400 Q 900 350, 1200 400"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
          />
        </>
      )}
      
      {type === 4 && (
        <>
          {/* 极简对称 + 圆球 - 放大版 */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 400 400 Q 500 350, 600 400"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 600 400 Q 700 450, 800 400"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 300 400 Q 450 320, 600 400"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            d="M 600 400 Q 750 480, 900 400"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="400" r="10"
            fill="#8b5cf6"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            cx="600" cy="400" r="20"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
          />
        </>
      )}
    </svg>
  );
}
