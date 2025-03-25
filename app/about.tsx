import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Página Sobre</Text>
      <Button title="Ver personagens" onPress={() => router.push("/personagens/")} />
    </View>
  );
}
