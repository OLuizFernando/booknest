test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.database.max_connections).toBeDefined();
  expect(responseBody.database.opened_connections).toBeDefined();
  expect(responseBody.database.version).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.database.max_connections).toBe("100");
  expect(responseBody.database.opened_connections).toBe("1");

  const databaseVersion =
    "PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit";
  expect(responseBody.database.version).toBe(databaseVersion);
});
