import { Pressable, StyleSheet, Text } from "react-native";
import { cores } from "../data/cores";

// Botão simples reutilizado nas telas.
// Props: titulo (texto) e onPress (função chamada ao tocar).
export default function Botao({ titulo, onPress }) {
  return (
    <Pressable style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  texto: {
    color: "white",
    fontWeight: "bold",
  },
});