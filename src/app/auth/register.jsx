import { Link, useFocusEffect, useRouter } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Botao from "../../components/Botao";
import CameraFoto from "../../components/CameraFoto";
import Tela from "../../components/Tela";
import { useTema } from "../../context/TemaContext";
import { getUsuario, definirSenha, registro } from "../../utils/apiAccess";
import { fotoUri } from "../../utils/foto";
import { storageGet } from "../../utils/secureStore";

export default function Register() {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [biografia, setBiografia] = useState("");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [github, setGithub] = useState(false);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("texto");
  const [msgSenha, setMsgSenha] = useState("");
  const [msgSenhaTipo, setMsgSenhaTipo] = useState("texto");
  const [id, setId] = useState("");
  const [fotoAtual, setFotoAtual] = useState("");
  const [novaFoto, setNovaFoto] = useState("");
  const [cameraAberta, setCameraAberta] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkLogin = async () => {
        const resLogado = await storageGet("logado");
        if (resLogado.ok && resLogado.val) {
          setLogado(true);
          const uId = await storageGet("usuarioId");
          const user = await getUsuario(uId.val, true);
          setId(uId.val);
          setUsername(user.username);
          setBiografia(user.biography);
          setNome(user.realname);
          setGithub(!!user.githubId);
          setFotoAtual(user.photo || "");
        }
        setCarregando(false);
      };
      checkLogin();
    }, [])
  );

  const regStatus = async () => {
    const dados = {
      username, senha, id,
      realname: nome,
      biography: biografia,
    };
    if (novaFoto) dados.photo = novaFoto;

    const status = await registro(dados, logado);
    if(!status.ok) {
      setMsg(status.message);
      setMsgTipo("erro");
    } else if(logado) router.replace("/me");
    else router.replace("/auth/login");
  }

  const salvarSenha = async () => {
    if (!novaSenha) {
      setMsgSenha("Digite uma senha.");
      setMsgSenhaTipo("erro");
      return;
    }

    setMsgSenha("Salvando senha...");
    setMsgSenhaTipo("texto");

    const status = await definirSenha(novaSenha);

    if (!status.ok) {
      setMsgSenha(status.message);
      setMsgSenhaTipo("erro");
    } else {
      setNovaSenha("");
      setMsgSenha("Senha salva. Você também pode entrar com @" + username + " e essa senha.");
      setMsgSenhaTipo("sucesso");
    }
  };

  if (carregando) {
    return (
      <Tela voltar>
        <Text style={styles.texto}>Carregando...</Text>
      </Tela>
    );
  }

  const preview = fotoUri(novaFoto || fotoAtual);

  return (
    <Tela voltar>
      <Text style={styles.titulo}>{logado ? "Editar Perfil" : "Cadastro"}</Text>
      <View style={styles.fotoArea}>
        {preview ? (
          <Image source={{ uri: preview }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarVazio]}>
            <Text style={styles.avatarTexto}>Sem foto</Text>
          </View>
        )}
        <Botao
          titulo={preview ? "Trocar foto" : "Tirar foto"}
          onPress={() => setCameraAberta(true)}
        />
      </View>
      {!logado && <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={cores.textoMuted}
        maxLength={30}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      /> }
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={cores.textoMuted}
        maxLength={100}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={[styles.input, styles.bio]}
        placeholder="Biografia"
        placeholderTextColor={cores.textoMuted}
        maxLength={1000}
        multiline
        value={biografia}
        onChangeText={setBiografia}
      />
      {!logado && <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={cores.textoMuted}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />}
      {msg && <Text style={{color: cores[msgTipo]}}>{msg}</Text>}
      <Botao titulo={logado ? "Editar Perfil" : "Cadastrar"} onPress={() => {
        setMsg("Concluindo...");
        setMsgTipo("texto");
        regStatus();
      }} />
      {logado && github && (
        <>
          <Text style={styles.subtitulo}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova senha"
            placeholderTextColor={cores.textoMuted}
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
          <Botao titulo="Salvar senha" onPress={salvarSenha} />
          {msgSenha && <Text style={{color: cores[msgSenhaTipo]}}>{msgSenha}</Text>}
        </>
      )}
      {!logado && <Link href="/auth/login" style={styles.link}>
        Já tem conta?
      </Link>}
      <CameraFoto
        visivel={cameraAberta}
        aoFechar={() => setCameraAberta(false)}
        aoFoto={setNovaFoto}
        inicial="front"
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
    },
    input: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      color: cores.texto,
    },
    bio: {
      height: 90,
      textAlignVertical: "top",
    },
    fotoArea: {
      alignItems: "center",
      marginBottom: 12,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: cores.superficieAlt,
      marginBottom: 8,
    },
    avatarVazio: {
      alignItems: "center",
      justifyContent: "center",
    },
    avatarTexto: {
      color: cores.textoMuted,
    },
    subtitulo: {
      color: cores.primaria,
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    link: {
      color: cores.primaria,
      marginTop: 8,
      textAlign: "center",
    },
  });
}
