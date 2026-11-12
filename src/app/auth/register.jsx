import { Link, useFocusEffect, useRouter } from "expo-router"; // [NÃO BÁSICO] ver components/Tela.jsx, nota 2
import { useState, useCallback } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import Botao from "../../components/Botao";
import Tela from "../../components/Tela";
import { cores } from "../../data/cores";
import { getUsuario, registro } from "../../utils/apiAccess";
import { storageGet } from "../../utils/secureStore";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [biografia, setBiografia] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("black");
  const [id, setId] = useState("");

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const resLogado = await storageGet("logado");
        if (resLogado.ok && resLogado.val) {
          setLogado(true);
          const uId = await storageGet("usuarioId");
          const user = await getUsuario(uId.val);
          setId(uId.val);
          setUsername(user.username);
          setBiografia(user.biografia);
          setNome(user.realname);
        } 
        setCarregando(false);
      };
      checkLogin();
    }, [])
  );

  const regStatus = async () => {
    const status = await registro({
      username, senha, id,
      realname: nome,
      biography: biografia,
    }, logado);
    if(!status.ok) {
      console.log(id)
      setMsg(status.message);
      setMsgColor("red");
    } else if(logado) router.replace("/me");
    else router.replace("/auth/login");
  }

  if (carregando) {
    return (
      <Tela voltar>
        <Text style={styles.texto}>Carregando...</Text>
      </Tela>
    );
  }

  return (
    <Tela voltar>
      <Text style={styles.titulo}>{logado ? "Editar Perfil" : "Cadastro"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        maxLength={10}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        maxLength={100}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input, styles.bio]}
        placeholder="Biografia"
        maxLength={1000}
        multiline
        value={biografia}
        onChangeText={setBiografia}
      />
      {!logado && <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />}
      {msg && <Text style={{color: msgColor}}>{msg}</Text>}
      <Botao titulo={logado ? "Editar Perfil" : "Cadastrar"} onPress={() => {
        setMsg("Concluindo...");
        setMsgColor("black");
        regStatus();
      }} />
      {!logado && <Link href="/auth/login" style={styles.link}>
        Já tem conta?
      </Link>}
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