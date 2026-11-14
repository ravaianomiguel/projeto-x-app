import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Botao from "../../../components/Botao";
import CameraFoto from "../../../components/CameraFoto";
import Foto from "../../../components/Foto";
import Tela from "../../../components/Tela";
import { useTema } from "../../../context/TemaContext";
import { criarFoto, criarInteracao } from "../../../utils/apiAccess";
import { storageGet } from "../../../utils/secureStore";

export default function Interaction() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [descricao, setDescricao] = useState("");
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("texto");
  const [fotos, setFotos] = useState([]);
  const [idInteracao, setIdInteracao] = useState(null);
  const [fotosEnviadas, setFotosEnviadas] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [cameraAberta, setCameraAberta] = useState(false);

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

  const adicionarFoto = (base64) => {
    setFotos((atuais) => [...atuais, base64]);
  };

  const removerFoto = (indice) => {
    setFotos((atuais) => atuais.filter((_, i) => i !== indice));
  };

  const publicar = async () => {
    if (enviando) return;

    setEnviando(true);
    setMsg("Publicando...");
    setMsgTipo("texto");

    let interacaoId = idInteracao;

    if (!interacaoId) {
      const status = await criarInteracao({ desc: descricao, tutorialId: id });
      if (!status.ok) {
        setMsg(status.message);
        setMsgTipo("erro");
        setEnviando(false);
        return;
      }
      interacaoId = status.data.id;
      setIdInteracao(interacaoId);
    }

    for (let i = fotosEnviadas; i < fotos.length; i++) {
      setMsg("Enviando foto " + (i + 1) + " de " + fotos.length + "...");

      const envio = await criarFoto(interacaoId, fotos[i]);
      if (!envio.ok) {
        setFotosEnviadas(i);
        setMsg("A interação foi criada, mas uma foto falhou: " + envio.message + " Toque em Publicar para tentar novamente.");
        setMsgTipo("erro");
        setEnviando(false);
        return;
      }

      setFotosEnviadas(i + 1);
    }

    router.replace("/tutorial/" + id + "/interactions");
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
        <Text style={styles.texto}>Você precisa estar logado para interagir.</Text>
        <Botao titulo="Entrar" onPress={() => router.replace("/auth/login")} />
      </Tela>
    );
  }

  return (
    <Tela voltar>
      <Text style={styles.titulo}>Interação</Text>
      <TextInput
        style={[styles.input, styles.desc]}
        placeholder="Comentário"
        placeholderTextColor={cores.textoMuted}
        maxLength={1000}
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.subtitulo}>Fotos (opcional)</Text>
      {fotos.length > 0 && (
        <View style={styles.fotos}>
          {fotos.map((foto, indice) => (
            <View key={indice} style={styles.fotoItem}>
              <Foto picture={foto} tamanho={90} />
              {fotosEnviadas === 0 && !enviando && (
                <Pressable
                  style={styles.remover}
                  onPress={() => removerFoto(indice)}
                  hitSlop={8}
                >
                  <Ionicons name="close" size={16} color={cores.botaoTexto} />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      )}
      {!enviando && <Botao titulo="Tirar foto" onPress={() => setCameraAberta(true)} />}

      {msg && <Text style={{ color: cores[msgTipo] }}>{msg}</Text>}
      <Botao
        titulo="Publicar"
        onPress={() => {
          setMsg("Publicando...");
          setMsgTipo("texto");
          publicar();
        }}
      />

      <CameraFoto
        visivel={cameraAberta}
        aoFechar={() => setCameraAberta(false)}
        aoFoto={adicionarFoto}
        inicial="back"
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
    subtitulo: {
      color: cores.primaria,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
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
    desc: {
      height: 140,
      textAlignVertical: "top",
    },
    fotos: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 8,
    },
    fotoItem: {
      position: "relative",
    },
    remover: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: cores.erro,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
