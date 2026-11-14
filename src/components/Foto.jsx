import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTema } from "../context/TemaContext";
import { fotoUri } from "../utils/foto";

export default function Foto({ picture, tamanho = 90 }) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  if (!picture) {
    return (
      <View style={[styles.foto, { width: tamanho, height: tamanho }]}>
        <Text style={styles.texto}>foto</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: fotoUri(picture) }}
      style={[styles.foto, { width: tamanho, height: tamanho }]}
    />
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    foto: {
      backgroundColor: cores.superficieAlt,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    texto: {
      color: cores.textoMuted,
    },
  });
}
