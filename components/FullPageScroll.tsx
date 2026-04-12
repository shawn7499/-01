import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        setTimeout(() => setCurrentSection(prev => prev + 1), 300);
        setTimeout(() => setIsAnimating(false), 900);
      }
      // 向上滚动且已到顶部 → 上一页
      else if (e.deltaY < 0 && isAtTop && currentSection > 0) {
        e.preventDefault();
        setDirection('up');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev - 1), 300);
        setTimeout(() => setIsAnimating(false), 900);
      }
    };
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [currentSection, isAnimating, sections.length]);
  
  // 触摸事件（手机端）
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
      
      if (touchDiff > 50 && isAtBottom && scrollDiff >= 0 && currentSection < sections.length - 1) {
        setDirection('down');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev + 1), 300);
        setTimeout(() => setIsAnimating(false), 900);
      }
      else if (touchDiff < -50 && isAtTop && scrollDiff <= 0 && currentSection > 0) {
        setDirection('up');
        setIsAnimating(true);
        setTimeout(() => setCurrentSection(prev => prev - 1), 300);
        setTimeout(() => setIsAnimating(false), 900);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
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
      
      {/* 简洁过渡层 - 黑屏淡入淡出 */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-50 bg-black"
          />
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
                setTimeout(() => setCurrentSection(index), 300);
                setTimeout(() => setIsAnimating(false), 900);
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
