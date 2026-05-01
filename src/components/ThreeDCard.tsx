'use client';
import React, { useState, useRef, useCallback, ReactNode, CSSProperties } from 'react';

interface ThreeDCardProps {
  children: ReactNode;
  /** Classes applied to the outer perspective wrapper */
  className?: string;
  /** Classes applied to the inner card element (background, border, padding, etc.) */
  cardClassName?: string;
  maxRotation?: number;
  glowOpacity?: number;
  glowColor?: string;
  shadowBlur?: number;
  parallaxOffset?: number;
  transitionDuration?: string;
  enableGlow?: boolean;
  enableShadow?: boolean;
  enableParallax?: boolean;
}

export default function ThreeDCard({
  children,
  className = '',
  cardClassName = '',
  maxRotation = 10,
  glowOpacity = 0.18,
  glowColor = '255,255,255',
  shadowBlur = 30,
  parallaxOffset = 30,
  transitionDuration = '0.55s',
  enableGlow = true,
  enableShadow = true,
  enableParallax = true,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [t, setT] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    shadowX: 0,
    shadowY: 20,
    hovered: false,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { width, height, left, top } = cardRef.current.getBoundingClientRect();
      const mx = e.clientX - left;
      const my = e.clientY - top;
      const xPct = mx / width - 0.5;
      const yPct = my / height - 0.5;
      const rX = yPct * -maxRotation;
      const rY = xPct * maxRotation;
      setT(prev => ({
        ...prev,
        rotateX: rX,
        rotateY: rY,
        glowX: (mx / width) * 100,
        glowY: (my / height) * 100,
        shadowX: enableShadow ? rY * 0.7 : 0,
        shadowY: enableShadow ? 20 - rX * 0.5 : 20,
      }));
    },
    [maxRotation, enableShadow]
  );

  const onEnter = useCallback(() => setT(prev => ({ ...prev, hovered: true })), []);

  const onLeave = useCallback(() =>
    setT({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, shadowX: 0, shadowY: 20, hovered: false }),
  []);

  const cardStyle: CSSProperties = {
    transform: `perspective(1000px) rotateX(${t.rotateX}deg) rotateY(${t.rotateY}deg)`,
    boxShadow: enableShadow
      ? `${t.shadowX}px ${t.shadowY}px ${shadowBlur}px rgba(0,0,0,0.45)`
      : undefined,
    transition: `transform ${transitionDuration} cubic-bezier(0.23,1,0.32,1), box-shadow ${transitionDuration} cubic-bezier(0.23,1,0.32,1)`,
    transformStyle: 'preserve-3d',
  };

  const glowStyle: CSSProperties = {
    background: `radial-gradient(circle at ${t.glowX}% ${t.glowY}%, rgba(${glowColor},${glowOpacity}), transparent 70%)`,
    opacity: t.hovered ? 1 : 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  };

  const contentStyle: CSSProperties = enableParallax
    ? { transform: `translateZ(${parallaxOffset}px)`, transformStyle: 'preserve-3d' }
    : {};

  return (
    <div style={{ perspective: '1000px' }} className={className}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={cardStyle}
        className={`relative ${cardClassName}`}
      >
        {/* Glow overlay */}
        {enableGlow && (
          <div className="absolute inset-0 z-20 rounded-[inherit]" style={glowStyle} aria-hidden />
        )}

        {/* White-border shimmer ring */}
        <div
          className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none z-30"
          aria-hidden
        />

        {/* Content */}
        <div style={contentStyle} className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
