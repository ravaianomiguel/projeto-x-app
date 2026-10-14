import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Tutorial from "../components/Tuorial.jsx"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
      <Tutorial id={1}></Tutorial>
      <Link href="tutorial/2">tutorial 2</Link>
      <Link href="tutorial/3">tutorial 3</Link>
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
