import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver Tela.jsx, nota 2
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { cores } from "../data/cores";
import { fotosDaInteracao, getTutorial, getUsuario } from "../utils/apiAccess";
import Foto from "./Foto";

// Uma interação: quem seguiu o tutorial, a descrição e as N fotos do resultado.
// Usada na tela de fotos do tutorial e no perfil do usuário.
// Props:
//   interacao      = { id, tutorialID, username, desc, fotos }
//   mostrarAutor   = mostra "@username" (link para o perfil)       (padrão: true)
//   mostrarTutorial = mostra "em: título" (link para o tutorial)   (padrão: true)
export default function Interacao({ interacao, mostrarAutor = true, mostrarTutorial = true }) {
  const router = useRouter();
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
            <Foto key={f.id} />
          ))
        ) : (
          <Text>Carregando fotos...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#d4d4d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  link: {
    color: cores.primaria,
    marginBottom: 2,
  },
  desc: {
    marginVertical: 8,
  },
  fotos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});