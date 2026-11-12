import { useRouter, useFocusEffect } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { useState, useCallback } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { cores } from "../data/cores";
import { getTutoriais, getUsuarios } from "../utils/apiAccess";

export default function Search() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [aba, setAba] = useState("tutoriais");
  const [usuarios, setUsuarios] = useState(null);
  const [tutoriais, setTutoriais] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const dataTutoriais = await getTutoriais();
        const dataUsuarios = await getUsuarios();
        setTutoriais(dataTutoriais);
        setUsuarios(dataUsuarios);
      };
      load();
    }, [])
  );

  const busca = texto.toLowerCase();
  const tutoriaisFiltrados = Array.isArray(tutoriais)
    ? tutoriais.filter((t) => t.title.toLowerCase().includes(busca))
    : [];
  const usuariosFiltrados = Array.isArray(usuarios)
    ? usuarios.filter((u) => u.username.toLowerCase().includes(busca))
    : [];

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
        (tutoriais ? (
          <>
            {tutoriaisFiltrados.map((t) => (
              <Tutorial key={t.id} tutorial={t} />
            ))}
            {tutoriaisFiltrados.length === 0 && (
              <Text>Nenhum tutorial encontrado.</Text>
            )}
          </>
        ) : (
          <Text>Carregando...</Text>
        ))}

      {aba === "usuarios" &&
        (usuarios ? (
          <>
            {usuariosFiltrados.map((u) => (
              <Pressable
                key={u.id}
                style={styles.usuario}
                onPress={() => router.push("/profile/" + u.id)}
              >
                <View style={styles.avatar} />
                <View>
                  <Text style={styles.nome}>@{u.username}</Text>
                  <Text style={styles.real}>{u.realname}</Text>
                </View>
              </Pressable>
            ))}
            {usuariosFiltrados.length === 0 && (
              <Text>Nenhum usuário encontrado.</Text>
            )}
          </>
        ) : (
          <Text>Carregando...</Text>
        ))}
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