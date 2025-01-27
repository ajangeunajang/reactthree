"use client";
import RotatingSphere from "./Model";
import { Canvas, useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Environment, Lightformer } from "@react-three/drei";

export default function Scene() {
//   const hdrTexture = useLoader(RGBELoader, "/hdr/photo_studio_01_1k.hdr");
//   useEnvironment(hdrTexture); // Apply the HDR texture to the environment

  return (
    <Canvas style={{ background: "#000000" }}>
      {/* <ambientLight intensity={0.1} />
      <directionalLight intensity={3} position={[0, 3, 2]} /> */}
      {/* <Text fontSize={0.8} position={[0, 3, -1]}>Hello World</Text> */}
      <ambientLight intensity={0.5} />
      <directionalLight intensity={3} position={[0, 2, 3]} />
      <Environment preset="studio" />
      {/* <Environment background={hdrTexture} /> */}
      <RotatingSphere />
    </Canvas>
  );
}
