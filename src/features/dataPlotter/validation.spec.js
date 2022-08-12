import { validateInput, getApiList, isLocalIp } from "./validation.js";

describe("Testing local IP logic", () => {
  it("tests 10.0.0.0 input value", () => {
    const input = "10.0.0.0";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests 172.16.0.0 input value", () => {
    const input = "172.16.0.0";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests 192.168.0.0 input value", () => {
    const input = "192.168.0.0";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests recognising a known local IP", () => {
    const input = "192.168.1.95";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests 172.15.255.255 input value", () => {
    const input = "172.15.255.255";
    expect(isLocalIp(input)).toBe(false);
  });
  it("tests 192.167.255.255 input value", () => {
    const input = "192.167.255.255";
    expect(isLocalIp(input)).toBe(false);
  });
  it("tests 10.255.255.255 input value", () => {
    const input = "10.255.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests 172.31.255.255 input value", () => {
    const input = "172.31.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests 192.168.255.255 input value", () => {
    const input = "192.168.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("tests recognising public IP as public 146.199.86.133", () => {
    const input = "146.199.86.133";
    expect(isLocalIp(input)).toBe(false);
  });
  it("tests recognising public IP as public 2.98.79.218", () => {
    const input = "2.98.79.218";
    expect(isLocalIp(input)).toBe(false);
  });
});

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
  it("should allow a known URL", () => {
    const input = "localhost:3080/api/random-data";
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

describe("Testing Api List Generation", () => {
  it("should generate Api", () => {
    const input = "localhost:3080/random-data";
    expect(getApiList(input)).toEqual(["http://localhost:3080/random-data"]);
  });
  it("should generate two Api's", () => {
    const input = "localhost:3080/random-data, localhost:3090/random-data";
    expect(getApiList(input)).toEqual([
      "http://localhost:3080/random-data",
      "http://localhost:3090/random-data",
    ]);
  });
  it("should generate https for domain names", () => {
    const input =
      "127.0.0.1:3080/random-data,localhost:3081/random-data, data.bromleysat.space/random-data";
    expect(getApiList(input)).toEqual([
      "http://127.0.0.1:3080/random-data",
      "http://localhost:3081/random-data",
      "https://data.bromleysat.space/random-data",
    ]);
  });
  it("should generate a mixture of local and public", () => {
    const input =
      "192.168.1.95/data, 192.168.1.96/data, localhost:3080/data, localhost:3090/data, 12.0.0.1/random-data";
    expect(getApiList(input)).toEqual([
      "http://192.168.1.95/data",
      "http://192.168.1.96/data",
      "http://localhost:3080/data",
      "http://localhost:3090/data",
      "http://12.0.0.1/random-data",
    ]);
  });
  it("should generate two Api's when input contains extra spaces", () => {
    const input =
      "    localhost:3080/random-data,     localhost:3090/random-data";
    expect(getApiList(input)).toEqual([
      "http://localhost:3080/random-data",
      "http://localhost:3090/random-data",
    ]);
  });
});
