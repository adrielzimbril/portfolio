export const FRFlag = ({ width = "21", height = "15" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 15"
      fill="none"
    >
      <g clip-path="url(#clip0_1414_4160)">
        <rect width="21" height="15" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0H7V15H0V0Z"
          fill="#1A47B8"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14 0H21V15H14V0Z"
          fill="#F93939"
        />
      </g>
      <defs>
        <clipPath id="clip0_1414_4160">
          <rect width="21" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
