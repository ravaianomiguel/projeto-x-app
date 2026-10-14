import { useLocalSearchParams } from "expo-router"; // [NÃO BÁSICO] ver profile/[user].jsx
import { StyleSheet, Text } from "react-native";
import Interacao from "../../../components/Interacao";
import Tela from "../../../components/Tela";
import { cores } from "../../../data/cores";
import { getTutorial, interacoesDoTutorial } from "../../../data/mock";

// Fotos de um tutorial: rota /tutorial/<id>/pictures.
// Lista as interações (autor + descrição + fotos) de quem seguiu o tutorial.
export default function Pictures() {
  const { id } = useLocalSearchParams();
  const tutorial = getTutorial(id);
  const interacoes = interacoesDoTutorial(id);

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Fotos de "{tutorial ? tutorial.title : id}"</Text>
      {interacoes.length === 0 && <Text>Ninguém postou ainda.</Text>}
      {interacoes.map((i) => (
        <Interacao key={i.id} interacao={i} mostrarTutorial={false} />
      ))}
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.primaria,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});