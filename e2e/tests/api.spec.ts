import { test, expect } from "@playwright/test";

test.describe("Backend API Integration", () => {
  const expectedColors = [
    { name: "Turquoise", hex: "#1abc9c" },
    { name: "Red", hex: "#e74c3c" },
    { name: "Yellow", hex: "#f1c40f" },
  ];

  for (const color of expectedColors) {
    test(`GET /api/colors/${color.name} should return the correct hex code`, async ({ request }) => {
      // The request fixture automatically uses baseURL (http://localhost:3000)
      // The React proxy handles forwarding /api/colors/:name to the backend (port 5001)
      const response = await request.get(`/api/colors/${color.name}`);
      
      // Verify HTTP status code
      expect(response.status()).toBe(200);

      // Verify content type
      expect(response.headers()["content-type"]).toContain("application/json");

      // Parse the JSON payload
      const data = await response.json();

      // Verify exact object schema and returned values
      expect(data).toEqual(
        expect.objectContaining({ name: color.name, hex: color.hex })
      );
    });
  }
});
