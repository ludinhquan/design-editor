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

export enum FontFamily {
  Virgil = 'Virgil',
  Normal = 'Normal',
  Cascadia = 'Cascadia',
}

export type ShapeOptions = {
  strokeColor: null | string
  backgroundColor: null | string
  strokeWidth: null | number,
  strokeStyle: null | StrokeStyle,
  roundness: null | number,
  fontSize: null | number,
  fontFamily: null | string,
  opacity: null | number,
}

export type ActiveObjects = {
  hasGroup: boolean,
  type: ShapeType[]
  isActiveSelection: boolean,
  options: Partial<ShapeOptions>
}

export const DefaultShapeOptions: ShapeOptions = {
  fontFamily: FontFamily.Virgil,
  fontSize: 20,
  opacity: 100,
  strokeColor: Colors.ElementStroke[0],
  backgroundColor: Colors.ElementBackground[0],
  roundness: 0,
  strokeStyle: StrokeStyle.Solid,
  strokeWidth: 1,
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
