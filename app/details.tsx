import { Stack, useLocalSearchParams } from "expo-router";
import {
  Button,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  // =====================================================
  // BASIC INFORMATION
  // =====================================================

  const name =
    params.name?.toString() || "Unknown Hospital";

  const city =
    params.city?.toString() || "Unknown";

  const state =
    params.state?.toString() || "Unknown";

  const distance =
    params.distance?.toString() || "Not calculated";

  const latitude =
    params.latitude?.toString() || "";

  const longitude =
    params.longitude?.toString() || "";

  // =====================================================
  // HOSPITAL DATA
  // =====================================================

  const treatmentCost =
    params.treatment_cost?.toString() ||
    params.cost?.toString() ||
    "Not available";

  const qualityScore =
    params.quality_score?.toString() ||
    params.quality?.toString() ||
    "Not available";

  const recommendationScore =
    params.recommendation_score?.toString() ||
    params.recommendation?.toString() ||
    "Not available";

  const costScore =
    params.cost_score?.toString() ||
    "Not available";

  const qualityNormalized =
    params.quality_score_normalized?.toString() ||
    "Not available";

  const distanceScore =
    params.distance_score?.toString() ||
    "Not available";

  const services =
    params.services?.toString() ||
    "Not available";

  // =====================================================
  // OPEN GOOGLE MAPS
  // =====================================================

  const openMap = async () => {
    if (!latitude || !longitude) {
      return;
    }

    const mapUrl =
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    try {
      await Linking.openURL(mapUrl);
    } catch (error) {
      console.log("Could not open Google Maps", error);
    }
  };

  // =====================================================
  // RECOMMENDATION MESSAGE
  // =====================================================

  const getRecommendationMessage = () => {
    if (recommendationScore === "Not available") {
      return "Recommendation score is not available.";
    }

    const score = parseFloat(recommendationScore);

    if (score >= 80) {
      return "Highly recommended based on cost, quality and distance.";
    }

    if (score >= 60) {
      return "A good option based on the available information.";
    }

    return "Recommended based on the available hospital information.";
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      <Stack.Screen
        options={{
          title: "Hospital Details",
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <Text style={styles.hospitalIcon}>
            🏥
          </Text>

          <Text style={styles.title}>
            {name}
          </Text>

          <Text style={styles.location}>
            📍 {city}, {state}
          </Text>

        </View>


        {/* =================================================
            RECOMMENDATION SCORE
        ================================================= */}

        {recommendationScore !== "Not available" && (
          <View style={styles.recommendationBox}>

            <Text style={styles.recommendationTitle}>
              🏆 Recommendation Score
            </Text>

            <Text style={styles.recommendationScore}>
              {recommendationScore}/100
            </Text>

            <Text style={styles.recommendationText}>
              {getRecommendationMessage()}
            </Text>

          </View>
        )}


        {/* =================================================
            HOSPITAL INFORMATION
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            📋 Hospital Information
          </Text>

          <View style={styles.infoRow}>

            <Text style={styles.label}>
              📍 Location
            </Text>

            <Text style={styles.value}>
              {city}, {state}
            </Text>

          </View>

          <View style={styles.infoRow}>

            <Text style={styles.label}>
              📏 Distance
            </Text>

            <Text style={styles.value}>
              {distance === "Not calculated"
                ? distance
                : `${distance} km`}
            </Text>

          </View>

        </View>


        {/* =================================================
            SERVICES
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            🩺 Medical Services
          </Text>

          <Text style={styles.services}>
            {services}
          </Text>

        </View>


        {/* =================================================
            TREATMENT COST
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            💰 Treatment Cost
          </Text>

          <Text style={styles.cost}>
            {treatmentCost === "Not available"
              ? treatmentCost
              : `₹${treatmentCost}`}
          </Text>

          <Text style={styles.note}>
            Estimated treatment cost
          </Text>

        </View>


        {/* =================================================
            QUALITY
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            ⭐ Quality
          </Text>

          <Text style={styles.quality}>
            {qualityScore === "Not available"
              ? qualityScore
              : `${qualityScore}/5`}
          </Text>

          <Text style={styles.note}>
            Hospital quality rating
          </Text>

        </View>


        {/* =================================================
            RECOMMENDATION BREAKDOWN
        ================================================= */}

        {recommendationScore !== "Not available" && (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              📊 Recommendation Breakdown
            </Text>

            <View style={styles.scoreRow}>

              <Text style={styles.scoreLabel}>
                💰 Cost Score
              </Text>

              <Text style={styles.scoreValue}>
                {costScore}/100
              </Text>

            </View>

            <View style={styles.scoreRow}>

              <Text style={styles.scoreLabel}>
                ⭐ Quality Score
              </Text>

              <Text style={styles.scoreValue}>
                {qualityNormalized}/100
              </Text>

            </View>

            <View style={styles.scoreRow}>

              <Text style={styles.scoreLabel}>
                📏 Distance Score
              </Text>

              <Text style={styles.scoreValue}>
                {distanceScore}/100
              </Text>

            </View>

            {/* WEIGHTS */}

            <View style={styles.weightsBox}>

              <Text style={styles.weightsTitle}>
                Ranking Weights
              </Text>

              <Text style={styles.weightText}>
                💰 Cost: 40%
              </Text>

              <Text style={styles.weightText}>
                ⭐ Quality: 35%
              </Text>

              <Text style={styles.weightText}>
                📏 Distance: 25%
              </Text>

            </View>

          </View>
        )}


        {/* =================================================
            MAP
        ================================================= */}

        <View style={styles.mapSection}>

          <Text style={styles.cardTitle}>
            🗺️ Hospital Location
          </Text>

          <Button
            title="Open in Google Maps"
            onPress={openMap}
          />

        </View>


        {/* =================================================
            FUTURE FEATURES
        ================================================= */}

        <View style={styles.futureBox}>

          <Text style={styles.futureTitle}>
            🚀 Coming Soon
          </Text>

          <Text style={styles.futureText}>
            • Real-time traffic
          </Text>

          <Text style={styles.futureText}>
            • Estimated travel time
          </Text>

          <Text style={styles.futureText}>
            • Hospital phone number
          </Text>

          <Text style={styles.futureText}>
            • Emergency services
          </Text>

          <Text style={styles.futureText}>
            • Hospital reviews
          </Text>

        </View>

      </ScrollView>
    </>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  hospitalIcon: {
    fontSize: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  location: {
    fontSize: 16,
    textAlign: "center",
  },

  // ===================================================
  // RECOMMENDATION
  // ===================================================

  recommendationBox: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  recommendationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  recommendationScore: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },

  recommendationText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },

  // ===================================================
  // CARDS
  // ===================================================

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 12,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
  },

  // ===================================================
  // SERVICES
  // ===================================================

  services: {
    fontSize: 16,
    lineHeight: 24,
  },

  // ===================================================
  // COST
  // ===================================================

  cost: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  // ===================================================
  // QUALITY
  // ===================================================

  quality: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  note: {
    fontSize: 13,
  },

  // ===================================================
  // SCORE BREAKDOWN
  // ===================================================

  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 5,
  },

  scoreLabel: {
    fontSize: 15,
  },

  scoreValue: {
    fontSize: 16,
    fontWeight: "bold",
  },

  weightsBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },

  weightsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  weightText: {
    fontSize: 14,
    marginBottom: 5,
  },

  // ===================================================
  // MAP
  // ===================================================

  mapSection: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },

  // ===================================================
  // FUTURE FEATURES
  // ===================================================

  futureBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 5,
  },

  futureTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },

  futureText: {
    fontSize: 15,
    marginBottom: 6,
  },

});