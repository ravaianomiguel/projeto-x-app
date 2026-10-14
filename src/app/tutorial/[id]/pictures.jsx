import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const {id} = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Fotos do tutorial {id}</Text>
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
