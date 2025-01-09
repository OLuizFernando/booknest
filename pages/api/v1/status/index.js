import database from "/infra/database.js";
import { InternalServerError } from "/infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersion = await database.query("SHOW server_version;");

    const databaseName = process.env.POSTGRES_DB;
    const openedDatabaseConnections = await database.query({
      text: "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    const maxDatabaseConnections = await database.query(
      "SHOW max_connections;",
    );

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          max_connections: parseInt(
            maxDatabaseConnections.rows[0].max_connections,
          ),
          opened_connections: parseInt(
            openedDatabaseConnections.rows[0].opened_connections,
          ),
          version: databaseVersion.rows[0].server_version,
        },
      },
    });
  } catch (err) {
    const publicErrorObject = new InternalServerError({
      cause: err,
    });

    console.log("\n Erro dentro do catch do controller:");
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

export default status;
