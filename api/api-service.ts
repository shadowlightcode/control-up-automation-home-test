import { APIRequestContext, APIResponse } from "@playwright/test";
import Airport from "./interfaces/airport";
import AirportDistance from "./interfaces/airport-distance";

export default class ApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAirports(): Promise<Airport[]> {
    const path = "airports";
    const response: APIResponse = await this.request.get(path);
    await this.validateResponse(response, path);
    const airports: Airport[] = (await response.json()).data;

    return airports;
  }

  async postAirportsDistance(
    destinationFrom: string,
    destinationTo: string,
  ): Promise<AirportDistance> {
    const path = "airports/distance";
    const response: APIResponse = await this.request.post(path, {
      data: {
        from: destinationFrom,
        to: destinationTo,
      },
    });

    await this.validateResponse(response, path);

    const distance: AirportDistance = (await response.json()).data;

    return distance;
  }

  private async validateResponse(response: APIResponse, path: string) {
    if (!response.ok()) {
      const statusText = response.statusText();
      const responseBody = await response
        .text()
        .catch(() => "Unable to read response body");

      throw new Error(
        `GET ${path} failed with ${response.status()} ${statusText}\n` +
          `Response body: ${responseBody}`,
      );
    }
  }
}
