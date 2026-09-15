import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = "http://192.168.1.245:8000";

export default function ResultScreen() {
  const { search } = useLocalSearchParams<{ search?: string }>();

  const treatment =
    typeof search === "string" ? search.trim() : "";

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (treatment) {
      getRecommendations(treatment);
    }
  }, [treatment]);

  const getRecommendations = async (service: string) => {
    setLoading(true);
    setHospitals([]);

    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert(
          "Location Required",
          "Please allow location access to find recommended hospitals near you."
        );
        setLoading(false);
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const latitude = currentLocation.coords.latitude;
      const longitude = currentLocation.coords.longitude;

      const url =
        `${API_URL}/hospitals/recommend` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&service=${encodeURIComponent(service)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Recommendation request failed: ${response.status}`
        );
      }

      const data = await response.json();

      const recommendedHospitals = Array.isArray(data.hospitals)
        ? data.hospitals
        : [];

      setHospitals(recommendedHospitals);

      if (recommendedHospitals.length === 0) {
        Alert.alert(
          "No Hospitals Found",
          `No hospitals were found for "${service}".`
        );
      }
    } catch (error) {
      console.log("RESULT ERROR:", error);

      Alert.alert(
        "Search Error",
        "Could not get hospital recommendations."
      );
    } finally {
      setLoading(false);
    }
  };

  const openHospitalDetails = (hospital: any) => {
    router.push({
      pathname: "/details",
      params: {
        name: hospital.name ?? "Hospital",

        city: hospital.city ?? "",

        state: hospital.state ?? "",

        distance:
          hospital.distance_km !== undefined
            ? String(hospital.distance_km)
            : "Not calculated",

        latitude:
          hospital.latitude !== undefined
            ? String(hospital.latitude)
            : "",

        longitude:
          hospital.longitude !== undefined
            ? String(hospital.longitude)
            : "",

        treatment_cost:
          hospital.treatment_cost !== undefined
            ? String(hospital.treatment_cost)
            : "Not available",

        quality_score:
          hospital.quality_score !== undefined
            ? String(hospital.quality_score)
            : "Not available",

        recommendation_score:
          hospital.recommendation_score !== undefined
            ? String(hospital.recommendation_score)
            : "Not available",

        services: Array.isArray(hospital.services)
          ? hospital.services.join(", ")
          : hospital.services
            ? String(hospital.services)
            : "Not available",
      },
    });
  };

  const retrySearch = () => {
    if (treatment) {
      getRecommendations(treatment);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#173B3A"
            />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Recommended Hospitals
            </Text>

            {treatment ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {`Results for "${treatment}"`}
              </Text>
            ) : null}
          </View>
        </View>

        {/* SEARCH INFORMATION */}

        {treatment && !loading && hospitals.length > 0 && (
          <View style={styles.searchInfoCard}>
            <View style={styles.searchInfoIcon}>
              <Ionicons
                name="medical-outline"
                size={23}
                color="#267D73"
              />
            </View>

            <View style={styles.searchInfoText}>
              <Text style={styles.searchInfoLabel}>
                Treatment / Service
              </Text>

              <Text
                style={styles.searchInfoValue}
                numberOfLines={2}
              >
                {treatment}
              </Text>
            </View>

            <View style={styles.countBox}>
              <Text style={styles.countNumber}>
                {hospitals.length}
              </Text>

              <Text style={styles.countLabel}>
                Found
              </Text>
            </View>
          </View>
        )}

        {/* LOADING */}

        {loading && (
          <View style={styles.loadingBox}>
            <View style={styles.loadingIcon}>
              <ActivityIndicator
                size="large"
                color="#267D73"
              />
            </View>

            <Text style={styles.loadingTitle}>
              Finding hospitals
            </Text>

            <Text style={styles.loadingText}>
              Looking for the best hospitals near your location...
            </Text>
          </View>
        )}

        {/* RESULTS */}

        {!loading && hospitals.length > 0 && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <View>
                <Text style={styles.resultsTitle}>
                  Best Matches
                </Text>

                <Text style={styles.resultsSubtitle}>
                  Hospitals recommended for your treatment
                </Text>
              </View>
            </View>

            {hospitals.map((hospital, index) => {
              const isBestMatch = index === 0;

              return (
                <Pressable
                  key={hospital.id ?? `hospital-${index}`}
                  style={[
                    styles.hospitalCard,
                    isBestMatch && styles.bestHospitalCard,
                  ]}
                  onPress={() =>
                    openHospitalDetails(hospital)
                  }
                >
                  {/* BEST MATCH LABEL */}

                  {isBestMatch && (
                    <View style={styles.bestMatchBadge}>
                      <Ionicons
                        name="sparkles"
                        size={13}
                        color="#267D73"
                      />

                      <Text style={styles.bestMatchText}>
                        Best Match
                      </Text>
                    </View>
                  )}

                  {/* HOSPITAL HEADER */}

                  <View style={styles.hospitalTopRow}>
                    <View style={styles.hospitalIcon}>
                      <Ionicons
                        name="medical"
                        size={25}
                        color="#267D73"
                      />
                    </View>

                    <View style={styles.hospitalTitleArea}>
                      <Text
                        style={styles.hospitalName}
                        numberOfLines={2}
                      >
                        {hospital.name ??
                          "Hospital Name"}
                      </Text>

                      <View style={styles.locationRow}>
                        <Ionicons
                          name="location-outline"
                          size={14}
                          color="#718387"
                        />

                        <Text
                          style={styles.hospitalLocation}
                          numberOfLines={1}
                        >
                          {hospital.city ?? ""}
                          {hospital.city &&
                          hospital.state
                            ? ", "
                            : ""}
                          {hospital.state ?? ""}
                        </Text>
                      </View>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={21}
                      color="#829497"
                    />
                  </View>

                  {/* HOSPITAL INFORMATION */}

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <View style={styles.infoIcon}>
                        <Ionicons
                          name="navigate-outline"
                          size={16}
                          color="#267D73"
                        />
                      </View>

                      <View>
                        <Text style={styles.infoLabel}>
                          Distance
                        </Text>

                        <Text style={styles.infoValue}>
                          {hospital.distance_km !==
                          undefined
                            ? `${hospital.distance_km} km`
                            : "—"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoItem}>
                      <View style={styles.infoIcon}>
                        <Ionicons
                          name="cash-outline"
                          size={16}
                          color="#267D73"
                        />
                      </View>

                      <View>
                        <Text style={styles.infoLabel}>
                          Treatment Cost
                        </Text>

                        <Text style={styles.infoValue}>
                          {hospital.treatment_cost !==
                          undefined
                            ? `₹${hospital.treatment_cost}`
                            : "—"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* QUALITY + SCORE */}

                  <View style={styles.bottomRow}>
                    <View style={styles.qualityBox}>
                      <Ionicons
                        name="star"
                        size={16}
                        color="#C18A18"
                      />

                      <Text style={styles.qualityText}>
                        {hospital.quality_score !==
                        undefined
                          ? `${hospital.quality_score}/5`
                          : "N/A"}
                      </Text>

                      <Text style={styles.qualityLabel}>
                        Quality
                      </Text>
                    </View>

                    {hospital.recommendation_score !==
                      undefined && (
                      <View style={styles.recommendationBox}>
                        <Text
                          style={
                            styles.recommendationLabel
                          }
                        >
                          Recommendation
                        </Text>

                        <Text
                          style={
                            styles.recommendationValue
                          }
                        >
                          {hospital.recommendation_score}
                          /100
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* VIEW DETAILS */}

                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsText}>
                      View hospital details
                    </Text>

                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color="#267D73"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* NO RESULTS */}

        {!loading &&
          hospitals.length === 0 &&
          treatment && (
            <View style={styles.emptyBox}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="search-outline"
                  size={42}
                  color="#829497"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No hospitals found
              </Text>

              <Text style={styles.emptyText}>
                {`We couldn't find hospitals matching "${treatment}".`}
              </Text>

              <Pressable
                style={styles.retryButton}
                onPress={retrySearch}
              >
                <Ionicons
                  name="refresh"
                  size={17}
                  color="#FFFFFF"
                />

                <Text style={styles.retryText}>
                  Try Again
                </Text>
              </Pressable>
            </View>
          )}

        {/* NO SEARCH */}

        {!loading && !treatment && (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="search-outline"
                size={42}
                color="#829497"
              />
            </View>

            <Text style={styles.emptyTitle}>
              Search for a treatment
            </Text>

            <Text style={styles.emptyText}>
              Go back and enter a treatment or hospital
              service to see recommendations.
            </Text>

            <Pressable
              style={styles.retryButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={17}
                color="#FFFFFF"
              />

              <Text style={styles.retryText}>
                Back to Search
              </Text>
            </Pressable>
          </View>
        )}
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
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 100,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E4ECEA",
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#173B3A",
  },

  subtitle: {
    fontSize: 13,
    color: "#617276",
    marginTop: 4,
  },

  /* SEARCH INFO */

  searchInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2EBE9",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  searchInfoIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#EAF5F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  searchInfoText: {
    flex: 1,
  },

  searchInfoLabel: {
    fontSize: 10,
    color: "#829497",
    marginBottom: 3,
  },

  searchInfoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#30484C",
  },

  countBox: {
    alignItems: "center",
    marginLeft: 8,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#E4ECEA",
  },

  countNumber: {
    fontSize: 19,
    fontWeight: "800",
    color: "#267D73",
  },

  countLabel: {
    fontSize: 9,
    color: "#718387",
    marginTop: 1,
  },

  /* LOADING */

  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 80,
  },

  loadingIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EAF5F3",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173B3A",
    marginTop: 18,
  },

  loadingText: {
    fontSize: 13,
    color: "#718387",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },

  /* RESULTS */

  resultsSection: {
    marginTop: 2,
  },

  resultsHeader: {
    marginBottom: 13,
  },

  resultsTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173B3A",
  },

  resultsSubtitle: {
    fontSize: 11,
    color: "#718387",
    marginTop: 4,
  },

  /* HOSPITAL CARD */

  hospitalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#E2EBE9",
  },

  bestHospitalCard: {
    borderColor: "#A9D8D0",
  },

  bestMatchBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF5F3",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
    marginBottom: 12,
  },

  bestMatchText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#267D73",
    marginLeft: 4,
  },

  hospitalTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  hospitalIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF5F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  hospitalTitleArea: {
    flex: 1,
  },

  hospitalName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#173B3A",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  hospitalLocation: {
    flex: 1,
    fontSize: 11,
    color: "#718387",
    marginLeft: 3,
  },

  /* INFO */

  infoRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#EDF2F1",
    marginTop: 15,
    paddingTop: 13,
  },

  infoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 31,
    height: 31,
    borderRadius: 9,
    backgroundColor: "#F0F7F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  infoLabel: {
    fontSize: 9,
    color: "#87999C",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#30484C",
  },

  /* QUALITY */

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EDF2F1",
    marginTop: 12,
    paddingTop: 12,
  },

  qualityBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  qualityText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#30484C",
    marginLeft: 5,
  },

  qualityLabel: {
    fontSize: 10,
    color: "#87999C",
    marginLeft: 5,
  },

  recommendationBox: {
    alignItems: "flex-end",
  },

  recommendationLabel: {
    fontSize: 9,
    color: "#87999C",
    marginBottom: 2,
  },

  recommendationValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#267D73",
  },

  /* DETAILS */

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F1",
  },

  detailsText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#267D73",
  },

  /* EMPTY */

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },

  emptyIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EAF0EF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173B3A",
    marginTop: 17,
  },

  emptyText: {
    fontSize: 13,
    color: "#718387",
    textAlign: "center",
    marginTop: 7,
    lineHeight: 20,
  },

  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#267D73",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 11,
    marginTop: 20,
  },

  retryText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 6,
  },
});