// Three.js Scene untuk Visualisasi Healing
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('threejs-container');
    if (!container) return;
    
    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Geometri untuk simbol healing
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x48cae4,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    
    const mainSphere = new THREE.Mesh(geometry, material);
    scene.add(mainSphere);
    
    // Partikel kecil di sekitar sphere utama
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xe9c46a });
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Posisi acak dalam bentuk sphere
        const radius = 2 + Math.random() * 1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        particles.push({
            mesh: particle,
            originalX: particle.position.x,
            originalY: particle.position.y,
            originalZ: particle.position.z,
            speed: 0.5 + Math.random() * 0.5
        });
        
        scene.add(particle);
    }
    
    // Posisi kamera
    camera.position.z = 5;
    
    // Animasi
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotasi sphere utama
        mainSphere.rotation.x += 0.005;
        mainSphere.rotation.y += 0.008;
        
        // Animasi partikel
        const time = Date.now() * 0.001;
        
        particles.forEach(particle => {
            particle.mesh.position.x = particle.originalX + Math.sin(time * particle.speed) * 0.2;
            particle.mesh.position.y = particle.originalY + Math.cos(time * particle.speed * 1.3) * 0.2;
            particle.mesh.position.z = particle.originalZ + Math.sin(time * particle.speed * 0.7) * 0.2;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});