import React from 'react';
import '../app/transitions.css';

// Transition 1: 网格连接 - 模仿 LayerZero 的节点网络
export function Transition1() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 背景网格 */}
        <defs>
          <pattern id="grid1" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="1200" height="240" fill="url(#grid1)" />
        
        {/* 主连接线 - 水平 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0s' }}
          d="M 200 120 L 1000 120"
          stroke="url(#gradient1)" 
          strokeWidth="2" 
          fill="none"
        />
        
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00ff88" stopOpacity="1"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        
        {/* 节点 */}
        {[200, 400, 600, 800, 1000].map((x, i) => (
          <g key={i}>
            {/* 外圈 */}
            <circle
              className="transition-circle"
              style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              cx={x} cy="120" r="12"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
            {/* 内圈 */}
            <circle
              className="transition-circle transition-glow"
              style={{ animationDelay: `${0.7 + i * 0.15}s` }}
              cx={x} cy="120" r="6"
              fill="#00ff88"
            />
          </g>
        ))}
        
        {/* 移动的粒子 */}
        <circle className="transition-float" style={{ animationDuration: '8s' }}
          cx="300" cy="120" r="2" fill="#8b5cf6" opacity="0.8" />
        <circle className="transition-float" style={{ animationDuration: '10s', animationDelay: '1s' }}
          cx="700" cy="120" r="2" fill="#00ff88" opacity="0.8" />
      </svg>
    </div>
  );
}

// Transition 2: 对称扩散 - 模仿 LayerZero 的对称美学
export function Transition2() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心圆 */}
        <circle
          className="transition-circle transition-glow"
          style={{ animationDelay: '0s' }}
          cx="600" cy="120" r="8"
          fill="#00ff88"
        />
        
        {/* 扩散圆环 */}
        {[30, 50, 70, 90].map((r, i) => (
          <circle
            key={i}
            className="transition-path"
            style={{ animationDelay: `${i * 0.2}s` }}
            cx="600" cy="120" r={r}
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
            opacity={0.6 - i * 0.1}
          />
        ))}
        
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#00ff88"/>
          </linearGradient>
        </defs>
        
        {/* 左右对称的连接线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.8s' }}
          d="M 400 120 L 600 120"
          stroke="#8b5cf6"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          className="transition-path"
          style={{ animationDelay: '1s' }}
          d="M 600 120 L 800 120"
          stroke="#00ff88"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* 端点 */}
        <circle className="transition-circle" style={{ animationDelay: '1.2s' }}
          cx="400" cy="120" r="6" fill="#8b5cf6" />
        <circle className="transition-circle" style={{ animationDelay: '1.4s' }}
          cx="800" cy="120" r="6" fill="#00ff88" />
      </svg>
    </div>
  );
}

// Transition 3: 粒子流动 - 模仿 LayerZero 的动态粒子
export function Transition3() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 波浪路径 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 100 120 Q 300 80, 500 120 T 900 120 L 1100 120"
          stroke="url(#gradient3)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5"/>
            <stop offset="50%" stopColor="#00ff88" stopOpacity="1"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5"/>
          </linearGradient>
        </defs>
        
        {/* 路径上的节点 */}
        {[
          {x: 100, y: 120},
          {x: 300, y: 80},
          {x: 500, y: 120},
          {x: 700, y: 80},
          {x: 900, y: 120},
          {x: 1100, y: 120}
        ].map((pos, i) => (
          <circle
            key={i}
            className="transition-circle transition-glow"
            style={{ animationDelay: `${0.5 + i * 0.15}s` }}
            cx={pos.x} cy={pos.y} r="5"
            fill={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
          />
        ))}
        
        {/* 移动的粒子 */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            className="transition-float"
            style={{ 
              animationDuration: `${6 + i * 2}s`,
              animationDelay: `${i * 0.5}s`
            }}
            cx={200 + i * 200} cy={120} r="3"
            fill="#00ff88"
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 4: 六边形网络 - 模仿 LayerZero 的几何图形
export function Transition4() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心六边形 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 600 80 L 640 100 L 640 140 L 600 160 L 560 140 L 560 100 Z"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        <defs>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#00ff88"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        
        {/* 外围六边形 */}
        <g className="transition-rotate" style={{ transformOrigin: '600px 120px', animationDuration: '30s' }}>
          <path
            d="M 600 60 L 660 90 L 660 150 L 600 180 L 540 150 L 540 90 Z"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </g>
        
        {/* 连接线 */}
        {[
          {x1: 400, y1: 120, x2: 560, y2: 120},
          {x1: 640, y1: 120, x2: 800, y2: 120}
        ].map((line, i) => (
          <path
            key={i}
            className="transition-path"
            style={{ animationDelay: `${0.5 + i * 0.3}s` }}
            d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
            stroke={i === 0 ? "#8b5cf6" : "#00ff88"}
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
        
        {/* 端点节点 */}
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1s' }}
          cx="400" cy="120" r="6" fill="#8b5cf6" />
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.2s' }}
          cx="600" cy="120" r="8" fill="#00ff88" />
        <circle className="transition-circle transition-glow" style={{ animationDelay: '1.4s' }}
          cx="800" cy="120" r="6" fill="#00ff88" />
      </svg>
    </div>
  );
}
