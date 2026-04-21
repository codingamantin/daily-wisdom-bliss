const AmbientBackground = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="ambient-orb animate-orb-drift"
        style={{
          width: 520, height: 520, top: "-10%", left: "-10%",
          background: "radial-gradient(circle, hsl(var(--accent-soft) / 0.6), transparent 60%)",
        }}
      />
      <div
        className="ambient-orb animate-orb-drift"
        style={{
          width: 600, height: 600, bottom: "-15%", right: "-10%",
          background: "radial-gradient(circle, hsl(105 30% 90% / 0.7), transparent 60%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="ambient-orb animate-orb-drift"
        style={{
          width: 380, height: 380, top: "30%", right: "15%",
          background: "radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 60%)",
          animationDelay: "-12s",
        }}
      />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
