import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="bookmark-outline" size={48} color="#267D73" />

      <Text style={styles.title}>Saved Hospitals</Text>

      <Text style={styles.subtitle}>
        Hospitals you save will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFA",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: "700",
    color: "#173B42",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#809093",
    textAlign: "center",
  },
});