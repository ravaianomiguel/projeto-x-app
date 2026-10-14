import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Vou verificar se voce está logado</Text>
      <Link href="/auth/login">Nao estou logado</Link>
      <Link href="/profile/miguel">Estou Logado</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
