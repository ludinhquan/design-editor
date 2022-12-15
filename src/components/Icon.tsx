

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};
export type Theme = typeof THEME[keyof typeof THEME];

const iconFillColor = (theme: Theme) => "var(--icon-fill-color)";

const handlerColor = (theme: Theme) => "#1e1e1e";

type Opts = {
  width?: number;
  height?: number;
  mirror?: true;
} & React.SVGProps<SVGSVGElement>;

const tablerIconProps: Opts = {
  width: 24,
  height: 24,
  fill: "none",
  strokeWidth: 2,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

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
      {...rest}
    >
      {typeof d === "string" ? <path fill="currentColor" d={d} /> : d}
    </svg>
  );
};


export const HamburgerMenuIcon = createIcon(
  <g strokeWidth="1.5">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </g>,
  tablerIconProps,
);
