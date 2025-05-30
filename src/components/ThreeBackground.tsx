import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  quality?: 'low' | 'medium' | 'high';
}

// Detect WebGL support
const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

// Fallback CSS Background component
const CSSFallbackBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 css-background"
      style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 25%, #3949ab 50%, #5c6bc0 75%, #7986cb 100%)',
        opacity: 0.2,
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
};

// Performance monitor helper for adaptive quality
class PerformanceMonitor {
  private frameRates: number[] = [];
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private checkInterval: number = 1000; // Check every 1 second
  private maxSamples: number = 5;
  private thresholdLow: number = 30;
  private thresholdHigh: number = 50;
  private callback: (fps: number, quality: 'low' | 'medium' | 'high') => void;
  private intervalId: number | null = null;

  constructor(callback: (fps: number, quality: 'low' | 'medium' | 'high') => void) {
    this.callback = callback;
    this.lastFrameTime = performance.now();
  }

  start(): void {
    this.intervalId = window.setInterval(() => this.check(), this.checkInterval);
  }

  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  recordFrame(): void {
    const now = performance.now();
    // We just need to update the last frame time and increment count
    this.lastFrameTime = now;
    this.frameCount++;
  }

  private check(): void {
    const fps = this.frameCount * (1000 / this.checkInterval);
    this.frameCount = 0;

    this.frameRates.push(fps);
    if (this.frameRates.length > this.maxSamples) {
      this.frameRates.shift();
    }

    const averageFps = this.frameRates.reduce((sum, rate) => sum + rate, 0) / this.frameRates.length;
    
    let quality: 'low' | 'medium' | 'high' = 'medium';
    if (averageFps < this.thresholdLow) {
      quality = 'low';
    } else if (averageFps > this.thresholdHigh) {
      quality = 'high';
    }

    this.callback(averageFps, quality);
  }
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className, quality: initialQuality = 'medium' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>(initialQuality);
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    particles?: THREE.Points;
    clock?: THREE.Clock;
    performanceMonitor?: PerformanceMonitor;
  }>({});
  
  // Check for WebGL support on mount
  useEffect(() => {
    setIsSupported(isWebGLSupported());
  }, []);
  
  // Clean up function to properly dispose resources
  const cleanupResources = () => {
    const { scene, particles, renderer, performanceMonitor } = sceneRef.current;
    
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (performanceMonitor) {
      performanceMonitor.stop();
    }
    
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('mousemove', handleMouseMove);
    
    if (containerRef.current && renderer && containerRef.current.contains(renderer.domElement)) {
      containerRef.current.removeChild(renderer.domElement);
    }
    
    if (particles && scene) {
      scene.remove(particles);
      if (particles.geometry) particles.geometry.dispose();
      if (particles.material instanceof THREE.Material) particles.material.dispose();
    }
    
    if (renderer) renderer.dispose();
  };
  
  // Quality configuration based on performance level
  const getQualityConfig = (qualityLevel: 'low' | 'medium' | 'high') => {
    const configs = {
      low: {
        particleCount: 500,
        size: 0.08,
        animationSpeed: 0.1,
        antialias: false
      },
      medium: {
        particleCount: 1000,
        size: 0.06,
        animationSpeed: 0.5,
        antialias: true
      },
      high: {
        particleCount: 2000,
        size: 0.05,
        animationSpeed: 1.0,
        antialias: true
      }
    };
    return configs[qualityLevel];
  };
  
  // Mouse movement handler with throttling for performance
  let lastMouseMoveTime = 0;
  const mousePosition = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  const handleMouseMove = (event: MouseEvent) => {
    const now = performance.now();
    // Throttle mouse events to reduce overhead
    if (now - lastMouseMoveTime < 50) return; // 50ms throttle
    
    lastMouseMoveTime = now;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mousePosition.x = (event.clientX - windowHalfX) / 100;
    mousePosition.y = (event.clientY - windowHalfY) / 100;
  };
  
  // Window resize handler
  const handleResize = () => {
    const { renderer, camera } = sceneRef.current;
    if (!containerRef.current || !renderer || !camera) return;
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    camera.updateProjectionMatrix();
  };
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!isSupported || !containerRef.current) return;
    
    // Clean up previous scene if any
    cleanupResources();
    
    const container = containerRef.current;
    const config = getQualityConfig(quality);
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: config.antialias,
      powerPreference: 'low-power' // Request low power mode for better battery life
    });
    
    // Store references for cleanup
    sceneRef.current.scene = scene;
    sceneRef.current.camera = camera;
    sceneRef.current.renderer = renderer;
    sceneRef.current.clock = new THREE.Clock();
    
    // Setup renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1); // Limit pixel ratio for performance
    container.appendChild(renderer.domElement);
    
    // Create particles with performance-based count
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = config.particleCount;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Random positions in a sphere - optimize for performance by using simpler math
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i+1] = (Math.random() - 0.5) * 15;
      posArray[i+2] = (Math.random() - 0.5) * 15;
      
      // Random colors with blue/purple theme
      const hue = Math.random() * 0.1 + 0.6; // 0.6-0.7 range for blue/purple
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
      colorsArray[i] = color.r;
      colorsArray[i+1] = color.g;
      colorsArray[i+2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Material with optimized settings
    const particlesMaterial = new THREE.PointsMaterial({
      size: config.size,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false // Performance improvement by disabling depth writing
    });
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    sceneRef.current.particles = particlesMesh;
    
    // Camera position
    camera.position.z = 5;
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Performance monitoring for adaptive quality
    const performanceMonitor = new PerformanceMonitor((fps, recommendedQuality) => {
      // Only change quality if significantly different to avoid thrashing
      if (quality !== recommendedQuality) {
        console.log(`Adaptive quality: ${quality} -> ${recommendedQuality} (${fps.toFixed(1)} FPS)`);
        setQuality(recommendedQuality);
      }
    });
    
    sceneRef.current.performanceMonitor = performanceMonitor;
    performanceMonitor.start();
    
    // Animation loop with performance optimizations
    const animate = () => {
      performanceMonitor.recordFrame();
      
      animationRef.current = requestAnimationFrame(animate);
      
      const clock = sceneRef.current.clock as THREE.Clock;
      const particles = sceneRef.current.particles as THREE.Points;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth following with damping based on quality setting
      const damping = config.animationSpeed * 0.01;
      mousePosition.targetX = mousePosition.x * 0.3;
      mousePosition.targetY = mousePosition.y * 0.3;
      
      // Apply subtle movement even without mouse interaction
      particles.rotation.x += 0.0003 * config.animationSpeed;
      particles.rotation.y += 0.0005 * config.animationSpeed;
      
      // Add subtle wave motion with reduced complexity for lower quality
      if (quality !== 'low') {
        particles.position.y = Math.sin(elapsedTime * 0.2) * 0.1;
      }
      
      // Mouse-based rotation with optimized calculations
      particles.rotation.y += damping * (mousePosition.targetX - particles.rotation.y);
      particles.rotation.x += damping * (mousePosition.targetY - particles.rotation.x);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup on unmount
    return cleanupResources;
  }, [isSupported, quality]);
  
  // Render WebGL background or fallback
  if (isSupported === false) {
    return <CSSFallbackBackground />;
  }
  
  return (
    <div 
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className || ''}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default ThreeBackground;
