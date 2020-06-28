import {AnyObject} from "../models/common.models";

export function removeEmptyProperties(obj: AnyObject): AnyObject {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != undefined && value !== ''))
}
