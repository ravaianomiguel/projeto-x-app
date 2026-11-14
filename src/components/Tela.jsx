import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTema } from "../context/TemaContext";

export default function Tela({ children, voltar = false }) {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

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

function criarEstilos(cores) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    conteudo: {
      padding: 16,
    },
    voltar: {
      alignSelf: "flex-start",
      marginBottom: 12,
    },
  });
}
