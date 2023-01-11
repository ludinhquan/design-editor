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

export enum FontSize {
  Small = 56,
  Medium = 80,
  Large = 100,
  ExtraLarge = 156,
}

export enum FontFamily {
  Virgil = 'Virgil',
  Normal = 'Normal',
  Cascadia = 'Cascadia',
}

export enum TextAlign {
  Left = "left",
  Center = "center",
  Right = "right",
  Justify = "justify",
  JustifyLeft = "justify-left",
  JustifyCenter = "justify-center",
  JustifyRight = "justify-right"
}

export type ShapeOptions = {
  strokeColor: null | string
  backgroundColor: null | string
  strokeWidth: null | number,
  strokeStyle: null | StrokeStyle,
  roundness: null | number,
  opacity: null | number,
  fontSize: null | number,
  fontFamily: null | string,
  textAlign: null | TextAlign,
}

export type ActiveObjects = {
  hasGroup: boolean,
  type: ShapeType[]
  isActiveSelection: boolean,
  options: Partial<ShapeOptions>
}

export const DefaultShapeOptions: ShapeOptions = {
  fontFamily: FontFamily.Virgil,
  fontSize: FontSize.Small,
  textAlign: TextAlign.Left,
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
