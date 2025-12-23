'use client';

import { motion } from 'framer-motion';
import { PortfolioData, Project } from '@/types/portfolio';
import { Github, ExternalLink } from 'lucide-react';

export default function Projects({ data }: { data: PortfolioData }) {
    if (!data) return null;

    return (
        <section id="projects" className="py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-primary"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {data.projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative bg-white/5 border border-white/10 overflow-hidden hover:border-primary/50 transition-colors p-6 rounded-xl flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                    <span className="text-sm text-white/50">{project.type}</span>
                </div>
                <div className="flex space-x-3">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    )}
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-white/70 mb-6 flex-grow">{project.description}</p>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded text-white/80">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-white/10 rounded text-white/80">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* Absolute accent */}
            <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full transition-all duration-300 bg-primary" />
        </motion.div>
    );
}
