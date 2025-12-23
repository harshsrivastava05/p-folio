'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Determine loading time
        const timer = setTimeout(() => {
            setIsLoaded(true);
            setTimeout(onComplete, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const PRIMARY_COLOR = '#FF4D00';
        const PARTICLE_COUNT = 150;

        class Particle {
            x: number;
            y: number;
            z: number;
            radius: number;
            color: string;
            vx: number;
            vy: number;
            vz: number;

            constructor() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * width;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.8 ? '#FFFFFF' : PRIMARY_COLOR;

                // Velocity
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.vz = (Math.random() - 0.5) * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                // Boundary reflection/reset to keep interesting
                if (this.z < -width) this.z = width;
                if (this.z > width) this.z = -width;
            }

            draw(ctx: CanvasRenderingContext2D) {
                // Perspective projection
                const fov = 300;
                const scale = fov / (fov + this.z);

                if (scale < 0) return; // Behind camera

                const x2d = (this.x * scale) + width / 2;
                const y2d = (this.y * scale) + height / 2;

                ctx.beginPath();
                ctx.arc(x2d, y2d, this.radius * scale, 0, Math.PI * 2);
                ctx.fillStyle = this.color;

                // Scale opacity by distance
                ctx.globalAlpha = Math.min(1, scale);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const init = () => {
            canvas.width = width;
            canvas.height = height;
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Sorting helps depth perception (painters algorithm)
            particles.sort((a, b) => b.z - a.z);

            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            // Add a central glow
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 200);
            gradient.addColorStop(0, 'rgba(255, 77, 0, 0.1)'); // Primary color low opacity
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        window.addEventListener('resize', handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={isLoaded ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="relative z-10 text-white font-bold text-2xl tracking-[0.5em] uppercase"
            >
                Loading
            </motion.h1>
        </motion.div>
    );
}
