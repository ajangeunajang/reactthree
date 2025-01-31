import { Text } from "@react-three/drei";

export default function Typo() {
  return (
    <group>
      <Text
        position={[-1.4, 0.4, -0.3]}
        fontSize={0.375}
        color="white"
        anchorX="left"
        anchorY="middle"
      >
        DESIGN
      </Text>
      <Text
        position={[-1.4, 0, -0.3]}
        fontSize={0.375}
        color="white"
        anchorX="left"
        anchorY="middle"
      >
        CONVERGENCE
      </Text>
      <Text
        position={[1.4, -0.4, -0.3]}
        fontSize={0.375}
        color="white"
        anchorX="right"
        anchorY="middle"
      >
        COLLECTIVE
      </Text>
      <Text
        position={[1.4, -0.8, -0.3]}
        fontSize={0.375}
        color="white"
        anchorX="right"
        anchorY="middle"
      >
        QRST
      </Text>
    </group>
  );
}
