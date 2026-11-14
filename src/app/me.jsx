import { Text, StyleSheet, View, Switch } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import Tela from "../components/Tela";
import Botao from "../components/Botao";
import Perfil from "../components/Perfil";
import { useTema } from "../context/TemaContext";
import { storageGet } from "../utils/secureStore";
import { useState, useCallback, useMemo } from "react";

function SeletorTema() {
  const { modo, cores, definirTema } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);

  return (
    <View style={styles.tema}>
      <Text style={styles.temaTexto}>Modo escuro</Text>
      <Switch
        value={modo === "escuro"}
        onValueChange={(ativo) => definirTema(ativo ? "escuro" : "claro")}
        trackColor={{ false: cores.borda, true: cores.primaria }}
        thumbColor={cores.botaoTexto}
        ios_backgroundColor={cores.borda}
      />
    </View>
  );
}

export default function Me() {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [logado, setLogado] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const resLogado = await storageGet("logado");
        if (resLogado.ok && resLogado.val) {
          setLogado(true);
          const resId = await storageGet("usuarioId");
          if (resId.ok) {
            setUsuarioId(resId.val);
          }
        } else {
          setLogado(false);
          setUsuarioId(null);
        }
        setCarregando(false);
      };
      checkLogin();
    }, [])
  );

  if (carregando) {
    return (
      <Tela>
        <Text style={styles.texto}>Carregando...</Text>
      </Tela>
    );
  }

  if (logado) {
    return (
      <Tela>
        <SeletorTema />
        <Perfil id={usuarioId} proprio />
      </Tela>
    );
  }

  return (
    <Tela>
      <SeletorTema />
      <Text style={styles.texto}>Você não está logado.</Text>
      <Botao titulo="Entrar" onPress={() => router.push("/auth/login")} />
      <Botao titulo="Cadastrar" onPress={() => router.push("/auth/register")} />
    </Tela>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    texto: {
      color: cores.texto,
      fontSize: 16,
      marginBottom: 12,
      textAlign: "center",
    },
    tema: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      backgroundColor: cores.superficie,
    },
    temaTexto: {
      color: cores.texto,
      fontSize: 16,
    },
  });
}
