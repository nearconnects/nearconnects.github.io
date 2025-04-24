
// Initialize Three.js scenes for each chart
gsap.registerPlugin(ScrollTrigger);

class Chart3D {
    constructor(containerId, color) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.color = color;
        this.init();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        // Create geometry
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 100,
            opacity: 0.9,
            transparent: true
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Add lights
        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(0, 1, 1);
        this.scene.add(light1);

        const light2 = new THREE.AmbientLight(0x404040);
        this.scene.add(light2);

        // Animation
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}

// Create charts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const charts = {
        emissionsChart: new Chart3D('emissionsChart', 0x00ff00),
        kilometersChart: new Chart3D('kilometersChart', 0x0088ff),
        revenueChart: new Chart3D('revenueChart', 0xff8800)
    };

    // Animate numbers
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = new Intl.NumberFormat().format(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Trigger animations on scroll
    document.querySelectorAll('.metric-value').forEach(valueEl => {
        const targetValue = parseInt(valueEl.dataset.value);
        
        ScrollTrigger.create({
            trigger: valueEl,
            start: "top 80%",
            onEnter: () => animateValue(valueEl, 0, targetValue, 2000)
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        Object.values(charts).forEach(chart => {
            chart.camera.aspect = chart.container.clientWidth / chart.container.clientHeight;
            chart.camera.updateProjectionMatrix();
            chart.renderer.setSize(chart.container.clientWidth, chart.container.clientHeight);
        });
    });
});
