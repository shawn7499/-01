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
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const scrollStartY = useRef(0);
  
  // 鼠标滚轮事件 - 只在滚动到边界时触发翻页
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      
      const container = containerRef.current;
      if (!container) return;
      
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      
      // 向下滚动且已到底部 → 下一页
      if (e.deltaY > 0 && isAtBottom && currentSection < sections.length - 1) {
        e.preventDefault();
        setDirection('down');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev + 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      }
      // 向上滚动且已到顶部 → 上一页
      else if (e.deltaY < 0 && isAtTop && currentSection > 0) {
        e.preventDefault();
        setDirection('up');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev - 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      }
      // 否则允许正常滚动
    };
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [currentSection, isAnimating, sections.length]);
  
  // 触摸事件（手机端）- 只在滚动到边界时触发翻页
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      const container = containerRef.current;
      if (container) {
        scrollStartY.current = container.scrollTop;
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY.current - touchEndY;
      const scrollDiff = container.scrollTop - scrollStartY.current;
      
      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
      
      // 向上滑动（下一页）：必须在底部 + 滑动距离 > 50px
      if (touchDiff > 50 && isAtBottom && scrollDiff >= 0 && currentSection < sections.length - 1) {
        setDirection('down');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev + 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      }
      // 向下滑动（上一页）：必须在顶部 + 滑动距离 > 50px
      else if (touchDiff < -50 && isAtTop && scrollDiff <= 0 && currentSection > 0) {
        setDirection('up');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev - 1), 400);
        setTimeout(() => setIsAnimating(false), 1800);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isAnimating, sections.length]);
  
  // 切换页面时重置滚动位置
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [currentSection]);
  
  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* 当前页面 - 可滚动 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: direction === 'down' ? 0.95 : 1.05,
            y: direction === 'down' ? -50 : 50
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
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
