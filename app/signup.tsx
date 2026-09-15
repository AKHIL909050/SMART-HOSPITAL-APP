import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase/config";

import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SignupScreen() {
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

const handleSignup = async () => {
  if (!name.trim() || !email.trim() || !phone.trim() || !password) {
    Alert.alert("Missing Information", "Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Password Error", "Passwords do not match.");
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      createdAt: serverTimestamp(),
    });

    Alert.alert(
      "Account Created",
      "Your Smart Hospital account has been created.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]
    );
  } catch (error: any) {
    console.log(error);

    let message = "Something went wrong. Please try again.";

    if (error.code === "auth/email-already-in-use") {
      message = "An account with this email already exists.";
    } else if (error.code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
    } else if (error.code === "auth/weak-password") {
      message = "Password should be at least 6 characters.";
    }

    Alert.alert("Sign Up Failed", message);
  }
};

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        {/* TOP */}
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={25}
              color="#173B42"
            />
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Text style={styles.skipText}>
              Skip
            </Text>
          </Pressable>
        </View>

        {/* HEADER */}
        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Create your account and start your health journey.
        </Text>

        {/* LOGIN / SIGN UP */}
        <View style={styles.switchContainer}>

          <Pressable
            style={styles.inactiveTab}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.inactiveTabText}>
              Log In
            </Text>
          </Pressable>

          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>
              Sign Up
            </Text>
          </View>

        </View>

        {/* NAME */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={19}
            color="#668489"
          />

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#819497"
            value={name}
            onChangeText={setName}

          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={19}
            color="#668489"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#819497"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* PHONE */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="call-outline"
            size={19}
            color="#668489"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#819497"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={19}
            color="#668489"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#819497"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
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
              size={19}
              color="#668489"
            />
          </Pressable>
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={19}
            color="#668489"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#819497"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable
            onPress={() =>
              setConfirmPasswordVisible(
                !confirmPasswordVisible
              )
            }
          >
            <Ionicons
              name={
                confirmPasswordVisible
                  ? "eye-outline"
                  : "eye-off-outline"
              }
              size={19}
              color="#668489"
            />
          </Pressable>
        </View>

        {/* REMEMBER */}
        <Pressable
          style={styles.rememberRow}
          onPress={() =>
            setRememberMe(!rememberMe)
          }
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

        {/* SIGN UP */}
        <Pressable
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>
            Sign Up
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFFFFF"
          />
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

        {/* LOGIN */}
        <View style={styles.loginRow}>
          <Text style={styles.loginNormal}>
            Already have an account?
          </Text>

          <Pressable
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.loginText}>
              Log In
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FBFA",
  },

  container: {
    paddingHorizontal: 30,
    paddingTop: 45,
    paddingBottom: 35,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  skipText: {
    fontSize: 13,
    color: "#267D73",
    fontWeight: "600",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#173B42",
  },

  subtitle: {
    fontSize: 13,
    color: "#527277",
    marginTop: 6,
    marginBottom: 25,
    lineHeight: 19,
  },

  switchContainer: {
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EEF3F3",
    flexDirection: "row",
    padding: 2,
    marginBottom: 18,
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
    fontSize: 13,
    fontWeight: "700",
  },

  inactiveTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveTabText: {
    color: "#526B70",
    fontSize: 13,
  },

  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: "#DDE6E6",
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 13,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: "#173B42",
    marginLeft: 9,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 20,
  },

  checkbox: {
    width: 13,
    height: 13,
    borderWidth: 1,
    borderColor: "#668489",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  checkboxActive: {
    backgroundColor: "#267D73",
    borderColor: "#267D73",
  },

  rememberText: {
    fontSize: 12,
    color: "#526B70",
  },

  signupButton: {
    height: 45,
    borderRadius: 10,
    backgroundColor: "#267D73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 8,
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1E7E7",
  },

  orText: {
    fontSize: 11,
    color: "#829294",
    marginHorizontal: 10,
  },

  socialButton: {
    height: 43,
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

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },

  loginNormal: {
    fontSize: 12,
    color: "#70898D",
  },

  loginText: {
    fontSize: 12,
    color: "#267D73",
    fontWeight: "700",
    marginLeft: 6,
  },
});