import { Ionicons } from "@expo/vector-icons"; // [NÃO BÁSICO] ver nota 3
import { useRouter } from "expo-router"; // [NÃO BÁSICO] ver nota 2
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // [NÃO BÁSICO] ver nota 1
import { cores } from "../data/cores";
 
// Moldura padrão de todas as telas: área segura + rolagem + margem.
// Se receber `voltar`, mostra uma setinha de voltar no topo.
//
// NOTAS (partes que fogem do React Native básico):
// 1. SafeAreaView (react-native-safe-area-context): evita que o conteúdo fique
//    embaixo da barra de status / notch. Já vem instalado junto com o expo-router.
//    O SafeAreaView do próprio react-native só funciona no iOS, por isso usamos este.
//    `edges={["top"]}` aplica a margem só em cima (embaixo já tem a barra de abas).
// 2. useRouter (expo-router): hook que devolve o objeto `router`, usado para
//    navegar por código: router.push(rota), router.replace(rota), router.back().
// 3. Ionicons (@expo/vector-icons): mesmo pacote de ícones usado nas abas.
//    "arrow-back" é a seta para a esquerda.
// 4. hitSlop (prop do Pressable): aumenta a área de toque além do tamanho
//    visual do ícone, para a seta pequena não ficar difícil de acertar.
export default function Tela({ children, voltar = false }) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        {voltar && (
          <Pressable
            style={styles.voltar}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons name="arrow-back" size={24} color={cores.primaria} />
          </Pressable>
        )}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
  },
  conteudo: {
    padding: 16,
  },
  voltar: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
});
