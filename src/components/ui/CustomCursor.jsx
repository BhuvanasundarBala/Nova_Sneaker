import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef(null);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touchscreens)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.getAttribute('role') === 'button'
      );
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing animation loop
    const animate = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer trailing aura ring */}
      <div 
        className="fixed top-0 left-0 rounded-full transition-transform duration-75 ease-out border border-[#B7FF00]/60 pointer-events-none"
        style={{
          transform: `translate3d(${trailingPos.x - (isHovering ? 24 : 16)}px, ${trailingPos.y - (isHovering ? 24 : 16)}px, 0)`,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? 'rgba(183, 255, 0, 0.15)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(183, 255, 0, 0.4)' : 'none',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s'
        }}
      />

      {/* Center sharp dot */}
      <div 
        className="fixed top-0 left-0 rounded-full bg-[#B7FF00] pointer-events-none"
        style={{
          transform: `translate3d(${pos.x - (isClicking ? 2 : 3)}px, ${pos.y - (isClicking ? 2 : 3)}px, 0)`,
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          boxShadow: '0 0 10px #B7FF00'
        }}
      />
    </div>
  );
}
