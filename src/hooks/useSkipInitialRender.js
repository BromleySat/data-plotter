import { useEffect, useRef } from "react";

const useSkipInitialRender = () => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    }
  }, []);

  return initialRender;
};

export default useSkipInitialRender;
