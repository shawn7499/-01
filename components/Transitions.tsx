import React from 'react';
import '../app/transitions.css';

// Transition 1: 流动曲线网络
export function Transition1() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 主波浪曲线 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0s' }}
          d="M 0 120 Q 150 80, 300 120 T 600 120 T 900 120 T 1200 120"
          stroke="url(#gradient1)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.8"
        />
        
        {/* 第二层波浪 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0.3s' }}
          d="M 0 140 Q 150 160, 300 140 T 600 140 T 900 140 T 1200 140"
          stroke="url(#gradient1)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.5"
        />
        
        {/* 第三层波浪 */}
        <path 
          className="transition-path" 
          style={{ animationDelay: '0.6s' }}
          d="M 0 100 Q 150 60, 300 100 T 600 100 T 900 100 T 1200 100"
          stroke="url(#gradient2)" 
          strokeWidth="2" 
          fill="none"
          opacity="0.4"
        />
        
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#00ff88" stopOpacity="1"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        
        {/* 波浪上的圆点 */}
        {[300, 600, 900].map((x, i) => (
          <circle
            key={i}
            className="transition-circle transition-glow"
            style={{ animationDelay: `${1 + i * 0.2}s` }}
            cx={x} cy="120" r="6"
            fill="#00ff88"
          />
        ))}
        
        {/* 移动的粒子 */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="transition-float"
            style={{ 
              animationDuration: `${8 + i * 2}s`,
              animationDelay: `${i * 0.8}s`
            }}
            cx={100 + i * 150} cy={120} r="3"
            fill="#8b5cf6"
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 2: 同心圆扩散
export function Transition2() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心发光点 */}
        <circle
          className="transition-circle transition-glow"
          style={{ animationDelay: '0s' }}
          cx="600" cy="120" r="8"
          fill="#00ff88"
        />
        
        {/* 扩散圆环 */}
        {[25, 45, 65, 85, 105].map((r, i) => (
          <circle
            key={i}
            className="transition-path"
            style={{ animationDelay: `${i * 0.2}s` }}
            cx="600" cy="120" r={r}
            stroke="url(#gradient3)"
            strokeWidth="2"
            fill="none"
            opacity={0.7 - i * 0.1}
          />
        ))}
        
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#00ff88"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        
        {/* 左右弧线连接 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1s' }}
          d="M 400 120 Q 500 80, 600 120"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          className="transition-path"
          style={{ animationDelay: '1.2s' }}
          d="M 600 120 Q 700 160, 800 120"
          stroke="#00ff88"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* 端点 */}
        <circle className="transition-circle" style={{ animationDelay: '1.5s' }}
          cx="400" cy="120" r="6" fill="#8b5cf6" />
        <circle className="transition-circle" style={{ animationDelay: '1.7s' }}
          cx="800" cy="120" r="6" fill="#00ff88" />
      </svg>
    </div>
  );
}

// Transition 3: 螺旋曲线
export function Transition3() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* S形螺旋曲线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 200 120 Q 300 60, 400 120 Q 500 180, 600 120 Q 700 60, 800 120 Q 900 180, 1000 120"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* 第二层螺旋 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.4s' }}
          d="M 200 140 Q 300 90, 400 140 Q 500 190, 600 140 Q 700 90, 800 140 Q 900 190, 1000 140"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        
        <defs>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.7"/>
            <stop offset="25%" stopColor="#00ff88" stopOpacity="1"/>
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7"/>
            <stop offset="75%" stopColor="#00ff88" stopOpacity="1"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7"/>
          </linearGradient>
        </defs>
        
        {/* 曲线上的节点 */}
        {[
          {x: 400, y: 120},
          {x: 600, y: 120},
          {x: 800, y: 120}
        ].map((pos, i) => (
          <circle
            key={i}
            className="transition-circle transition-glow"
            style={{ animationDelay: `${0.8 + i * 0.2}s` }}
            cx={pos.x} cy={pos.y} r="7"
            fill={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
          />
        ))}
        
        {/* 移动粒子 */}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            className="transition-float"
            style={{ 
              animationDuration: `${7 + i * 1.5}s`,
              animationDelay: `${i * 0.6}s`
            }}
            cx={250 + i * 200} cy={120} r="3"
            fill="#00ff88"
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 4: 花瓣曲线
export function Transition4() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心圆 */}
        <circle
          className="transition-circle transition-glow"
          style={{ animationDelay: '0s' }}
          cx="600" cy="120" r="10"
          fill="#00ff88"
        />
        
        {/* 花瓣形曲线 - 上 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.2s' }}
          d="M 600 120 Q 580 70, 600 50 Q 620 70, 600 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形曲线 - 右 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.4s' }}
          d="M 600 120 Q 650 100, 670 120 Q 650 140, 600 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形曲线 - 下 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.6s' }}
          d="M 600 120 Q 620 170, 600 190 Q 580 170, 600 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形曲线 - 左 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.8s' }}
          d="M 600 120 Q 550 140, 530 120 Q 550 100, 600 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        <defs>
          <radialGradient id="gradient5">
            <stop offset="0%" stopColor="#00ff88"/>
            <stop offset="50%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#00ff88"/>
          </radialGradient>
        </defs>
        
        {/* 外围圆环 */}
        {[80, 100, 120].map((r, i) => (
          <circle
            key={i}
            className="transition-path"
            style={{ animationDelay: `${1 + i * 0.2}s` }}
            cx="600" cy="120" r={r}
            stroke={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
            strokeWidth="1"
            fill="none"
            opacity={0.4 - i * 0.1}
          />
        ))}
      </svg>
    </div>
  );
}
