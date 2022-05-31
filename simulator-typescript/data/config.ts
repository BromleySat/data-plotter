interface Data {
  deviceId: string;
  version: string;
}

export function getDeviceIdandVersion(): Data {
  return {
    deviceId: "Simulator-NodeJs-Typescript-Local",
    version: "v1.0.0",
  };
}
