import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <MaxConnections />
      <OpenedConnections />
      <PostgresVersion />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}

function MaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let MaxConnectionsText = "Carregando...";

  if (!isLoading && data) {
    MaxConnectionsText = data.dependencies.database.max_connections;
  }

  return <div>Conexões máximas do banco de dados: {MaxConnectionsText}</div>;
}

function OpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let OpenedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    OpenedConnectionsText = data.dependencies.database.opened_connections;
  }

  return <div>Conexões abertas no banco de dados: {OpenedConnectionsText}</div>;
}

function PostgresVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let PostgresVersionText = "Carregando...";

  if (!isLoading && data) {
    PostgresVersionText = data.dependencies.database.version;
  }

  return <div>Versão do banco de dados: {PostgresVersionText}</div>;
}
