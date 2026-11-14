import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTema } from "../context/TemaContext";
import { fotosDaInteracao, getTutorial, getUsuario } from "../utils/apiAccess";
import Foto from "./Foto";

export default function Interacao({ interacao, mostrarAutor = true, mostrarTutorial = true }) {
  const router = useRouter();
  const { cores } = useTema();
  const styles = useMemo(() => criarEstilos(cores), [cores]);
  const [tutorial, setTutorial] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [fotos, setFotos] = useState(null);

  useEffect(() => {
    const load = async () => {
      const tutorialId = interacao?.tutorialID || interacao?.tutorialId;
      const usuarioId = interacao?.usuarioID || interacao?.usuarioId;
      if (tutorialId) {
        const t = await getTutorial(tutorialId);
        setTutorial(t);
      }
      if (usuarioId) {
        const u = await getUsuario(usuarioId);
        setUsuario(u);
      }
      if (interacao?.id) {
        const f = await fotosDaInteracao(interacao.id);
        setFotos(f);
      }
    };
    load();
  }, [interacao]);

  return (
    <View style={styles.card}>
      {mostrarAutor && (
        <Pressable onPress={() => usuario && router.push("/profile/" + usuario.id)}>
          <Text style={styles.link}>@{usuario ? usuario.username : (interacao?.username || "")}</Text>
        </Pressable>
      )}
      {mostrarTutorial && tutorial && (
        <Pressable onPress={() => router.push("/tutorial/" + tutorial.id)}>
          <Text style={styles.link}>em: {tutorial.title}</Text>
        </Pressable>
      )}
      <Text style={styles.desc}>{interacao.desc}</Text>
      <View style={styles.fotos}>
        {fotos ? (
          Array.isArray(fotos) && fotos.map((f) => (
            <Foto key={f.id} picture={f.picture} />
          ))
        ) : (
          <Text style={styles.carregando}>Carregando fotos...</Text>
        )}
      </View>
    </View>
  );
}

function criarEstilos(cores) {
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
    },
    link: {
      color: cores.primaria,
      marginBottom: 2,
    },
    desc: {
      color: cores.texto,
      marginVertical: 8,
    },
    carregando: {
      color: cores.textoMuted,
    },
    fotos: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
  });
}