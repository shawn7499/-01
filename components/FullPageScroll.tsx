import React, { useRef, useEffect } from 'react';

// 普通滚动组件 - 去除 PPT 风格，改为整页展示
interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 平滑滚动
    container.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-y-auto bg-black"
      style={{
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {sections.map((section, index) => (
        <div key={index} className="min-h-screen w-full">
          {section}
        </div>
      ))}
    </div>
  );
}
