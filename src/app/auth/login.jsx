import { Link, useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { cores } from "../../data/cores";
import { login } from "../../utils/apiAccess";

// Login.
// secureTextEntry esconde o texto digitado (é prop básica do TextInput).
export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [msgColor, setMsgColor] = useState("black");

  const loginStatus = async () => {
    const status = await login(username, senha);
    if(!status.ok) {
      setLoginMsg(status.message);
      setMsgColor("red");
    } else router.replace("/");
  }

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        maxLength={30}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {loginMsg && <Text style={{color: msgColor}}>{loginMsg}</Text>}
      <Botao titulo="Entrar" onPress={() => {
        setLoginMsg("Fazendo login...");
        setMsgColor("black");
        loginStatus();
      }} />
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