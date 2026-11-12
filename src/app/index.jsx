import { useState, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { useFocusEffect } from "expo-router";
import Tela from "../components/Tela";
import Tutorial from "../components/Tutorial";
import { cores } from "../data/cores";
import { getTutoriais } from "../utils/apiAccess";

// Aba "Home": feed com todos os tutoriais.
export default function Index() {
  const [tutoriais, setTutoriais] = useState(null)
  
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getTutoriais()
        setTutoriais(data)
      }
      load()
    }, [])
  )
  return (
    <Tela>
      <Text style={styles.titulo}>Feed</Text>
      {tutoriais ? tutoriais.map((t) => (
        <Tutorial key={t.id} tutorial={t} />
      )) : <Text>Carregando...</Text>}
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
});