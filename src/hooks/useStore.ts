import {useContext} from "react";
import {StoreContext} from "../App";
import {GlobalState} from "../models/store.model";

export function useDispatch() {
  const context = useContext(StoreContext)
  return context.dispatch;
}

export function useSelector<T>(selector: (state: GlobalState) => T): T {
  const state = useContext(StoreContext).state;
  return selector(state);
}
