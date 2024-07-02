'use client';
import React, { useState, useRef, useEffect } from 'react';

const FloatingButton = ({ children, initialPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const buttonRef = useRef(null);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const keepInBounds = (x, y) => {
    const button = buttonRef.current;
    if (!button) return { x, y };

    const buttonRect = button.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const newX = Math.min(Math.max(x, 0), windowWidth - buttonRect.width);
    const newY = Math.min(Math.max(y, 0), windowHeight - buttonRect.height);

    return { x: newX, y: newY };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        setPosition(keepInBounds(clientX, clientY));
      }
    };

    const handleEnd = (e) => {
      if (isDragging) {
        const endX = e.clientX || e.changedTouches[0].clientX;
        const endY = e.clientY || e.changedTouches[0].clientY;
        const startX = startPositionRef.current.x;
        const startY = startPositionRef.current.y;

        if (Math.abs(endX - startX) < 5 && Math.abs(endY - startY) < 5) {
          handleClick();
        }
      }
      setIsDragging(false);
    };

    const handleResize = () => {
      setPosition((prevPosition) =>
        keepInBounds(prevPosition.x, prevPosition.y)
      );
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDragging]);

  useEffect(() => {
    setPosition((prevPosition) => keepInBounds(prevPosition.x, prevPosition.y));
  }, []);

  const handleStart = (e) => {
    e.preventDefault(); // Prevent text selection and scrolling
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    startPositionRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
  };

  const handleClick = () => {
    console.log('Button clicked!');
    // Add your button click logic here
  };

  return (
    <div
      ref={buttonRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none' // Prevents scrolling on touch devices
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {children}
    </div>
  );
};

export default FloatingButton;
