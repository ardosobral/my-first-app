import { fetchCharacters } from "@/services/dattebayo-api/personagens/list";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from "react-native";

interface Personagem {
    id: number;
    name: string;
    images: [string]
}

export default function Personagens() {
    const router = useRouter();
    const [personagens, setPersonagens] = useState<Personagem[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarPersonagens() {
            const dados = await fetchCharacters();
            setPersonagens(dados.characters)
            setCarregando(false)
        }

        carregarPersonagens();
    }, []);

    if (carregando) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text>Página de detalhes</Text>
            <FlatList
                data={personagens}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push(`/personagens/${item.id}`)}
                        >
                            <Image source={{uri: item.images[0]}} style={styles.image}/>
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={{justifyContent: "center", alignItems: "center", marginTop:10}}>
                <Button 
                    title="Voltar" 
                    onPress={() => {router.push('/about')}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15,
    },
    card: {
        backgroundColor: "#F4F4F4",
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    }
});
