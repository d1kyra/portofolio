import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Light mode: Fresh Emerald Green & Ocean Cyan/Blue | Dark mode: Indigo
        if (isLight) {
          ctx.fillStyle = idx % 2 === 0
            ? `rgba(16, 185, 129, ${p.opacity})`
            : `rgba(6, 182, 212, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Dynamic Ambient Glowing Orbs: Light Mode uses Green & Blue (Emerald & Cyan), Dark Mode uses Indigo/Purple */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/25 dark:bg-indigo-600/15 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-400/25 dark:bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="w-full h-full opacity-60 dark:opacity-60" />
    </div>
  );
};

export default AnimatedBackground;
