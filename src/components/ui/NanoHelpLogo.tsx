interface NanoHelpLogoProps {
  size?: number;
  className?: string;
}

/**
 * NanoHelp Logo — "NH" letters inside a ring of dots (purple-to-pink gradient)
 * Matches the design specification: NH monogram in purple, surrounded by dots
 * transitioning from purple to pink in a circular arrangement.
 */
export default function NanoHelpLogo({
  size = 40,
  className,
}: NanoHelpLogoProps) {
  const dots = 12; // number of dots in the ring
  const dotRadius = size * 0.08; // size of each dot
  const ringRadius = size * 0.42; // radius of the dot ring
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NanoHelp Logo"
      role="img"
    >
      <defs>
        <linearGradient id="nh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B5CF6" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="nh-dot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B5CF6" stopOpacity="1" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Ring of dots */}
      {Array.from({ length: dots }).map((_, i) => {
        const round = (val: number) => Number(val.toFixed(4));
        const angle = (i / dots) * Math.PI * 2 - Math.PI / 2;
        const dotX = round(cx + ringRadius * Math.cos(angle));
        const dotY = round(cy + ringRadius * Math.sin(angle));
        
        // Progress from 0 to 1 around ring → interpolate purple to pink
        const progress = i / dots;
        const opacity = round(0.4 + 0.6 * Math.sin((i / dots) * Math.PI));
        const rVal = round(dotRadius * (0.6 + 0.4 * (1 - Math.abs(progress - 0.5) * 2)));

        return (
          <circle
            key={i}
            cx={dotX}
            cy={dotY}
            r={rVal}
            fill={i < 6 ? "#7B5CF6" : "#EC4899"}
            opacity={opacity}
          />
        );
      })}

      {/* NH monogram */}
      <text
        x={cx}
        y={cy + size * 0.12}
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={size * 0.36}
        fontWeight="800"
        fill="url(#nh-gradient)"
        letterSpacing="-1"
      >
        NH
      </text>
    </svg>
  );
}
