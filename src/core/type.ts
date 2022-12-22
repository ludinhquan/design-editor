import {FabricObject} from "@/canvas";

export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type StrokeStyle = "solid" | "dashed" | "dotted";

export type FabricCanvas<T extends any = fabric.Canvas> = T 

export interface FabricEvent<T extends any = Event> extends Omit<fabric.IEvent, 'e'> {
	e: T;
	target?: FabricObject;
	subTargets?: FabricObject[];
	button?: number;
	isClick?: boolean;
	pointer?: fabric.Point;
	absolutePointer?: fabric.Point;
	transform?: { corner: string; original: FabricObject; originX: string; originY: string; width: number };
}

type ElementOption = Readonly<{
  id: string,
  left: number,
  top: number,
  right: number,
  bottom: number,
  originX: 'top' | 'left' | 'right' | 'bottom',
  originY: 'top' | 'left' | 'right' | 'bottom',
  width: number,
  height: number,
  fill: string,
  stroke: string,
  angle: number,
  opacity: number
  selectable: boolean,
  selectionColor: string
  hasBorders: boolean,
  hasControls: boolean
}>;


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
}

export type GenericOptions =
  | SelectionOption
  | RectangleOption
  | DiamondOption
  | EllipseOption
  | ArrowOption
  | LineOption
  | TextOption
