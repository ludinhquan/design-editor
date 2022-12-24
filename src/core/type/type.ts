export enum ActionName {
  copy= 'copy',
  cut= 'cut',
  paste= 'paste',
  copyAsPng= 'copyAsPng',
  copyAsSvg= 'copyAsSvg',
  copyText= 'copyText',
  sendBackward= 'sendBackward',
  bringForward= 'bringForward',
  sendToBack= 'sendToBack',
  bringToFront= 'bringToFront',
  copyStyles= 'copyStyles',
  selectAll= 'selectAll',
  pasteStyles= 'pasteStyles',
  gridMode= 'gridMode',
  zenMode= 'zenMode',
  stats= 'stats',
  changeStrokeColor= 'changeStrokeColor',
  changeBackgroundColor= 'changeBackgroundColor',
  changeFillStyle= 'changeFillStyle',
  changeStrokeWidth= 'changeStrokeWidth',
  changeStrokeShape= 'changeStrokeShape',
  changeSloppiness= 'changeSloppiness',
  changeStrokeStyle= 'changeStrokeStyle',
  changeArrowhead= 'changeArrowhead',
  changeOpacity= 'changeOpacity',
  changeFontSize= 'changeFontSize',
  toggleCanvasMenu= 'toggleCanvasMenu',
  toggleEditMenu= 'toggleEditMenu',
  undo= 'undo',
  redo= 'redo',
  finalize= 'finalize',
  changeProjectName= 'changeProjectName',
  changeExportBackground= 'changeExportBackground',
  changeExportEmbedScene= 'changeExportEmbedScene',
  changeExportScale= 'changeExportScale',
  saveToActiveFile= 'saveToActiveFile',
  saveFileToDisk= 'saveFileToDisk',
  loadScene= 'loadScene',
  duplicateSelection= 'duplicateSelection',
  deleteSelectedElements= 'deleteSelectedElements',
  changeViewBackgroundColor= 'changeViewBackgroundColor',
  clearCanvas= 'clearCanvas',
  zoomIn= 'zoomIn',
  zoomOut= 'zoomOut',
  resetZoom= 'resetZoom',
  zoomToFit= 'zoomToFit',
  zoomToSelection= 'zoomToSelection',
  changeFontFamily= 'changeFontFamily',
  changeTextAlign= 'changeTextAlign',
  changeVerticalAlign= 'changeVerticalAlign',
  toggleFullScreen= 'toggleFullScreen',
  toggleShortcuts= 'toggleShortcuts',
  group= 'group',
  ungroup= 'ungroup',
  goToCollaborator= 'goToCollaborator',
  addToLibrary= 'addToLibrary',
  changeRoundness= 'changeRoundness',
  alignTop= 'alignTop',
  alignBottom= 'alignBottom',
  alignLeft= 'alignLeft',
  alignRight= 'alignRight',
  alignVerticallyCentered= 'alignVerticallyCentered',
  alignHorizontallyCentered= 'alignHorizontallyCentered',
  distributeHorizontally= 'distributeHorizontally',
  distributeVertically= 'distributeVertically',
  flipHorizontal= 'flipHorizontal',
  flipVertical= 'flipVertical',
  viewMode= 'viewMode',
  exportWithDarkMode= 'exportWithDarkMode',
  toggleTheme= 'toggleTheme',
  increaseFontSize= 'increaseFontSize',
  decreaseFontSize= 'decreaseFontSize',
  unbindText= 'unbindText',
  hyperlink= 'hyperlink',
  eraser= 'eraser',
  bindText= 'bindText',
  toggleLock= 'toggleLock',
} 

export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeType = string

export interface GenericStyles extends fabric.IObjectOptions {}

type ElementOption = Readonly<{id: string} & GenericStyles>;

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

export type IMouseMoveEvent = {
  x: number,
  y: number
}
