import { useState, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { useTema } from "../context/TemaContext";
import { getTutoriais } from "../utils/apiAccess";
import { storageGet } from "../utils/secureStore";

export default function Index() {
  const router = useRouter()
  const { cores } = useTema()
  const styles = useMemo(() => criarEstilos(cores), [cores])
  const [tutoriais, setTutoriais] = useState(null)
  const [logado, setLogado] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const resLogado = await storageGet("logado")
        setLogado(resLogado.ok && !!resLogado.val)

        const data = await getTutoriais()
        setTutoriais(data)
      }
      load()
    }, [])
  )
  return (
    <View style={styles.container}>
      <Tela>
        <Text style={styles.titulo}>Feed</Text>
        {tutoriais ? tutoriais.map((t) => (
          <Tutorial key={t.id} tutorial={t} />
        )) : <Text style={styles.texto}>Carregando...</Text>}
      </Tela>
      {logado && (
        <Pressable
          style={styles.botaoFlutuante}
          accessibilityRole="button"
          accessibilityLabel="Criar tutorial"
          onPress={() => router.push("/tutorial/new")}
        >
          <Ionicons name="add" size={32} color={cores.botaoTexto} />
        </Pressable>
      )}
    </View>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    titulo: {
      color: cores.primaria,
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
    },
    texto: {
      color: cores.texto,
    },
    botaoFlutuante: {
      position: "absolute",
      right: 24,
      bottom: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: cores.botaoFundo,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
      shadowColor: cores.sombra,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  });
}