import { validateInput, getApiList } from "./temp";

describe("Testing Validation Of The Api List Input", () => {
  it("should ... ", () => {
    const input = "localhost:3080/random-data";
    expect(validateInput(input)).toBe(true);
  });

  it("should exclude time column", () => {});
});

describe("Testing Api List Generation", () => {
  it("should ... ", () => {
    const input = "localhost:3080/random-data";
    expect(getApiList(input)).toEqual(["http://localhost:3080/random-data"]);
  });

  it("should exclude time column", () => {});
});
