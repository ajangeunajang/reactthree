import { useMemo, useRef } from "react";
import vertexShader from "../blob/vertexshader";
import fragmentShader from "../blob/fragmentshader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export default function Blob() {
  const mesh = useRef();
  const hover = useRef(false);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    };
  });

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.4 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        hover.current ? 0.05 : 0.1,
        0.05
      );
    }
  });
  return (
    <mesh
      ref={mesh}
      scale={1.5}
      position={(0, 0, 0)}
      onPointerOver={() => {hover.current = true;}}
      onPointerOut={()=>{hover.current = false;}}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
