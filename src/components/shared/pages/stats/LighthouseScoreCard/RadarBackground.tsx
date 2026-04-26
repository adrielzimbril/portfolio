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
        style={
          {
            "--radar-gradient-start": "rgb(34, 197, 94)",
            "--radar-gradient-end": "rgb(22, 163, 74)",
          } as React.CSSProperties
        }
      >
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--radar-gradient-start)"
              stopOpacity={0.4}
            />
            <stop
              offset="100%"
              stopColor="var(--radar-gradient-end)"
              stopOpacity={0.1}
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
            opacity={0.35}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}

        {/* Cross axes */}
        <g opacity={0.25}>
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

        {/* Score polygon fill */}
        <polygon
          points={getPolygonPoints(scores)}
          fill="url(#radarGradient)"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.6}
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
              r={3}
              fill="currentColor"
              opacity={0.7}
            />
          );
        })}
      </svg>
    </div>
  );
}
