import {fabric} from "fabric";
import {nanoid} from "nanoid";
import {BaseHandler} from "./BaseHandler";
import {Handler} from "./Handler";

type RawData = {
  type: string
}

export class JsonHandler extends BaseHandler {
  constructor(handler: Handler) {
    super(handler)
    // this.registerHandlers();
  }

  private registerHandlers = () => {
    this.canvas.on('object:modified', this.onObjectModified.bind(this));
  }

  private onObjectModified() {
    const jsonData = this.jsonToRawData(this.canvas.getObjects());
    console.log(this.canvas.toJSON())
    console.log(JSON.stringify(jsonData, null, 2));
  }

  public jsonToRawData(objects: fabric.Object[], groupIds: string[] = []) {
    const rawData: RawData[] = objects.flatMap(object => {
      if (object.type === 'group') return this.jsonToRawData((object as fabric.Group).getObjects(), [nanoid(), ...groupIds]);
      return {type: object.type, groupIds, x: object.left, y: object.top, text: (object as fabric.Textbox).text}
    });
    return rawData;
  }

  public rawDataToJson(rawData: RawData[]) {
  }
}
