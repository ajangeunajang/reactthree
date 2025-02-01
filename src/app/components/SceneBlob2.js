"use client";
import { Canvas } from "@react-three/fiber";
import Blob2 from "./Blob2";
import { Environment } from "@react-three/drei";

export default function SceneBlob2() {
  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 8] }} style={{ background: "#ff00ff" }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={4} position={[5, 5, 5]} />
        <Environment preset="studio" />
        <Blob2 />
      </Canvas>
    </div>
  );
}
