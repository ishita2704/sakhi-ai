import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  isSpeaking: boolean;
  message?: string;
}

// 3D Avatar Mesh Component
const AvatarMesh = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  
  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    // Blinking animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blinkTime = Math.sin(state.clock.elapsedTime * 3) > 0.95;
      const eyeScale = blinkTime ? 0.1 : 1;
      leftEyeRef.current.scale.y = eyeScale;
      rightEyeRef.current.scale.y = eyeScale;
    }

    // Mouth animation when speaking
    if (mouthRef.current && isSpeaking) {
      const talkScale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.3;
      mouthRef.current.scale.setScalar(talkScale);
    } else if (mouthRef.current) {
      mouthRef.current.scale.setScalar(1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      
      {/* Eyes */}
      <Sphere ref={leftEyeRef} args={[0.1, 16, 16]} position={[-0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#2c3e50" />
      </Sphere>
      <Sphere ref={rightEyeRef} args={[0.1, 16, 16]} position={[0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#2c3e50" />
      </Sphere>
      
      {/* Mouth */}
      <Sphere ref={mouthRef} args={[0.15, 16, 16]} position={[0, -0.2, 0.8]}>
        <meshStandardMaterial color="#e74c3c" />
      </Sphere>
      
      {/* Hair */}
      <Sphere args={[1.1, 32, 32]} position={[0, 0.3, -0.2]}>
        <meshStandardMaterial color="#8b4513" />
      </Sphere>
      
      {/* Body */}
      <Box args={[1.5, 2, 0.8]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#e91e63" />
      </Box>
      
      {/* Speaking indicator */}
      {isSpeaking && (
        <group position={[1.5, 0.5, 0]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial color="#4caf50" emissive="#4caf50" emissiveIntensity={0.5} />
          </Sphere>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.2}
            color="#4caf50"
            anchorX="center"
            anchorY="middle"
          >
            Speaking...
          </Text>
        </group>
      )}
    </group>
  );
};

// Speech Bubble Component
const SpeechBubble = ({ message, position }: { message: string; position: [number, number, number] }) => {
  if (!message) return null;
  
  return (
    <group position={position}>
      {/* Bubble background */}
      <Box args={[3, 1.5, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </Box>
      
      {/* Text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.15}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {message.slice(0, 100)}...
      </Text>
    </group>
  );
};

// Main 3D Avatar Component
const Avatar3D = ({ isSpeaking, message }: Avatar3DProps) => {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={0.8} />
        
        {/* 3D Avatar */}
        <AvatarMesh isSpeaking={isSpeaking} />
        
        {/* Speech Bubble */}
        {isSpeaking && message && (
          <SpeechBubble message={message} position={[0, 2, 0]} />
        )}
        
        {/* Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={8}
          minDistance={3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-2 rounded-lg">
        <h3 className="font-semibold">सखी AI | Sakhi AI</h3>
        <p className="text-xs opacity-75">Click and drag to rotate • Scroll to zoom</p>
      </div>
      
      {isSpeaking && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse shadow-lg">
          🎤 Sakhi AI Speaking...
        </div>
      )}
    </div>
  );
};

export default Avatar3D;
