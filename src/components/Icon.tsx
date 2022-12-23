import React from "react";


type Theme = 'LIGHT'

const iconFillColor = (theme: Theme) => "#3d3d3d";

const handlerColor = (theme: Theme) => "#1e1e1e";

type Opts = {
  width?: number;
  height?: number;
  mirror?: true;
} & React.SVGProps<SVGSVGElement>;

export const createIcon = (
  d: string | React.ReactNode,
  opts: number | Opts = 512,
) => {
  const {
    width = 512,
    height = width,
    mirror,
    style,
    ...rest
  } = typeof opts === "number" ? ({ width: opts } as Opts) : opts;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      style={style}
      width="1.1rem"
      height="1.1rem"
      {...rest}
    >
      {typeof d === "string" ? <path fill="currentColor" d={d} /> : d}
    </svg>
  );
};

const tablerIconProps: Opts = {
  width: 24,
  height: 24,
  fill: "none",
  strokeWidth: 2,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const modifiedTablerIconProps: Opts = {
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// -----------------------------------------------------------------------------

// custom
export const SelectionIcon = createIcon(
  <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z" />
    <path d="M13.5 13.5l4.5 4.5" />
  </g>,
  { fill: "none", width: 22, height: 22, strokeWidth: 1.25 },
);

// tabler-icons: present
export const PlusPromoIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x={3} y={8} width={18} height={4} rx={1} />
    <line x1={12} y1={8} x2={12} y2={21} />
    <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" />
  </g>,
  tablerIconProps,
);

// tabler-icons: book
export const LibraryIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
    <line x1="3" y1="6" x2="3" y2="19" />
    <line x1="12" y1="6" x2="12" y2="19" />
    <line x1="21" y1="6" x2="21" y2="19" />
  </g>,
  tablerIconProps,
);

// tabler-icons: plus
export const PlusIcon = createIcon(
  <svg strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>,
  tablerIconProps,
);

// tabler-icons: square
export const RectangleIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
  </g>,
  tablerIconProps,
);

// tabler-icons: square-rotated
export const DiamondIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z" />
  </g>,

  tablerIconProps,
);

// tabler-icons: circle
export const EllipseIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9"></circle>
  </g>,

  tablerIconProps,
);

// tabler-icons: arrow-narrow-right
export const ArrowIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="15" y1="16" x2="19" y2="12" />
    <line x1="15" y1="8" x2="19" y2="12" />
  </g>,
  tablerIconProps,
);

// modified tabler-icons: pencil
export const FreedrawIcon = createIcon(
  <g strokeWidth="1.25">
    <path
      clipRule="evenodd"
      d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"
    />
    <path d="m11.25 5.417 3.333 3.333" />
  </g>,

  modifiedTablerIconProps,
);

// tabler-icons: typography
export const TextIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="4" y1="20" x2="7" y2="20" />
    <line x1="14" y1="20" x2="21" y2="20" />
    <line x1="6.9" y1="15" x2="13.8" y2="15" />
    <line x1="10.2" y1="6.3" x2="16" y2="20" />
    <polyline points="5 20 11 4 13 4 20 20"></polyline>
  </g>,
  tablerIconProps,
);

// modified tabler-icons: photo
export const ImageIcon = createIcon(
  <g strokeWidth="1.25">
    <path d="M12.5 6.667h.01" />
    <path d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z" />
    <path d="m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166" />
    <path d="m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667" />
  </g>,
  modifiedTablerIconProps,
);

// tabler-icons: eraser
export const EraserIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
    <path d="M18 13.3l-6.3 -6.3" />
  </g>,
  tablerIconProps,
);

export const LineIcon = createIcon(
  <path d="M4.167 10h11.666" strokeWidth="1.5" />,
  modifiedTablerIconProps,
);

export const HamburgerMenuIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </g>,
  tablerIconProps,
);

export const StrokeWidthBaseIcon = createIcon(
  <>
    <path
      d="M4.167 10h11.666"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>,
  modifiedTablerIconProps,
);

export const StrokeWidthBoldIcon = createIcon(
  <path
    d="M5 10h10"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  modifiedTablerIconProps,
);

export const StrokeWidthExtraBoldIcon = createIcon(
  <path
    d="M5 10h10"
    stroke="currentColor"
    strokeWidth="3.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  modifiedTablerIconProps,
);


export const EdgeSharpIcon = createIcon(
  <svg strokeWidth="1.5">
    <path d="M3.33334 9.99998V6.66665C3.33334 6.04326 3.33403 4.9332 3.33539 3.33646C4.95233 3.33436 6.06276 3.33331 6.66668 3.33331H10" />
    <path d="M13.3333 3.33331V3.34331" />
    <path d="M16.6667 3.33331V3.34331" />
    <path d="M16.6667 6.66669V6.67669" />
    <path d="M16.6667 10V10.01" />
    <path d="M3.33334 13.3333V13.3433" />
    <path d="M16.6667 13.3333V13.3433" />
    <path d="M3.33334 16.6667V16.6767" />
    <path d="M6.66666 16.6667V16.6767" />
    <path d="M10 16.6667V16.6767" />
    <path d="M13.3333 16.6667V16.6767" />
    <path d="M16.6667 16.6667V16.6767" />
  </svg>,
  modifiedTablerIconProps,
);

// tabler-icons: border-radius
export const EdgeRoundIcon = createIcon(
  <g
    strokeWidth="1.5"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 12v-4a4 4 0 0 1 4 -4h4" />
    <line x1="16" y1="4" x2="16" y2="4.01" />
    <line x1="20" y1="4" x2="20" y2="4.01" />
    <line x1="20" y1="8" x2="20" y2="8.01" />
    <line x1="20" y1="12" x2="20" y2="12.01" />
    <line x1="4" y1="16" x2="4" y2="16.01" />
    <line x1="20" y1="16" x2="20" y2="16.01" />
    <line x1="4" y1="20" x2="4" y2="20.01" />
    <line x1="8" y1="20" x2="8" y2="20.01" />
    <line x1="12" y1="20" x2="12" y2="20.01" />
    <line x1="16" y1="20" x2="16" y2="20.01" />
    <line x1="20" y1="20" x2="20" y2="20.01" />
  </g>,
  tablerIconProps,
);

export const BringForwardIcon = createIcon(
  <>
    <g
      clipPath="url(#a)"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M13.889 4.167H8.333c-.767 0-1.389.622-1.389 1.389v5.555c0 .767.622 1.389 1.39 1.389h5.555c.767 0 1.389-.622 1.389-1.389V5.556c0-.767-.622-1.39-1.39-1.39Z"
        fill="currentColor"
      />
      <path d="M12.5 12.5v1.389a1.389 1.389 0 0 1-1.389 1.389H5.556a1.389 1.389 0 0 1-1.39-1.39V8.334a1.389 1.389 0 0 1 1.39-1.389h1.388" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </>,
  modifiedTablerIconProps,
);

export const SendBackwardIcon = createIcon(
  <>
    <g
      clipPath="url(#a)"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.944 12.5H12.5v1.389a1.389 1.389 0 0 1-1.389 1.389H5.556a1.389 1.389 0 0 1-1.39-1.39V8.334a1.389 1.389 0 0 1 1.39-1.389h1.388"
        fill="currentColor"
      />
      <path d="M13.889 4.167H8.333c-.767 0-1.389.621-1.389 1.389v5.555c0 .767.622 1.389 1.39 1.389h5.555c.767 0 1.389-.622 1.389-1.389V5.556c0-.768-.622-1.39-1.39-1.39Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </>,
  modifiedTablerIconProps,
);

export const BringToFrontIcon = createIcon(
  <>
    <g clipPath="url(#a)" stroke="currentColor" strokeWidth="1.25">
      <path
        d="M8.775 6.458h2.45a2.316 2.316 0 0 1 2.317 2.316v2.452a2.316 2.316 0 0 1-2.316 2.316H8.774a2.316 2.316 0 0 1-2.317-2.316V8.774a2.316 2.316 0 0 1 2.317-2.316Z"
        fill="currentColor"
      />
      <path d="M5.441 9.792h2.451a2.316 2.316 0 0 1 2.316 2.316v2.45a2.316 2.316 0 0 1-2.316 2.317h-2.45a2.316 2.316 0 0 1-2.317-2.316v-2.451a2.316 2.316 0 0 1 2.316-2.316ZM12.108 3.125h2.45a2.316 2.316 0 0 1 2.317 2.316v2.451a2.316 2.316 0 0 1-2.316 2.316h-2.451a2.316 2.316 0 0 1-2.316-2.316v-2.45a2.316 2.316 0 0 1 2.316-2.317Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </>,
  modifiedTablerIconProps,
);

export const SendToBackIcon = createIcon(
  <>
    <g clipPath="url(#a)">
      <path
        d="M5.441 9.792h2.451a2.316 2.316 0 0 1 2.316 2.316v2.45a2.316 2.316 0 0 1-2.316 2.317h-2.45a2.316 2.316 0 0 1-2.317-2.316v-2.451a2.316 2.316 0 0 1 2.316-2.316Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5.441 9.792h2.451a2.316 2.316 0 0 1 2.316 2.316v2.45a2.316 2.316 0 0 1-2.316 2.317h-2.45a2.316 2.316 0 0 1-2.317-2.316v-2.451a2.316 2.316 0 0 1 2.316-2.316Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <mask id="SendToBackIcon" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.167 5.833v2.06a2.941 2.941 0 0 0 2.94 2.94h2.06v.393a2.941 2.941 0 0 1-2.941 2.94h-.393v-2.058a2.941 2.941 0 0 0-2.94-2.941h-2.06v-.393a2.941 2.941 0 0 1 2.942-2.94h.392Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.167 5.833v2.06a2.941 2.941 0 0 0 2.94 2.94h2.06v.393a2.941 2.941 0 0 1-2.941 2.94h-.393v-2.058a2.941 2.941 0 0 0-2.94-2.941h-2.06v-.393a2.941 2.941 0 0 1 2.942-2.94h.392Z"
        fill="currentColor"
      />
      <path
        d="M9.167 5.833h1.25v-1.25h-1.25v1.25Zm5 5h1.25v-1.25h-1.25v1.25Zm-3.334 3.334h-1.25v1.25h1.25v-1.25Zm-5-5h-1.25v1.25h1.25v-1.25Zm2.084-3.334v2.06h2.5v-2.06h-2.5Zm0 2.06a4.191 4.191 0 0 0 4.19 4.19v-2.5a1.691 1.691 0 0 1-1.69-1.69h-2.5Zm4.19 4.19h2.06v-2.5h-2.06v2.5Zm.81-1.25v.393h2.5v-.393h-2.5Zm0 .393c0 .933-.758 1.69-1.691 1.69v2.5a4.191 4.191 0 0 0 4.19-4.19h-2.5Zm-1.691 1.69h-.393v2.5h.393v-2.5Zm.857 1.25v-2.058h-2.5v2.059h2.5Zm0-2.058a4.191 4.191 0 0 0-4.19-4.191v2.5c.933 0 1.69.757 1.69 1.69h2.5Zm-4.19-4.191h-2.06v2.5h2.06v-2.5Zm-.81 1.25v-.393h-2.5v.393h2.5Zm0-.393c0-.934.758-1.69 1.692-1.69v-2.5a4.191 4.191 0 0 0-4.192 4.19h2.5Zm1.692-1.69h.392v-2.5h-.392v2.5Z"
        fill="currentColor"
        mask="url(#SendToBackIcon)"
      />
      <path
        d="M12.108 3.125h2.45a2.316 2.316 0 0 1 2.317 2.316v2.451a2.316 2.316 0 0 1-2.316 2.316h-2.451a2.316 2.316 0 0 1-2.316-2.316v-2.45a2.316 2.316 0 0 1 2.316-2.317Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </>,
  modifiedTablerIconProps,
);
