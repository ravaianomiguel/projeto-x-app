import { Ionicons } from "@expo/vector-icons"; // [NÃO BÁSICO] ver nota 3
import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver nota 2
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // [NÃO BÁSICO] ver nota 1
import { cores } from "../data/cores";
 
export default function Tela({ children, voltar = false }) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        {voltar && (
          <Pressable
            style={styles.voltar}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={24} color={cores.primaria} />
          </Pressable>
        )}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
  },
  conteudo: {
    padding: 16,
  },
  voltar: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
});
