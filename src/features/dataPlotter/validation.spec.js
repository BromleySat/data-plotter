import { validateInput, getApiList, isLocalIp } from "./validation.js";

// describe("Testing local IP logic", () => {
//   it("a", () => {
//     const input = "10.0.0.0";
//     expect(isLocalIp(input)).toBe(true);
//   });
//   it("b", () => {
//     const input = "172.16.0.0";
//     expect(isLocalIp(input)).toBe(true);
//   });
//   it("...", () => {
//     const input = "192.168.0.0";
//     expect(isLocalIp(input)).toBe(true);
//   });
//   it("...", () => {
//     const input = "172.15.255.255";
//     expect(isLocalIp(input)).toBe(false);
//   });
//   it("...", () => {
//     const input = "192.167.255.255";
//     expect(isLocalIp(input)).toBe(false);
//   });
//   it("...", () => {
//     const input = "10.255.255.255";
//     expect(isLocalIp(input)).toBe(true);
//   });
//   it("...", () => {
//     const input = "172.31.255.255";
//     expect(isLocalIp(input)).toBe(true);
//   });
//   it("...", () => {
//     const input = "192.168.255.255";
//     expect(isLocalIp(input)).toBe(true);
//   });
// });

describe("Testing Validation Of The Api List Input", () => {
  it("should not allow special characters", () => {
    const input = "localhost:3080/¯(ツ)/¯random-data";
    expect(validateInput(input)).toBe(false);
  });
  // it("should not allow public ip CIDR ", () => {
  //   const input = "23.44.35.77/24";
  //   expect(validateInput(input)).toBe(false);
  // });
  // it("should allow CIDR range for local ips ", () => {
  //   const input = "192.44.35.77/24";
  //   expect(validateInput(input)).toBe(true);
  // });
  it("should allow multiple entries ", () => {
    const input = "localhost:3080/random-data, localhost:3090/random-data";
    expect(validateInput(input)).toBe(true);
  });
  it("should not allow invalid multiple entries", () => {
    const input = "localhost:3080/random-data, :)localhost:3090/random-data";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow invalid three entries", () => {
    const input = ":), :/, :P";
    expect(validateInput(input)).toBe(false);
  });
  it("should allow double and triple spaces", () => {
    const input =
      "     localhost:3080/random-data,    localhost:3090/random-data";
    expect(validateInput(input)).toBe(true);
  });
  it("should not allow users to forget comma", () => {
    const input =
      "     localhost:3080/random-data    localhost:3090/random-data";
    expect(validateInput(input)).toBe(false);
  });
  it("should allow domain names", () => {
    const input = "api.bromleysat.space/servo";
    expect(validateInput(input)).toBe(true);
  });
  it("should not allow invalid domain names", () => {
    const input = "apibromleysatspace/servo";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow long urls", () => {
    const input =
      "ewqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsahdaethethdahbcbskjfkdgjkfdgjirjrgkfxgvkxcvidfjgort9jgxigsidgfjocalhost:3080/random-data";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow very short urls", () => {
    const input = "loasd";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow only one character", () => {
    const input = "a";
    expect(validateInput(input)).toBe(false);
  });
});

// describe("Testing Api List Generation", () => {
//   it("should ... ", () => {
//     const input = "localhost:3080/random-data";
//     expect(getApiList(input)).toEqual(["http://localhost:3080/random-data"]);
//   });

//   it("should generate two ips ", () => {
//     const input = "localhost:3080/random-data, localhost:3090/random-data";
//     expect(getApiList(input)).toEqual([
//       "http://localhost:3080/random-data",
//       "localhost:3090/random-data",
//     ]);
//   });
// });
