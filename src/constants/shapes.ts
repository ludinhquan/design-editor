import {ArrowIcon, DiamondIcon, EllipseIcon, EraserIcon, FreedrawIcon, IconButton, ImageIcon, LineIcon, RectangleIcon, SelectionIcon, TextIcon} from "@/components"

export type ShapeType = typeof SHAPES[number]['value']

export const SHAPES = [
  {
    icon: SelectionIcon,
    value: "selection",
    fillable: true,
  },
  {
    icon: RectangleIcon,
    value: "rectangle",
    fillable: true,
  },
  {
    icon: DiamondIcon,
    value: "diamond",
    fillable: true,
  },
  {
    icon: EllipseIcon,
    value: "ellipse",
    fillable: true,
  },
  {
    icon: ArrowIcon,
    value: "arrow",
    fillable: true,
  },
  {
    icon: LineIcon,
    value: "line",
    fillable: true,
  },
  {
    icon: FreedrawIcon,
    value: "freedraw",
    fillable: false,
  },
  {
    icon: TextIcon,
    value: "text",
    fillable: false,
  },
  {
    icon: ImageIcon,
    value: "image",
    fillable: false,
  },
  {
    icon: EraserIcon,
    value: "eraser",
    fillable: false,
  },
] as const;
