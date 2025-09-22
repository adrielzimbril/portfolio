import React from 'react';

interface LongitudeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const LongitudeIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}: LongitudeIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle 
        cx="24.8889" 
        cy="24.8889" 
        r="20" 
        transform="rotate(90 24.8889 24.8889)" 
        fill="url(#paint0_linear_longitude)"
      />
      <path 
        d="M4.88892 24.8889L44.8889 24.8889C44.8889 35.9346 35.9346 44.8889 24.8889 44.8889C13.8432 44.8889 4.88892 35.9346 4.88892 24.8889Z" 
        fill="url(#paint1_linear_longitude)"
      />
      <ellipse 
        cx="24.8889" 
        cy="24.8889" 
        rx="12" 
        ry="20" 
        transform="rotate(90 24.8889 24.8889)" 
        fill="url(#paint2_linear_longitude)"
      />
      <path 
        d="M4.88892 24.8889L44.8889 24.8889C44.8889 31.5163 35.9346 36.8889 24.8889 36.8889C13.8432 36.8889 4.88892 31.5163 4.88892 24.8889Z" 
        fill="url(#paint3_linear_longitude)"
      />
      <defs>
        <linearGradient 
          id="paint0_linear_longitude" 
          x1="25.6167" 
          y1="5.37044" 
          x2="25.6167" 
          y2="44.8852" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8FD0FF"/>
          <stop offset="1" stopColor="#E7F6FF"/>
        </linearGradient>
        <linearGradient 
          id="paint1_linear_longitude" 
          x1="53.4603" 
          y1="24.8889" 
          x2="15.8054" 
          y2="53.7749" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3360FF"/>
          <stop offset="1" stopColor="#193F9F"/>
        </linearGradient>
        <linearGradient 
          id="paint2_linear_longitude" 
          x1="25.3256" 
          y1="5.37044" 
          x2="25.3256" 
          y2="44.8852" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5BBAFF"/>
          <stop offset="1" stopColor="#ACE1FF"/>
        </linearGradient>
        <linearGradient 
          id="paint3_linear_longitude" 
          x1="-5.11109" 
          y1="35.798" 
          x2="15.6654" 
          y2="4.5216" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#25C4E7"/>
          <stop offset="1" stopColor="#25E7D9" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};
