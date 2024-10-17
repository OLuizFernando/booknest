test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Object.keys(responseBody).length).toBe(2);
  expect(Object.keys(responseBody.dependencies).length).toBe(1);
  expect(Object.keys(responseBody.dependencies.database).length).toBe(3);

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  expect(responseBody.dependencies.database.version).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connections).toBe(1);
  expect(responseBody.dependencies.database.version).toBe("16.0");
});
