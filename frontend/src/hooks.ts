import { useDispatch, useSelector } from "react-redux";
import type { RaccoonStoreDispatch, RaccoonStoreState } from "./stores/store";

export const useAppDispatch = useDispatch.withTypes<RaccoonStoreDispatch>();
export const useAppSelector = useSelector.withTypes<RaccoonStoreState>();
