import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, Button } from "react-native";
import { fetchPersonagemById } from "@/services/dattebayo-api/personagens/details";

interface Personagem {
    id: number;
    name: string;
    images: [string];
    jutsu: [string];
}

export default function Details() {
    const router = useRouter();
    const { id, jutsu } = useLocalSearchParams(); // Obtém o ID da URL
    const [personagem, setPersonagem] = useState<Personagem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPersonagem() {
            if (!id) {
                return;
            } 
            const data = await fetchPersonagemById(id as string);
            setPersonagem(data);
            setLoading(false);
        }

        loadPersonagem();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!personagem) {
        return <Text style={styles.errorText}>Personagem não encontrado!</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{personagem.name}</Text>
            <Image source={{ uri: personagem.images[0] }} style={styles.image} />
            <Text style={{fontWeight:"bold"}}>Jutsus:</Text>
            <FlatList
                data={personagem.jutsu}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View>
                        <Text>- {item}</Text>
                    </View>
                )}
            />
            <Button title="Voltar" onPress={() => router.push("/personagens/")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: "center", 
        padding: 20 
    },
    image: { 
        width: 200, 
        height: 200, 
        borderRadius: 10, 
        marginBottom: 20 
    },
    name: { 
        fontSize: 24, 
        fontWeight: "bold" 
    },
    village: { 
        fontSize: 18, 
        color: "gray" 
    },
    errorText: { 
        textAlign: "center", 
        fontSize: 18, 
        color: "red", 
        marginTop: 20 
    },
});
