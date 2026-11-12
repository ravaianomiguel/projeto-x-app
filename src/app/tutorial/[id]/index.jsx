import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router"; // [NÃO BÁSICO] ver profile/[user].jsx e components/Tela.jsx
import { useState, useCallback } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Botao from "../../../components/Botao";
import Tela from "../../../components/Tela";
import { cores } from "../../../data/cores";
import { getTutorial, getUsuario, interacoesDoTutorial } from "../../../utils/apiAccess";

// Tutorial completo: rota /tutorial/<id>.
// Mostra o conteúdo, link para o autor e botão para ver as fotos (interações).
export default function TutorialPagina() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [tutorial, setTutorial] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [interacoes, setInteracoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const tut = await getTutorial(id);
        setTutorial(tut);
        if (tut && tut.usuarioId) {
          const usu = await getUsuario(tut.usuarioId);
          setUsuario(usu);
        }
        const ints = await interacoesDoTutorial(id);
        setInteracoes(ints);
        setCarregando(false);
      };
      load();
    }, [id])
  );

  if (carregando) {
    return (
      <Tela voltar>
        <Text>Carregando...</Text>
      </Tela>
    );
  }

  if (!tutorial) {
    return (
      <Tela voltar>
        <Text>Tutorial não encontrado: {id}</Text>
      </Tela>
    );
  }

  const quantidade = Array.isArray(interacoes) ? interacoes.length : 0;

  return (
    <Tela voltar>
      <Text style={styles.titulo}>{tutorial.title}</Text>
      <Pressable onPress={() => usuario && router.push("/profile/" + usuario.id)}>
        <Text style={styles.autor}>por @{usuario ? usuario.username : ""}</Text>
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