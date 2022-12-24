import {EditorState} from "../EditorData";
import {FabricCanvas} from "../type";

export abstract class BaseHandler extends EditorState{
  constructor(protected canvas: FabricCanvas) {super()}
}
