import { StyleSheet, Text } from "react-native";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { cores } from "../data/cores";
import { tutoriais } from "../data/mock";

// Aba "Home": feed com todos os tutoriais.
export default function Index() {
  return (
    <Tela>
      <Text style={styles.titulo}>Feed</Text>
      {tutoriais.map((t) => (
        <Tutorial key={t.id} tutorial={t} />
      ))}
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.primaria,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
});