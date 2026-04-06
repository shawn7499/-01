import React from 'react';
import './transitions.css';

export function Transition1() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/50 border border-[#00ff88]/30 transition-container">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 水平线条 */}
        <line className="transition-line" style={{ animationDelay: '0s' }}
          x1="0" y1="80" x2="1000" y2="80" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.2s' }}
          x1="0" y1="100" x2="1000" y2="100" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.4s' }}
          x1="0" y1="120" x2="1000" y2="120" stroke="#00ff88" strokeWidth="2" />
        
        {/* 垂直线条 */}
        <line className="transition-line" style={{ animationDelay: '0.6s' }}
          x1="200" y1="60" x2="200" y2="140" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.8s' }}
          x1="500" y1="60" x2="500" y2="140" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '1s' }}
          x1="800" y1="60" x2="800" y2="140" stroke="#00ff88" strokeWidth="2" />
        
        {/* 节点 */}
        <circle className="transition-circle" style={{ animationDelay: '1.2s' }}
          cx="200" cy="100" r="5" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '1.4s' }}
          cx="500" cy="100" r="5" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '1.6s' }}
          cx="800" cy="100" r="5" fill="#00ff88" />
      </svg>
    </div>
  );
}

export function Transition2() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/50 border border-[#00ff88]/30 transition-container">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 三角形 */}
        <path className="transition-line" style={{ animationDelay: '0s' }}
          d="M 400 60 L 450 140 L 350 140 Z" stroke="#00ff88" strokeWidth="2" fill="none" />
        <path className="transition-line" style={{ animationDelay: '0.3s' }}
          d="M 500 80 L 540 140 L 460 140 Z" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        <path className="transition-line" style={{ animationDelay: '0.6s' }}
          d="M 600 60 L 650 140 L 550 140 Z" stroke="#00ff88" strokeWidth="2" fill="none" />
        
        {/* 矩形 */}
        <rect className="transition-line" style={{ animationDelay: '0.9s' }}
          x="250" y="70" width="60" height="60" stroke="#00ff88" strokeWidth="2" fill="none" />
        <rect className="transition-line" style={{ animationDelay: '1.2s' }}
          x="700" y="70" width="60" height="60" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

export function Transition3() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/50 border border-[#00ff88]/30 transition-container">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 对角线 */}
        <line className="transition-line" style={{ animationDelay: '0s' }}
          x1="100" y1="50" x2="900" y2="150" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.3s' }}
          x1="100" y1="150" x2="900" y2="50" stroke="#8b5cf6" strokeWidth="2" />
        
        {/* 节点 */}
        <circle className="transition-circle" style={{ animationDelay: '0.6s' }}
          cx="300" cy="80" r="5" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '0.8s' }}
          cx="500" cy="100" r="6" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '1s' }}
          cx="700" cy="120" r="5" fill="#8b5cf6" />
      </svg>
    </div>
  );
}

export function Transition4() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/50 border border-[#00ff88]/30 transition-container">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 圆环 */}
        <circle className="transition-line" style={{ animationDelay: '0s' }}
          cx="500" cy="100" r="40" stroke="#00ff88" strokeWidth="2" fill="none" />
        <circle className="transition-line" style={{ animationDelay: '0.2s' }}
          cx="500" cy="100" r="60" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        <circle className="transition-line" style={{ animationDelay: '0.4s' }}
          cx="500" cy="100" r="80" stroke="#00ff88" strokeWidth="2" fill="none" />
        
        {/* 放射线 */}
        <line className="transition-line" style={{ animationDelay: '0.6s' }}
          x1="500" y1="100" x2="650" y2="50" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.7s' }}
          x1="500" y1="100" x2="650" y2="150" stroke="#00ff88" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.8s' }}
          x1="500" y1="100" x2="350" y2="50" stroke="#8b5cf6" strokeWidth="2" />
        <line className="transition-line" style={{ animationDelay: '0.9s' }}
          x1="500" y1="100" x2="350" y2="150" stroke="#8b5cf6" strokeWidth="2" />
        
        {/* 节点 */}
        <circle className="transition-circle" style={{ animationDelay: '1s' }}
          cx="650" cy="50" r="5" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '1.1s' }}
          cx="650" cy="150" r="5" fill="#00ff88" />
        <circle className="transition-circle" style={{ animationDelay: '1.2s' }}
          cx="350" cy="50" r="5" fill="#8b5cf6" />
        <circle className="transition-circle" style={{ animationDelay: '1.3s' }}
          cx="350" cy="150" r="5" fill="#8b5cf6" />
      </svg>
    </div>
  );
}
