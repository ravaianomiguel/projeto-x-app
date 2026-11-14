import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TemaProvider, useTema } from "../context/TemaContext";

function TabsComTema() {
  const { modo, cores } = useTema();

  return (
    <>
      <StatusBar style={modo === "escuro" ? "light" : "dark"} />
      <Tabs
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: cores.primaria,
          tabBarInactiveTintColor: cores.textoMuted,
          tabBarStyle: {
            backgroundColor: cores.fundo,
            borderTopColor: cores.borda,
          },
          sceneStyle: {
            backgroundColor: cores.fundo,
          },
          headerShown: false,
        }}
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

        <Tabs.Screen name="auth/login" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="auth/register" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="tutorial/new" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="tutorial/[id]/index" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="tutorial/[id]/interactions" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="tutorial/[id]/newInteraction" options={{ tabBarItemStyle: { display: "none" } }} />
        <Tabs.Screen name="profile/[user]" options={{ tabBarItemStyle: { display: "none" } }} />
      </Tabs>
    </>
  );
}

export default function TabLayout() {
  return (
    <TemaProvider>
      <TabsComTema />
    </TemaProvider>
  );
}
