// Initialize Three.js scenes for each chart
gsap.registerPlugin(ScrollTrigger);

class Chart3D {
    constructor(containerId, color) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000,
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.color = color;
        this.init();
    }

    init() {
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight,
        );
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        // Create geometry
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 100,
            opacity: 0.9,
            transparent: true,
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
class TextChart3D {
    constructor(containerId, textureUrl, text) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000,
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.textureUrl = textureUrl;
        this.text = text;
        this.init();
    }

    init() {
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight,
        );
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 8;

        const loader = new THREE.FontLoader();
        loader.load(
            "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
            (font) => {
                const geometry = new THREE.TextGeometry(this.text, {
                    font: font,
                    size: 1.6,
                    height: 0.5,
                    bevelEnabled: true,
                    bevelThickness: 0.06,
                    bevelSize: 0.06,
                    bevelSegments: 4,
                });

                geometry.computeBoundingBox();
                geometry.center(); // ← This centers on both X and Y

                const textureLoader = new THREE.TextureLoader();
                const material = new THREE.MeshStandardMaterial({
                    map: textureLoader.load(this.textureUrl),
                });

                this.mesh = new THREE.Mesh(geometry, material);
                this.scene.add(this.mesh);

                const light1 = new THREE.DirectionalLight(0xffffff, 1);
                light1.position.set(0, 2, 5).normalize();
                this.scene.add(light1);

                const light2 = new THREE.AmbientLight(0x404040);
                this.scene.add(light2);

                this.animate();
            },
        );
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.mesh) {
            this.mesh.rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
    }
}

class GlobeChart3D {
    constructor(containerId, textureUrl) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000,
        );
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.textureUrl = textureUrl;
        this.mesh = null;
        this.fogPlane = null;
        this.init();
    }

    init() {
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight,
        );
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        const geometry = new THREE.SphereGeometry(1.5, 64, 64);
        const textureLoader = new THREE.TextureLoader();

        textureLoader.load(this.textureUrl, (texture) => {
            const material = new THREE.MeshPhongMaterial({
                map: texture,
                shininess: 50,
            });

            this.mesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.mesh);

            // 🌫️ Add semi-transparent fog overlay on polluted side
            const fogTexture = textureLoader.load("assets/smoke-fog.png"); // <- make sure you have a soft gray fog image
            const fogMaterial = new THREE.MeshBasicMaterial({
                map: fogTexture,
                transparent: true,
                opacity: 0.6,
                depthWrite: false,
                side: THREE.DoubleSide,
            });
            const fogGeo = new THREE.PlaneGeometry(3, 3);
            this.fogPlane = new THREE.Mesh(fogGeo, fogMaterial);
            this.fogPlane.position.set(0, 0, 1.5); // sits in front of the globe
            this.scene.add(this.fogPlane);

            // ✨ Add glow ring
            const glowGeometry = new THREE.SphereGeometry(1.58, 64, 64);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x00aaff,
                transparent: true,
                opacity: 0.2,
                side: THREE.BackSide,
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            this.scene.add(glow);

            // Lighting
            const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
            light1.position.set(2, 2, 2);
            this.scene.add(light1);

            const light2 = new THREE.AmbientLight(0x666666);
            this.scene.add(light2);

            this.animate();
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mesh) {
            this.mesh.rotation.y += 0.005;

            // 🌫️ Fade fog based on rotation
            const rotation = this.mesh.rotation.y % (Math.PI * 2);
            const normalized = Math.abs(Math.sin(rotation)); // 0 (center front) to 1 (side view)
            if (this.fogPlane)
                this.fogPlane.material.opacity = 0.6 * normalized;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Create charts when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const charts = {
        emissionsChart: new GlobeChart3D(
            "emissionsChart",
            "assets/globe-texture.jpg",
        ),

        kilometersChart: new Chart3D("kilometersChart", 0x0088ff),
        revenueChart: new Chart3D("revenueChart", 0xff8800),
    };

    // Animate numbers
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1,
            );
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = new Intl.NumberFormat().format(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Trigger animations on scroll
    document.querySelectorAll(".metric-value").forEach((valueEl) => {
        const targetValue = parseInt(valueEl.dataset.value);

        ScrollTrigger.create({
            trigger: valueEl,
            start: "top 80%",
            onEnter: () => animateValue(valueEl, 0, targetValue, 2000),
        });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        Object.values(charts).forEach((chart) => {
            chart.camera.aspect =
                chart.container.clientWidth / chart.container.clientHeight;
            chart.camera.updateProjectionMatrix();
            chart.renderer.setSize(
                chart.container.clientWidth,
                chart.container.clientHeight,
            );
        });
    });
});
