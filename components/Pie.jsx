import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';

const PieChart = ({ data, width, height }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const containerRef = useRef(null);

  renderer.setSize(width, height);

  // Create the pie chart geometry
  const total = data.reduce((acc, slice) => acc + slice.value, 0);
  const geometry = new THREE.CylinderGeometry(1, 1, 0.5, 24, 1, true);

  // Create materials for each slice
  const materials = data.map((slice) => {
    const material = new THREE.MeshBasicMaterial({ color: slice.color });
    const angle = (slice.value / total) * 2 * Math.PI;
    material.rotation.y = angle / 2;
    return material;
  });

  // Create the pie chart mesh
  const pie = new THREE.Mesh(geometry, materials);
  scene.add(pie);

  const animate = () => {
    requestAnimationFrame(animate);
    pie.rotation.y += 0.01;
    renderer.render(scene, camera, containerRef.current);
  };

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <div ref={containerRef} style={{ width, height }}>
      {renderer.domElement}
    </div>
  );
};

export default PieChart;