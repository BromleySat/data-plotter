import {
  validateInput,
  getApiList,
  isLocalIp,
} from "../../helpers/textBox/validation";

describe("Testing local IP logic", () => {
  it("should return true for IP address: 10.0.0.0", () => {
    const input = "10.0.0.0";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should return true for IP address: 172.16.0.0", () => {
    const input = "172.16.0.0";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should return true for IP address: 192.168.0.0", () => {
    const input = "192.168.0.0";
    expect(isLocalIp(input)).toBe(true);
  });

  it("should return true for IP address: 10.255.255.255", () => {
    const input = "10.255.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should return true for IP address: 172.31.255.255", () => {
    const input = "172.31.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should return true for IP address: 192.168.255.255", () => {
    const input = "192.168.255.255";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should recognise a known local IP", () => {
    const input = "192.168.1.95";
    expect(isLocalIp(input)).toBe(true);
  });
  it("should return false for IP address: 172.15.255.255", () => {
    const input = "172.15.255.255";
    expect(isLocalIp(input)).toBe(false);
  });
  it("should return false for IP address: 192.167.255.255", () => {
    const input = "192.167.255.255";
    expect(isLocalIp(input)).toBe(false);
  });

  it("should reconginse public IP 146.199.86.133 as public", () => {
    const input = "146.199.86.133";
    expect(isLocalIp(input)).toBe(false);
  });
  it("should reconginse public IP 2.98.79.218 as public", () => {
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
  it("should allow multiple entries", () => {
    const input = "localhost:3080, localhost:3090";
    expect(validateInput(input)).toBe(true);
  });
  it("should allow domain names", () => {
    const input = "api.bromleysat.space";
    expect(validateInput(input)).toBe(true);
  });
  it("should allow a known URL", () => {
    const input = "localhost:3080";
    expect(validateInput(input)).toBe(true);
  });
  it("should allow double and triple spaces", () => {
    const input = "     localhost:3080,    localhost:3090";
    expect(validateInput(input)).toBe(true);
  });
  it("should not allow invalid domain names", () => {
    const input = "apibromleysatspace/servo";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow full path", () => {
    const input = "http://localhost:3080/api/data";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow invalid multiple entries", () => {
    const input = "localhost:3080/random-data, :)localhost:3090/random-data";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow users to forget comma", () => {
    const input =
      "     localhost:3080/random-data    localhost:3090/random-data";
    expect(validateInput(input)).toBe(false);
  });
  it("should not allow empty textBox", () => {
    const input = "";
    expect(validateInput(input)).toBe(false);
  });
});

describe("Testing Api List Generation", () => {
  it("should equal [http://localhost:3080/random-data]", () => {
    const input = "localhost:3080/random-data";
    expect(getApiList(input)).toEqual(["http://localhost:3080/random-data"]);
  });
  it("should equal [http://localhost:3080/random-data, http://localhost:3090/random-data]", () => {
    const input = "localhost:3080/random-data, localhost:3090/random-data";
    expect(getApiList(input)).toEqual([
      "http://localhost:3080/random-data",
      "http://localhost:3090/random-data",
    ]);
  });
  it("should generate https for domain names", () => {
    const input =
      "172.31.255.255:3080/random-data,localhost:3081/random-data, data.bromleysat.space/random-data";
    expect(getApiList(input)).toEqual([
      "http://172.31.255.255:3080/random-data",
      "http://localhost:3081/random-data",
      "https://data.bromleysat.space/random-data",
    ]);
  });
  it("should generate a mixture of local and public IP's", () => {
    const input =
      "192.168.1.95/data, 192.168.1.96/data, localhost:3080/data, localhost:3090/data";
    expect(getApiList(input)).toEqual([
      "http://192.168.1.95/data",
      "http://192.168.1.96/data",
      "http://localhost:3080/data",
      "http://localhost:3090/data",
    ]);
  });
  it("should generate two ips with extra spaces", () => {
    const input =
      "    localhost:3080/random-data,     localhost:3090/random-data";
    expect(getApiList(input)).toEqual([
      "http://localhost:3080/random-data",
      "http://localhost:3090/random-data",
    ]);
  });
});
