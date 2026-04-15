interface PulseRingsProps {
  isHovered: boolean;
  shouldReduceAnimations: boolean;
}

export function PulseRings({
  isHovered,
  shouldReduceAnimations,
}: PulseRingsProps) {
  // Mobile: Plain div
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-20 -right-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-amber-400/30"
            style={{
              width: 140 + i * 50,
              height: 140 + i * 50,
              right: -(i * 25),
              bottom: -(i * 25),
              opacity: 0.08,
            }}
          />
        ))}
      </div>
    );
  }

  // Desktop: Static rings
  return (
    <div className="pointer-events-none absolute -bottom-20 -right-20">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-amber-400/30"
          style={{
            width: 140 + i * 50,
            height: 140 + i * 50,
            right: -(i * 25),
            bottom: -(i * 25),
            opacity: 0.08,
          }}
        />
      ))}
    </div>
  );
}
