import { useLocalSearchParams, useFocusEffect, useRouter } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import Botao from "../../../components/Botao";
import Interacao from "../../../components/Interacao";
import Tela from "../../../components/Tela";
import { useTema } from "../../../context/TemaContext";
import { getTutorial, interacoesDoTutorial } from "../../../utils/apiAccess";


export default function Interactions() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
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
      <Text style={styles.titulo}>Interações de "{tutorial ? tutorial.title : id}"</Text>
      <Botao
        titulo="Interagir"
        onPress={() => router.push("/tutorial/" + id + "/newInteraction")}
      />
      {interacoes ? (
        interacoes.length === 0 ? (
          <Text style={styles.texto}>Ninguém postou ainda.</Text>
        ) : (
          interacoes.map((i) => (
            <Interacao key={i.id} interacao={i} mostrarTutorial={false} />
          ))
        )
      ) : (
        <Text style={styles.texto}>Carregando...</Text>
      )}
    </Tela>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    titulo: {
      color: cores.primaria,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
    },
    texto: {
      color: cores.texto,
    },
  });
}
