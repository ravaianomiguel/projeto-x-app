import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver Tela.jsx, nota 2
import { Pressable, StyleSheet, Text } from "react-native";
import { cores } from "../data/cores";

// Mini tutorial (card). Usado no feed, na pesquisa e no perfil.
// Props: tutorial = { id, username, title, content }
// Ao tocar, abre a tela /tutorial/[id].
export default function Tutorial({ tutorial }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push("/tutorial/" + tutorial.id)}
    >
      <Text style={styles.titulo}>{tutorial.title}</Text>
      <Text style={styles.autor}>por @{tutorial.username}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {tutorial.content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    borderLeftWidth: 4,
    borderLeftColor: cores.primaria,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  titulo: {
    color: cores.primaria,
    fontSize: 16,
    fontWeight: "bold",
  },
  autor: {
    color: "#71717a",
    marginVertical: 2,
  },
  preview: {
    color: "#3f3f46",
  },
});