import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../app/transitions.css';

// 整合型过渡组件 - 内容从动画中展开
interface TransitionSectionProps {
  children: React.ReactNode;
  transitionType: 1 | 2 | 3 | 4;
}

export function TransitionSection({ children, transitionType }: TransitionSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // 动画进度：0 = 完全收起，1 = 完全展开
  const progress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  
  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center">
      {/* 过渡动画层 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-64" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
          {transitionType === 1 && <Transition1Paths progress={progress} />}
          {transitionType === 2 && <Transition2Paths progress={progress} />}
          {transitionType === 3 && <Transition3Paths progress={progress} />}
          {transitionType === 4 && <Transition4Paths progress={progress} />}
        </svg>
      </div>
      
      {/* 内容层 - 从动画中展开 */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Transition 1: 极简弧线
function Transition1Paths({ progress }: { progress: any }) {
  return (
    <>
      <motion.path 
        style={{ pathLength: progress }}
        d="M 200 120 Q 600 80, 1000 120"
        stroke="#00ff88" 
        strokeWidth="1" 
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.path 
        style={{ pathLength: progress }}
        d="M 200 120 Q 600 160, 1000 120"
        stroke="#8b5cf6" 
        strokeWidth="1" 
        fill="none"
        opacity="0.2"
        strokeDasharray="0 1"
      />
    </>
  );
}

// Transition 2: 对称弧线 + 圆球
function Transition2Paths({ progress }: { progress: any }) {
  return (
    <>
      <motion.path
        style={{ pathLength: progress }}
        d="M 300 120 Q 450 80, 600 120"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.path
        style={{ pathLength: progress }}
        d="M 600 120 Q 750 160, 900 120"
        stroke="#00ff88"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.circle
        style={{ scale: progress }}
        cx="600" cy="120" r="4"
        fill="#00ff88"
        opacity="0.6"
      />
      <motion.circle
        style={{ scale: progress }}
        cx="600" cy="120" r="8"
        stroke="#00ff88"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </>
  );
}

// Transition 3: 平缓波浪
function Transition3Paths({ progress }: { progress: any }) {
  return (
    <>
      <motion.path
        style={{ pathLength: progress }}
        d="M 0 120 Q 300 100, 600 120 Q 900 140, 1200 120"
        stroke="#00ff88"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.path
        style={{ pathLength: progress }}
        d="M 0 120 Q 300 140, 600 120 Q 900 100, 1200 120"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        strokeDasharray="0 1"
      />
    </>
  );
}

// Transition 4: 极简对称 + 圆球
function Transition4Paths({ progress }: { progress: any }) {
  return (
    <>
      <motion.path
        style={{ pathLength: progress }}
        d="M 400 120 Q 500 90, 600 120"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.path
        style={{ pathLength: progress }}
        d="M 600 120 Q 700 150, 800 120"
        stroke="#00ff88"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeDasharray="0 1"
      />
      <motion.path
        style={{ pathLength: progress }}
        d="M 300 120 Q 450 70, 600 120"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        strokeDasharray="0 1"
      />
      <motion.path
        style={{ pathLength: progress }}
        d="M 600 120 Q 750 170, 900 120"
        stroke="#00ff88"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
        strokeDasharray="0 1"
      />
      <motion.circle
        style={{ scale: progress }}
        cx="600" cy="120" r="5"
        fill="#8b5cf6"
        opacity="0.6"
      />
      <motion.circle
        style={{ scale: progress }}
        cx="600" cy="120" r="10"
        stroke="#8b5cf6"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </>
  );
}

// 导出旧的组件以保持兼容性
export function Transition1() {
  return <div className="h-32 md:h-40 my-32" />;
}

export function Transition2() {
  return <div className="h-32 md:h-40 my-32" />;
}

export function Transition3() {
  return <div className="h-32 md:h-40 my-32" />;
}

export function Transition4() {
  return <div className="h-32 md:h-40 my-32" />;
}
