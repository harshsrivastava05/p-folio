'use client';

import { Github, Linkedin, Mail, Code } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white/50 py-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

                    <div className="text-center md:text-left">
                        <h3 className="text-white font-bold text-xl mb-2">Harsh Srivastava</h3>
                        <p className="text-sm">harshsrivastava8704@gmail.com</p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a
                            href="https://github.com/harshsrivastava05"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors transform hover:scale-110"
                        >
                            <Github size={24} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/harsh-srivastava-a4ab8a273/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors transform hover:scale-110"
                        >
                            <Linkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                            href="https://leetcode.com/u/harshsrivastava05/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors transform hover:scale-110"
                        >
                            <Code size={24} />
                            <span className="sr-only">LeetCode</span>
                        </a>
                        <a
                            href="mailto:harshsrivastava8704@gmail.com"
                            className="hover:text-primary transition-colors transform hover:scale-110"
                        >
                            <Mail size={24} />
                            <span className="sr-only">Email</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs border-t border-white/5 pt-8">
                    <p>&copy; {new Date().getFullYear()} Harsh Srivastava. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
