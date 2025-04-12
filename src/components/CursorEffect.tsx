import React, { useEffect, useState } from 'react';

export function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[100] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className={`
          absolute -translate-x-1/2 -translate-y-1/2
          w-4 h-4 bg-purple-500/30 dark:bg-purple-400/40 rounded-full
          blur-sm transition-transform duration-200
          ${isPointer ? 'scale-150' : 'scale-100'}
        `} />
      </div>
      <div
        className="fixed pointer-events-none z-[100] mix-blend-difference transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
      </div>
    </>
  );
}