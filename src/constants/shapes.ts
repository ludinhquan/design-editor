import {ArrowIcon, DiamondIcon, EllipseIcon, FreedrawIcon, ImageIcon, LineIcon, RectangleIcon, SelectionIcon, TextIcon} from "@/components";
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
  // {
  //   icon: EraserIcon,
  //   value: "eraser",
  //   fillable: false,
  // },
] as const;

export enum StrokeStyle {
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted',
}

export type ShapeOptions = { 
  fillStyle: "hachure",
  fontFamily: string,
  fontSize: number,
  opacity: number,
  roughness: number,
  strokeColor: string
  backgroundColor: string
  roundness: null,
  strokeStyle: StrokeStyle,
  strokeWidth: number,
  locked: false,
}

export const DefaultShapeOptions: ShapeOptions = {
  fillStyle: "hachure",
  fontFamily: '',
  fontSize: 20,
  opacity: 100,
  roughness: null,
  strokeColor: Colors.ElementStroke[0],
  backgroundColor: Colors.ElementBackground[0],
  roundness: null,
  strokeStyle: StrokeStyle.Solid,
  strokeWidth: 1,
  locked: false,
} as const;

export enum Actions {
  SendToBack = 'SendToBack',
  SendBackward = 'SendBackward',
  BringToFront = 'BringToFront',
  BringForward = 'BringForward',
  AlignLeft = 'AlignLeft',
  CenterHorizontally = 'CenterHorizontally',
  AlignRight = 'AlignRight',
  DistributeHorizontally = 'DistributeHorizontally',
  AlignTop = 'AlignTop',
  CenterVertically = 'CenterVertically',
  AlignBottom = 'AlignBottom',
  DistributeVertically = 'DistributeVertically',
  Duplicate = 'Duplicate',
  Trash = 'Trash',
  Group = 'Group',
  UnGroup = 'UnGroup'
}
