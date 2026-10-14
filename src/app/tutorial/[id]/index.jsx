import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

export default function Index() {
  const {id} = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Link href={"/tutorial/"+id+"/pictures"}>Ver fotos</Link>
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
