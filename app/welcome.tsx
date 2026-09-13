import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.screen}>
      
      {/* HOSPITAL ILLUSTRATION */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../assets/images/splash-hospital.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottomContainer}>

        {/* GET STARTED */}
        <Pressable
          style={({ pressed }) => [
            styles.getStartedButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={goToLogin}
        >
          <Text style={styles.getStartedText}>
            Get Started
          </Text>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#FFFFFF"
          />
        </Pressable>

        {/* LOGIN */}
        <View style={styles.loginRow}>
          <Text style={styles.accountText}>
            Already have an account?
          </Text>

          <Pressable onPress={goToLogin}>
            <Text style={styles.loginText}>
              Log In
            </Text>
          </Pressable>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FBFA",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 55,
    zIndex: 2,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2FA69A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  ecgLine: {
    position: "absolute",
    width: 45,
    height: 2,
    backgroundColor: "#FFFFFF",
    top: 25,
  },

  ecgSmall: {
    position: "absolute",
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: "#FFFFFF",
    transform: [
      { rotate: "45deg" },
    ],
    left: 18,
    top: -5,
  },

  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: "#173B42",
    marginBottom: 14,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: "#527277",
  },



  illustration: {
    width: "100%",
    height: "100%",
  },
 illustrationContainer: {
  flex: 1,
  justifyContent: "flex-end",
  marginTop: 0,
},

bottomContainer: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingTop: 18,
  paddingBottom: 30,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  marginTop: -35,
},

  getStartedButton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: "#267D73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  getStartedText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginLeft: 22,
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  accountText: {
    fontSize: 10,
    color: "#70898D",
  },

  loginText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#267D73",
    marginLeft: 6,
  },
});