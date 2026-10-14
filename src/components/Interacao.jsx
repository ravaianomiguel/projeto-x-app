import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver Tela.jsx, nota 2
import { Pressable, StyleSheet, Text, View } from "react-native";
import { cores } from "../data/cores";
import { getTutorial } from "../data/mock";
import Foto from "./Foto";

// Uma interação: quem seguiu o tutorial, a descrição e as N fotos do resultado.
// Usada na tela de fotos do tutorial e no perfil do usuário.
// Props:
//   interacao      = { id, tutorialID, username, desc, fotos }
//   mostrarAutor   = mostra "@username" (link para o perfil)       (padrão: true)
//   mostrarTutorial = mostra "em: título" (link para o tutorial)   (padrão: true)
export default function Interacao({ interacao, mostrarAutor = true, mostrarTutorial = true }) {
  const router = useRouter();
  const tutorial = getTutorial(interacao.tutorialID);

  return (
    <View style={styles.card}>
      {mostrarAutor && (
        <Pressable onPress={() => router.push("/profile/" + interacao.username)}>
          <Text style={styles.link}>@{interacao.username}</Text>
        </Pressable>
      )}
      {mostrarTutorial && tutorial && (
        <Pressable onPress={() => router.push("/tutorial/" + tutorial.id)}>
          <Text style={styles.link}>em: {tutorial.title}</Text>
        </Pressable>
      )}
      <Text style={styles.desc}>{interacao.desc}</Text>
      <View style={styles.fotos}>
        {interacao.fotos.map((f) => (
          <Foto key={f} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  link: {
    color: cores.primaria,
    marginBottom: 2,
  },
  desc: {
    marginVertical: 8,
  },
  fotos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});