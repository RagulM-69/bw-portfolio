"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Starfield component
function Starfield({ hyperspeed }: { hyperspeed: boolean }) {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const speed = hyperspeed ? 150 : 2;
    pointsRef.current.position.z += speed * delta;
    if (pointsRef.current.position.z > 50) {
      pointsRef.current.position.z -= 50;
    }
    // Stretch points in Z direction during hyperspeed feels cooler but harder with Points.
    // So we just speed them up.
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#F5F1EA" transparent opacity={0.8} sizeAttenuation={true} />
    </points>
  );
}

function CameraController({ hyperspeed }: { hyperspeed: boolean }) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const targetFov = hyperspeed ? 150 : 75;
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov += (targetFov - cam.fov) * delta * 2;
    cam.updateProjectionMatrix();
  });
  return null;
}

export default function EntryScreen({ onComplete }: { onComplete: () => void }) {
  const [hyperspeed, setHyperspeed] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleEnter = () => {
    setHyperspeed(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 1800); // 1.8s of hyperspeed
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
              <color attach="background" args={["#0A0A0A"]} />
              <fog attach="fog" args={["#0A0A0A", 10, 50]} />
              <Starfield hyperspeed={hyperspeed} />
              <CameraController hyperspeed={hyperspeed} />
            </Canvas>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-[#F5F1EA]"
            >
              RAGUL M
            </motion.h1>

            <AnimatePresence>
              {!hyperspeed && (
                <motion.button
                  key="enter-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  onClick={handleEnter}
                  className="group relative px-8 py-3 text-sm tracking-[0.3em] text-[#F5F1EA] uppercase overflow-hidden border border-[#F5F1EA]/30 hover:border-[#F5F1EA] transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-[#F5F1EA] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 mix-blend-difference font-semibold">ENTER SYSTEM</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
