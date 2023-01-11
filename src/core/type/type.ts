export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeType = string

export interface GenericStyles extends fabric.IObjectOptions, fabric.Object {}

type ElementOption = Readonly<GenericStyles>;

export type SelectionOption = ElementOption & {
  type: "selection";
};

export type RectangleOption = ElementOption & {
  type: "rectangle";
};

export type DiamondOption = ElementOption & {
  type: "diamond";
};

export type EllipseOption = ElementOption & {
  type: "ellipse";
  rx: number,
  ry: number,
  radius: number
};

export type ArrowOption = ElementOption & {
  type: "arrow";
};

export type LineOption = ElementOption & {
  type: "line";
};

export type TextOption = ElementOption & {
  type: "text";
  fontSize: number;
  text: string;
  baseline: number;
  originalText: string;
  editable: boolean
  textAlign: string
}

export type ImageOption = ElementOption & {
  type: "image";
  image: string,
  src: string
};

export type GenericOptions =
  | SelectionOption
  | RectangleOption
  | DiamondOption
  | EllipseOption
  | ArrowOption
  | LineOption
  | TextOption
  | ImageOption

export type IMouseMoveEvent = {
  x: number,
  y: number
}
