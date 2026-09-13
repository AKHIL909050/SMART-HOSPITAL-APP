import * as Location from "expo-location";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { auth, db } from "../../firebase/config";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const API_URL = "http://192.168.1.247:8000";

export default function HomeScreen() {
  // ==================================================
  // STATE
  // ==================================================
  const [userName, setUserName] = useState("User");
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserName("User");
        return;
      }

      try {
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setUserName(userData.name || "User");
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    });

    return unsubscribe;
  }, []);
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [hospitals, setHospitals] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [service, setService] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<any[]>([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [recommendations, setRecommendations] =
    useState<any[]>([]);

  const [recommendationLoading, setRecommendationLoading] =
    useState(false);


  // ==================================================
  // FIND NEARBY HOSPITALS
  // ==================================================

  const findHospitals = async () => {
    setLoading(true);

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location Permission",
          "Please allow location access to find nearby hospitals."
        );

        setLoading(false);
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      setLocation(currentLocation);

      const latitude =
        currentLocation.coords.latitude;

      const longitude =
        currentLocation.coords.longitude;

      const response = await fetch(
        `${API_URL}/hospitals/nearby?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setHospitals(data.hospitals);

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Connection Error",
        "Could not connect to the hospital server."
      );

    } finally {
      setLoading(false);
    }
  };

  const searchHospitals = () => {
    if (!service.trim()) {
      Alert.alert(
        "Search",
        "Please enter a treatment or hospital service."
      );
      return;
    }

  router.push({
    pathname: "/explore",
    params: {
      search: service.trim(),
    },
  });
};
  // ==================================================
  // SEARCH HOSPITALS
  // ==================================================



  // ==================================================
  // RECOMMEND BEST HOSPITAL
  // ==================================================

  const getRecommendations = async () => {
    if (!service.trim()) {
      Alert.alert(
        "Enter Treatment",
        "Please enter a treatment first."
      );

      return;
    }

    if (!location) {
      Alert.alert(
        "Location Required",
        "Please find hospitals near you first."
      );

      return;
    }

    setRecommendationLoading(true);

    try {
      const latitude =
        location.coords.latitude;

      const longitude =
        location.coords.longitude;

      const response = await fetch(
        `${API_URL}/hospitals/recommend?latitude=${latitude}&longitude=${longitude}&service=${encodeURIComponent(
          service.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error(
          "Recommendation request failed"
        );
      }

      const data = await response.json();

      setRecommendations(data.hospitals);

      if (data.hospitals.length === 0) {
        Alert.alert(
          "No Hospitals Found",
          `No hospitals provide ${service}.`
        );
      }

    } catch (error) {
      console.log(error);

      Alert.alert(
        "Recommendation Error",
        "Could not get hospital recommendations."
      );

    } finally {
      setRecommendationLoading(false);
    }
  };


  // ==================================================
  // CLEAR SEARCH
  // ==================================================

  const clearSearch = () => {
    setService("");
    setSearchResults([]);
    setRecommendations([]);
  };


  // ==================================================
  // OPEN HOSPITAL DETAILS
  // ==================================================

  const openHospitalDetails = (hospital: any) => {
    router.push({
      pathname: "/details",

      params: {
        name: hospital.name,
        city: hospital.city,
        state: hospital.state,

        distance:
          hospital.distance_km !== undefined
            ? hospital.distance_km.toString()
            : "Not calculated",

        latitude:
          hospital.latitude.toString(),

        longitude:
          hospital.longitude.toString(),

        treatment_cost:
          hospital.treatment_cost !== undefined
            ? hospital.treatment_cost.toString()
            : "Not available",

        quality_score:
          hospital.quality_score !== undefined
            ? hospital.quality_score.toString()
            : "Not available",

        recommendation_score:
          hospital.recommendation_score !== undefined
            ? hospital.recommendation_score.toString()
            : "Not available",

        services:
          hospital.services
            ? hospital.services.join(", ")
            : "Not available",
      },
    });
  };


  // ==================================================
  // VOICE BUTTON
  // ==================================================

  const openVoiceAssistant = () => {
    Alert.alert(
      "Voice Assistant",
      "Voice search will be connected here."
    );
  };


  // ==================================================
  // QUICK TREATMENTS
  // ==================================================

  const selectTreatment = (treatment: string) => {
    setService(treatment);
  };

  const selectEmergency = (emergencyType: string) => {
    router.push({
      pathname: "/nearby",
      params: {
        emergencyType,
      },
    });
  }; 

 
  const searchHospitalsByEmergency = async (
    emergency: string
  ) => {
    setService(emergency);
    setSearchLoading(true);
    setSearchResults([]);
    setRecommendations([]);
  
    try {
      // Get user's current location
      let currentLocation = location;
    
      if (!currentLocation) {
        const { status } =
          await Location.requestForegroundPermissionsAsync();
      
        if (status !== "granted") {
          Alert.alert(
            "Location Required",
            "Please allow location access to find nearby emergency hospitals."
          );
          return;
        }
      
        currentLocation =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
        
        setLocation(currentLocation);
      }
    
      const { latitude, longitude } =
        currentLocation.coords;
    
      // Find nearby hospitals
      const response = await fetch(
        `${API_URL}/hospitals/nearby?latitude=${latitude}&longitude=${longitude}`
      );
    
      if (!response.ok) {
        throw new Error("Emergency hospital search failed");
      }
    
      const data = await response.json();
    
      setSearchResults(data.hospitals);
    
      if (!data.hospitals || data.hospitals.length === 0) {
        Alert.alert(
          "No Nearby Hospitals",
          `No nearby hospitals were found for ${emergency}.`
        );
      }
    } catch (error) {
      console.log(error);
    
      Alert.alert(
        "Connection Error",
        "Could not find nearby emergency hospitals."
      );
    } finally {
      setSearchLoading(false);
    }
  };
  
    

  // ==================================================
  // UI
  // ==================================================

  return (
    <View style={styles.screen}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>

          <View>
            <Text style={styles.goodMorning}>
              Good Morning,
            </Text>

            <Text style={styles.userName}>
              {userName}
            </Text>

            <View style={styles.locationRow}>
              <Ionicons
                name="location"
                size={15}
                color="#267D73"
              />

              <Text style={styles.locationName}>
                Hyderabad, Telangana
              </Text>
            </View>
          </View>

          <View style={styles.headerIcons}>

            <Pressable style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#173B42"
              />
            </Pressable>

            <Pressable style={styles.profileCircle}>
              <Ionicons
                name="person"
                size={22}
                color="#267D73"
              />
            </Pressable>

          </View>

        </View>


        {/* ==========================================
            SEARCH BAR
        ========================================== */}

  <View style={styles.searchBar}>
  <Pressable
    onPress={() => {
      console.log("SEARCH BUTTON PRESSED");
      searchHospitals();
    }}
  >
  <Pressable onPress={searchHospitals}>
    <Ionicons
      name="search"
      size={20}
      color="#718387"
    />
  </Pressable>
  </Pressable>
          
    <TextInput
      style={styles.searchInput}
      placeholder="Search hospitals, treatments..."
      value={service}
      onChangeText={setService}
      autoCapitalize="words"
      returnKeyType="search"
      onSubmitEditing={searchHospitals}
    />

          <Pressable
            onPress={openVoiceAssistant}
            style={styles.voiceButton}
          >
            <Ionicons
              name="mic-outline"
              size={21}
              color="#267D73"
            />
          </Pressable>

          <Ionicons
            name="options-outline"
            size={21}
            color="#527278"
          />

        </View>


        {/* ==========================================
            MAIN BANNER
        ========================================== */}

        <View style={styles.banner}>

          <View style={styles.bannerTextArea}>

            <Text style={styles.bannerTitle}>
              Find the right hospital
            </Text>

            <Text style={styles.bannerTitle}>
              for your treatment
            </Text>

            <Text style={styles.bannerSubtitle}>
              Compare. Choose. Get better.
            </Text>

          </View>

          <View style={styles.bannerImageContainer}>
            <MaterialCommunityIcons
              name="hospital-building"
              size={75}
              color="#3C8D91"
            />

            <Ionicons
              name="medical"
              size={25}
              color="#FFFFFF"
              style={styles.medicalIcon}
            />
          </View>

        </View>


        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <View style={styles.quickGrid}>

          {/* FIND NEARBY */}

          <Pressable
            style={[
              styles.quickCard,
              styles.blueCard,
            ]}
            onPress={findHospitals}
          >

            <View style={styles.quickIconBlue}>
              <Ionicons
                name="location"
                size={23}
                color="#2875D4"
              />
            </View>

            <Text style={styles.quickTitle}>
              Find Hospitals
            </Text>

            <Text style={styles.quickSubtitle}>
              {loading
                ? "Finding..."
                : "Near Me"}
            </Text>

          </Pressable>


          {/* SEARCH TREATMENT */}

          <Pressable
            style={[
              styles.quickCard,
              styles.greenCard,
            ]}
            onPress={searchHospitals}
          >

            <View style={styles.quickIconGreen}>
              <Ionicons
                name="medical"
                size={22}
                color="#279B79"
              />
            </View>

            <Text style={styles.quickTitle}>
              Search by
            </Text>

            <Text style={styles.quickSubtitle}>
              Treatment
            </Text>

          </Pressable>


          {/* COMPARE */}

          <Pressable
            style={[
              styles.quickCard,
              styles.purpleCard,
            ]}
          >

            <View style={styles.quickIconPurple}>
              <Ionicons
                name="git-compare-outline"
                size={22}
                color="#8B57B5"
              />
            </View>

            <Text style={styles.quickTitle}>
              Compare
            </Text>

            <Text style={styles.quickSubtitle}>
              Hospitals
            </Text>

          </Pressable>


          {/* SAVED */}

          <Pressable
            style={[
              styles.quickCard,
              styles.yellowCard,
            ]}
          >

            <View style={styles.quickIconYellow}>
              <Ionicons
                name="bookmark-outline"
                size={22}
                color="#A77A17"
              />
            </View>

            <Text style={styles.quickTitle}>
              Saved
            </Text>

            <Text style={styles.quickSubtitle}>
              Hospitals
            </Text>

          </Pressable>

        </View>


        {/* ==========================================
            Emergency Care
        ========================================== */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Emergency Care
          </Text>

          <Pressable>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </Pressable>

        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.treatmentRow}
        >
          {/* ACCIDENT */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Accident / Trauma")}
          >
            <View style={styles.treatmentIconRed}>
              <MaterialCommunityIcons
                name="car-emergency"
                size={21}
                color="#D95757"
              />
            </View>

            <Text style={styles.treatmentName}>
              Accident
            </Text>
          </Pressable>

          {/* HEART ATTACK */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Heart Attack")}
          >
            <View style={styles.treatmentIconRed}>
              <Ionicons
                name="heart"
                size={20}
                color="#D95757"
              />
            </View>

            <Text style={styles.treatmentName}>
              Heart Attack
            </Text>
          </Pressable>

          {/* SEIZURE */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Seizure")}
          >
            <View style={styles.treatmentIconPurple}>
              <MaterialCommunityIcons
                name="brain"
                size={20}
                color="#8554B4"
              />
            </View>

            <Text style={styles.treatmentName}>
              Fits / Seizure
            </Text>
          </Pressable>

          {/* BLEEDING */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Severe Bleeding")}
          >
            <View style={styles.treatmentIconRed}>
              <Ionicons
                name="water"
                size={20}
                color="#D95757"
              />
            </View>

            <Text style={styles.treatmentName}>
              Severe Bleeding
            </Text>
          </Pressable>

          {/* BREATHING */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Breathing Emergency")}
          >
            <View style={styles.treatmentIconBlue}>
              <Ionicons
                name="medical"
                size={20}
                color="#2875D4"
              />
            </View>

            <Text style={styles.treatmentName}>
              Breathing
            </Text>
          </Pressable>

          {/* BURNS */}
          <Pressable
            style={styles.treatmentItem}
            onPress={() => searchHospitalsByEmergency("Burns")}
          >
            <View style={styles.treatmentIconYellow}>
              <MaterialCommunityIcons
                name="fire"
                size={20}
                color="#C18A18"
              />
            </View>

            <Text style={styles.treatmentName}>
              Burns
            </Text>
          </Pressable>
        </ScrollView>


        {/* ==========================================
            RECOMMEND BUTTON
        ========================================== */}

        {service.trim().length > 0 && (
          <Pressable
            style={styles.recommendButton}
            onPress={getRecommendations}
            disabled={recommendationLoading}
          >

            <Ionicons
              name="sparkles"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.recommendButtonText}>
              {recommendationLoading
                ? "Finding Best Hospital..."
                : "Find Best Hospital"}
            </Text>

          </Pressable>
        )}


        {/* ==========================================
            RECOMMENDED HOSPITALS
        ========================================== */}

        {recommendations.length > 0 && (

          <View style={styles.resultsSection}>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Recommended for You
              </Text>
            </View>

            {recommendations.map(
              (hospital, index) => (

                <Pressable
                  key={
                    hospital.id ?? index
                  }
                  style={[
                    styles.hospitalCard,
                    index === 0 &&
                      styles.bestHospitalCard,
                  ]}
                  onPress={() =>
                    openHospitalDetails(
                      hospital
                    )
                  }
                >

                  {index === 0 && (
                    <View style={styles.bestBadge}>
                      <Text style={styles.bestBadgeText}>
                        BEST MATCH
                      </Text>
                    </View>
                  )}

                  <View style={styles.hospitalTopRow}>

                    <View style={styles.hospitalIcon}>
                      <Ionicons
                        name="medical"
                        size={24}
                        color="#267D73"
                      />
                    </View>

                    <View style={styles.hospitalTitleArea}>

                      <Text
                        style={styles.hospitalName}
                        numberOfLines={2}
                      >
                        {hospital.name}
                      </Text>

                      <Text style={styles.hospitalLocation}>
                        {hospital.city},{" "}
                        {hospital.state}
                      </Text>

                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={21}
                      color="#829497"
                    />

                  </View>


                  <View style={styles.infoRow}>

                    <View>
                      <Text style={styles.infoLabel}>
                        Distance
                      </Text>

                      <Text style={styles.infoValue}>
                        {hospital.distance_km} km
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.infoLabel}>
                        Cost
                      </Text>

                      <Text style={styles.infoValue}>
                        ₹{hospital.treatment_cost}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.infoLabel}>
                        Quality
                      </Text>

                      <Text style={styles.infoValue}>
                        ⭐ {hospital.quality_score}/5
                      </Text>
                    </View>

                  </View>


                  <View style={styles.scoreRow}>

                    <Text style={styles.scoreLabel}>
                      Recommendation Score
                    </Text>

                    <Text style={styles.scoreValue}>
                      {hospital.recommendation_score}/100
                    </Text>

                  </View>

                </Pressable>
              )
            )}

          </View>
        )}


        {/* ==========================================
            NORMAL SEARCH RESULTS
        ========================================== */}

        {searchResults.length > 0 && (

          <View style={styles.resultsSection}>

            <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>
                Hospitals for {service}
              </Text>

              <Text style={styles.resultCount}>
                {searchResults.length}
              </Text>

            </View>


            {searchResults.map(
              (hospital, index) => (

                <Pressable
                  key={
                    hospital.id ?? index
                  }
                  style={styles.hospitalCard}
                  onPress={() =>
                    openHospitalDetails(
                      hospital
                    )
                  }
                >

                  <View style={styles.hospitalTopRow}>

                    <View style={styles.hospitalIcon}>
                      <Ionicons
                        name="medical"
                        size={24}
                        color="#267D73"
                      />
                    </View>

                    <View style={styles.hospitalTitleArea}>

                      <Text
                        style={styles.hospitalName}
                        numberOfLines={2}
                      >
                        {hospital.name}
                      </Text>

                      <Text style={styles.hospitalLocation}>
                        {hospital.city},{" "}
                        {hospital.state}
                      </Text>

                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={21}
                      color="#829497"
                    />

                  </View>

                </Pressable>

              )
            )}

          </View>
        )}


        {/* ==========================================
            NEARBY HOSPITALS
        ========================================== */}

        {hospitals.length > 0 && (

          <View style={styles.resultsSection}>

            <View style={styles.sectionHeader}>

              <Text style={styles.sectionTitle}>
                Hospitals Near You
              </Text>

            </View>


            {hospitals.map(
              (hospital, index) => (

                <Pressable
                  key={
                    hospital.id ?? index
                  }
                  style={styles.hospitalCard}
                  onPress={() =>
                    openHospitalDetails(
                      hospital
                    )
                  }
                >

                  <View style={styles.hospitalTopRow}>

                    <View style={styles.hospitalIcon}>
                      <Ionicons
                        name="location"
                        size={24}
                        color="#2875D4"
                      />
                    </View>

                    <View style={styles.hospitalTitleArea}>

                      <Text
                        style={styles.hospitalName}
                        numberOfLines={2}
                      >
                        {hospital.name}
                      </Text>

                      <Text style={styles.hospitalLocation}>
                        {hospital.city},{" "}
                        {hospital.state}
                      </Text>

                    </View>

                    <Text style={styles.nearDistance}>
                      {hospital.distance_km} km
                    </Text>

                  </View>

                </Pressable>

              )
            )}

          </View>
        )}


        {/* CLEAR */}

        {(searchResults.length > 0 ||
          recommendations.length > 0) && (

          <Pressable
            style={styles.clearButton}
            onPress={clearSearch}
          >

            <Text style={styles.clearText}>
              Clear Search
            </Text>

          </Pressable>

        )}

      </ScrollView>
     </View>
  );
}


// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#F8FBFA",
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 100,
  },


  // ================================================
  // HEADER
  // ================================================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  goodMorning: {
    fontSize: 13,
    color: "#617276",
    marginBottom: 2,
  },

  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173B42",
    marginBottom: 5,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationName: {
    fontSize: 12,
    color: "#526A6E",
    marginLeft: 4,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCEEEF",
    justifyContent: "center",
    alignItems: "center",
  },


  // ================================================
  // SEARCH
  // ================================================

  searchBar: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2EBE9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#263F43",
    paddingHorizontal: 9,
  },

  voiceButton: {
    paddingHorizontal: 7,
    paddingVertical: 6,
  },


  // ================================================
  // BANNER
  // ================================================

  banner: {
    height: 105,
    backgroundColor: "#D9F2F3",
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 15,
  },

  bannerTextArea: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 15,
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#17434A",
    lineHeight: 20,
  },

  bannerSubtitle: {
    fontSize: 11,
    color: "#507075",
    marginTop: 8,
  },

  bannerImageContainer: {
    width: 105,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  medicalIcon: {
    position: "absolute",
    top: 34,
  },


  // ================================================
  // QUICK ACTIONS
  // ================================================

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 21,
  },

  quickCard: {
    width: "48%",
    height: 103,
    borderRadius: 13,
    padding: 12,
    marginBottom: 10,
  },

  blueCard: {
    backgroundColor: "#E7F1FF",
  },

  greenCard: {
    backgroundColor: "#E4F7EF",
  },

  purpleCard: {
    backgroundColor: "#F2EAF8",
  },

  yellowCard: {
    backgroundColor: "#FFF3DF",
  },

  quickIconBlue: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#D5E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  quickIconGreen: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#D0EFDF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  quickIconPurple: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#E5D7F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  quickIconYellow: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#FBE8C4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  quickTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#30484C",
  },

  quickSubtitle: {
    fontSize: 11,
    color: "#66797C",
    marginTop: 2,
  },


  // ================================================
  // SECTION HEADER
  // ================================================

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#203F44",
  },

  viewAll: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4B8F91",
  },

  resultCount: {
    fontSize: 12,
    color: "#6A7D80",
  },


  // ================================================
  // POPULAR TREATMENTS
  // ================================================

  treatmentRow: {
    paddingBottom: 20,
    gap: 13,
  },

  treatmentItem: {
    width: 70,
    alignItems: "center",
  },

  treatmentIconRed: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FBE7E7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  treatmentIconYellow: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF4D6",
    alignItems: "center",
    justifyContent: "center",
  },

  treatmentIconBlue: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E4F2F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  treatmentIconPurple: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F0E7F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  treatmentIconTeal: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E0F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  treatmentName: {
    fontSize: 10,
    color: "#52666A",
    textAlign: "center",
  },


  // ================================================
  // RECOMMEND BUTTON
  // ================================================

  recommendButton: {
    height: 48,
    backgroundColor: "#267D73",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },

  recommendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },


  // ================================================
  // RESULTS
  // ================================================

  resultsSection: {
    marginBottom: 20,
  },

  hospitalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: "#E4ECEA",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  bestHospitalCard: {
    borderColor: "#8ACAC2",
  },

  bestBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E1F3EF",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 9,
  },

  bestBadgeText: {
    color: "#267D73",
    fontSize: 9,
    fontWeight: "800",
  },

  hospitalTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  hospitalIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#E6F3F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  hospitalTitleArea: {
    flex: 1,
  },

  hospitalName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#243E43",
    marginBottom: 4,
  },

  hospitalLocation: {
    fontSize: 11,
    color: "#708084",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EDF1F0",
    marginTop: 13,
    paddingTop: 12,
  },

  infoLabel: {
    fontSize: 9,
    color: "#839194",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#314B50",
  },

  scoreRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDF1F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  scoreLabel: {
    fontSize: 10,
    color: "#6A7D80",
  },

  scoreValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#267D73",
  },

  nearDistance: {
    fontSize: 11,
    fontWeight: "700",
    color: "#267D73",
  },


  // ================================================
  // CLEAR
  // ================================================

  clearButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  clearText: {
    color: "#718387",
    fontSize: 12,
    fontWeight: "600",
  },


  // ================================================
  // BOTTOM NAVIGATION
  // ================================================




});