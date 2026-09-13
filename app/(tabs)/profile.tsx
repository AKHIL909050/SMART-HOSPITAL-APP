import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { auth, db } from "../../firebase/config";

export default function ProfileScreen() {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserName("User");
        setEmail("");
        return;
      }

      setEmail(user.email || "");

      try {
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );

        if (userDoc.exists()) {
          const data = userDoc.data();

          setUserName(data.name || "User");
          setEmail(data.email || user.email || "");
        }
      } catch (error) {
        console.log("Profile loading error:", error);
      }
    });

    return unsubscribe;
  }, []);

  const getInitials = () => {
    const words = userName.trim().split(" ");

    if (words.length >= 2) {
      return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
      ).toUpperCase();
    }

    return userName.substring(0, 2).toUpperCase();
  };

  const handleComingSoon = (title: string) => {
    Alert.alert(title, "This feature will be available soon.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.backButton}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="#173B42"
            />
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>

          <Pressable
            style={styles.settingsButton}
            onPress={() => handleComingSoon("Settings")}
          >
            <Ionicons
              name="settings-outline"
              size={21}
              color="#173B42"
            />
          </Pressable>
        </View>

        {/* PROFILE */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials()}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {userName}
            </Text>

            <Text style={styles.email}>
              {email}
            </Text>

            <Pressable
              onPress={() => handleComingSoon("Edit Profile")}
            >
              <Text style={styles.editProfile}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>

          {/* MY PREFERENCES */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("My Preferences")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="settings-outline"
                size={20}
                color="#173B42"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                My Preferences
              </Text>

              <Text style={styles.menuSubtitle}>
                Set your treatment & location preferences
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

          {/* SAVED HOSPITALS */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("Saved Hospitals")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="bookmark-outline"
                size={20}
                color="#B34B5B"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Saved Hospitals
              </Text>

              <Text style={styles.menuSubtitle}>
                View your saved hospitals
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

          {/* MEDICAL HISTORY */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("Medical History")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="medkit-outline"
                size={20}
                color="#347D7A"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Medical History
              </Text>

              <Text style={styles.menuSubtitle}>
                (Coming Soon)
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

          {/* NOTIFICATIONS */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("Notifications")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#B34B5B"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Notifications
              </Text>

              <Text style={styles.menuSubtitle}>
                Manage alerts and reminders
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

          {/* HELP & SUPPORT */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("Help & Support")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="notifications"
                size={20}
                color="#173B42"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Help & Support
              </Text>

              <Text style={styles.menuSubtitle}>
                Get help or contact us
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

          {/* SETTINGS */}
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              handleComingSoon("Settings")
            }
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="settings-outline"
                size={20}
                color="#173B42"
              />
            </View>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                Settings
              </Text>

              <Text style={styles.menuSubtitle}>
                App settings and privacy
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#668083"
            />
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF6F7",
  },

  container: {
    flex: 1,
    backgroundColor: "#EEF6F7",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: "#173B42",
    marginLeft: 4,
  },

  settingsButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  /* PROFILE */

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 18,
    marginBottom: 12,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#27849A",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },

  name: {
    fontSize: 23,
    fontWeight: "700",
    color: "#173B42",
    marginBottom: 5,
  },

  email: {
    fontSize: 13,
    color: "#73888B",
    marginBottom: 7,
  },

  editProfile: {
    fontSize: 14,
    fontWeight: "600",
    color: "#287B7A",
  },

  /* MENU */

  menuContainer: {
    marginTop: 2,
  },

  menuItem: {
    minHeight: 78,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    marginBottom: 9,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  menuIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F1F7F7",
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    flex: 1,
    marginLeft: 15,
  },

  menuTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#173B42",
    marginBottom: 4,
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#8A999B",
  },
});