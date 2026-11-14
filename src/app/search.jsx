import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { useTema } from "../context/TemaContext";
import { getTutoriais, getUsuarios } from "../utils/apiAccess";
import { fotoUri } from "../utils/foto";

export default function Search() {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [texto, setTexto] = useState("");
  const [aba, setAba] = useState("tutoriais");
  const [usuarios, setUsuarios] = useState(null);
  const [tutoriais, setTutoriais] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const dataTutoriais = await getTutoriais();
        const dataUsuarios = await getUsuarios(true);
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
        placeholderTextColor={cores.textoMuted}
        value={texto}
        onChangeText={setTexto}
      />

      <View style={styles.abas}>
        <Pressable
          style={[styles.aba, aba === "tutoriais" && styles.abaAtiva]}
          onPress={() => setAba("tutoriais")}
        >
          <Text style={styles.abaTexto}>Tutoriais</Text>
        </Pressable>
        <Pressable
          style={[styles.aba, aba === "usuarios" && styles.abaAtiva]}
          onPress={() => setAba("usuarios")}
        >
          <Text style={styles.abaTexto}>Usuários</Text>
        </Pressable>
      </View>

      {aba === "tutoriais" &&
        (tutoriais ? (
          <>
            {tutoriaisFiltrados.map((t) => (
              <Tutorial key={t.id} tutorial={t} />
            ))}
            {tutoriaisFiltrados.length === 0 && (
              <Text style={styles.texto}>Nenhum tutorial encontrado.</Text>
            )}
          </>
        ) : (
          <Text style={styles.texto}>Carregando...</Text>
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
                {u.photo ? (
                  <Image source={{ uri: fotoUri(u.photo) }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatar} />
                )}
                <View>
                  <Text style={styles.nome}>@{u.username}</Text>
                  <Text style={styles.real}>{u.realname}</Text>
                </View>
              </Pressable>
            ))}
            {usuariosFiltrados.length === 0 && (
              <Text style={styles.texto}>Nenhum usuário encontrado.</Text>
            )}
          </>
        ) : (
          <Text style={styles.texto}>Carregando...</Text>
        ))}
    </Tela>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      color: cores.texto,
    },
    texto: {
      color: cores.texto,
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
      backgroundColor: cores.superficie,
    },
    abaAtiva: {
      backgroundColor: cores.primariaClara,
    },
    abaTexto: {
      color: cores.texto,
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
      backgroundColor: cores.superficieAlt,
    },
    nome: {
      color: cores.primaria,
      fontWeight: "bold",
    },
    real: {
      color: cores.textoMuted,
    },
  });
}