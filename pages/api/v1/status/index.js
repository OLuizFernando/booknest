import database from "/infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SELECT version();");

  const openedDatabaseConnections = await database.query(
    "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity WHERE state = 'active';",
  );

  const maxDatabaseConnections = await database.query("SHOW max_connections;");

  response.status(200).json({
    updated_at: updatedAt,
    database: {
      max_connections: maxDatabaseConnections.rows[0].max_connections,
      opened_connections: openedDatabaseConnections.rows[0].opened_connections,
      version: databaseVersion.rows[0].version,
    },
  });
}

export default status;
