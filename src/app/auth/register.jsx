import { Link, useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { cores } from "../../data/cores";

// Cadastro. Os maxLength seguem o modelo de dados (username 10, realname 100,
// biography 1000). Depois será POST /registrar. A foto de perfil ficou de fora
// por enquanto (precisa de seletor de imagem, que não é básico).
// multiline permite várias linhas no campo de biografia.
export default function Register() {
  const router = useRouter();
  return (
    <Tela voltar>
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Username" maxLength={10} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Nome" maxLength={100} />
      <TextInput
        style={[styles.input, styles.bio]}
        placeholder="Biografia"
        maxLength={1000}
        multiline
      />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Botao titulo="Cadastrar" onPress={() => router.replace("/auth/login")} />
      <Link href="/auth/login" style={styles.link}>
        Já tem conta?
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
  bio: {
    height: 90,
    textAlignVertical: "top",
  },
  link: {
    color: cores.primaria,
    marginTop: 8,
    textAlign: "center",
  },
});