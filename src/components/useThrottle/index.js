import { useRef, useCallback, useEffect } from "react";

const throttleImpl = (cb, delay) => {
  let isThrottled = false;
  return (...args) => {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => {
      cb(...args);
      isThrottled = false;
    }, delay);
  };
};

export default function useThrottle(cb, delay) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    throttleImpl((...args) => cbRef.current(...args), delay),
    [delay]
  );
}
