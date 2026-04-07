import React from 'react';
import '../app/transitions.css';

// Transition 1: 开放波浪流
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
          strokeWidth="3" 
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
        
        {/* 开放弧线装饰 */}
        {[300, 600, 900].map((x, i) => (
          <path
            key={i}
            className="transition-path"
            style={{ animationDelay: `${1 + i * 0.2}s` }}
            d={`M ${x-20} ${110} Q ${x} ${95}, ${x+20} ${110}`}
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 2: 开放弧线扩散
export function Transition2() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心开放弧线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 580 120 Q 590 100, 600 120 Q 610 140, 620 120"
          stroke="#00ff88"
          strokeWidth="3"
          fill="none"
          opacity="0.9"
        />
        
        {/* 扩散弧线组 */}
        {[30, 50, 70, 90].map((r, i) => (
          <path
            key={i}
            className="transition-path"
            style={{ animationDelay: `${0.2 + i * 0.2}s` }}
            d={`M ${600-r} 120 Q ${600-r*0.7} ${120-r*0.7}, ${600} ${120-r} Q ${600+r*0.7} ${120-r*0.7}, ${600+r} 120`}
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
        
        {/* 左右连接弧线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '1s' }}
          d="M 400 120 Q 450 90, 500 120 Q 550 100, 600 120"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          className="transition-path"
          style={{ animationDelay: '1.2s' }}
          d="M 600 120 Q 650 140, 700 120 Q 750 130, 800 120"
          stroke="#00ff88"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// Transition 3: S形螺旋流
export function Transition3() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 主螺旋曲线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 100 120 Q 200 60, 300 120 Q 400 180, 500 120 Q 600 60, 700 120 Q 800 180, 900 120 Q 1000 60, 1100 120"
          stroke="url(#gradient4)"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />
        
        {/* 第二层螺旋 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.4s' }}
          d="M 100 140 Q 200 90, 300 140 Q 400 190, 500 140 Q 600 90, 700 140 Q 800 190, 900 140 Q 1000 90, 1100 140"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        
        {/* 第三层螺旋 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.8s' }}
          d="M 100 100 Q 200 50, 300 100 Q 400 150, 500 100 Q 600 50, 700 100 Q 800 150, 900 100 Q 1000 50, 1100 100"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
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
        
        {/* 交叉点的小弧线 */}
        {[300, 500, 700, 900].map((x, i) => (
          <path
            key={i}
            className="transition-path"
            style={{ animationDelay: `${1.2 + i * 0.15}s` }}
            d={`M ${x-15} ${115} Q ${x} ${105}, ${x+15} ${115}`}
            stroke={i % 2 === 0 ? "#00ff88" : "#8b5cf6"}
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
}

// Transition 4: 开放花瓣流
export function Transition4() {
  return (
    <div className="relative h-40 md:h-56 overflow-hidden my-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        {/* 中心小弧线 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0s' }}
          d="M 590 120 Q 595 110, 600 120 Q 605 130, 610 120"
          stroke="#00ff88"
          strokeWidth="3"
          fill="none"
          opacity="0.9"
        />
        
        {/* 花瓣形开放曲线 - 上 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.2s' }}
          d="M 580 120 Q 570 80, 580 50 Q 590 70, 600 60 Q 610 70, 620 50 Q 630 80, 620 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形开放曲线 - 右 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.4s' }}
          d="M 600 110 Q 640 100, 670 110 Q 650 120, 660 130 Q 650 140, 670 150 Q 640 160, 600 150"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形开放曲线 - 下 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.6s' }}
          d="M 620 120 Q 630 160, 620 190 Q 610 170, 600 180 Q 590 170, 580 190 Q 570 160, 580 120"
          stroke="url(#gradient5)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* 花瓣形开放曲线 - 左 */}
        <path
          className="transition-path"
          style={{ animationDelay: '0.8s' }}
          d="M 600 130 Q 560 140, 530 130 Q 550 120, 540 110 Q 550 100, 530 90 Q 560 80, 600 90"
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
        
        {/* 外围开放弧线 */}
        {[80, 100, 120].map((r, i) => (
          <path
            key={i}
            className="transition-path"
            style={{ animationDelay: `${1 + i * 0.2}s` }}
            d={`M ${600-r} 120 Q ${600-r*0.8} ${120-r*0.6}, ${600} ${120-r*0.8} Q ${600+r*0.8} ${120-r*0.6}, ${600+r} 120`}
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
