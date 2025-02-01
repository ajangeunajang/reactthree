import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";
import { MathUtils } from "three";
import { useControls } from "leva";
import vertexShader from "../blob/vertexshader";
import Typo from "./typo";

export default function Blob2() {
  const mesh = useRef();
  const hover = useRef(false);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    };
  });

  const materialProps = useControls({
    thickness: { value: 0.15, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.3, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.1, min: 0, max: 1 },
    backside: { value: false },
  });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.setScalar(
        MathUtils.lerp(mesh.current.scale.x, hover.current ? 1.6 : 1.5, 0.05)
      );
    }
  });

  return (
    <group>
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="left"
        anchorY="middle"
      >
        CONVERGENCE
      </Text>
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
        <MeshTransmissionMaterial
          {...materialProps}
          envMapIntensity={1}
          onBeforeCompile={(shader) => {
            shader.uniforms.uTime = { value: 0 };

            shader.vertexShader = `
            uniform float uTime;
            ${shader.vertexShader}
          `.replace(
              "#include <begin_vertex>",
              `
            vec3 transformed = position;
            transformed.x += sin(uTime + position.y) * 0.1;
            transformed.y += cos(uTime + position.x) * 0.1;
            `
            );

          //   shader.fragmentShader = `
          //   uniform float uTime;
          //   ${shader.fragmentShader}
          // `.replace(
          //     "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
          //     `
          //   gl_FragColor = vec4( outgoingLight, diffuseColor.a );
          //   gl_FragColor.rgb += 0.1 * sin(uTime);
          //   `
          //   );
          }}
        />
        {/* <shaderMaterial
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
      <MeshTransmissionMaterial {...materialProps} envMapIntensity={0} /> */}
      </mesh>
    </group>
  );
}
