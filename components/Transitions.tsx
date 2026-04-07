import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../app/transitions.css';

// 过渡动画组件 - 放在两个区块之间
interface TransitionProps {
  type: 1 | 2 | 3 | 4;
}

export function Transition({ type }: TransitionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className="relative h-64 md:h-80 flex items-center justify-center my-32"
    >
      <svg className="w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {type === 1 && (
          <>
            {/* 极简弧线 */}
            <motion.path 
              style={{ pathLength }}
              d="M 200 120 Q 600 80, 1000 120"
              stroke="#00ff88" 
              strokeWidth="1" 
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.path 
              style={{ pathLength }}
              d="M 200 120 Q 600 160, 1000 120"
              stroke="#8b5cf6" 
              strokeWidth="1" 
              fill="none"
              opacity="0.2"
              strokeDasharray="0 1"
            />
          </>
        )}
        
        {type === 2 && (
          <>
            {/* 对称弧线 + 圆球 */}
            <motion.path
              style={{ pathLength }}
              d="M 300 120 Q 450 80, 600 120"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.path
              style={{ pathLength }}
              d="M 600 120 Q 750 160, 900 120"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.circle
              style={{ scale: circleScale }}
              cx="600" cy="120" r="4"
              fill="#00ff88"
              opacity="0.6"
            />
            <motion.circle
              style={{ scale: circleScale }}
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
            {/* 平缓波浪 */}
            <motion.path
              style={{ pathLength }}
              d="M 0 120 Q 300 100, 600 120 Q 900 140, 1200 120"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.path
              style={{ pathLength }}
              d="M 0 120 Q 300 140, 600 120 Q 900 100, 1200 120"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              strokeDasharray="0 1"
            />
          </>
        )}
        
        {type === 4 && (
          <>
            {/* 极简对称 + 圆球 */}
            <motion.path
              style={{ pathLength }}
              d="M 400 120 Q 500 90, 600 120"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.path
              style={{ pathLength }}
              d="M 600 120 Q 700 150, 800 120"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              strokeDasharray="0 1"
            />
            <motion.path
              style={{ pathLength }}
              d="M 300 120 Q 450 70, 600 120"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              strokeDasharray="0 1"
            />
            <motion.path
              style={{ pathLength }}
              d="M 600 120 Q 750 170, 900 120"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.2"
              strokeDasharray="0 1"
            />
            <motion.circle
              style={{ scale: circleScale }}
              cx="600" cy="120" r="5"
              fill="#8b5cf6"
              opacity="0.6"
            />
            <motion.circle
              style={{ scale: circleScale }}
              cx="600" cy="120" r="10"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}

// 内容区块包装器 - 进入视口时淡入，离开时淡出
interface ContentSectionProps {
  children: React.ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // 进入视口：0 → 0.3 淡入
  // 在视口中：0.3 → 0.7 完全可见
  // 离开视口：0.7 → 1 淡出
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 1.05]);
  
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}
