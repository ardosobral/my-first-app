const API_HOST = "https://dattebayo-api.onrender.com";

export async function fetchCharacters() {
  try {
    const response = await fetch(`${API_HOST}/characters`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return [];
  }
}
