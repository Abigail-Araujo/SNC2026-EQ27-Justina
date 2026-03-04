import { Suspense, useRef, useState as useReactState, Component, type ReactNode, useLayoutEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

// --- ACTIVOS ---
import surgicalKidney from "../../assets/surgical/surgical-kidney.jpg";
import surgicalLiver from "../../assets/surgical/surgical-liver.jpg";
import surgicalGastric from "../../assets/surgical/surgical-gastric.png";
import surgicalColon from "../../assets/surgical/surgical-colon.png";
import surgicalEsophagectomy from "../../assets/surgical/surgical-esophagectomy.png";

const modelPaths: Record<string, string> = {
  "kidney-uturing": "/models/kidney.glb",
  "liver-resection": "/models/liver.glb",
  "gastric-bypass": "/models/digestive-sistem.glb", 
  "esophagectomy": "/models/esophagus.glb",
};

const fallbackImages: Record<string, string> = {
  "kidney-uturing": surgicalKidney,
  "liver-resection": surgicalLiver,
  "gastric-bypass": surgicalGastric,
  "colon-anastomosis": surgicalColon,
  "esophagectomy": surgicalEsophagectomy,
};

// --- MODELO 3D INTERNO ---
interface OrganModelProps {
  organ: string;
  zoom: number;
  panRef: React.MutableRefObject<{ x: number; y: number }>;
}

function OrganModel({ organ, zoom, panRef }: OrganModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const path = modelPaths[organ] || modelPaths["liver-resection"];
  const { scene } = useGLTF(path);

  useLayoutEffect(() => {
    if (scene) {
      scene.scale.set(1, 1, 1);
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const scale = 4 / maxDim;
        scene.scale.set(scale, scale, scale);
      }
    }
  }, [scene, organ]);

  useFrame(() => {
    // CORRECCIÓN: Verificación de seguridad para evitar errores si el ref aún no está montado
    if (!groupRef.current || !scene) return;

    // 1. Zoom: Mapeamos el zoom del slider (0-100) a escala física (0.5 a 2.5)
    const targetScale = 0.5 + (zoom / 100) * 2;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // 2. Paneo: Convertimos los píxeles del panRef a unidades 3D
    const targetX = panRef.current.x * 0.01;
    const targetY = -panRef.current.y * 0.01;
    groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, 0), 0.1);
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

// --- FALLBACK 2D ---
interface FallbackImageProps {
  organ: string;
  zoom: number;
  panRef: React.MutableRefObject<{ x: number; y: number }>;
}

function FallbackImage({ organ, zoom, panRef }: FallbackImageProps) {
  const src = fallbackImages[organ] || fallbackImages["liver-resection"];
  
  // CORRECCIÓN: Ref para manipular el DOM directamente sin disparar re-renders
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    let animationFrameId: number;

    const updateTransform = () => {
      if (imgRef.current) {
        // Leemos el ref de manera segura FUERA del render loop principal de React
        const currentPan = panRef.current;
        imgRef.current.style.transform = `translate(${currentPan.x}px, ${currentPan.y}px) scale(${1 + zoom / 100})`;
      }
      animationFrameId = requestAnimationFrame(updateTransform);
    };

    updateTransform();

    return () => cancelAnimationFrame(animationFrameId);
  }, [zoom, panRef]);

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center bg-zinc-950">
      <img
        ref={imgRef}
        src={src}
        alt={`Vista quirúrgica - ${organ}`}
        className="transition-transform duration-75 ease-out object-contain max-h-full"
        draggable={false}
      />
    </div>
  );
}

// --- UTILIDADES ---
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#2a9d8f" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

// --- COMPONENTE EXPORTADO ---
interface OrganViewer3DProps {
  organ: string;
  zoom: number;
  setZoom: (zoom: number[] | ((prev: number[]) => number[])) => void;
  panRef: React.MutableRefObject<{ x: number; y: number }>;
}

export function OrganViewer3D({ organ, zoom, setZoom, panRef }: OrganViewer3DProps) {
  const [webgl] = useReactState(() => supportsWebGL());
  const [hardwareError, setHardwareError] = useReactState(false);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    const speed = 2;

    setZoom((prev) => {
      const nextZoom = prev[0] + direction * speed;
      return [Math.min(Math.max(nextZoom, 0), 100)];
    });
  }, [setZoom]);

  useLayoutEffect(() => {
    const handlePromiseError = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("WebGL")) setHardwareError(true);
    };
    window.addEventListener("unhandledrejection", handlePromiseError);
    return () => window.removeEventListener("unhandledrejection", handlePromiseError);
  }, []);

  const renderFallback = <FallbackImage organ={organ} zoom={zoom} panRef={panRef} />;

  if (!webgl || hardwareError) {
    return (
      <div className="w-full h-full" onWheel={handleWheel}>
        {renderFallback}
      </div>
    );
  }

  return (
    <WebGLErrorBoundary fallback={renderFallback}>
      <div 
        className="w-full h-full relative select-none" 
        onContextMenu={(e) => e.preventDefault()}
        onWheel={handleWheel}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="studio" />

          <Suspense fallback={<LoadingFallback />}>
            <OrganModel organ={organ} zoom={zoom} panRef={panRef} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            dampingFactor={0.05}
            enableDamping
            mouseButtons={{
              RIGHT: THREE.MOUSE.ROTATE,
            }}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

Object.values(modelPaths).forEach((path) => useGLTF.preload(path));