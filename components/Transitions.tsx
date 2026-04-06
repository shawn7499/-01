import React from 'react';
import '../app/transitions.css';

// Transition 1: 极简线条网格 - 灵感来自 LayerZero 的网格系统
export function Transition1() {
  return (
    <div className="relative h-32 md:h-48 overflow-hidden my-24">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        {/* 主水平线 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0s', animationDuration: '3s' }}
          d="M 0 100 L 1200 100"
          stroke="#00ff88" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.6"
        />
        
        {/* 垂直分割线 */}
        {[200, 400, 600, 800, 1000].map((x, i) => (
          <line
            key={i}
            className="transition-path"
            style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
            x1={x} y1="60" x2={x} y2="140"
            stroke="#00ff88"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
        
        {/* 节点 */}
        {[200, 400, 600, 800, 1000].map((x, i) => (
          <circle
            key={i}
            className="transition-circle transition-glow"
            style={{ animationDelay: `${1 + i * 0.15}s` }}
            cx={x} cy="100" r="3"
            fill="#00ff88"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 2: 旋转几何 - 灵感来自 LayerZero 的动态图形
export function Transition2() {
  return (
    <div className="relative h-32 md:h-48 overflow-hidden my-24">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        {/* 中心旋转六边形 */}
        <g className="transition-rotate" style={{ transformOrigin: '600px 100px' }}>
          <path
            d="M 600 60 L 640 80 L 640 120 L 600 140 L 560 120 L 560 80 Z"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
        </g>
        
        {/* 外围圆环 */}
        <circle
          className="transition-path"
          style={{ animationDelay: '0.5s' }}
          cx="600" cy="100" r="60"
          stroke="#8b5cf6"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        
        {/* 对角线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1s' }}
          d="M 400 100 L 800 100"
          stroke="#00ff88"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* 端点 */}
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.5s' }}
          cx="400" cy="100" r="3" fill="#8b5cf6" />
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.6s' }}
          cx="800" cy="100" r="3" fill="#8b5cf6" />
      </svg>
    </div>
  );
}

// Transition 3: 波浪扩散 - 灵感来自 LayerZero 的流动感
export function Transition3() {
  return (
    <div className="relative h-32 md:h-48 overflow-hidden my-24">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        {/* 同心圆扩散 */}
        {[30, 50, 70, 90].map((r, i) => (
          <circle
            key={i}
            className="transition-path"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: '3s' }}
            cx="600" cy="100" r={r}
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity={0.6 - i * 0.1}
          />
        ))}
        
        {/* 中心点 */}
        <circle
          className="transition-circle transition-glow"
          style={{ animationDelay: '1.5s' }}
          cx="600" cy="100" r="4"
          fill="#00ff88"
        />
        
        {/* 水平连接线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '2s' }}
          d="M 200 100 L 1000 100"
          stroke="#8b5cf6"
          strokeWidth="1"
          strokeDasharray="10,10"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

// Transition 4: 对称几何 - 灵感来自 LayerZero 的平衡美学
export function Transition4() {
  return (
    <div className="relative h-32 md:h-48 overflow-hidden my-24">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
        {/* 左侧三角形 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 400 60 L 450 100 L 400 140 Z"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        
        {/* 右侧三角形（镜像） */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.3s' }}
          d="M 800 60 L 750 100 L 800 140 Z"
          stroke="#00ff88"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        
        {/* 中心连接线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.6s' }}
          d="M 450 100 L 750 100"
          stroke="#8b5cf6"
          strokeWidth="1"
          opacity="0.5"
        />
        
        {/* 节点 */}
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1s' }}
          cx="450" cy="100" r="3" fill="#00ff88" />
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.1s' }}
          cx="600" cy="100" r="4" fill="#8b5cf6" />
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.2s' }}
          cx="750" cy="100" r="3" fill="#00ff88" />
      </svg>
    </div>
  );
}
