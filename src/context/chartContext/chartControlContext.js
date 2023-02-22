import { useState, createContext, useContext } from "react";

const useChartControl = () => {
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [dataLocalStorageToggle, setDataLocalStorageToggle] = useState(false);
  const [data, setData] = useState([]);

  return {
    left,
    setLeft: (payload) => setLeft(payload),
    right,
    setRight: (payload) => setRight(payload),
    refAreaLeft,
    setRefAreaLeft: (payload) => setRefAreaLeft(payload),
    refAreaRight,
    setRefAreaRight: (payload) => setRefAreaRight(payload),
    dataLocalStorageToggle,
    setDataLocalStorageToggle: (payload) => setDataLocalStorageToggle(payload),
    data,
    setData: (payload) => setData([...data, payload]),
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
export const useDataLocalStorageToggle = () =>
  useContext(ChartControlContext).dataLocalStorageToggle;
export const useSetDataLocalStorageToggle = () =>
  useContext(ChartControlContext).setDataLocalStorageToggle;
export const useData = () => useContext(ChartControlContext).data;
export const useSetData = () => useContext(ChartControlContext).setData;
