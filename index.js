const API_HOST = "https://dattebayo-api.onrender.com";

async function recuperarPersonagens() {
    try {
        const response = await fetch(`${API_HOST}/characters`);

        if (!response.ok) {
            throw new Error("Erro na requisição")
        }
        
        let personagens = await response.json(); 
        return personagens.characters;
    } catch (erro) {
        console.error("Erro ao buscar personagens: " + erro);
        return [];
    }
}

recuperarPersonagens().then((response) => {
    console.log(response[0]);
})
