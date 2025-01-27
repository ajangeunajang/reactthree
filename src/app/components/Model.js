import React, { useRef } from "react";
import {
  Sphere,
  MeshTransmissionMaterial,
  useGLTF,
  Text,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function RotatingSphere() {
  const { nodes } = useGLTF("/models/torrus.glb");
  const { viewport } = useThree();
  const torus = useRef(null);

  useFrame(() => {
    torus.current.rotation.x += 0.02; // 매 프레임마다 회전
    // torus.current.rotation.y += 0.02;
  });

  const materialProps = useControls({
        thickness: { value: 0.95, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
        transmission: { value: 1, min: 0, max: 1, step: 0.1 },
        ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1 },
        backside: { value: true },
      });

//   const materialProps = useControls({
//     thickness: { value: 3, min: 0, max: 3, step: 0.05 },
//     roughness: { value: 0, min: 0, max: 1, step: 0.1 },
//     transmission: { value: 1, min: 0, max: 1, step: 0.1 },
//     ior: { value: 0.9, min: 0, max: 3, step: 0.1 },
//     chromaticAberration: { value: 0.02, min: 0, max: 1 },
//     backside: { value: true },
//   });

//   console.log(nodes)

  return (
    <group scale={viewport.width / 3}>
      <Text
        position={[0, 0, -0.3]}
        fontSize={0.375}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        QRST LAB
      </Text>

      <mesh ref={torus} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps} envMapIntensity={0}/>
      </mesh>
      {/* <Sphere args={[2, 16, 16]}>
        <MeshTransmissionMaterial {...materialProps} />
      </Sphere> */}
    </group>
  );
}
