import { useFocusEffect, useRouter } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { useTema } from "../../context/TemaContext";
import { criarTutorial } from "../../utils/apiAccess";
import { storageGet } from "../../utils/secureStore";

export default function NewTutorial() {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("texto");

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const resLogado = await storageGet("logado");
        setLogado(resLogado.ok && !!resLogado.val);
        setCarregando(false);
      };
      checkLogin();
    }, [])
  );

  const publicar = async () => {
    const status = await criarTutorial({ title: titulo, content: conteudo });
    if (!status.ok) {
      setMsg(status.message);
      setMsgTipo("erro");
    } else {
      router.replace("/tutorial/" + status.data.id);
    }
  };

  if (carregando) {
    return (
      <Tela voltar>
        <Text style={styles.texto}>Carregando...</Text>
      </Tela>
    );
  }

  if (!logado) {
    return (
      <Tela voltar>
        <Text style={styles.texto}>Você precisa estar logado para publicar um tutorial.</Text>
        <Botao titulo="Entrar" onPress={() => router.replace("/auth/login")} />
      </Tela>
    );
  }

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Publicar Tutorial</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor={cores.textoMuted}
        maxLength={100}
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, styles.conteudo]}
        placeholder="Conteúdo"
        placeholderTextColor={cores.textoMuted}
        multiline
        value={conteudo}
        onChangeText={setConteudo}
      />
      {msg && <Text style={{ color: cores[msgTipo] }}>{msg}</Text>}
      <Botao
        titulo="Publicar"
        onPress={() => {
          setMsg("Publicando...");
          setMsgTipo("texto");
          publicar();
        }}
      />
    </Tela>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    titulo: {
      color: cores.primaria,
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
    },
    texto: {
      color: cores.texto,
      fontSize: 16,
      marginBottom: 12,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      color: cores.texto,
    },
    conteudo: {
      height: 180,
      textAlignVertical: "top",
    },
  });
}
