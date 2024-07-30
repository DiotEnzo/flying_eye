import axios from "axios";

export class controllerFlyingEye {
  public async fetchDevices() {
    console.log("fetch");
    const url = "/api/device";
    const bearerToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZmVkb2NrX3VzZXIifQ.-fJpasraNiTSKlM9grE3eeGDGkeqnoNielFFL1wlwiQ";

    var devices: any[] = [];
    const urlDevices = url + "?ConId=" + 1;

    try {
      await axios
        .get(urlDevices, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((response) => {
          devices = response.data;
        });
    } catch (error) {}

    return devices;
  }
}
