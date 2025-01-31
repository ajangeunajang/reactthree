"use client";
import { Canvas } from "@react-three/fiber";
import Blob from "./Blob";

export default function SceneBlob() {
  return (
    <div className="relative w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 8] }}
        style={{ background: "#000" }}
      >
        <Blob />
      </Canvas>
    </div>
  );
}
