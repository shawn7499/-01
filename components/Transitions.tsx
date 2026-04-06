import React from 'react';
import '../app/transitions.css';

export function Transition1() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/30">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 流动的波浪曲线 */}
        <path className="transition-path" style={{ animationDelay: '0s' }}
          d="M 0 100 Q 250 50, 500 100 T 1000 100"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.8" />
        <path className="transition-path" style={{ animationDelay: '0.3s' }}
          d="M 0 120 Q 250 80, 500 120 T 1000 120"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.6" />
        <path className="transition-path" style={{ animationDelay: '0.6s' }}
          d="M 0 80 Q 250 120, 500 80 T 1000 80"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.5" />
        
        {/* 浮动的圆点 */}
        <circle className="transition-circle transition-float" style={{ animationDelay: '0.9s' }}
          cx="250" cy="100" r="6" fill="#00ff88" />
        <circle className="transition-circle transition-float" style={{ animationDelay: '1.1s', animationDuration: '5s' }}
          cx="500" cy="100" r="8" fill="#00ff88" />
        <circle className="transition-circle transition-float" style={{ animationDelay: '1.3s', animationDuration: '4.5s' }}
          cx="750" cy="100" r="6" fill="#8b5cf6" />
        
        {/* 光晕效果 */}
        <circle className="transition-glow" style={{ animationDelay: '1.5s' }}
          cx="500" cy="100" r="30" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}

export function Transition2() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/30">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 螺旋曲线 */}
        <path className="transition-path" style={{ animationDelay: '0s' }}
          d="M 200 100 Q 300 50, 400 100 Q 500 150, 600 100 Q 700 50, 800 100"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.8" />
        <path className="transition-path" style={{ animationDelay: '0.4s' }}
          d="M 200 120 Q 300 80, 400 120 Q 500 160, 600 120 Q 700 80, 800 120"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.6" />
        
        {/* 圆环组合 */}
        <circle className="transition-circle" style={{ animationDelay: '0.8s' }}
          cx="300" cy="100" r="20" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.6" />
        <circle className="transition-circle" style={{ animationDelay: '1s' }}
          cx="500" cy="100" r="25" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.7" />
        <circle className="transition-circle" style={{ animationDelay: '1.2s' }}
          cx="700" cy="100" r="20" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
        
        {/* 中心点 */}
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.4s' }}
          cx="500" cy="100" r="5" fill="#00ff88" />
      </svg>
    </div>
  );
}

export function Transition3() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/30">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 交织的曲线 */}
        <path className="transition-path" style={{ animationDelay: '0s' }}
          d="M 100 50 Q 300 150, 500 100 Q 700 50, 900 150"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.8" />
        <path className="transition-path" style={{ animationDelay: '0.3s' }}
          d="M 100 150 Q 300 50, 500 100 Q 700 150, 900 50"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.7" />
        
        {/* 连接节点 */}
        <circle className="transition-circle transition-float" style={{ animationDelay: '0.6s' }}
          cx="300" cy="100" r="8" fill="#00ff88" opacity="0.8" />
        <circle className="transition-circle transition-float" style={{ animationDelay: '0.8s', animationDuration: '5s' }}
          cx="500" cy="100" r="10" fill="#00ff88" opacity="0.9" />
        <circle className="transition-circle transition-float" style={{ animationDelay: '1s', animationDuration: '4.5s' }}
          cx="700" cy="100" r="8" fill="#8b5cf6" opacity="0.8" />
        
        {/* 扩散光环 */}
        <circle className="transition-glow" style={{ animationDelay: '1.2s' }}
          cx="500" cy="100" r="40" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3" />
        <circle className="transition-glow" style={{ animationDelay: '1.4s', animationDuration: '4s' }}
          cx="500" cy="100" r="60" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.2" />
      </svg>
    </div>
  );
}

export function Transition4() {
  return (
    <div className="relative h-48 md:h-64 overflow-hidden my-16 bg-black/30">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
        {/* 花瓣形曲线 */}
        <path className="transition-path" style={{ animationDelay: '0s' }}
          d="M 500 100 Q 450 50, 500 60 Q 550 50, 500 100"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.7" />
        <path className="transition-path" style={{ animationDelay: '0.2s' }}
          d="M 500 100 Q 550 50, 560 100 Q 550 150, 500 100"
          stroke="#00ff88" strokeWidth="2" fill="none" opacity="0.7" />
        <path className="transition-path" style={{ animationDelay: '0.4s' }}
          d="M 500 100 Q 550 150, 500 140 Q 450 150, 500 100"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.7" />
        <path className="transition-path" style={{ animationDelay: '0.6s' }}
          d="M 500 100 Q 450 150, 440 100 Q 450 50, 500 100"
          stroke="#8b5cf6" strokeWidth="2" fill="none" opacity="0.7" />
        
        {/* 同心圆 */}
        <circle className="transition-circle" style={{ animationDelay: '0.8s' }}
          cx="500" cy="100" r="30" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.6" />
        <circle className="transition-circle" style={{ animationDelay: '1s' }}
          cx="500" cy="100" r="50" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.5" />
        <circle className="transition-circle" style={{ animationDelay: '1.2s' }}
          cx="500" cy="100" r="70" fill="none" stroke="#00ff88" strokeWidth="2" opacity="0.4" />
        
        {/* 中心发光点 */}
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.4s' }}
          cx="500" cy="100" r="8" fill="#00ff88" />
      </svg>
    </div>
  );
}
