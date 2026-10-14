import { View, Text, StyleSheet } from "react-native";

// Uma foto. Por enquanto é só um quadrado cinza (sem imagem real).
// Props: tamanho (lado do quadrado, padrão 90).
//
// Quando houver imagem de verdade, trocar o <View> por:
//   <Image source={{ uri: foto.picture }} style={{ width: tamanho, height: tamanho }} />
// (Image também é um componente básico do react-native.)
export default function Foto({ tamanho = 90 }) {
  return (
    <View style={[styles.foto, { width: tamanho, height: tamanho }]}>
      <Text style={styles.texto}>foto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  foto: {
    backgroundColor: "#e4e4e7",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    color: "#71717a",
  },
});