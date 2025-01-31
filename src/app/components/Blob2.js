import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { MathUtils } from "three";
import { useControls } from "leva";

export default function Blob2() {
  const mesh = useRef();
  const hover = useRef(false);

  const materialProps = useControls({
    thickness: { value: 0, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.4, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 }, // 투명도
    ior: { value: 0.5, min: 0, max: 3, step: 0.1 }, // 굴절률
    chromaticAberration: { value: 1, min: 0, max: 1 }, // 색 수차 효과
    backside: { value: true }, // 뒷면 렌더링 여부
  });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.setScalar(
        MathUtils.lerp(mesh.current.scale.x, hover.current ? 1.6 : 1.5, 0.05)
      );
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={[0, 0, 0]}
      onPointerOver={() => {
        hover.current = true;
      }}
      onPointerOut={() => {
        hover.current = false;
      }}
    >
      <icosahedronGeometry args={[2, 20]} />
      <MeshTransmissionMaterial {...materialProps} envMapIntensity={0} />
    </mesh>
  );
}
