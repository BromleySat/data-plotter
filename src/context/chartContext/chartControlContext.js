import { useState, createContext, useContext } from "react";

const useChartControl = () => {
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");

  return {
    left,
    setLeft: (left) => setLeft(left),
    right,
    setRight: (right) => setRight(right),
    refAreaLeft,
    setRefAreaLeft: (refAreaLeft) => setRefAreaLeft(refAreaLeft),
    refAreaRight,
    setRefAreaRight: (refAreaRight) => setRefAreaRight(refAreaRight),
  };
};

const ChartControlContext = createContext(null);

export const ChartControlProvider = ({ children }) => (
  <ChartControlContext.Provider value={useChartControl()}>
    {children}
  </ChartControlContext.Provider>
);

export const useLeft = () => useContext(ChartControlContext).left;
export const useSetLeft = () => useContext(ChartControlContext).setLeft;
export const useRight = () => useContext(ChartControlContext).right;
export const useSetRight = () => useContext(ChartControlContext).setRight;
export const useRefAreaLeft = () => useContext(ChartControlContext).refAreaLeft;
export const useSetRefAreaLeft = () =>
  useContext(ChartControlContext).setRefAreaLeft;
export const useRefAreaRight = () =>
  useContext(ChartControlContext).refAreaRight;
export const useSetRefAreaRight = () =>
  useContext(ChartControlContext).setRefAreaRight;
