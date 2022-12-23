import {ArrowIcon, DiamondIcon, EllipseIcon, EraserIcon, FreedrawIcon, IconButton, ImageIcon, LineIcon, RectangleIcon, SelectionIcon, TextIcon} from "@/components"
import {Colors} from "./colors";

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


export type ShapeOptions = { 
  fillStyle: "hachure",
  fontFamily: '',
  fontSize: '',
  opacity: number,
  roughness: number,
  strokeColor: string
  backgroundColor: string
  roundness: null,
  strokeStyle: "solid",
  strokeWidth: number,
  locked: false,
}

export const GenericDefaultOptions: ShapeOptions = {
  fillStyle: "hachure",
  fontFamily: '',
  fontSize: '',
  opacity: 100,
  roughness: null,
  strokeColor: Colors.ElementStroke[0],
  backgroundColor: Colors.ElementBackground[0],
  roundness: null,
  strokeStyle: "solid",
  strokeWidth: 1,
  locked: false,
} as const;
