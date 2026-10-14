import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { cores } from "../data/cores";
import { tutoriais, usuarios } from "../data/mock";

// Aba "Pesquisar": busca tutoriais por título e usuários por username.
// O filtro roda no próprio app com os dados falsos; depois vira
// GET /tutoriais?search=... e GET /usuarios?search=...
export default function Search() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [aba, setAba] = useState("tutoriais"); // "tutoriais" ou "usuarios"

  const busca = texto.toLowerCase();
  const tutoriaisFiltrados = tutoriais.filter((t) => t.title.toLowerCase().includes(busca));
  const usuariosFiltrados = usuarios.filter((u) => u.username.toLowerCase().includes(busca));

  return (
    <Tela>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        value={texto}
        onChangeText={setTexto}
      />

      <View style={styles.abas}>
        <Pressable
          style={[styles.aba, aba === "tutoriais" && styles.abaAtiva]}
          onPress={() => setAba("tutoriais")}
        >
          <Text>Tutoriais</Text>
        </Pressable>
        <Pressable
          style={[styles.aba, aba === "usuarios" && styles.abaAtiva]}
          onPress={() => setAba("usuarios")}
        >
          <Text>Usuários</Text>
        </Pressable>
      </View>

      {aba === "tutoriais" &&
        tutoriaisFiltrados.map((t) => <Tutorial key={t.id} tutorial={t} />)}

      {aba === "usuarios" &&
        usuariosFiltrados.map((u) => (
          <Pressable
            key={u.username}
            style={styles.usuario}
            onPress={() => router.push("/profile/" + u.username)}
          >
            <View style={styles.avatar} />
            <View>
              <Text style={styles.nome}>@{u.username}</Text>
              <Text style={styles.real}>{u.realname}</Text>
            </View>
          </Pressable>
        ))}

      {aba === "tutoriais" && tutoriaisFiltrados.length === 0 && <Text>Nenhum tutorial encontrado.</Text>}
      {aba === "usuarios" && usuariosFiltrados.length === 0 && <Text>Nenhum usuário encontrado.</Text>}
    </Tela>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  abas: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  aba: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
  },
  abaAtiva: {
    backgroundColor: cores.primariaClara,
  },
  usuario: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e4e4e7",
  },
  nome: {
    color: cores.primaria,
    fontWeight: "bold",
  },
  real: {
    color: "#71717a",
  },
});