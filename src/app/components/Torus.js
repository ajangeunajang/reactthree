import React, { useRef, useState, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import {
  Sphere,
  MeshTransmissionMaterial,
  useGLTF,
  Text,
  Image,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import Typo from "./typo";

export default function RotatingTorus() {
  const { nodes } = useGLTF("/models/torrus.glb");
  // const { nodes } = useGLTF("/models/sphere.glb");

  const { viewport } = useThree();
  const torus = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (torus.current) {
      torus.current.rotation.x += 0.03;
      torus.current.position.y = scrollY * 0.5; // 변경된 scrollY 반영
    }
  });

  // const texture = new THREE.TextureLoader().load("/img/homeType1.svg");

  const materialProps = useControls({
    thickness: { value: 0.15, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    backside: { value: false },
  });

  // console.log(nodes);

  return (
    <group scale={viewport.width / 2.5}>
     <Typo />

      <mesh ref={torus} {...nodes.Torus002}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      >
        {/* <mesh ref={torus} {...nodes.mesh_id29}> */}
        <MeshTransmissionMaterial {...materialProps} envMapIntensity={0} />
      </mesh>

      {/* <Sphere args={[2, 16, 16]}>
        <MeshTransmissionMaterial {...materialProps} />
      </Sphere> */}
    </group>
  );
}
