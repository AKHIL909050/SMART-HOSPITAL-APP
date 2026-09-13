import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useState } from "react";
export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
      if (!email.trim() || !password) {
        Alert.alert(
          "Missing Information",
          "Please enter your email and password."
        );
        return;
      }

      try {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        router.replace("/(tabs)");
      } catch (error: any) {
        console.log(error);

        let message = "Unable to log in. Please try again.";

        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          message = "Incorrect email or password.";
        } else if (error.code === "auth/invalid-email") {
          message = "Please enter a valid email address.";
        }

        Alert.alert("Login Failed", message);
      }
    };
  return (
    <View style={styles.screen}>

      {/* TOP */}
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="#173B42"
          />
        </Pressable>

        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* HEADER */}
      <Text style={styles.title}>
        Welcome Back
      </Text>

      <Text style={styles.subtitle}>
        Your health journey continues here.
      </Text>

      {/* LOGIN / SIGN UP SWITCH */}
      <View style={styles.switchContainer}>

        <View style={styles.activeTab}>
          <Text style={styles.activeTabText}>
            Log In
          </Text>
        </View>

        <Pressable
          style={styles.inactiveTab}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.inactiveTabText}>
            Sign Up
          </Text>
        </Pressable>

      </View>

      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={18}
          color="#668489"
        />

        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          placeholderTextColor="#819497"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {/* PASSWORD */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={18}
          color="#668489"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#819497"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />

        <Pressable
          onPress={() =>
            setPasswordVisible(!passwordVisible)
          }
        >
          <Ionicons
            name={
              passwordVisible
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={18}
            color="#668489"
          />
        </Pressable>
      </View>

      {/* REMEMBER / FORGOT */}
      <View style={styles.optionsRow}>

        <Pressable
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View
            style={[
              styles.checkbox,
              rememberMe && styles.checkboxActive,
            ]}
          >
            {rememberMe && (
              <Ionicons
                name="checkmark"
                size={12}
                color="#FFFFFF"
              />
            )}
          </View>

          <Text style={styles.rememberText}>
            Remember me
          </Text>
        </Pressable>

        <Pressable>
          <Text style={styles.forgotText}>
            Forgot password?
          </Text>
        </Pressable>

      </View>

      {/* MAIN LOGIN */}
      <Pressable
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>
          Log In
        </Text>
      </Pressable>

      {/* OR */}
      <View style={styles.orRow}>
        <View style={styles.line} />

        <Text style={styles.orText}>
          or
        </Text>

        <View style={styles.line} />
      </View>

      {/* GOOGLE */}
      <Pressable style={styles.socialButton}>
        <MaterialCommunityIcons
          name="google"
          size={22}
          color="#4285F4"
        />

        <Text style={styles.socialText}>
          Continue with Google
        </Text>
      </Pressable>

      {/* APPLE */}
      <Pressable style={styles.socialButton}>
        <MaterialCommunityIcons
          name="apple"
          size={23}
          color="#111111"
        />

        <Text style={styles.socialText}>
          Continue with Apple
        </Text>
      </Pressable>

      {/* BOTTOM SIGN UP */}
      <View style={styles.signupRow}>
        <Text style={styles.signupNormal}>
          Does not have an account?
        </Text>

        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>
            Sign Up
          </Text>
        </Pressable>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FBFA",
    paddingHorizontal: 30,
    paddingTop: 45,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },

  skipText: {
    fontSize: 12,
    color: "#267D73",
    fontWeight: "600",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#173B42",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#527277",
    marginTop: 3,
    marginBottom: 25,
  },

  switchContainer: {
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EEF3F3",
    flexDirection: "row",
    padding: 2,
    marginBottom: 16,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#267D73",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  activeTabText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  inactiveTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveTabText: {
    color: "#526B70",
    fontSize: 11,
  },

  inputContainer: {
    height: 43,
    borderWidth: 1,
    borderColor: "#DDE6E6",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: "#173B42",
    marginLeft: 9,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
    marginBottom: 22,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: "#668489",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  checkboxActive: {
    backgroundColor: "#267D73",
    borderColor: "#267D73",
  },

  rememberText: {
    fontSize: 9,
    color: "#526B70",
  },

  forgotText: {
    fontSize: 9,
    color: "#267D73",
    fontWeight: "600",
  },

  loginButton: {
    height: 43,
    borderRadius: 10,
    backgroundColor: "#267D73",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1E7E7",
  },

  orText: {
    fontSize: 10,
    color: "#829294",
    marginHorizontal: 10,
  },

  socialButton: {
    height: 38,
    borderWidth: 1,
    borderColor: "#DDE6E6",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  socialText: {
    fontSize: 13,
    color: "#263F44",
    fontWeight: "600",
    marginLeft: 9,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  signupNormal: {
    fontSize: 14,
    color: "#70898D",
  },

  signupText: {
    fontSize: 14,
    color: "#267D73",
    fontWeight: "700",
    marginLeft: 5,
  },
});