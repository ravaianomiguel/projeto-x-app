import { useLocalSearchParams, useRouter } from "expo-router"; // [NÃO BÁSICO] ver profile/[user].jsx e components/Tela.jsx
import { Pressable, StyleSheet, Text } from "react-native";
import Botao from "../../../components/Botao";
import Tela from "../../../components/Tela";
import { cores } from "../../../data/cores";
import { getTutorial, interacoesDoTutorial } from "../../../data/mock";

// Tutorial completo: rota /tutorial/<id>.
// Mostra o conteúdo, link para o autor e botão para ver as fotos (interações).
export default function TutorialPagina() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const tutorial = getTutorial(id);

  if (!tutorial) {
    return (
      <Tela voltar>
        <Text>Tutorial não encontrado: {id}</Text>
      </Tela>
    );
  }

  const quantidade = interacoesDoTutorial(id).length;

  return (
    <Tela voltar>
      <Text style={styles.titulo}>{tutorial.title}</Text>
      <Pressable onPress={() => router.push("/profile/" + tutorial.username)}>
        <Text style={styles.autor}>por @{tutorial.username}</Text>
      </Pressable>
      <Text style={styles.conteudo}>{tutorial.content}</Text>
      <Botao
        titulo={"Ver fotos de quem fez (" + quantidade + ")"}
        onPress={() => router.push("/tutorial/" + id + "/pictures")}
      />
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.primaria,
    fontSize: 22,
    fontWeight: "bold",
  },
  autor: {
    color: cores.primaria,
    marginVertical: 6,
  },
  conteudo: {
    marginVertical: 12,
    lineHeight: 22,
  },
});