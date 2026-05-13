"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export const FEATURED_PROJECTS = [
  { id: 0, cardLabel: "ResuSloth",        cardSub: "AI · Full Stack",     num: "01", image: "/projects/resusloth.png",       link: "https://resu-sloth.vercel.app/" },
  { id: 1, cardLabel: "SlothSummarizer",  cardSub: "AI · Productivity",   num: "02", image: "/projects/slothsummarizer.png", link: "https://sloth-summarizer.onrender.com/" },
  { id: 2, cardLabel: "Trust Foundation", cardSub: "Next.js · Full Stack", num: "03", image: "/projects/devotional.png",      link: "https://www.voiceofdharmafoundation.org/" },
];

const IMG_H  = 220;
const INFO_H = 160;
const CARD_H = IMG_H + INFO_H;

/* CLUSTER: orderRef[0] = front/top, [1] = mid, [2] = back */
const CLUSTER_POS = [
  { x: 0,  y: 0,  rotateZ: -8,  scale: 1.00, zIndex: 3 },
  { x: 10, y: 10, rotateZ: 2,   scale: 0.96, zIndex: 2 },
  { x: 20, y: 20, rotateZ: 12,  scale: 0.92, zIndex: 1 },
];

/* SPREAD: orderRef[0] = left, [1] = CENTER/featured, [2] = right */
const getSpread = (w: number) => {
  const off = Math.min(w * 0.30, 120);
  return [
    { x: -off, y: 40, rotateZ: -24, rotateX: 3, rotateY:  10, scale: 0.86, zIndex: 1 },
    { x:    0, y: -6, rotateZ:  -2, rotateX: 0, rotateY:   0, scale: 1.02, zIndex: 3 },
    { x:  off, y: 40, rotateZ:  24, rotateX: 3, rotateY: -10, scale: 0.86, zIndex: 1 },
  ];
};

interface CardSwapProps {
  activeIndex: number;
  onSelect: (id: number) => void;
}

export default function CardSwap({ activeIndex, onSelect }: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardEls      = useRef<(HTMLElement | null)[]>([null, null, null]);

  // Cluster order: [front, mid, back]  →  card IDs
  // When expanded: same array but means [left, center, right]
  // Initially card 0 = front in cluster (and will become center when spread)
  const orderRef    = useRef<number[]>([0, 1, 2]);
  const expandedRef = useRef(false);
  const spreadRef   = useRef(getSpread(500));
  const [expanded, setExpanded] = useState(false);
  const autoTimer   = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Initial layout ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const w = container.offsetWidth;
    spreadRef.current = getSpread(w);

    const els = cardEls.current.filter(Boolean) as HTMLElement[];
    const cardW = Math.round(w * 0.72);
    gsap.set(els, {
      position: "absolute",
      width: cardW,
      height: CARD_H,
      left: "50%",
      xPercent: -50,
      top: "50%",
      yPercent: -50,
      transformPerspective: 1100,
    });
    // Apply initial cluster positions based on initial order [0,1,2]
    orderRef.current.forEach((cardId, posIdx) => {
      gsap.set(els[cardId], CLUSTER_POS[posIdx]);
    });
  }, []);

  /* ── Apply cluster positions ── */
  const applyCluster = useCallback((order: number[]) => {
    const els = cardEls.current.filter(Boolean) as HTMLElement[];
    order.forEach((cardId, posIdx) => {
      gsap.to(els[cardId], { ...CLUSTER_POS[posIdx], duration: 0.65, ease: "back.out(1.2)" });
    });
  }, []);

  /* ── Apply spread positions ── */
  const applySpread = useCallback((order: number[]) => {
    const els = cardEls.current.filter(Boolean) as HTMLElement[];
    const S   = spreadRef.current;
    order.forEach((cardId, posIdx) => {
      gsap.to(els[cardId], { ...S[posIdx], duration: 0.7, ease: "back.out(1.15)" });
    });
  }, []);

  /* ── Proper 3-card left-rotate cycle ── */
  const rotateOrder = (order: number[]) => [...order.slice(1), order[0]];

  /* ── Auto-rotate tick ── */
  const tick = useCallback(() => {
    const newOrder = rotateOrder(orderRef.current);
    orderRef.current = newOrder;
    if (expandedRef.current) {
      // In spread: center card is position 1
      applySpread(newOrder);
      onSelect(newOrder[1]);
    } else {
      // In cluster: front card is position 0
      applyCluster(newOrder);
    }
  }, [applySpread, applyCluster, onSelect]);

  const startAutoRotate = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(tick, 3500);
  }, [tick]);

  const pauseAutoRotate = useCallback(() => {
    if (autoTimer.current)  { clearInterval(autoTimer.current);  autoTimer.current  = null; }
    if (pauseTimer.current) { clearTimeout(pauseTimer.current);  pauseTimer.current = null; }
    pauseTimer.current = setTimeout(startAutoRotate, 6000);
  }, [startAutoRotate]);

  /* ── Start auto-rotate on mount ── */
  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoTimer.current)  clearInterval(autoTimer.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [startAutoRotate]);

  /* ── Open cluster ── */
  const expand = useCallback(() => {
    expandedRef.current = true;
    setExpanded(true);
    // In cluster, order[0] is the front card → make it center in spread
    // Rearrange so front card moves to position 1 (center)
    const [front, second, back] = orderRef.current;
    const spreadOrder = [second, front, back];
    orderRef.current = spreadOrder;
    applySpread(spreadOrder);
    onSelect(front);
  }, [applySpread, onSelect]);

  /* ── Bring clicked card to center ── */
  const bringToCenter = useCallback((targetId: number) => {
    const order = orderRef.current;
    if (order[1] === targetId) return;
    const others   = order.filter(id => id !== targetId);
    const newOrder = [others[0], targetId, others[1]];
    orderRef.current = newOrder;
    applySpread(newOrder);
    onSelect(targetId);
    pauseAutoRotate();
  }, [applySpread, onSelect, pauseAutoRotate]);

  /* ── Sync with parent activeIndex ── */
  useEffect(() => {
    if (!expandedRef.current) return;
    if (orderRef.current[1] !== activeIndex) bringToCenter(activeIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  /* ── 3-D tilt ── */
  const tilt = useCallback((clientX: number, clientY: number, cardId: number) => {
    if (!expandedRef.current) return;
    const el = cardEls.current[cardId]; if (!el) return;
    const r      = el.getBoundingClientRect();
    const dx     = (clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy     = (clientY - r.top  - r.height / 2) / (r.height / 2);
    const posIdx = orderRef.current.indexOf(cardId);
    const base   = spreadRef.current[posIdx] ?? { rotateX: 0, rotateY: 0 };
    gsap.to(el, { rotateY: base.rotateY + dx * 13, rotateX: base.rotateX - dy * 9, duration: 0.2, ease: "power2.out" });
  }, []);

  const resetTilt = useCallback((cardId: number) => {
    if (!expandedRef.current) return;
    const el     = cardEls.current[cardId]; if (!el) return;
    const posIdx = orderRef.current.indexOf(cardId);
    const base   = spreadRef.current[posIdx] ?? { rotateX: 0, rotateY: 0 };
    gsap.to(el, { rotateX: base.rotateX, rotateY: base.rotateY, duration: 0.55, ease: "elastic.out(1, 0.65)" });
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={containerRef}
        onClick={() => !expandedRef.current && expand()}
        style={{
          position: "relative",
          width: "100%",
          height: CARD_H + 100,
          perspective: 1100,
          cursor: expanded ? "default" : "pointer",
        }}
      >
        {FEATURED_PROJECTS.map((card) => (
          <div
            key={card.id}
            ref={el => { cardEls.current[card.id] = el; }}
            className="flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_60px_-6px_rgba(0,0,0,0.85)]"
            style={{ cursor: "pointer", userSelect: "none", touchAction: "pan-y" }}
            onClick={e => { e.stopPropagation(); expanded ? bringToCenter(card.id) : expand(); }}
            onMouseMove={e => tilt(e.clientX, e.clientY, card.id)}
            onMouseLeave={() => resetTilt(card.id)}
            onTouchMove={e => { const t = e.touches[0]; tilt(t.clientX, t.clientY, card.id); }}
            onTouchEnd={() => resetTilt(card.id)}
          >
            {/* Screenshot */}
            <div className="relative overflow-hidden bg-[#181818] flex-shrink-0" style={{ height: IMG_H }}>
              <img src={card.image} alt={card.cardLabel}
                className="w-full h-full object-cover object-top pointer-events-none"
                draggable={false} />
              <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none" />
            </div>

            {/* Info panel */}
            <div className="relative bg-[#0f0f0f] px-6 flex flex-col justify-center border-t border-white/5 overflow-hidden flex-shrink-0" style={{ height: INFO_H }}>
              <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{card.cardSub}</p>
              <h3 className="text-white text-xl font-black uppercase tracking-wide leading-tight">{card.cardLabel}</h3>
              <span className="text-white/6 text-7xl font-black leading-none select-none absolute right-3 bottom-2">{card.num}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
