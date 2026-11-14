import { Link, useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { useTema } from "../../context/TemaContext";
import { login, loginComGithub } from "../../utils/apiAccess";

export default function Login() {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("texto");

  const loginStatus = async () => {
    const status = await login(username, senha);
    if(!status.ok) {
      setLoginMsg(status.message);
      setMsgTipo("erro");
    } else router.replace("/");
  }

  const loginGithubStatus = async () => {
    setLoginMsg("Abrindo GitHub...");
    setMsgTipo("texto");
    const status = await loginComGithub();
    if(!status.ok) {
      setLoginMsg(status.message);
      setMsgTipo(status.cancelado ? "texto" : "erro");
    } else router.replace("/");
  }

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={cores.textoMuted}
        maxLength={30}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={cores.textoMuted}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {loginMsg && <Text style={{color: cores[msgTipo]}}>{loginMsg}</Text>}
      <Botao titulo="Entrar" onPress={() => {
        setLoginMsg("Fazendo login...");
        setMsgTipo("texto");
        loginStatus();
      }} />
      <Botao titulo="Entrar com GitHub" onPress={loginGithubStatus} />
      <Link href="/auth/register" style={styles.link}>
        Não tem conta?
      </Link>
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
    input: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      color: cores.texto,
    },
    link: {
      color: cores.primaria,
      marginTop: 8,
      textAlign: "center",
    },
  });
}
