import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTema } from "../context/TemaContext";
import Botao from "./Botao";

export default function CameraFoto({ visivel, aoFechar, aoFoto, inicial = "back" }) {
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const cameraRef = useRef(null);
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [lado, setLado] = useState(inicial);
  const [pronta, setPronta] = useState(false);
  const [tirando, setTirando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (visivel) {
      setLado(inicial);
      setPronta(false);
      setTirando(false);
      setErro("");
    }
  }, [visivel, inicial]);

  const tirarFoto = async () => {
    if (!cameraRef.current || !pronta || tirando) return;

    setTirando(true);
    setErro("");

    try {
      const foto = await cameraRef.current.takePictureAsync({
        quality: 0.3,
        base64: true,
      });

      if (!foto?.base64) {
        setErro("Não foi possível obter a foto. Tente novamente.");
        return;
      }

      aoFoto(foto.base64);
      aoFechar();
    } catch (error) {
      setErro("Erro ao tirar foto: " + error.message);
    } finally {
      setTirando(false);
    }
  };

  if (!visivel) return null;

  return (
    <Modal visible animationType="slide" onRequestClose={aoFechar}>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.topo}>
          <Pressable onPress={aoFechar} hitSlop={12}>
            <Ionicons name="close" size={28} color={cores.texto} />
          </Pressable>
          <Text style={styles.titulo}>Tirar foto</Text>
          <View style={styles.espacoIcone} />
        </View>

        {!permissao ? (
          <Text style={styles.aviso}>Carregando câmera...</Text>
        ) : !permissao.granted ? (
          <View style={styles.semPermissao}>
            <Text style={styles.aviso}>
              O app precisa da sua permissão para usar a câmera.
            </Text>
            {permissao.canAskAgain && (
              <Botao titulo="Permitir câmera" onPress={pedirPermissao} />
            )}
          </View>
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={lado}
            onCameraReady={() => setPronta(true)}
            onMountError={(event) => setErro("Erro ao abrir a câmera: " + event.message)}
          />
        )}

        {erro && <Text style={styles.erro}>{erro}</Text>}

        <View style={styles.controles}>
          <Pressable
            style={styles.trocar}
            onPress={() => setLado(lado === "back" ? "front" : "back")}
            hitSlop={12}
          >
            <Ionicons name="camera-reverse-outline" size={30} color={cores.texto} />
          </Pressable>

          <Pressable
            style={[styles.botaoFoto, (!pronta || tirando) && styles.botaoFotoDesativado]}
            onPress={tirarFoto}
            disabled={!pronta || tirando}
          >
            <View style={styles.botaoFotoInterno} />
          </Pressable>

          <View style={styles.trocar} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.fundo,
    },
    topo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    titulo: {
      color: cores.texto,
      fontSize: 18,
      fontWeight: "bold",
    },
    espacoIcone: {
      width: 28,
    },
    camera: {
      flex: 1,
    },
    semPermissao: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      gap: 12,
    },
    aviso: {
      color: cores.texto,
      fontSize: 16,
      textAlign: "center",
    },
    erro: {
      color: cores.erro,
      textAlign: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    controles: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 32,
      paddingVertical: 24,
    },
    trocar: {
      width: 44,
      alignItems: "center",
    },
    botaoFoto: {
      width: 72,
      height: 72,
      borderRadius: 36,
      borderWidth: 4,
      borderColor: cores.primaria,
      alignItems: "center",
      justifyContent: "center",
    },
    botaoFotoDesativado: {
      opacity: 0.4,
    },
    botaoFotoInterno: {
      width: 54,
      height: 54,
      borderRadius: 27,
      backgroundColor: cores.primaria,
    },
  });
}
