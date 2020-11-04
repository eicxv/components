import { useRef, useCallback, useEffect } from "react";

const debounceImpl = (cb, delay) => {
  let isDebounced = null;
  return (...args) => {
    clearTimeout(isDebounced);
    isDebounced = setTimeout(() => cb(...args), delay);
  };
};

export default function useDebounce(cb, delay) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    debounceImpl((...args) => cbRef.current(...args), delay),
    [delay]
  );
}
