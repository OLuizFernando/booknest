import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const respondeBody = await response.json();

      expect(Array.isArray(respondeBody)).toBe(true);
      expect(respondeBody.length).toBeGreaterThan(0);
    });
  });
});
