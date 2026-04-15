interface RadarBackgroundProps {
  scores: number[];
  isHovered: boolean;
  delay: number;
  shouldReduceAnimations: boolean;
}

export function RadarBackground({
  scores,
  isHovered,
  delay,
  shouldReduceAnimations,
}: RadarBackgroundProps) {
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

  // Mobile: Plain div with static SVG
  if (shouldReduceAnimations) {
    return (
      <div className="pointer-events-none absolute -bottom-16 -right-16">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
              className="text-gray-300"
              opacity={0.25}
            />
          ))}

          {/* Cross axes */}
          <g opacity={0.2}>
            <line
              x1={center}
              y1={center - maxRadius}
              x2={center}
              y2={center + maxRadius}
              stroke="currentColor"
              strokeWidth={1}
              className="text-gray-300"
            />
            <line
              x1={center - maxRadius}
              y1={center}
              x2={center + maxRadius}
              y2={center}
              stroke="currentColor"
              strokeWidth={1}
              className="text-gray-300"
            />
          </g>

          {/* Score polygon fill */}
          <polygon
            points={getPolygonPoints(scores)}
            fill="url(#radarGradient)"
            stroke="rgba(251, 146, 60, 0.5)"
            strokeWidth={2}
            opacity={0.25}
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
                r={4}
                fill="rgb(251, 146, 60)"
                opacity={0.5}
              />
            );
          })}

          {/* Gradient definition */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="rgb(251, 191, 36)"
                stopOpacity="0.5"
              />
              <stop
                offset="100%"
                stopColor="rgb(251, 146, 60)"
                stopOpacity="0.15"
              />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Desktop: Static radar
  return (
    <div className="pointer-events-none absolute -bottom-16 -right-16">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
            className="text-gray-300"
            opacity={0.25}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}

        {/* Cross axes */}
        <g opacity={0.2}>
          <line
            x1={center}
            y1={center - maxRadius}
            x2={center}
            y2={center + maxRadius}
            stroke="currentColor"
            strokeWidth={1}
            className="text-gray-300"
          />
          <line
            x1={center - maxRadius}
            y1={center}
            x2={center + maxRadius}
            y2={center}
            stroke="currentColor"
            strokeWidth={1}
            className="text-gray-300"
          />
        </g>

        {/* Score polygon fill */}
        <polygon
          points={getPolygonPoints(scores)}
          fill="url(#radarGradient)"
          stroke="rgba(251, 146, 60, 0.5)"
          strokeWidth={2}
          opacity={0.25}
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
              r={4}
              fill="rgb(251, 146, 60)"
              opacity={0.5}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.5" />
            <stop
              offset="100%"
              stopColor="rgb(251, 146, 60)"
              stopOpacity="0.15"
            />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
