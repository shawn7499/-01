import React from 'react';
import '../app/transitions.css';

// Transition 1: 极简弧线
export function Transition1() {
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 单一优雅弧线 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0s', animationDuration: '4s' }}
          d="M 200 80 Q 600 40, 1000 80"
          stroke="#00ff88" 
          strokeWidth="1" 
          fill="none"
          opacity="0.3"
        />
        
        {/* 第二层弧线 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0.8s', animationDuration: '4s' }}
          d="M 200 80 Q 600 120, 1000 80"
          stroke="#8b5cf6" 
          strokeWidth="1" 
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}

// Transition 2: 对称弧线
export function Transition2() {
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 左侧弧线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
          d="M 300 80 Q 450 40, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* 右侧弧线（镜像） */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.5s', animationDuration: '4s' }}
          d="M 600 80 Q 750 120, 900 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* 中心连接 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1s', animationDuration: '3s' }}
          d="M 580 80 Q 600 70, 620 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

// Transition 3: 平缓波浪
export function Transition3() {
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 主波浪 - 非常平缓 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s', animationDuration: '5s' }}
          d="M 0 80 Q 300 60, 600 80 Q 900 100, 1200 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* 第二层波浪 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1s', animationDuration: '5s' }}
          d="M 0 80 Q 300 100, 600 80 Q 900 60, 1200 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}

// Transition 4: 极简对称
export function Transition4() {
  return (
    <div className="relative h-32 md:h-40 overflow-hidden my-32">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid slice">
        {/* 左弧 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
          d="M 400 80 Q 500 50, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* 右弧 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.6s', animationDuration: '4s' }}
          d="M 600 80 Q 700 110, 800 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* 外层左弧 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1.2s', animationDuration: '4s' }}
          d="M 300 80 Q 450 30, 600 80"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
        
        {/* 外层右弧 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1.8s', animationDuration: '4s' }}
          d="M 600 80 Q 750 130, 900 80"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>
    </div>
  );
}
