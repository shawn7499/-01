import React from 'react';

// 普通滚动容器 - 支持所有内容元素
interface FullPageScrollProps {
  sections: React.ReactNode[];
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  return (
    <div
      className="w-full bg-black"
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
        <div key={index} className="w-full relative z-10">
          {section}
        </div>
      ))}
    </div>
  );
}
