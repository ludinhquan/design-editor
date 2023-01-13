import {ShapeType} from "@/constants";

export enum ConfigKey {
  StrokeColor = 'StrokeColor',
  StrokeWidth = 'StrokeWidth',
  StrokeStyle = 'StrokeStyle',
  Background = 'Background',
  Edge = 'Edge',
  Opacity = 'Opacity',
  FontSize = 'FontSize',
  FontFamily = 'FontFamily',
  TextAlign = 'TextAlign',
  Layer = 'Layer',
  Align = 'Align',
  Action = 'Action',
}

export const Config: Record<ConfigKey, Set<ShapeType>> = {
  StrokeColor: new Set(['rectangle', 'diamond', 'ellipse', 'arrow', 'line', 'freedraw', 'text']),
  StrokeWidth: new Set(['rectangle', 'diamond', 'ellipse', 'arrow', 'line', 'freedraw']),
  StrokeStyle: new Set(['rectangle', 'diamond', 'ellipse', 'arrow', 'line']),
  Background: new Set(['rectangle', 'diamond', 'ellipse', 'text']),
  Edge: new Set(['rectangle', 'diamond']),

  Opacity: new Set(['rectangle', 'diamond', 'ellipse', 'arrow', 'line', 'freedraw', 'text', 'image']),

  // font styles
  FontSize: new Set(['text']),
  FontFamily: new Set(['text']),
  TextAlign: new Set(['text']),

  Layer: new Set(['rectangle', 'diamond', 'ellipse', 'arrow', 'line', 'freedraw', 'text', 'image']),

  Align: new Set([]),
  Action: new Set([]),
}
