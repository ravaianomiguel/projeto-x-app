import { useLocalSearchParams, useFocusEffect } from "expo-router"; // [NÃO BÁSICO] ver profile/[user].jsx
import { useState, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import Interacao from "../../../components/Interacao";
import Tela from "../../../components/Tela";
import { cores } from "../../../data/cores";
import { getTutorial, interacoesDoTutorial } from "../../../utils/apiAccess";

// Fotos de um tutorial: rota /tutorial/<id>/pictures.
// Lista as interações (autor + descrição + fotos) de quem seguiu o tutorial.
export default function Pictures() {
  const { id } = useLocalSearchParams();
  const [tutorial, setTutorial] = useState(null);
  const [interacoes, setInteracoes] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const tut = await getTutorial(id);
        const ints = await interacoesDoTutorial(id);
        setTutorial(tut);
        setInteracoes(ints);
      };
      load();
    }, [id])
  );

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Fotos de "{tutorial ? tutorial.title : id}"</Text>
      {interacoes ? (
        interacoes.length === 0 ? (
          <Text>Ninguém postou ainda.</Text>
        ) : (
          interacoes.map((i) => (
            <Interacao key={i.id} interacao={i} mostrarTutorial={false} />
          ))
        )
      ) : (
        <Text>Carregando...</Text>
      )}
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