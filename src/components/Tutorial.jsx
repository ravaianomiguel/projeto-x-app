import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTema } from "../context/TemaContext";
import { getUsuario } from "../utils/apiAccess";

export default function Tutorial({ tutorial }) {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const load = async () => {
      const uId = tutorial.usuarioId;
      if (uId) {
        const data = await getUsuario(uId);
        setUsuario(data);
      }
    };
    load();
  }, [tutorial.usuarioId]);

  const autor = usuario ? usuario.username : ("...");

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push("/tutorial/" + tutorial.id)}
    >
      <Text style={styles.titulo}>{tutorial.title}</Text>
      <Text style={styles.autor}>por @{autor}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {tutorial.content}
      </Text>
    </Pressable>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: cores.borda,
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
      color: cores.textoMuted,
      marginVertical: 2,
    },
    preview: {
      color: cores.textoSecondary,
    },
  });
}