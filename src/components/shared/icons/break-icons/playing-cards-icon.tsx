import React from "react";

interface PlayingCardsIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const PlayingCardsIcon = ({
  size = 49,
  ...props
}: PlayingCardsIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.51 20.1958C3.36647 15.9281 5.89913 11.5414 10.1669 10.3978L18.6203 8.13275C22.888 6.98922 27.2747 9.52187 28.4182 13.7896L33.3688 32.2653C34.5123 36.533 31.9796 40.9197 27.7119 42.0632L19.2585 44.3283C14.9908 45.4718 10.6041 42.9392 9.46054 38.6715L4.51 20.1958Z"
        fill="url(#paint0_linear_622_1251)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.204 10.7898C21.3475 6.52205 25.7342 3.9894 30.0019 5.13293L39.6612 7.72112C43.9289 8.86466 46.4616 13.2514 45.3181 17.5191L40.4486 35.6922C39.3051 39.9599 34.9184 42.4926 30.6506 41.349L20.9914 38.7608C16.7236 37.6173 14.191 33.2306 15.3345 28.9629L20.204 10.7898Z"
        fill="url(#paint1_linear_622_1251)"
      />
      <path
        d="M30.953 18.493C31.4929 17.9941 32.3685 18.2287 32.5866 18.9308L33.6844 22.4646C33.9148 23.2062 33.6951 24.0141 33.1209 24.5369L30.422 26.9938C29.8832 27.4843 29.0175 27.2523 28.7961 26.5581L27.6873 23.081C27.4513 22.3411 27.665 21.5316 28.2353 21.0045L30.953 18.493Z"
        fill="url(#paint2_linear_622_1251)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_622_1251"
          x1="20.518"
          y1="-3.7403"
          x2="28.8946"
          y2="45.6031"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5018" />
          <stop offset="1" stopColor="#FF9E0D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_622_1251"
          x1="35.7326"
          y1="3.06423"
          x2="25.821"
          y2="40.0549"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFBDB" />
          <stop offset="1" stopColor="#FFDBA5" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_622_1251"
          x1="29.8617"
          y1="30.4595"
          x2="28.4516"
          y2="15.4374"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D80000" />
          <stop offset="1" stopColor="#FF7A00" />
        </linearGradient>
      </defs>
    </svg>
  );
};
