# Harsh Srivastava - Portfolio

A modern, high-performance portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. This project features a unique frame-by-frame scroll animation, 3D particle effects, and a sleek "Pure Black & Orange" aesthetic.

![Portfolio Preview](/public/me-sequence/frame_000_delay-0.04s.webp) 
*(Note: Replace with a real screenshot if available)*

## 🚀 Features

- **Frame-by-Frame Hero Animation**: Interactive scroll-based animation using HTML5 Canvas and 192 webp frames.
- **3D Particle Loading Screen**: Custom particle simulation using HTML5 Canvas for a futuristic entry.
- **Parallax Effects**: Non-obstructive text overlays that move at different speeds for depth.
- **Interactive Sections**:
  - **About**: Staggered animations for skills and bio.
  - **Projects**: Dynamic project cards parsed from JSON data.
- **Smooth Scrolling**: Integrated with `Lenis` for premium scroll inertia.
- **Responsive Design**: Fully optimized for mobile and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harshsrivastava05/p-folio.git
   cd p-folio/portfolio-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── app/              # App Router pages and global styles
├── components/       # UI Components (HeroSequence, LoadingScreen, etc.)
├── data/             # Portfolio data (projects, skills, etc.)
├── types/            # TypeScript interfaces
└── ...
public/
└── me-sequence/      # Frame-by-frame animation assets
```

## 📬 Contact

- **Email**: [harshsrivastava8704@gmail.com](mailto:harshsrivastava8704@gmail.com)
- **GitHub**: [harshsrivastava05](https://github.com/harshsrivastava05)
- **LinkedIn**: [Harsh Srivastava](https://www.linkedin.com/in/harsh-srivastava-a4ab8a273/)
