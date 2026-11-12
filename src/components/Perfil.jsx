import { useState, useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { cores } from "../data/cores";
import { getUsuario, interacoesDoUsuario, tutoriaisDoUsuario } from "../utils/apiAccess";
import Botao from "./Botao";
import Interacao from "./Interacao";
import Tutorial from "./Tutorial";
import { logout } from "../utils/misc";

// Conteúdo de um perfil: dados do usuário + seus tutoriais + suas interações.
// Usado em /profile/[user] (perfil de qualquer usuário) e em /me (perfil próprio).
// Props:
//   username = qual usuário mostrar
//   proprio  = true quando é o perfil do usuário logado (mostra "Editar perfil")
export default function Perfil({ id, proprio = false }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [tutoriais, setTutoriais] = useState(null);
  const [interacoes, setInteracoes] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const usu = await getUsuario(id);
        const tuts = await tutoriaisDoUsuario(id);
        const ints = await interacoesDoUsuario(id);
        setUsuario(usu);
        setTutoriais(tuts);
        setInteracoes(ints);
        setCarregando(false);
      };
      load();
    }, [id])
  );

  if (carregando) {
    return <Text>Carregando...</Text>;
  }

  if (!usuario) {
    return <Text>Usuário não encontrado: {id}</Text>;
  }

  return (
    <View>
      <View style={styles.topo}>
        <View style={styles.avatar} />
        <Text style={styles.nome}>{usuario.realname}</Text>
        <Text style={styles.username}>@{usuario.username}</Text>
        <Text style={styles.bio}>{usuario.biography}</Text>
        {proprio && 
        <View style={styles.buttons}>
          <Botao titulo="Editar perfil" onPress={() => router.replace("/auth/register")} />
          <Botao titulo="Sair" onPress={() => {logout(), router.replace("/")}} />
        </View>
        }
      </View>

      <Text style={styles.secao}>Tutoriais</Text>
      {tutoriais && tutoriais.length === 0 && <Text style={styles.vazio}>Nenhum tutorial ainda.</Text>}
      {tutoriais && tutoriais.map((t) => (
        <Tutorial key={t.id} tutorial={t} />
      ))}

      <Text style={styles.secao}>Interações</Text>
      {interacoes && interacoes.length === 0 && <Text style={styles.vazio}>Nenhuma interação ainda.</Text>}
      {interacoes && interacoes.map((i) => (
        <Interacao key={i.id} interacao={i} mostrarAutor={false} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  topo: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e4e4e7",
    marginBottom: 8,
  },
  nome: {
    color: cores.primaria,
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "#71717a",
  },
  bio: {
    textAlign: "center",
    marginTop: 8,
  },
  secao: {
    color: cores.primaria,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  vazio: {
    color: "#71717a",
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    gap: 10
  },
});