import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color="#267D73" />
      </View>

      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.subtitle}>
        Your profile and preferences will appear here.
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

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E2F4EF",
    justifyContent: "center",
    alignItems: "center",
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