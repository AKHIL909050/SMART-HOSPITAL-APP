import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function CompareResultScreen() {
  const { selectedHospitals, search } =
    useLocalSearchParams<{
      selectedHospitals?: string;
      search?: string;
    }>();

  let hospitals: any[] = [];

  try {
    hospitals = selectedHospitals
      ? JSON.parse(selectedHospitals)
      : [];
  } catch {
    hospitals = [];
  }

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#263638"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Compare Hospitals
        </Text>

        <View style={{ width: 23 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TREATMENT */}
        <View style={styles.treatmentRow}>
          <Text style={styles.treatmentText}>
            Treatment:{" "}
            <Text style={styles.bold}>
              {search ?? "—"}
            </Text>
          </Text>

          <Pressable
            onPress={() => router.back()}
          >
            <Text style={styles.change}>
              Change
            </Text>
          </Pressable>
        </View>

        {/* COMPARISON CARD */}
        <View style={styles.card}>
          {/* HOSPITAL HEADERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalContent}
          >
            {hospitals.map((hospital, index) => (
              <View
                key={
                  hospital.hospital_id ??
                  hospital.id ??
                  `${hospital.hospital_name}-${index}`
                }
                style={styles.hospitalColumn}
              >
                {/* IMAGE / ICON */}
                <View style={styles.imagePlaceholder}>
                  <Ionicons
                    name="business-outline"
                    size={35}
                    color="#267D73"
                  />
                </View>

                {/* NAME */}
                <Text
                  style={styles.hospitalName}
                  numberOfLines={2}
                >
                  {hospital.hospital_name ??
                    "Hospital"}
                </Text>

                {/* QUALITY SCORE */}
                <Text style={styles.rating}>
                  ⭐{" "}
                  {hospital.quality_score != null
                    ? `${hospital.quality_score}/5`
                    : "—"}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* COST */}
          <ComparisonRow
            label="Cost (Approx.)"
            hospitals={hospitals}
            value={(hospital) =>
              hospital.treatment_cost != null
                ? `₹${hospital.treatment_cost}`
                : hospital.tariff_range ?? "—"
            }
          />

          {/* DISTANCE */}
          <ComparisonRow
            label="Distance"
            hospitals={hospitals}
            value={(hospital) =>
              hospital.distance != null
                ? `${Number(
                    hospital.distance
                  ).toFixed(1)} km`
                : "—"
            }
          />

          {/* HOSPITAL TYPE */}
          <ComparisonRow
            label="Hospital Type"
            hospitals={hospitals}
            value={(hospital) =>
              hospital.hospital_type ?? "—"
            }
          />

          {/* ACCREDITATION */}
          <ComparisonRow
            label="Accreditation"
            hospitals={hospitals}
            value={(hospital) =>
              hospital.accreditation ?? "—"
            }
          />

          {/* QUALITY SCORE */}
          <ComparisonRow
            label="Quality Score"
            hospitals={hospitals}
            value={(hospital) =>
              hospital.quality_score != null
                ? `${hospital.quality_score}/5`
                : "—"
            }
          />
        </View>

        {/* RECOMMENDATION */}
        <View style={styles.recommendation}>
          <View style={styles.bulb}>
            <Ionicons
              name="bulb-outline"
              size={22}
              color="#E9A91A"
            />
          </View>

          <View style={styles.recommendationContent}>
            <Text style={styles.recommendationTitle}>
              Key Recommendation
            </Text>

            <Text style={styles.recommendationText}>
              {hospitals.length > 0
                ? `${hospitals[0].hospital_name ?? "Selected hospital"} is recommended based on quality, cost and distance.`
                : "Select hospitals to see a recommendation."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* =========================================================
   COMPARISON ROW
========================================================= */

function ComparisonRow({
  label,
  hospitals,
  value,
}: {
  label: string;
  hospitals: any[];
  value: (hospital: any) => string;
}) {
  return (
    <View style={styles.row}>
      {/* LABEL */}
      <View style={styles.labelCell}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>

      {/* HOSPITAL VALUES */}
      {hospitals.map((hospital, index) => (
        <View
          style={styles.valueCell}
          key={
            hospital.hospital_id ??
            hospital.id ??
            `${label}-${index}`
          }
        >
          <Text style={styles.value}>
            {value(hospital)}
          </Text>
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F8F7",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    height: 64,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5ECEA",
  },

  backButton: {
    width: 23,
    height: 40,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173B3A",
  },

  /* TREATMENT */

  treatmentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  treatmentText: {
    fontSize: 14,
    color: "#596C70",
  },

  bold: {
    fontWeight: "700",
    color: "#263638",
  },

  change: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8B57B5",
  },

  /* MAIN CARD */

  card: {
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E7EEEC",
  },

  horizontalContent: {
    paddingHorizontal: 10,
  },

  /* HOSPITAL COLUMN */

  hospitalColumn: {
    width: 145,
    alignItems: "center",
    paddingHorizontal: 8,
  },

  imagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#EAF5F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  hospitalName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#263638",
    textAlign: "center",
    lineHeight: 19,
    minHeight: 38,
  },

  rating: {
    marginTop: 6,
    fontSize: 13,
    color: "#596C70",
    fontWeight: "600",
  },

  /* COMPARISON ROW */

  row: {
    flexDirection: "row",
    alignItems: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#E8EFED",
    marginTop: 16,
    minHeight: 58,
  },

  labelCell: {
    width: 120,
    justifyContent: "center",
    paddingHorizontal: 14,
    backgroundColor: "#F8FAF9",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#53666A",
    lineHeight: 17,
  },

  valueCell: {
    width: 145,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  value: {
    fontSize: 12,
    color: "#263638",
    textAlign: "center",
    lineHeight: 17,
  },

  /* RECOMMENDATION */

  recommendation: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#FFFDF4",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#F3E7B6",
  },

  bulb: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFF4CC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  recommendationContent: {
    flex: 1,
  },

  recommendationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A421E",
    marginBottom: 5,
  },

  recommendationText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6C643A",
  },
});