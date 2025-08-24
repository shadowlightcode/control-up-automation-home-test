import { expect } from "@playwright/test";
import { test } from "../../fixtures";
import ApiService from "../../api/api-service";
import Airport from "../../api/interfaces/airport";
import AirportDistance from "../../api/interfaces/airport-distance";

let apiService: ApiService;

test.describe("API Suite", () => {
  test.beforeEach(async ({ request }) => {
    apiService = new ApiService(request);
  });

  /**
   * Scenario 1: Verify Airport Count
   * 1. Send a GET request to the endpoint https://airportgap.com/api/airports.
   * 2. Verify that the response contains exactly 30 airports.
   */

  test("Verify Airport Count", async () => {
    const airports = await apiService.getAirports();
    expect(airports.length, {
      message: "Verify the response contains exactly 30 airports.",
    }).toEqual(30);
  });

  /**
   * Scenario 2: Verify Specific Airports
   * 1. Send a GET request to the endpoint https://airportgap.com/api/airports.
   * 2. Verify that the response includes the following airports:
   * ○ Akureyri Airport
   * ○ St. Anthony Airport
   * ○ CFB Bagotville
   */

  test("Verify Specific Airports", async () => {
    const airports: Airport[] = await apiService.getAirports();

    const requiredAirports = [
      "Akureyri Airport",
      "St. Anthony Airport",
      "CFB Bagotville",
    ];
    const airportNames = airports.map((a) => a.attributes.name);

    for (const name of requiredAirports) {
      expect(airportNames).toContain(name);
    }
  });

  /**
   * Scenario 3: Verify Distance Between Airports
   * 1. Send a POST request to the endpoint https://airportgap.com/api/airports/distance
   * with parameters for the airports KIX and NRT.
   * Verify that the calculated distance between these airports is greater than 400 km.
   */

  test("Verify Distance Between Airports", async () => {
    const distance: AirportDistance = await apiService.postAirportsDistance(
      "KIX",
      "NRT",
    );
    expect(distance.attributes.kilometers, {
      message:
        "Verify the calculated distance between these airports is greater than 400 km",
    }).toBeGreaterThan(400);
  });
});
