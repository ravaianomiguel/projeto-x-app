import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Pesquisar',
          }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Eu',
          }}
      />
      <Tabs.Screen
        name="auth/login"
        options={{
          href: null,
          }}
      />
      <Tabs.Screen
        name="auth/register"
        options={{
          href: null,
          }}
      />
      <Tabs.Screen
        name="tutorial/[id]"
        options={{
          href: null,
          }}
      />
      <Tabs.Screen
        name="tutorial/[id]/pictures"
        options={{
          href: null,
          }}
      />
      <Tabs.Screen
        name="profile/[user]"
        options={{
          href: null,
          }}
      />
    </Tabs>
  );
}
