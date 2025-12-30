"use client";

import * as React from "react";

export function BlueprintGrid() {
  const [opacity, setOpacity] = React.useState(0.08);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isOverText, setIsOverText] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeStartPoint = 100;
      const fadeEndPoint = 400;

      if (scrollPosition <= fadeStartPoint) {
        setOpacity(0.08);
      } else if (scrollPosition >= fadeEndPoint) {
        setOpacity(0.02);
      } else {
        const fadeRange = fadeEndPoint - fadeStartPoint;
        const currentPosition = scrollPosition - fadeStartPoint;
        const newOpacity = 0.08 * (1 - currentPosition / fadeRange);
        setOpacity(newOpacity);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      // Only store the client coordinates, not the absolute position
      setMousePosition({
        x: clientX,
        y: clientY, // Remove window.scrollY from here
      });

      // Check for text elements in any section
      const element = document.elementFromPoint(clientX, clientY);
      const isText = element?.closest(
        'h1, h2, h3, p, span, .prose, .nameButtons, article, .text-muted-foreground, div[role="heading"]',
      );
      setIsOverText(!!isText);
    };

    handleScroll(); // Initial scroll position
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const baseOpacity = opacity;
  const spotlightOpacity = baseOpacity + (isOverText ? -0.02 : 0.035);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-50 h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--grid-color)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--grid-color)) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: baseOpacity,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-150"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--grid-color)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--grid-color)) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          opacity: spotlightOpacity,
          mask: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 150px)`,
          WebkitMask: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 150px)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
