'use client';

import { motion } from 'framer-motion';
import { PortfolioData } from '@/types/portfolio';

export default function About({ data }: { data: PortfolioData }) {
    if (!data) return null;

    const { about, skills, education } = data;

    return (
        <section id="about" className="relative py-20 bg-black text-white min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">About Me</h2>

                    <p className="text-xl md:text-2xl leading-relaxed text-white/80 mb-12">
                        {about.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 border-b border-primary/30 pb-2">Education</h3>
                            <p className="text-lg font-medium">{education.college.degree} in {education.college.field}</p>
                            <p className="text-white/60">{education.college.name}</p>
                            <p className="text-primary mt-2">{education.currentStatus}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 border-b border-primary/30 pb-2">Traits</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {about.keyTraits.map((trait) => (
                                    <li key={trait} className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-primary rounded-full" />
                                        <span>{trait}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div id="skills">
                        <h3 className="text-3xl font-bold mb-8">Technical Arsenal</h3>
                        <div className="space-y-8">
                            {Object.entries(skills).map(([category, items]) => (
                                <div key={category}>
                                    <h4 className="text-xl capitalize text-primary mb-3">{category}</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {items?.map((skill) => (
                                            <motion.span
                                                key={skill}
                                                whileHover={{ scale: 1.05, backgroundColor: "#FF4D00", color: "#000" }}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium transition-colors cursor-default"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
