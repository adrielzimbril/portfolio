interface RadarBackgroundProps {
  scores: number[];
}

export function RadarBackground({ scores }: RadarBackgroundProps) {
  const size = 220;
  const center = size / 2;
  const maxRadius = 90;

  // Convert scores to polygon points (4 quadrants)
  const getPolygonPoints = (scoreValues: number[]) => {
    const angles: number[] = [-90, 0, 90, 180];
    return scoreValues
      .map((score, i: number) => {
        /* @ts-expect-error - angles[i] is guaranteed to be a number */
        const angle = (angles[i] * Math.PI) / 180;
        const radius = (score / 100) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="pointer-events-none absolute -bottom-12 -right-12 text-green-600 dark:text-green-400">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-[0_0_8px_rgba(34,197,94,0.25)] dark:drop-shadow-[0_0_8px_rgba(74,222,128,0.25)]"
        style={
          {
            "--radar-gradient-start": "rgb(34, 197, 94)",
            "--radar-gradient-end": "rgb(22, 163, 74)",
          } as React.CSSProperties
        }
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={2} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--radar-gradient-start)"
              stopOpacity={0.5}
            />
            <stop
              offset="100%"
              stopColor="var(--radar-gradient-end)"
              stopOpacity={0.15}
            />
          </radialGradient>
        </defs>

        {/* Concentric circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={maxRadius * scale}
            fill="none"
            stroke="currentColor"
            strokeWidth={scale === 1 ? 1.5 : 1}
            className="text-muted-foreground/30"
            opacity={0.4}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}

        {/* Cross axes */}
        <g opacity={0.3}>
          <line
            x1={center}
            y1={center - maxRadius}
            x2={center}
            y2={center + maxRadius}
            stroke="currentColor"
            strokeWidth={1}
            className="text-muted-foreground/30"
          />
          <line
            x1={center - maxRadius}
            y1={center}
            x2={center + maxRadius}
            y2={center}
            stroke="currentColor"
            strokeWidth={1}
            className="text-muted-foreground/30"
          />
        </g>

        {/* Score polygon fill with glow */}
        <polygon
          points={getPolygonPoints(scores)}
          fill="url(#radarGradient)"
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.7}
          filter="url(#glow)"
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Score points */}
        {scores.map((score, i) => {
          const angles = [-90, 0, 90, 180];
          /* @ts-expect-error - angles[i] is guaranteed to be a number */
          const angle = (angles[i] * Math.PI) / 180;
          const radius = (score / 100) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3.5}
              fill="currentColor"
              opacity={0.8}
              filter="url(#glow)"
            />
          );
        })}
      </svg>
    </div>
  );
}
