import {AnyObject} from "../models/common.models";

const blackList = [undefined, null, ''];

export function removeEmptyProperties(obj: AnyObject): AnyObject {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => !blackList.includes(value)))
}
