"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export const FEATURED_PROJECTS = [
  {
    id: 0,
    cardLabel: "AI Resume Analyzer",
    cardSub: "Beat the ATS · Land interviews",
    shade: "bg-[#0d0d0d]",
    num: "01",
  },
  {
    id: 1,
    cardLabel: "SlothSummarizer",
    cardSub: "Instant AI summaries · Any content",
    shade: "bg-[#161616]",
    num: "02",
  },
  {
    id: 2,
    cardLabel: "Trust Foundation",
    cardSub: "Donations · Merch · Deeds",
    shade: "bg-[#1f1f1f]",
    num: "03",
  },
];

interface CardSwapProps {
  activeIndex: number;
  onSelect: (id: number) => void;
}

export default function CardSwap({ activeIndex, onSelect }: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep a mutable ref to the ordered card list so gsap mutations persist
  const cardsRef = useRef<HTMLElement[]>([]);
  const orderRef = useRef<number[]>([0, 1, 2]); // front → back

  // Initial stack setup
  useEffect(() => {
    if (!containerRef.current) return;
    const els = gsap.utils.toArray<HTMLElement>(".swap-card", containerRef.current);
    cardsRef.current = els;

    gsap.set(els, {
      transformPerspective: 1200,
      rotateZ: (i) => [-6, 3, 10][i],   // tilted sideways
      rotateX: 3,
      y: (i) => i * 18,
      scale: (i) => 1 - i * 0.04,
      zIndex: (i) => els.length - i,
    });
  }, []);

  // Animate to bring the clicked card to the front
  const bringToFront = (targetOriginalId: number) => {
    const order = orderRef.current;
    const currentFrontOriginalId = order[0];
    if (targetOriginalId === currentFrontOriginalId) return;

    const clickedPos = order.indexOf(targetOriginalId);
    if (clickedPos === -1) return;

    // Rotate order array so clicked index is at front
    const newOrder = [...order.slice(clickedPos), ...order.slice(0, clickedPos)];
    orderRef.current = newOrder;

    const els = cardsRef.current;
    // Remap: newOrder[0] is new front, etc.
    newOrder.forEach((origId, stackPos) => {
      const el = els[origId];
      gsap.to(el, {
        y: stackPos * 18,
        scale: 1 - stackPos * 0.04,
        zIndex: els.length - stackPos,
        rotateZ: [-6, 3, 10][stackPos],
        rotateX: 3,
        duration: 0.55,
        ease: "back.out(1.4)",
        stagger: 0.04,
      });
    });

    onSelect(targetOriginalId);
  };

  return (
    <div
      className="relative w-full max-w-lg aspect-[4/3] mx-auto"
      ref={containerRef}
      style={{ perspective: 1200 }}
    >
      {FEATURED_PROJECTS.map((card) => (
        <div
          key={card.id}
          data-orig-id={card.id}
          onClick={() => bringToFront(card.id)}
          className={`swap-card absolute inset-0 w-full h-full rounded-2xl ${card.shade}
            border border-[#F5F1EA]/10 p-8 flex flex-col justify-end cursor-pointer
            shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] origin-bottom
            hover:border-[#F5F1EA]/25 transition-[border-color] duration-300`}
        >
          {/* Ghost number */}
          <div className="absolute top-5 right-6 text-[#F5F1EA]/10 text-8xl font-black select-none">
            {card.num}
          </div>

          {/* Active indicator dot */}
          {activeIndex === card.id && (
            <div className="absolute top-5 left-6 w-2 h-2 rounded-full bg-[#F5F1EA] animate-pulse" />
          )}

          <h3 className="text-xl font-black text-[#F5F1EA] uppercase tracking-wider leading-tight">
            {card.cardLabel}
          </h3>
          <p className="text-[#F5F1EA]/50 text-sm mt-1.5 font-medium">{card.cardSub}</p>
        </div>
      ))}
    </div>
  );
}
