import { useEffect, useRef } from "react";

export const useUpdateEffect = (effect, deps) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
