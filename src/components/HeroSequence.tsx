'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 192;
const IMAGES_PATH = '/me-sequence';

export default function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isImagesLoaded, setIsImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                // Construct filename matching the provided format: frame_XXX_delay-0.04s.webp
                const indexStr = i.toString().padStart(3, '0');
                // Note: The filename suffix might vary if the user didn't rename them consistently, 
                // but based on the file list, they seem to follow "frame_XXX_delay-0.04s.webp".
                // However, I should probably check if all have the same delay. 
                // For robustness, I'll assume they do or try to find a pattern.
                // Given the file list dump, they all seem to have "delay-0.04s".
                const src = `${IMAGES_PATH}/frame_${indexStr}_delay-0.04s.webp`;

                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        // Resolve anyway to avoid blocking
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setIsImagesLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!isImagesLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions based on the first image or window
        const firstImg = images[0];
        if (firstImg) {
            // Maintain aspect ratio but cover the screen
            const setSize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            setSize();
            window.addEventListener('resize', setSize);
            return () => window.removeEventListener('resize', setSize);
        }

    }, [isImagesLoaded, images]);


    useEffect(() => {
        // Render loop handled by scroll change
        const unsubscribe = frameIndex.on("change", (latest) => {
            if (!canvasRef.current || !isImagesLoaded) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            const idx = Math.floor(latest);
            const img = images[idx];
            if (img) {
                // Draw image to cover
                const canvas = canvasRef.current;
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        });

        // Initial draw
        if (isImagesLoaded && canvasRef.current && images[0]) {
            // Trigger a manual render for frame 0
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const img = images[0];
                const canvas = canvasRef.current;
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;
                ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            }
        }

        return () => unsubscribe();
    }, [frameIndex, isImagesLoaded, images]);


    return (
        <div ref={containerRef} className="h-[400vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* Parallax Overlay Content */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none"
                >
                    <div className="container mx-auto h-full px-6 grid grid-cols-12 relative">

                        {/* Left Side Info - Fades in/out based on scroll */}
                        <motion.div
                            className="col-span-12 md:col-span-3 h-full flex flex-col justify-center space-y-8"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 1, 0]),
                                y: useTransform(scrollYProgress, [0.1, 0.7], [100, -100])
                            }}
                        >
                            <div className="bg-black/30 backdrop-blur-sm p-4 border-l-2 border-primary">
                                <h3 className="text-primary font-bold text-xl mb-2">Full Stack Engineer</h3>
                                <p className="text-white/80 text-sm">Building scalable backends and agentic AI systems.</p>
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm p-4 border-l-2 border-primary">
                                <h3 className="text-primary font-bold text-xl mb-2">Tech Enthusiast</h3>
                                <p className="text-white/80 text-sm">Passionate about RAG, Distributed Systems, and Microservices.</p>
                            </div>
                        </motion.div>

                        {/* Center - Keeps clear for Image */}
                        <div className="col-span-12 md:col-span-6"></div>

                        {/* Right Side Info */}
                        <motion.div
                            className="col-span-12 md:col-span-3 h-full flex flex-col justify-center items-end space-y-8 text-right"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]),
                                y: useTransform(scrollYProgress, [0.2, 0.8], [50, -50])
                            }}
                        >
                            <div className="bg-black/30 backdrop-blur-sm p-4 border-r-2 border-primary">
                                <h3 className="text-primary font-bold text-xl mb-2">Problem Solver</h3>
                                <p className="text-white/80 text-sm">Driven by complex challenges and clean architecture.</p>
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm p-4 border-r-2 border-primary">
                                <h3 className="text-primary font-bold text-xl mb-2">Based in India</h3>
                                <p className="text-white/80 text-sm">Open for remote opportunities globally.</p>
                            </div>
                        </motion.div>

                        {/* Main Title - Fades out quickly */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center -z-10"
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                                scale: useTransform(scrollYProgress, [0, 0.15], [1, 1.2])
                            }}
                        >
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-overlay text-center">
                                HARSH<br />SRIVASTAVA
                            </h1>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
