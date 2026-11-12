import { Ionicons } from "@expo/vector-icons"; 
import { Tabs } from "expo-router";
import { cores } from "../data/cores";

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

      <Tabs.Screen name="auth/login" options={{ tabBarItemStyle: { display: "none" } }} />
      <Tabs.Screen name="auth/register" options={{ tabBarItemStyle: { display: "none" } }} />
      <Tabs.Screen name="tutorial/[id]/index" options={{ tabBarItemStyle: { display: "none" } }} />
      <Tabs.Screen name="tutorial/[id]/pictures" options={{ tabBarItemStyle: { display: "none" } }} />
      <Tabs.Screen name="profile/[user]" options={{ tabBarItemStyle: { display: "none" } }} />
    </Tabs>
  );
}