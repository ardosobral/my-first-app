const API_URL = "https://dattebayo-api.onrender.com";

export async function fetchPersonagemById(id: string)
{
    try {
        const response = await fetch(`${API_URL}/characters/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar personagem: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar personagem:", error);
        return null;
    }
}
