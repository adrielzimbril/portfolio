import React from "react";

interface ShapeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ShapeIcon = ({ size = 49, ...props }: ShapeIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32.8889 25.012C29.5752 25.012 26.8889 27.6983 26.8889 31.012V38.012C26.8889 41.3257 29.5752 44.012 32.8889 44.012H39.8889C43.2026 44.012 45.8889 41.3257 45.8889 38.012V31.012C45.8889 27.6983 43.2026 25.012 39.8889 25.012H32.8889Z"
        fill="url(#paint0_linear_622_965)"
      />
      <path
        d="M3.88892 34.512C3.88892 29.2653 8.14221 25.012 13.3889 25.012C18.6356 25.012 22.8889 29.2653 22.8889 34.512C22.8889 39.7587 18.6356 44.012 13.3889 44.012C8.14221 44.012 3.88892 39.7587 3.88892 34.512Z"
        fill="url(#paint1_linear_622_965)"
      />
      <path
        d="M20.5588 6.51196C22.4833 3.17863 27.2945 3.17863 29.219 6.51196L34.4152 15.512C36.3397 18.8453 33.9341 23.012 30.0851 23.012H19.6928C15.8438 23.012 13.4381 18.8453 15.3626 15.512L20.5588 6.51196Z"
        fill="url(#paint2_linear_622_965)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_622_965"
          x1="44.1616"
          y1="48.762"
          x2="32.0707"
          y2="21.9892"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2BBFFF" />
          <stop offset="1" stopColor="#0167FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_622_965"
          x1="23.1264"
          y1="46.387"
          x2="0.712287"
          y2="33.5199"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB21E" />
          <stop offset="1" stopColor="#FFE665" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_622_965"
          x1="27.2079"
          y1="26.812"
          x2="22.5989"
          y2="0.293283"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF1725" />
          <stop offset="1" stopColor="#FF9431" />
        </linearGradient>
      </defs>
    </svg>
  );
};
