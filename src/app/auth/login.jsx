import { Link, useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { cores } from "../../data/cores";

// Login. Os campos ainda não guardam valor (sem useState) porque não há
// para onde enviar: depois será POST /login.
// secureTextEntry esconde o texto digitado (é prop básica do TextInput).
export default function Login() {
  const router = useRouter();
  return (
    <Tela voltar>
      <Text style={styles.titulo}>Login</Text>
      <TextInput style={styles.input} placeholder="Username" maxLength={10} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      {/* replace: troca a tela atual (não dá para "voltar" ao login depois de entrar) */}
      <Botao titulo="Entrar" onPress={() => router.replace("/")} />
      <Link href="/auth/register" style={styles.link}>
        Não tem conta?
      </Link>
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.primaria,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  link: {
    color: cores.primaria,
    marginTop: 8,
    textAlign: "center",
  },
});