exports.handler = async function(event) {
  try {
    const token = process.env.FOOTBALL_DATA_TOKEN;

    if (!token) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          erro: "FOOTBALL_DATA_TOKEN não configurado no Netlify."
        })
      };
    }

    const params = event.queryStringParameters || {};
    const season = params.season || "2026";
    const competition = params.competition || "WC";

    const url = `https://api.football-data.org/v4/competitions/${competition}/matches?season=${season}`;

    const resposta = await fetch(url, {
      headers: {
        "X-Auth-Token": token,
        "Accept": "application/json"
      }
    });

    const dados = await resposta.json();

    return {
      statusCode: resposta.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(dados)
    };
  } catch (erro) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        erro: "Erro ao buscar dados da Football-Data.",
        detalhes: erro.message
      })
    };
  }
};
