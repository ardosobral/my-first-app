import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Componente montado!");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem-vindo ao meu App!</Text>
      <Text>Contador: {count}</Text>
      <Button title="Aumentar" onPress={() => setCount(count + 1)} />
      <Button title="Ir para Sobre" onPress={() => router.push("/about")} />
    </View>
  );
}
