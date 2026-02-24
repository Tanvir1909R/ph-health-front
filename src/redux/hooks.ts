import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TDebounce = {
  searchQuery: string;
  delay: number;
};

export const useDebounce = ({ searchQuery, delay }: TDebounce) => {
  const [debounceValue, setDebounceValue] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, searchQuery]);
  return debounceValue;
};
