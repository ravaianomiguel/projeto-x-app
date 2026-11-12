import { Text, StyleSheet } from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; 
import Tela from "../components/Tela";
import Botao from "../components/Botao";
import Perfil from "../components/Perfil";
import { storageGet } from "../utils/secureStore";
import { useState, useCallback } from "react";

export default function Me() {
  const router = useRouter();
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
        <Perfil id={usuarioId} proprio />
      </Tela>
    );
  }

  return (
    <Tela>
      <Text style={styles.texto}>Você não está logado.</Text>
      <Botao titulo="Entrar" onPress={() => router.push("/auth/login")} />
      <Botao titulo="Cadastrar" onPress={() => router.push("/auth/register")} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
});