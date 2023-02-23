import { useState, createContext, useContext } from "react";

const useChartControl = () => {
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [dataLocalStorageToggle, setDataLocalStorageToggle] = useState(false);
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [refreshRate, setRefreshRate] = useState(5000);
  const [dataRetention, setDataRentention] = useState(1814400000);
  const [chartTimeWindow, setChartTimeWindow] = useState(30000);

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
    setData: (data, payload = {}) => setData([...data, payload]),
    visibleData,
    setVisibleData: (visibleData, payload = {}) =>
      setVisibleData([...visibleData, payload]),
    refreshRate,
    setRefreshRate: (payload) => setRefreshRate(payload),
    dataRetention,
    setDataRetention: (payload) => setDataRentention(payload),
    chartTimeWindow,
    setChartTimeWindow: (payload) => setChartTimeWindow(payload),
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
export const useVisibleData = () => useContext(ChartControlContext).visibleData;
export const useSetVisibleData = () =>
  useContext(ChartControlContext).setVisibleData;
export const useRefreshRate = () => useContext(ChartControlContext).refreshRate;
export const useSetRefreshRate = () =>
  useContext(ChartControlContext).setRefreshRate;
export const useDataRetention = () =>
  useContext(ChartControlContext).dataRetention;
export const useSetDataRetention = () =>
  useContext(ChartControlContext).setDataRetention;
export const useChartTimeWindow = () =>
  useContext(ChartControlContext).chartTimeWindow;
export const useSetChartTimeWindow = () =>
  useContext(ChartControlContext).setChartTimeWindow;
