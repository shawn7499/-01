import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../app/transitions.css';

// Transition 1: 极简弧线
export function Transition1() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 单一优雅弧线 */}
        <motion.path 
          style={{ pathLength }}
          d="M 200 80 Q 600 40, 1000 80"
          stroke="#00ff88" 
          strokeWidth="1" 
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 第二层弧线 */}
        <motion.path 
          style={{ pathLength }}
          d="M 200 80 Q 600 120, 1000 80"
          stroke="#8b5cf6" 
          strokeWidth="1" 
          fill="none"
          opacity="0.2"
          strokeDasharray="0 1"
        />
      </svg>
    </div>
  );
}

// Transition 2: 对称弧线 + 中心圆球
export function Transition2() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const circleScale = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 左侧弧线 */}
        <motion.path
          style={{ pathLength }}
          d="M 300 80 Q 450 40, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 右侧弧线（镜像） */}
        <motion.path
          style={{ pathLength }}
          d="M 600 80 Q 750 120, 900 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 中心圆球 */}
        <motion.circle
          style={{ scale: circleScale }}
          cx="600" cy="80" r="4"
          fill="#00ff88"
          opacity="0.6"
        />
        
        {/* 中心光晕 */}
        <motion.circle
          style={{ scale: circleScale }}
          cx="600" cy="80" r="8"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

// Transition 3: 平缓波浪
export function Transition3() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 主波浪 - 非常平缓 */}
        <motion.path
          style={{ pathLength }}
          d="M 0 80 Q 300 60, 600 80 Q 900 100, 1200 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 第二层波浪 */}
        <motion.path
          style={{ pathLength }}
          d="M 0 80 Q 300 100, 600 80 Q 900 60, 1200 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          strokeDasharray="0 1"
        />
      </svg>
    </div>
  );
}

// Transition 4: 极简对称 + 中心圆球
export function Transition4() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const circleScale = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 左弧 */}
        <motion.path
          style={{ pathLength }}
          d="M 400 80 Q 500 50, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 右弧 */}
        <motion.path
          style={{ pathLength }}
          d="M 600 80 Q 700 110, 800 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="0 1"
        />
        
        {/* 外层左弧 */}
        <motion.path
          style={{ pathLength }}
          d="M 300 80 Q 450 30, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          strokeDasharray="0 1"
        />
        
        {/* 外层右弧 */}
        <motion.path
          style={{ pathLength }}
          d="M 600 80 Q 750 130, 900 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
          strokeDasharray="0 1"
        />
        
        {/* 中心圆球 */}
        <motion.circle
          style={{ scale: circleScale }}
          cx="600" cy="80" r="5"
          fill="#8b5cf6"
          opacity="0.6"
        />
        
        {/* 中心光晕 */}
        <motion.circle
          style={{ scale: circleScale }}
          cx="600" cy="80" r="10"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
