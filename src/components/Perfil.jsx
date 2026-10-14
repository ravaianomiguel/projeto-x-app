import { StyleSheet, Text, View } from "react-native";
import { cores } from "../data/cores";
import { getUsuario, interacoesDoUsuario, tutoriaisDoUsuario } from "../data/mock";
import Botao from "./Botao";
import Interacao from "./Interacao";
import Tutorial from "./Tutorial";

// Conteúdo de um perfil: dados do usuário + seus tutoriais + suas interações.
// Usado em /profile/[user] (perfil de qualquer usuário) e em /me (perfil próprio).
// Props:
//   username = qual usuário mostrar
//   proprio  = true quando é o perfil do usuário logado (mostra "Editar perfil")
export default function Perfil({ username, proprio = false }) {
  const usuario = getUsuario(username);

  if (!usuario) {
    return <Text>Usuário não encontrado: {username}</Text>;
  }

  const tutoriais = tutoriaisDoUsuario(username);
  const interacoes = interacoesDoUsuario(username);

  return (
    <View>
      <View style={styles.topo}>
        <View style={styles.avatar} />
        <Text style={styles.nome}>{usuario.realname}</Text>
        <Text style={styles.username}>@{usuario.username}</Text>
        <Text style={styles.bio}>{usuario.biography}</Text>
        {/* onPress vazio: ainda não existe edição (será PATCH /usuarios) */}
        {proprio && <Botao titulo="Editar perfil" onPress={() => {}} />}
      </View>

      <Text style={styles.secao}>Tutoriais</Text>
      {tutoriais.length === 0 && <Text style={styles.vazio}>Nenhum tutorial ainda.</Text>}
      {tutoriais.map((t) => (
        <Tutorial key={t.id} tutorial={t} />
      ))}

      <Text style={styles.secao}>Interações</Text>
      {interacoes.length === 0 && <Text style={styles.vazio}>Nenhuma interação ainda.</Text>}
      {interacoes.map((i) => (
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
});