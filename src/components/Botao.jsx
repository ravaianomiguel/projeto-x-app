import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTema } from "../context/TemaContext";

export default function Botao({ titulo, onPress }) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    botao: {
      backgroundColor: cores.botaoFundo,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      marginVertical: 6,
    },
    texto: {
      color: cores.botaoTexto,
      fontWeight: "bold",
    },
  });
}
