import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import Tela from "../components/Tela";
import Botao from "../components/Botao";
import Perfil from "../components/Perfil";

// Aba "Eu": perfil do usuário logado, ou opções de login/cadastro.
// Por enquanto "logado" é uma constante: troque para true/false para testar
// as duas versões da tela. Depois será lido de onde guardarmos o login.
const logado = true;
const meuUsername = "miguel";

export default function Me() {
  const router = useRouter();

  if (logado) {
    return (
      <Tela>
        <Perfil username={meuUsername} proprio />
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