import { RenderLine } from "../../helpers/chart/renderLine";

describe("Testing of displaying the chart", () => {
  const initialData = [
    {
      deviceId: "5db0576beed54eb3aa4722c5bef18db5",
      date: "2022-05-12T06:22:00.2446632Z",
      temperatureC: 6,
      temperatureF: 42,
      time: "10:57:23",
    },
    {
      deviceId: "5db0576beed54eb3aa4722c5bef18db5",
      date: "2022-05-12T06:22:00.2446632Z",
      temperatureC: 77,
      temperatureF: 23,
      time: "08:07:24",
    },
  ];

  it("should have the same length as the initial data", () => {
    const view = RenderLine(initialData);
    expect(view.length).toEqual(initialData.length);
  });

  it("should exclude time column", () => {
    const view = RenderLine(initialData);
    const time = view.find((item) => item.props.dataKey === "time");
    expect(time).toBeUndefined();
  });
});
