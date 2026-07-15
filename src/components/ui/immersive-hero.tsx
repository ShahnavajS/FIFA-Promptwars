"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const HOST_CITIES = [
  { name: "New York/New Jersey", lat: 40.7128, lng: -74.006 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
];

function convertLatLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.sin(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

function GlobeModel({ reducedMotion }: { reducedMotion: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const sphereRadius = 2.4;

  useFrame(() => {
    if (globeRef.current && !reducedMotion) {
      globeRef.current.rotation.y += 0.0015;
      globeRef.current.rotation.x += 0.0003;
    }
  });

  const cityVectors = HOST_CITIES.map((city) => ({
    name: city.name,
    pos: convertLatLngToVector3(city.lat, city.lng, sphereRadius),
  }));

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[sphereRadius * 1.03, 32, 32]} />
        <meshBasicMaterial
          color="#00e5ff"
          wireframe
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[sphereRadius, 32, 32]} />
        <meshBasicMaterial color="#0284c7" wireframe transparent opacity={0.2} />
      </mesh>

      {cityVectors.map((city, idx) => (
        <group key={idx} position={city.pos}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.12, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {cityVectors.map((city, idx) => {
        if (idx === cityVectors.length - 1) return null;
        const nextCity = cityVectors[idx + 1];

        const start = city.pos;
        const end = nextCity.pos;
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(sphereRadius * 1.25);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(20);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00e5ff,
          transparent: true,
          opacity: 0.3,
        });
        const threeLine = new THREE.Line(lineGeometry, lineMaterial);

        return <primitive key={idx} object={threeLine} />;
      })}
    </group>
  );
}

export function ImmersiveHero() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(support);
    } catch {
      setWebGlSupported(false);
    }

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (!mounted || !webGlSupported) {
    return <GlobeFallback />;
  }

  return (
    <div className="relative h-[400px] w-full max-w-[450px] select-none pointer-events-auto flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />

      <Canvas camera={{ position: [0, 0, 5.2], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <GlobeModel reducedMotion={reducedMotion} />
        <Stars
          radius={100}
          depth={50}
          count={250}
          factor={4}
          saturation={0.5}
          fade
          speed={reducedMotion ? 0 : 0.5}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}

function GlobeFallback() {
  return (
    <div className="relative h-[400px] w-full max-w-[450px] flex items-center justify-center select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

      <svg
        className="w-72 h-72 text-cyan-500/30 animate-pulse-slow"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 3"
        />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />

        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.25" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.25" />
        <path
          d="M14.6 50 A 35.4 35.4 0 0 1 85.4 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.25"
        />
        <path
          d="M14.6 50 A 35.4 35.4 0 0 0 85.4 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.25"
        />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          stroke="#00e5ff"
          strokeWidth="0.75"
          className="origin-center animate-[spin_8s_linear_infinite]"
        />

        <circle cx="50" cy="20" r="1.5" fill="#f59e0b" className="animate-ping origin-center" />
        <circle cx="50" cy="20" r="1" fill="#f59e0b" />

        <circle cx="75" cy="40" r="1.5" fill="#f59e0b" className="animate-ping origin-center" />
        <circle cx="75" cy="40" r="1" fill="#f59e0b" />

        <circle cx="28" cy="65" r="1.5" fill="#f59e0b" className="animate-ping origin-center" />
        <circle cx="28" cy="65" r="1" fill="#f59e0b" />
      </svg>
    </div>
  );
}
