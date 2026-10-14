import { Ionicons } from "@expo/vector-icons"; // [NÃO BÁSICO] ver nota 3
import { Tabs } from "expo-router";
import { cores } from "../data/cores";

// Só as 3 abas aparecem na barra. As demais telas existem como rotas,
// mas ficam escondidas (href: null).
//
// NOTAS (partes que fogem do React Native básico):
// 1. Nome das rotas: o nome é o caminho do arquivo, por isso
//    "tutorial/[id]/index" (e não "tutorial/[id]").
// 2. backBehavior="history": faz o router.back() voltar para a tela anterior
//    de fato (ex: do perfil de volta ao feed). Sem isso, o padrão das abas é
//    voltar para a primeira aba.
// 3. Ícones das abas: `tabBarIcon` recebe uma FUNÇÃO que devolve o ícone.
//    O expo-router chama essa função passando { color, size, focused }:
//      - color: cor certa (ativa ou inativa) da aba
//      - size: tamanho padrão do ícone na barra
//      - focused: true quando a aba está selecionada
//    Aqui usamos a versão preenchida do ícone quando selecionada e a versão
//    "-outline" quando não. Ionicons vem do pacote @expo/vector-icons, que já
//    acompanha o Expo (se der erro de import: npx expo install @expo/vector-icons).
//    Lista de nomes de ícones: https://icons.expo.fyi (filtrar por Ionicons).
export default function TabLayout() {
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{ tabBarActiveTintColor: cores.primaria, headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Eu",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="auth/login" options={{ href: null }} />
      <Tabs.Screen name="auth/register" options={{ href: null }} />
      <Tabs.Screen name="tutorial/[id]/index" options={{ href: null }} />
      <Tabs.Screen name="tutorial/[id]/pictures" options={{ href: null }} />
      <Tabs.Screen name="profile/[user]" options={{ href: null }} />
    </Tabs>
  );
}